import { BOOKING_SETTINGS } from "../../src/lib/booking-settings";
import { buildAbsoluteUrl } from "./http";
import type { CloudflareEnv, ReservationRow } from "./types";

async function sha256Hex(value: string) {
  const normalized = value.trim().toLowerCase();
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function normalizePhone(phone: string | null) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

export async function sendMetaPurchaseEvent(
  env: CloudflareEnv,
  reservation: ReservationRow,
  siteUrl: string,
) {
  const pixelId = env.META_PIXEL_ID?.trim();
  const accessToken = env.META_CAPI_ACCESS_TOKEN?.trim();

  if (!pixelId || !accessToken || reservation.marketing_consent !== 1 || reservation.meta_capi_sent_at) {
    return false;
  }

  const userData: Record<string, string | string[]> = {};
  userData.em = [await sha256Hex(reservation.email)];

  const normalizedPhone = normalizePhone(reservation.phone);
  if (normalizedPhone) userData.ph = [await sha256Hex(normalizedPhone)];
  if (reservation.fbp) userData.fbp = reservation.fbp;
  if (reservation.fbc) userData.fbc = reservation.fbc;
  if (reservation.client_ip) userData.client_ip_address = reservation.client_ip;
  if (reservation.user_agent) userData.client_user_agent = reservation.user_agent;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: reservation.meta_event_id || reservation.id,
        event_source_url: buildAbsoluteUrl(siteUrl, `${BOOKING_SETTINGS.confirmationPath}/`),
        action_source: "website",
        user_data: userData,
        custom_data: {
          value: BOOKING_SETTINGS.priceValue,
          currency: BOOKING_SETTINGS.currency,
        },
      },
    ],
  };

  const testEventCode = env.META_TEST_EVENT_CODE?.trim();
  if (testEventCode) payload.test_event_code = testEventCode;

  const graphVersion = env.META_GRAPH_API_VERSION?.trim() || "v25.0";
  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const responseBody = await response.text();
    console.error("Meta CAPI Purchase failed", response.status, responseBody.slice(0, 300));
    return false;
  }

  return true;
}
