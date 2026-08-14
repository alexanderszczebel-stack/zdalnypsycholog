import { HttpError } from "./http";
import type { BusyRange, CloudflareEnv, D1Database, ReservationRow } from "./types";

export function requireDb(env: CloudflareEnv) {
  if (!env.BOOKINGS_DB) {
    throw new HttpError(
      503,
      "database_missing",
      "Brakuje bindingu D1 BOOKINGS_DB dla systemu rezerwacji.",
    );
  }

  return env.BOOKINGS_DB;
}

export async function cleanupExpiredHolds(db: D1Database, nowIso: string) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET status = 'expired', updated_at = ?
       WHERE status = 'pending_checkout' AND hold_expires_at <= ?`,
    )
    .bind(nowIso, nowIso)
    .run();
}

export async function getActiveBusyRanges(
  db: D1Database,
  rangeStartIso: string,
  rangeEndIso: string,
  nowIso: string,
): Promise<BusyRange[]> {
  const result = await db
    .prepare(
      `SELECT slot_start AS start, slot_end AS end
       FROM booking_reservations
       WHERE slot_start < ?
         AND slot_end > ?
         AND (
           status IN ('paid','calendar_created','calendar_failed')
           OR (status = 'pending_checkout' AND hold_expires_at > ?)
         )`,
    )
    .bind(rangeEndIso, rangeStartIso, nowIso)
    .all<BusyRange>();

  return result.results ?? [];
}

export async function getActiveOverlap(
  db: D1Database,
  slotStartIso: string,
  slotEndIso: string,
  nowIso: string,
  excludeReservationId?: string,
) {
  const excludeClause = excludeReservationId ? "AND id != ?" : "";
  const statement = db.prepare(
    `SELECT *
     FROM booking_reservations
     WHERE slot_start < ?
       AND slot_end > ?
       ${excludeClause}
       AND (
         status IN ('paid','calendar_created','calendar_failed')
         OR (status = 'pending_checkout' AND hold_expires_at > ?)
       )
     LIMIT 1`,
  );

  const bound = excludeReservationId
    ? statement.bind(slotEndIso, slotStartIso, excludeReservationId, nowIso)
    : statement.bind(slotEndIso, slotStartIso, nowIso);

  return bound.first<ReservationRow>();
}

export async function countRecentReservationsForIp(
  db: D1Database,
  clientIp: string | null,
  sinceIso: string,
) {
  if (!clientIp) return 0;

  const row = await db
    .prepare(
      `SELECT COUNT(*) AS count
       FROM booking_reservations
       WHERE client_ip = ? AND created_at >= ?`,
    )
    .bind(clientIp, sinceIso)
    .first<{ count: number }>();

  return Number(row?.count ?? 0);
}

export async function createReservationHold(
  db: D1Database,
  reservation: {
    id: string;
    slotStart: string;
    slotEnd: string;
    timezone: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    marketingConsent: boolean;
    fbp: string | null;
    fbc: string | null;
    userAgent: string | null;
    clientIp: string | null;
    holdExpiresAt: string;
    metaEventId: string;
    nowIso: string;
  },
) {
  await db
    .prepare(
      `INSERT INTO booking_reservations (
         id, status, slot_start, slot_end, timezone,
         first_name, last_name, email, phone,
         marketing_consent, fbp, fbc, user_agent, client_ip,
         hold_expires_at, meta_event_id, created_at, updated_at
       )
       VALUES (?, 'pending_checkout', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      reservation.id,
      reservation.slotStart,
      reservation.slotEnd,
      reservation.timezone,
      reservation.firstName,
      reservation.lastName,
      reservation.email,
      reservation.phone,
      reservation.marketingConsent ? 1 : 0,
      reservation.fbp,
      reservation.fbc,
      reservation.userAgent,
      reservation.clientIp,
      reservation.holdExpiresAt,
      reservation.metaEventId,
      reservation.nowIso,
      reservation.nowIso,
    )
    .run();
}

export async function attachStripeSession(
  db: D1Database,
  reservationId: string,
  checkoutUrl: string,
  stripeSessionId: string,
  nowIso: string,
) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET stripe_session_id = ?, stripe_checkout_url = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(stripeSessionId, checkoutUrl, nowIso, reservationId)
    .run();
}

