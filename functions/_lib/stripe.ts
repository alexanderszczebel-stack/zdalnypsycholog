import { BOOKING_SETTINGS } from "../../src/lib/booking-settings";
import { buildAbsoluteUrl, HttpError, requireEnv } from "./http";

type StripeCheckoutSession = {
  id: string;
  url: string | null;
  payment_status?: string;
  payment_intent?: string | null;
  client_reference_id?: string | null;
  metadata?: Record<string, string>;
};

type StripeEvent = {
  id: string;
  type: string;
  created?: number;
  data?: {
    object?: StripeCheckoutSession;
  };
};

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return diff === 0;
}

function parseStripeSignature(signatureHeader: string) {
  return signatureHeader.split(",").reduce(
    (parsed, part) => {
      const [key, value] = part.split("=");
      if (key === "t") parsed.timestamp = Number(value);
      if (key === "v1" && value) parsed.signatures.push(value);
      return parsed;
    },
    { timestamp: 0, signatures: [] as string[] },
  );
}

export async function verifyStripeWebhookEvent(request: Request, webhookSecret: string) {
  const signatureHeader = request.headers.get("stripe-signature");
  if (!signatureHeader) {
    throw new HttpError(400, "missing_stripe_signature", "Brakuje podpisu Stripe.");
  }

  const body = await request.text();
  const parsedSignature = parseStripeSignature(signatureHeader);

  if (!parsedSignature.timestamp || parsedSignature.signatures.length === 0) {
    throw new HttpError(400, "invalid_stripe_signature", "Nieprawidłowy podpis Stripe.");
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowInSeconds - parsedSignature.timestamp) > 300) {
    throw new HttpError(400, "stale_stripe_signature", "Podpis Stripe jest zbyt stary.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signedPayload = `${parsedSignature.timestamp}.${body}`;
  const expectedSignature = toHex(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload)),
  );

  const verified = parsedSignature.signatures.some((signature) =>
    constantTimeEqual(signature, expectedSignature),
  );

  if (!verified) {
    throw new HttpError(400, "invalid_stripe_signature", "Podpis Stripe nie przeszedł weryfikacji.");
  }

  try {
    return JSON.parse(body) as StripeEvent;
  } catch {
    throw new HttpError(400, "invalid_stripe_payload", "Nieprawidłowy payload Stripe.");
  }
}

export async function createStripeCheckoutSession(
  env: { STRIPE_SECRET_KEY?: string; STRIPE_PRICE_ID?: string },
  input: {
    siteUrl: string;
    reservationId: string;
    startDatetime: string;
    endDatetime: string;
    timezone: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    holdExpiresAt: string;
  },
) {
  const stripeSecretKey = requireEnv(env.STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY");
  const successUrl = buildAbsoluteUrl(
    input.siteUrl,
    `${BOOKING_SETTINGS.confirmationPath}/?reservation_id=${encodeURIComponent(input.reservationId)}&session_id={CHECKOUT_SESSION_ID}`,
  );
  const cancelUrl = buildAbsoluteUrl(
    input.siteUrl,
    `${BOOKING_SETTINGS.bookingPath}/?reservation_id=${encodeURIComponent(input.reservationId)}&status=cancelled`,
  );

  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("locale", "pl");
  body.set("success_url", successUrl);
  body.set("cancel_url", cancelUrl);
  body.set("customer_email", input.email);
  body.set("client_reference_id", input.reservationId);
  body.set("integration_identifier", "zdalnypsycholog_booking_lpmtrvqa");
  body.set("expires_at", String(Math.floor(new Date(input.holdExpiresAt).getTime() / 1000)));
  body.set("line_items[0][quantity]", "1");

  const priceId = env.STRIPE_PRICE_ID?.trim();
  if (priceId) {
    body.set("line_items[0][price]", priceId);
  } else {
    body.set("line_items[0][price_data][currency]", BOOKING_SETTINGS.stripeCurrency);
    body.set("line_items[0][price_data][unit_amount]", String(BOOKING_SETTINGS.priceAmount));
    body.set("line_items[0][price_data][product_data][name]", BOOKING_SETTINGS.serviceName);
  }

  const metadata: Record<string, string> = {
    reservation_id: input.reservationId,
    selected_slot: input.startDatetime,
    start_datetime: input.startDatetime,
    end_datetime: input.endDatetime,
    timezone: input.timezone,
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
  };

  if (input.phone) metadata.phone = input.phone;

  Object.entries(metadata).forEach(([key, value]) => {
    body.set(`metadata[${key}]`, value);
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${stripeSecretKey}`,
      "content-type": "application/x-www-form-urlencoded",
      "stripe-version": "2026-07-29.dahlia",
    },
    body,
  });

  if (!response.ok) {
    const responseBody = await response.text();
    throw new HttpError(
      502,
      "stripe_checkout_failed",
      `Stripe nie utworzył płatności: ${responseBody.slice(0, 300)}`,
    );
  }

  const session = (await response.json()) as StripeCheckoutSession;
  if (!session.id || !session.url) {
    throw new HttpError(502, "stripe_checkout_failed", "Stripe nie zwrócił linku płatności.");
  }

  return session as StripeCheckoutSession & { id: string; url: string };
}

export function getReservationIdFromStripeSession(session: StripeCheckoutSession) {
  return session.metadata?.reservation_id || session.client_reference_id || null;
}

export type { StripeCheckoutSession, StripeEvent };
