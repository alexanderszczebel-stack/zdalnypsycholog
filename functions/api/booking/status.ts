import { BOOKING_SETTINGS } from "../../../src/lib/booking-settings";
import { cleanupExpiredHolds, getReservationById, getReservationOverride, requireDb } from "../../_lib/db";
import { errorResponse, HttpError, jsonResponse } from "../../_lib/http";
import { formatTimeLabel, localDateInTimeZone } from "../../_lib/time";
import type { FunctionContext, ReservationRow } from "../../_lib/types";

function toPublicReservation(
  reservation: ReservationRow,
  overrideAction: "released" | "cancelled" | null,
) {
  const isPaid =
    reservation.status === "paid" ||
    reservation.status === "calendar_created" ||
    reservation.status === "calendar_failed" ||
    reservation.status === "paid_conflict";

  return {
    reservation_id: reservation.id,
    status: reservation.status,
    admin_action: overrideAction,
    is_paid: isPaid,
    is_finalized: reservation.status === "calendar_created" && overrideAction !== "cancelled",
    needs_manual_confirmation:
      overrideAction === "cancelled" ||
      reservation.status === "calendar_failed" || reservation.status === "paid_conflict",
    service_name: BOOKING_SETTINGS.serviceName,
    duration_minutes: BOOKING_SETTINGS.durationMinutes,
    price_label: BOOKING_SETTINGS.priceLabel,
    timezone: reservation.timezone,
    date: localDateInTimeZone(new Date(reservation.slot_start), reservation.timezone),
    start_datetime: reservation.slot_start,
    end_datetime: reservation.slot_end,
    start_time_label: formatTimeLabel(reservation.slot_start, reservation.timezone),
    end_time_label: formatTimeLabel(reservation.slot_end, reservation.timezone),
    google_meet_url: isPaid && overrideAction !== "cancelled" ? reservation.google_meet_url : null,
    meta_event_id: isPaid ? reservation.meta_event_id : null,
  };
}

export async function onRequestGet(context: FunctionContext) {
  try {
    const db = requireDb(context.env);
    const url = new URL(context.request.url);
    const reservationId = url.searchParams.get("reservation_id")?.trim();

    if (!reservationId) {
      throw new HttpError(400, "reservation_id_required", "Brakuje identyfikatora rezerwacji.");
    }

    await cleanupExpiredHolds(db, new Date().toISOString());

    const reservation = await getReservationById(db, reservationId);
    if (!reservation) {
      throw new HttpError(404, "reservation_not_found", "Nie znaleziono rezerwacji.");
    }

    const override = await getReservationOverride(db, reservation.id);

    return jsonResponse(toPublicReservation(reservation, override?.action ?? null));
  } catch (error) {
    return errorResponse(error);
  }
}
