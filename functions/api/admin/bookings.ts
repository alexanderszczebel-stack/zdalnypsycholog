import { requireAdmin } from "../../_lib/admin";
import {
  getReservationById,
  listAdminReservations,
  markReservationPaidConflict,
  markReservationStatus,
  requireDb,
  upsertReservationOverride,
} from "../../_lib/db";
import { errorResponse, HttpError, jsonResponse, readJsonBody } from "../../_lib/http";
import { deleteGoogleCalendarEvent } from "../../_lib/google-calendar";
import type { FunctionContext } from "../../_lib/types";

type AdminBookingAction = {
  action?: unknown;
  reservation_id?: unknown;
  note?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function parseLimit(value: string | null) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return 50;
  return Math.min(Math.max(parsed, 1), 200);
}

export async function onRequestGet(context: FunctionContext) {
  try {
    requireAdmin(context.request, context.env);
    const db = requireDb(context.env);
    const url = new URL(context.request.url);
    const reservations = await listAdminReservations(
      db,
      parseLimit(url.searchParams.get("limit")),
      new Date().toISOString(),
    );

    return jsonResponse({ reservations });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function onRequestPost(context: FunctionContext) {
  try {
    requireAdmin(context.request, context.env);
    const db = requireDb(context.env);
    const payload = await readJsonBody<AdminBookingAction>(context.request);
    const action = cleanText(payload.action, 40);
    const reservationId = cleanText(payload.reservation_id, 80);
    const note = cleanText(payload.note, 500) || null;
    const nowIso = new Date().toISOString();

    if (!reservationId) {
      throw new HttpError(400, "reservation_id_required", "Brakuje identyfikatora rezerwacji.");
    }

    const reservation = await getReservationById(db, reservationId);
    if (!reservation) {
      throw new HttpError(404, "reservation_not_found", "Nie znaleziono rezerwacji.");
    }

    if (action === "release") {
      const releaseNote = note || "Termin zwolniony ręcznie w panelu admina.";

      await upsertReservationOverride(
        db,
        {
          reservationId,
          action: "released",
          note: releaseNote,
        },
        nowIso,
      );

      if (reservation.status === "pending_checkout") {
        await markReservationStatus(
          db,
          reservationId,
          "expired",
          nowIso,
          releaseNote,
        );
      } else if (
        reservation.status === "paid" ||
        reservation.status === "calendar_created" ||
        reservation.status === "calendar_failed"
      ) {
        await markReservationPaidConflict(
          db,
          reservationId,
          `${releaseNote} Rezerwacja wymaga ręcznego rozliczenia poza systemem.`,
          nowIso,
        );
      }

      return jsonResponse({ ok: true, action: "released" });
    }

    if (action === "cancel") {
      let calendarDelete: { deleted: boolean; alreadyMissing: boolean } | null = null;
      let calendarDeleteError: string | null = null;

      if (reservation.google_event_id) {
        try {
          calendarDelete = await deleteGoogleCalendarEvent(context.env, reservation.google_event_id);
        } catch (error) {
          calendarDeleteError = error instanceof Error ? error.message : "Nie udało się usunąć wydarzenia.";
        }
      }

      await upsertReservationOverride(
        db,
        {
          reservationId,
          action: "cancelled",
          note: note || "Rezerwacja anulowana ręcznie w panelu admina.",
        },
        nowIso,
      );

      if (reservation.status === "pending_checkout") {
        await markReservationStatus(
          db,
          reservationId,
          "expired",
          nowIso,
          note || "Rezerwacja anulowana ręcznie w panelu admina.",
        );
      } else if (
        reservation.status === "paid" ||
        reservation.status === "calendar_created" ||
        reservation.status === "calendar_failed"
      ) {
        await markReservationPaidConflict(
          db,
          reservationId,
          note || "Rezerwacja anulowana ręcznie w panelu admina. Zwrot obsłuż ręcznie w Stripe, jeśli jest potrzebny.",
          nowIso,
        );
      }

      return jsonResponse({
        ok: true,
        action: "cancelled",
        calendar_delete: calendarDelete,
        calendar_delete_error: calendarDeleteError,
      });
    }

    throw new HttpError(400, "action_invalid", "Nieznana akcja admina.");
  } catch (error) {
    return errorResponse(error);
  }
}
