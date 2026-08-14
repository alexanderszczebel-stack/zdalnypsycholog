import { cleanupExpiredHolds, getReservationById, markReservationStatus, requireDb } from "../../_lib/db";
import { assertAllowedOrigin, errorResponse, HttpError, jsonResponse, readJsonBody } from "../../_lib/http";
import type { FunctionContext } from "../../_lib/types";

type CancelPayload = {
  reservation_id?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export async function onRequestPost(context: FunctionContext) {
  try {
    assertAllowedOrigin(context.request, context.env);
    const db = requireDb(context.env);
    const payload = await readJsonBody<CancelPayload>(context.request);
    const reservationId = cleanText(payload.reservation_id, 80);
    const nowIso = new Date().toISOString();

    if (!reservationId) {
      throw new HttpError(400, "reservation_id_required", "Brakuje identyfikatora rezerwacji.");
    }

    await cleanupExpiredHolds(db, nowIso);
    const reservation = await getReservationById(db, reservationId);

    if (reservation?.status === "pending_checkout") {
      await markReservationStatus(
        db,
        reservationId,
        "expired",
        nowIso,
        "Płatność anulowana przez klienta przed finalizacją checkoutu.",
      );
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