export async function markReservationStatus(
  db: D1Database,
  reservationId: string,
  status: string,
  nowIso: string,
  failureReason: string | null = null,
) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET status = ?, failure_reason = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(status, failureReason, nowIso, reservationId)
    .run();
}

export async function getReservationById(db: D1Database, reservationId: string) {
  return db
    .prepare("SELECT * FROM booking_reservations WHERE id = ? LIMIT 1")
    .bind(reservationId)
    .first<ReservationRow>();
}

export async function getReservationByStripeSession(db: D1Database, stripeSessionId: string) {
  return db
    .prepare("SELECT * FROM booking_reservations WHERE stripe_session_id = ? LIMIT 1")
    .bind(stripeSessionId)
    .first<ReservationRow>();
}

export async function markReservationPaid(
  db: D1Database,
  reservationId: string,
  stripeSessionId: string,
  stripePaymentIntentId: string | null,
  paidAtIso: string,
) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET status = 'paid',
           stripe_session_id = COALESCE(stripe_session_id, ?),
           stripe_payment_intent_id = ?,
           paid_at = COALESCE(paid_at, ?),
           updated_at = ?
       WHERE id = ?
         AND status IN ('pending_checkout','paid','calendar_failed')`,
    )
    .bind(stripeSessionId, stripePaymentIntentId, paidAtIso, paidAtIso, reservationId)
    .run();
}

export async function markReservationPaidConflict(
  db: D1Database,
  reservationId: string,
  reason: string,
  nowIso: string,
) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET status = 'paid_conflict', failure_reason = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(reason, nowIso, reservationId)
    .run();
}

export async function markCalendarCreated(
  db: D1Database,
  reservationId: string,
  googleEventId: string,
  googleMeetUrl: string | null,
  nowIso: string,
) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET status = 'calendar_created',
           google_event_id = ?,
           google_meet_url = ?,
           updated_at = ?
       WHERE id = ?`,
    )
    .bind(googleEventId, googleMeetUrl, nowIso, reservationId)
    .run();
}

export async function markCalendarFailed(
  db: D1Database,
  reservationId: string,
  reason: string,
  nowIso: string,
) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET status = 'calendar_failed', failure_reason = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(reason, nowIso, reservationId)
    .run();
}

export async function markMetaCapiSent(db: D1Database, reservationId: string, nowIso: string) {
  await db
    .prepare(
      `UPDATE booking_reservations
       SET meta_capi_sent_at = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(nowIso, nowIso, reservationId)
    .run();
}

export async function claimStripeWebhookEvent(
  db: D1Database,
  eventId: string,
  eventType: string,
  stripeCreated: number | null,
  nowIso: string,
) {
  const existing = await db
    .prepare("SELECT status FROM stripe_webhook_events WHERE id = ? LIMIT 1")
    .bind(eventId)
    .first<{ status: string }>();

  if (existing?.status === "processed" || existing?.status === "processing") {
    return false;
  }

  if (existing?.status === "failed") {
    await db
      .prepare(
        `UPDATE stripe_webhook_events
         SET status = 'processing', error = NULL, received_at = ?
         WHERE id = ?`,
      )
      .bind(nowIso, eventId)
      .run();
    return true;
  }

  await db
    .prepare(
      `INSERT INTO stripe_webhook_events (id, type, stripe_created, status, received_at)
       VALUES (?, ?, ?, 'processing', ?)`,
    )
    .bind(eventId, eventType, stripeCreated, nowIso)
    .run();

  return true;
}

export async function markStripeWebhookProcessed(
  db: D1Database,
  eventId: string,
  reservationId: string | null,
  nowIso: string,
) {
  await db
    .prepare(
      `UPDATE stripe_webhook_events
       SET status = 'processed', reservation_id = ?, processed_at = ?, error = NULL
       WHERE id = ?`,
    )
    .bind(reservationId, nowIso, eventId)
    .run();
}

export async function markStripeWebhookFailed(
  db: D1Database,
  eventId: string,
  reservationId: string | null,
  error: string,
  nowIso: string,
) {
  await db
    .prepare(
      `UPDATE stripe_webhook_events
       SET status = 'failed', reservation_id = ?, processed_at = ?, error = ?
       WHERE id = ?`,
    )
    .bind(reservationId, nowIso, error.slice(0, 500), eventId)
    .run();
}

export function isUniqueSlotError(error: unknown) {
  return error instanceof Error && error.message.includes("uniq_booking_reservations_active_slot");
}
