import { getBlockedEndIso } from "../../_lib/booking-core";
import {
  cleanupExpiredHolds,
  claimStripeWebhookEvent,
  getActiveOverlap,
  getReservationById,
  getReservationOverride,
  getReservationByStripeSession,
  getScheduleSettings,
  markCalendarCreated,
  markCalendarFailed,
  markMetaCapiSent,
  markReservationPaid,
  markReservationPaidConflict,
  markReservationStatus,
  markStripeWebhookFailed,
  markStripeWebhookProcessed,
  requireDb,
} from "../../_lib/db";
import { errorResponse, getSiteUrl, HttpError, jsonResponse, requireEnv } from "../../_lib/http";
import { createGoogleCalendarEvent } from "../../_lib/google-calendar";
import { sendMetaPurchaseEvent } from "../../_lib/meta";
import {
  getReservationIdFromStripeSession,
  verifyStripeWebhookEvent,
  type StripeCheckoutSession,
  type StripeEvent,
} from "../../_lib/stripe";
import type { FunctionContext, ReservationRow } from "../../_lib/types";

async function getReservationForSession(
  db: ReturnType<typeof requireDb>,
  session: StripeCheckoutSession,
) {
  const reservationId = getReservationIdFromStripeSession(session);
  if (reservationId) {
    return getReservationById(db, reservationId);
  }

  if (session.id) {
    return getReservationByStripeSession(db, session.id);
  }

  return null;
}

async function handleCheckoutExpired(
  db: ReturnType<typeof requireDb>,
  session: StripeCheckoutSession,
  nowIso: string,
) {
  const reservation = await getReservationForSession(db, session);

  if (reservation?.status === "pending_checkout") {
    await markReservationStatus(db, reservation.id, "expired", nowIso);
  }

  return reservation?.id ?? null;
}

async function handleCheckoutFailed(
  db: ReturnType<typeof requireDb>,
  session: StripeCheckoutSession,
  nowIso: string,
) {
  const reservation = await getReservationForSession(db, session);

  if (reservation?.status === "pending_checkout") {
    await markReservationStatus(
      db,
      reservation.id,
      "checkout_failed",
      nowIso,
      "Stripe oznaczył płatność jako nieudaną.",
    );
  }

  return reservation?.id ?? null;
}

async function scheduleMetaPurchase(
  context: FunctionContext,
  reservation: ReservationRow,
  siteUrl: string,
) {
  context.waitUntil(
    sendMetaPurchaseEvent(context.env, reservation, siteUrl)
      .then((sent) => {
        if (!sent) return;
        return markMetaCapiSent(context.env.BOOKINGS_DB!, reservation.id, new Date().toISOString());
      })
      .catch((error) => {
        console.error("Meta CAPI async error", error);
      }),
  );
}

async function handleCheckoutCompleted(
  context: FunctionContext,
  event: StripeEvent,
  session: StripeCheckoutSession,
  nowIso: string,
) {
  const db = requireDb(context.env);

  if (session.payment_status !== "paid") {
    return null;
  }

  const reservation = await getReservationForSession(db, session);
  if (!reservation) {
    throw new HttpError(
      404,
      "reservation_not_found",
      "Stripe potwierdził płatność, ale nie znaleziono rezerwacji.",
    );
  }

  if (reservation.status === "calendar_created") {
    await scheduleMetaPurchase(context, reservation, getSiteUrl(context.request, context.env));
    return reservation.id;
  }

  const override = await getReservationOverride(db, reservation.id);
  if (override) {
    await markReservationPaidConflict(
      db,
      reservation.id,
      `Płatność Stripe ${event.id} dotarła po ręcznej zmianie rezerwacji (${override.action}).`,
      nowIso,
    );
    return reservation.id;
  }

  const settings = await getScheduleSettings(db);
  const activeOverlap = await getActiveOverlap(
    db,
    reservation.slot_start,
    getBlockedEndIso(reservation.slot_end, settings),
    nowIso,
    reservation.id,
  );

  if (activeOverlap) {
    await markReservationPaidConflict(
      db,
      reservation.id,
      `Płatność Stripe ${event.id} dotarła po zajęciu terminu przez inną aktywną rezerwację.`,
      nowIso,
    );
    return reservation.id;
  }

  await markReservationPaid(
    db,
    reservation.id,
    session.id,
    session.payment_intent ?? null,
    nowIso,
  );

  const paidReservation = await getReservationById(db, reservation.id);
  if (!paidReservation) {
    throw new HttpError(404, "reservation_not_found", "Nie znaleziono opłaconej rezerwacji.");
  }

  if (!paidReservation.google_event_id) {
    try {
      const calendarEvent = await createGoogleCalendarEvent(context.env, paidReservation);
      await markCalendarCreated(
        db,
        paidReservation.id,
        calendarEvent.eventId,
        calendarEvent.meetUrl,
        new Date().toISOString(),
      );
    } catch (error) {
      await markCalendarFailed(
        db,
        paidReservation.id,
        error instanceof Error ? error.message : "Nie udało się utworzyć wydarzenia Google.",
        new Date().toISOString(),
      );
      throw error;
    }
  }

  const finalizedReservation = await getReservationById(db, reservation.id);
  if (finalizedReservation) {
    await scheduleMetaPurchase(context, finalizedReservation, getSiteUrl(context.request, context.env));
  }

  return reservation.id;
}

export async function onRequestPost(context: FunctionContext) {
  const db = requireDb(context.env);
  const nowIso = new Date().toISOString();
  let eventId: string | null = null;
  let reservationId: string | null = null;

  try {
    const webhookSecret = requireEnv(context.env.STRIPE_WEBHOOK_SECRET, "STRIPE_WEBHOOK_SECRET");
    const event = await verifyStripeWebhookEvent(context.request, webhookSecret);
    eventId = event.id;

    const shouldProcess = await claimStripeWebhookEvent(
      db,
      event.id,
      event.type,
      event.created ?? null,
      nowIso,
    );

    if (!shouldProcess) {
      return jsonResponse({ received: true, duplicate: true });
    }

    await cleanupExpiredHolds(db, nowIso);

    const session = event.data?.object;
    if (!session) {
      await markStripeWebhookProcessed(db, event.id, null, nowIso);
      return jsonResponse({ received: true, ignored: true });
    }

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      reservationId = await handleCheckoutCompleted(context, event, session, nowIso);
    } else if (event.type === "checkout.session.expired") {
      reservationId = await handleCheckoutExpired(db, session, nowIso);
    } else if (event.type === "checkout.session.async_payment_failed") {
      reservationId = await handleCheckoutFailed(db, session, nowIso);
    }

    await markStripeWebhookProcessed(db, event.id, reservationId, new Date().toISOString());
    return jsonResponse({ received: true });
  } catch (error) {
    if (eventId) {
      await markStripeWebhookFailed(
        db,
        eventId,
        reservationId,
        error instanceof Error ? error.message : "Nieznany błąd webhooka.",
        new Date().toISOString(),
      );
    }

    return errorResponse(error);
  }
}
