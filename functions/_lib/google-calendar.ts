import { BOOKING_SETTINGS } from "../../src/lib/booking-settings";
import { HttpError, requireEnv } from "./http";
import type { BusyRange, CloudflareEnv, ReservationRow } from "./types";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.freebusy",
].join(" ");

type GoogleCredentials = {
  client_email: string;
  private_key: string;
};

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  error?: string;
};

type GoogleFreeBusyResponse = {
  calendars?: Record<string, { busy?: BusyRange[]; errors?: { reason?: string }[] }>;
};

type GoogleEventResponse = {
  id?: string;
  hangoutLink?: string;
  conferenceData?: {
    entryPoints?: { entryPointType?: string; uri?: string }[];
  };
};

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

function base64UrlEncode(input: string | ArrayBuffer) {
  const bytes =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : new Uint8Array(input);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function privateKeyToArrayBuffer(privateKey: string) {
  const normalized = normalizePrivateKey(privateKey)
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

function getGoogleCredentials(env: CloudflareEnv): GoogleCredentials {
  const credentialsJson = env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();

  if (credentialsJson) {
    try {
      const parsed = JSON.parse(credentialsJson) as Partial<GoogleCredentials>;
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key,
        };
      }
    } catch {
      throw new HttpError(
        503,
        "google_credentials_invalid",
        "GOOGLE_SERVICE_ACCOUNT_JSON nie jest poprawnym JSON.",
      );
    }
  }

  return {
    client_email: requireEnv(env.GOOGLE_SERVICE_ACCOUNT_EMAIL, "GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    private_key: requireEnv(env.GOOGLE_PRIVATE_KEY, "GOOGLE_PRIVATE_KEY"),
  };
}

async function createServiceAccountJwt(env: CloudflareEnv) {
  const credentials = getGoogleCredentials(env);
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload: Record<string, string | number> = {
    iss: credentials.client_email,
    scope: GOOGLE_SCOPES,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const delegatedUser = env.GOOGLE_IMPERSONATED_USER_EMAIL?.trim();
  if (delegatedUser) payload.sub = delegatedUser;

  const signingInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyToArrayBuffer(credentials.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput),
  );

  return `${signingInput}.${base64UrlEncode(signature)}`;
}

async function getGoogleAccessToken(env: CloudflareEnv) {
  const assertion = await createServiceAccountJwt(env);
  const body = new URLSearchParams();
  body.set("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  body.set("assertion", assertion);

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const token = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !token.access_token) {
    throw new HttpError(
      503,
      "google_auth_failed",
      `Nie udało się uzyskać dostępu do Google Calendar: ${(token.error ?? response.statusText).slice(0, 160)}`,
    );
  }

  return token.access_token;
}

export async function fetchGoogleBusy(
  env: CloudflareEnv,
  timeMin: string,
  timeMax: string,
): Promise<BusyRange[]> {
  const calendarId = requireEnv(env.GOOGLE_CALENDAR_ID, "GOOGLE_CALENDAR_ID");
  const accessToken = await getGoogleAccessToken(env);
  const response = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: BOOKING_SETTINGS.timezone,
      items: [{ id: calendarId }],
    }),
  });
  const result = (await response.json()) as GoogleFreeBusyResponse;

  if (!response.ok) {
    throw new HttpError(
      503,
      "google_freebusy_failed",
      "Nie udało się pobrać dostępności z Google Calendar.",
    );
  }

  const calendar = result.calendars?.[calendarId];
  if (calendar?.errors?.length) {
    throw new HttpError(
      503,
      "google_calendar_unavailable",
      "Google Calendar zwrócił błąd dostępności dla wskazanego kalendarza.",
    );
  }

  return calendar?.busy ?? [];
}

export async function createGoogleCalendarEvent(env: CloudflareEnv, reservation: ReservationRow) {
  const calendarId = requireEnv(env.GOOGLE_CALENDAR_ID, "GOOGLE_CALENDAR_ID");
  const accessToken = await getGoogleAccessToken(env);
  const sendInvites = env.GOOGLE_SEND_CALENDAR_INVITES !== "false";
  const fullName = `${reservation.first_name} ${reservation.last_name}`.trim();
  const requestId = reservation.id.replace(/[^a-zA-Z0-9-]/g, "");
  const attendees = sendInvites
    ? [{ email: reservation.email, displayName: fullName }]
    : undefined;

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=${sendInvites ? "all" : "none"}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        summary: `Konsultacja online - ${fullName}`,
        description: [
          `Rezerwacja: ${reservation.id}`,
          `E-mail klienta: ${reservation.email}`,
          reservation.phone ? `Telefon: ${reservation.phone}` : null,
          "Płatność potwierdzona przez Stripe.",
        ]
          .filter(Boolean)
          .join("\n"),
        start: {
          dateTime: reservation.slot_start,
          timeZone: reservation.timezone,
        },
        end: {
          dateTime: reservation.slot_end,
          timeZone: reservation.timezone,
        },
        attendees,
        conferenceData: {
          createRequest: {
            requestId,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    },
  );
  const result = (await response.json()) as GoogleEventResponse;

  if (!response.ok || !result.id) {
    throw new HttpError(
      502,
      "google_event_failed",
      "Płatność jest potwierdzona, ale nie udało się utworzyć wydarzenia Google Calendar.",
    );
  }

  const meetUrl =
    result.hangoutLink ||
    result.conferenceData?.entryPoints?.find((entryPoint) => entryPoint.entryPointType === "video")?.uri ||
    null;

  return {
    eventId: result.id,
    meetUrl,
  };
}
