import { BOOKING_SETTINGS } from "../../../src/lib/booking-settings";
import { findGeneratedSlot, getBlockedEndIso, isSlotBusy } from "../../_lib/booking-core";
import {
  attachStripeSession,
  cleanupExpiredHolds,
  countRecentReservationsForIp,
  createReservationHold,
  getActiveBusyRanges,
  getActiveOverlap,
  isUniqueSlotError,
  markReservationStatus,
  requireDb,
} from "../../_lib/db";
import {
  errorResponse,
  getClientIp,
  getSiteUrl,
  HttpError,
  jsonResponse,
  readJsonBody,
} from "../../_lib/http";
import { fetchGoogleBusy } from "../../_lib/google-calendar";
import { createStripeCheckoutSession } from "../../_lib/stripe";
import type { FunctionContext } from "../../_lib/types";

type CheckoutPayload = {
  start_datetime?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  email?: unknown;
  phone?: unknown;
  marketing_consent?: unknown;
  fbp?: unknown;
  fbc?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(payload: CheckoutPayload) {
  const firstName = cleanText(payload.first_name, 80);
  const lastName = cleanText(payload.last_name, 80);
  const email = cleanText(payload.email, 160).toLowerCase();
  const phone = cleanText(payload.phone, 40) || null;
  const fbp = cleanText(payload.fbp, 160) || null;
  const fbc = cleanText(payload.fbc, 220) || null;
  let startDatetime = "";
  if (typeof payload.start_datetime === "string") {
    const parsedDate = new Date(payload.start_datetime);
    if (!Number.isNaN(parsedDate.getTime())) {
      startDatetime = parsedDate.toISOString();
    }
  }

  if (!firstName || !lastName) {
    throw new HttpError(400, "name_required", "Podaj imię i nazwisko.");
  }

  if (!email || !validateEmail(email)) {
    throw new HttpError(400, "email_invalid", "Podaj poprawny adres e-mail.");
  }

  if (!startDatetime) {
    throw new HttpError(400, "slot_required", "Wybierz termin konsultacji.");
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    fbp,
    fbc,
    startDatetime,
    marketingConsent: payload.marketing_consent === true,
  };
}

export async function onRequestPost(context: FunctionContext) {
  const db = requireDb(context.env);
  const now = new Date();
  const nowIso = now.toISOString();
  let reservationId: string | null = null;

  try {
    const payload = validatePayload(await readJsonBody<CheckoutPayload>(context.request));
    const slot = findGeneratedSlot(payload.startDatetime, now);

    if (!slot) {
      throw new HttpError(
        409,
        "slot_unavailable",
        "Ten termin jest już niedostępny. Wybierz inną godzinę.",
      );
    }

    await cleanupExpiredHolds(db, nowIso);

    const clientIp = getClientIp(context.request);
    const recentLimitStart = new Date(now.getTime() - 10 * 60 * 1000).toISOString();
    const recentCount = await countRecentReservationsForIp(db, clientIp, recentLimitStart);

    if (recentCount > 8) {
      throw new HttpError(
        429,
        "rate_limited",
        "Za dużo prób rezerwacji w krótkim czasie. Spróbuj ponownie za kilka minut.",
      );
    }

    const blockedEnd = getBlockedEndIso(slot.end);
    const googleBusy = await fetchGoogleBusy(context.env, slot.start, blockedEnd);
    const reservationBusy = await getActiveBusyRanges(db, slot.start, blockedEnd, nowIso);

    if (isSlotBusy(slot, [...googleBusy, ...reservationBusy])) {
      throw new HttpError(
        409,
        "slot_unavailable",
        "Ten termin został właśnie zajęty. Wybierz inną godzinę.",
      );
    }

    const activeOverlap = await getActiveOverlap(db, slot.start, blockedEnd, nowIso);
    if (activeOverlap) {
      throw new HttpError(
        409,
        "slot_unavailable",
        "Ten termin jest już zablokowany. Wybierz inną godzinę.",
      );
    }

    reservationId = crypto.randomUUID();
    const holdExpiresAt = new Date(
      now.getTime() + BOOKING_SETTINGS.holdMinutes * 60 * 1000,
    ).toISOString();
    const metaEventId = `purchase_${reservationId}`;

    try {
      await createReservationHold(db, {
        id: reservationId,
        slotStart: slot.start,
        slotEnd: slot.end,
        timezone: BOOKING_SETTINGS.timezone,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        marketingConsent: payload.marketingConsent,
        fbp: payload.fbp,
        fbc: payload.fbc,
        userAgent: context.request.headers.get("user-agent"),
        clientIp,
        holdExpiresAt,
        metaEventId,
        nowIso,
      });
    } catch (error) {
      if (isUniqueSlotError(error)) {
        throw new HttpError(
          409,
          "slot_unavailable",
          "Ten termin został właśnie zablokowany. Wybierz inną godzinę.",
        );
      }

      throw error;
    }

    const stripeSession = await createStripeCheckoutSession(context.env, {
      siteUrl: getSiteUrl(context.request, context.env),
      reservationId,
      startDatetime: slot.start,
      endDatetime: slot.end,
      timezone: BOOKING_SETTINGS.timezone,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      holdExpiresAt,
    });

    await attachStripeSession(
      db,
      reservationId,
      stripeSession.url,
      stripeSession.id,
      new Date().toISOString(),
    );

    return jsonResponse({
      reservation_id: reservationId,
      checkout_url: stripeSession.url,
      hold_expires_at: holdExpiresAt,
    });
  } catch (error) {
    if (reservationId) {
      await markReservationStatus(
        db,
        reservationId,
        "checkout_failed",
        new Date().toISOString(),
        error instanceof Error ? error.message : "Nieznany błąd checkoutu.",
      );
    }

    return errorResponse(error);
  }
}
