import { BOOKING_SETTINGS, type BookingSettings } from "../../src/lib/booking-settings";
import { HttpError } from "./http";
import { parseLocalDate, parseTime, zonedTimeToUtc } from "./time";
import type {
  AdminReservationRow,
  BookingBlackoutRow,
  BookingExtraSlotRow,
  BookingReservationOverrideRow,
  BusyRange,
  CloudflareEnv,
  D1Database,
  ReservationRow,
  ScheduleConfigRow,
} from "./types";

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
         AND NOT EXISTS (
           SELECT 1 FROM booking_reservation_overrides admin_override
           WHERE admin_override.reservation_id = booking_reservations.id
             AND admin_override.action IN ('released','cancelled')
         )
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
       AND NOT EXISTS (
         SELECT 1 FROM booking_reservation_overrides admin_override
         WHERE admin_override.reservation_id = booking_reservations.id
           AND admin_override.action IN ('released','cancelled')
       )
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

export async function getReservationOverride(db: D1Database, reservationId: string) {
  return db
    .prepare("SELECT * FROM booking_reservation_overrides WHERE reservation_id = ? LIMIT 1")
    .bind(reservationId)
    .first<BookingReservationOverrideRow>();
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

function uniqueNumbers(values: number[]) {
  return Array.from(new Set(values)).sort((left, right) => left - right);
}

function parseWorkingDays(value: string | null | undefined) {
  if (!value) return BOOKING_SETTINGS.workingDays;

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return BOOKING_SETTINGS.workingDays;
    const days = uniqueNumbers(
      parsed
        .map((day) => Number(day))
        .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6),
    );
    return days.length ? days : BOOKING_SETTINGS.workingDays;
  } catch {
    return BOOKING_SETTINGS.workingDays;
  }
}

function positiveInteger(value: number | null | undefined, fallback: number, min: number, max: number) {
  const normalized = Number(value);
  if (!Number.isInteger(normalized) || normalized < min || normalized > max) return fallback;
  return normalized;
}

function validTime(value: string | null | undefined, fallback: string) {
  return value && parseTime(value) ? value : fallback;
}

export function scheduleRowToSettings(row: ScheduleConfigRow | null): BookingSettings {
  const workStart = validTime(row?.work_start, BOOKING_SETTINGS.workingHours.start);
  let workEnd = validTime(row?.work_end, BOOKING_SETTINGS.workingHours.end);

  if (parseTime(workEnd) && parseTime(workStart)) {
    const startMinutes = Number(workStart.slice(0, 2)) * 60 + Number(workStart.slice(3, 5));
    const endMinutes = Number(workEnd.slice(0, 2)) * 60 + Number(workEnd.slice(3, 5));
    if (endMinutes <= startMinutes) workEnd = BOOKING_SETTINGS.workingHours.end;
  }

  return {
    ...BOOKING_SETTINGS,
    workingDays: parseWorkingDays(row?.working_days),
    workingHours: {
      start: workStart,
      end: workEnd,
    },
    minLeadMinutes: positiveInteger(row?.min_lead_minutes, BOOKING_SETTINGS.minLeadMinutes, 0, 60 * 24 * 14),
    maxAdvanceDays: positiveInteger(row?.max_advance_days, BOOKING_SETTINGS.maxAdvanceDays, 1, 180),
    slotStepMinutes: positiveInteger(row?.slot_step_minutes, BOOKING_SETTINGS.slotStepMinutes, 10, 240),
  };
}

export async function getScheduleSettings(db: D1Database) {
  const row = await db
    .prepare("SELECT * FROM booking_schedule_config WHERE id = 'default' LIMIT 1")
    .first<ScheduleConfigRow>();

  return scheduleRowToSettings(row);
}

export async function updateScheduleSettings(
  db: D1Database,
  input: {
    workingDays: number[];
    workStart: string;
    workEnd: string;
    minLeadMinutes: number;
    maxAdvanceDays: number;
    slotStepMinutes: number;
  },
  nowIso: string,
) {
  const workingDays = uniqueNumbers(
    input.workingDays
      .map((day) => Number(day))
      .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6),
  );
  const workStart = validTime(input.workStart, BOOKING_SETTINGS.workingHours.start);
  const workEnd = validTime(input.workEnd, BOOKING_SETTINGS.workingHours.end);

  if (!workingDays.length) {
    throw new HttpError(400, "schedule_days_required", "Wybierz przynajmniej jeden dzień pracy.");
  }

  const startParsed = parseTime(workStart);
  const endParsed = parseTime(workEnd);
  if (!startParsed || !endParsed || endParsed.hour * 60 + endParsed.minute <= startParsed.hour * 60 + startParsed.minute) {
    throw new HttpError(400, "schedule_hours_invalid", "Godzina końca musi być późniejsza niż start.");
  }

  const minLeadMinutes = positiveInteger(input.minLeadMinutes, BOOKING_SETTINGS.minLeadMinutes, 0, 60 * 24 * 14);
  const maxAdvanceDays = positiveInteger(input.maxAdvanceDays, BOOKING_SETTINGS.maxAdvanceDays, 1, 180);
  const slotStepMinutes = positiveInteger(input.slotStepMinutes, BOOKING_SETTINGS.slotStepMinutes, 10, 240);

  await db
    .prepare(
      `INSERT INTO booking_schedule_config (
         id, working_days, work_start, work_end,
         min_lead_minutes, max_advance_days, slot_step_minutes, updated_at
       )
       VALUES ('default', ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         working_days = excluded.working_days,
         work_start = excluded.work_start,
         work_end = excluded.work_end,
         min_lead_minutes = excluded.min_lead_minutes,
         max_advance_days = excluded.max_advance_days,
         slot_step_minutes = excluded.slot_step_minutes,
         updated_at = excluded.updated_at`,
    )
    .bind(JSON.stringify(workingDays), workStart, workEnd, minLeadMinutes, maxAdvanceDays, slotStepMinutes, nowIso)
    .run();

  return getScheduleSettings(db);
}

export async function getUpcomingExtraSlots(db: D1Database, fromDate: string, toDate: string) {
  const result = await db
    .prepare(
      `SELECT *
       FROM booking_extra_slots
       WHERE date >= ? AND date <= ?
       ORDER BY date ASC, start_time ASC`,
    )
    .bind(fromDate, toDate)
    .all<BookingExtraSlotRow>();

  return result.results ?? [];
}

export async function getUpcomingBlackouts(db: D1Database, fromDate: string, toDate: string) {
  const result = await db
    .prepare(
      `SELECT *
       FROM booking_blackouts
       WHERE date >= ? AND date <= ?
       ORDER BY date ASC, COALESCE(start_time, '00:00') ASC`,
    )
    .bind(fromDate, toDate)
    .all<BookingBlackoutRow>();

  return result.results ?? [];
}

export function blackoutRowsToBusyRanges(blackouts: BookingBlackoutRow[], settings: BookingSettings): BusyRange[] {
  return blackouts
    .map((blackout) => {
      if (!parseLocalDate(blackout.date)) return null;

      const startTime = validTime(blackout.start_time, "00:00");
      const endTime = validTime(blackout.end_time, "23:59");
      const start = zonedTimeToUtc(blackout.date, startTime, settings.timezone);
      const end = zonedTimeToUtc(blackout.date, endTime, settings.timezone);

      if (end.getTime() <= start.getTime()) return null;
      return { start: start.toISOString(), end: end.toISOString() };
    })
    .filter((range): range is BusyRange => Boolean(range));
}

export async function createExtraSlot(
  db: D1Database,
  input: { id: string; date: string; startTime: string; endTime: string; note: string | null },
  nowIso: string,
) {
  validateDateAndRange(input.date, input.startTime, input.endTime);

  await db
    .prepare(
      `INSERT INTO booking_extra_slots (id, date, start_time, end_time, note, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(input.id, input.date, input.startTime, input.endTime, input.note, nowIso, nowIso)
    .run();
}

export async function deleteExtraSlot(db: D1Database, id: string) {
  await db.prepare("DELETE FROM booking_extra_slots WHERE id = ?").bind(id).run();
}

export async function createBlackout(
  db: D1Database,
  input: { id: string; date: string; startTime: string | null; endTime: string | null; note: string | null },
  nowIso: string,
) {
  if (!parseLocalDate(input.date)) {
    throw new HttpError(400, "date_invalid", "Podaj poprawną datę.");
  }

  if (input.startTime || input.endTime) {
    validateDateAndRange(input.date, input.startTime ?? "00:00", input.endTime ?? "23:59");
  }

  await db
    .prepare(
      `INSERT INTO booking_blackouts (id, date, start_time, end_time, note, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(input.id, input.date, input.startTime, input.endTime, input.note, nowIso, nowIso)
    .run();
}

export async function deleteBlackout(db: D1Database, id: string) {
  await db.prepare("DELETE FROM booking_blackouts WHERE id = ?").bind(id).run();
}

function validateDateAndRange(date: string, startTime: string, endTime: string) {
  const parsedDate = parseLocalDate(date);
  const parsedStart = parseTime(startTime);
  const parsedEnd = parseTime(endTime);

  if (!parsedDate) {
    throw new HttpError(400, "date_invalid", "Podaj poprawną datę.");
  }

  if (!parsedStart || !parsedEnd) {
    throw new HttpError(400, "time_invalid", "Podaj poprawne godziny.");
  }

  if (parsedEnd.hour * 60 + parsedEnd.minute <= parsedStart.hour * 60 + parsedStart.minute) {
    throw new HttpError(400, "time_range_invalid", "Godzina końca musi być późniejsza niż start.");
  }
}

export async function upsertReservationOverride(
  db: D1Database,
  input: { reservationId: string; action: "released" | "cancelled"; note: string | null },
  nowIso: string,
) {
  await db
    .prepare(
      `INSERT INTO booking_reservation_overrides (reservation_id, action, note, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(reservation_id) DO UPDATE SET
         action = excluded.action,
         note = excluded.note,
         updated_at = excluded.updated_at`,
    )
    .bind(input.reservationId, input.action, input.note, nowIso, nowIso)
    .run();
}

export async function listAdminReservations(db: D1Database, limit: number, nowIso: string) {
  await cleanupExpiredHolds(db, nowIso);

  const result = await db
    .prepare(
      `SELECT
         booking_reservations.*,
         booking_reservation_overrides.action AS admin_action,
         booking_reservation_overrides.note AS admin_note,
         booking_reservation_overrides.updated_at AS admin_updated_at
       FROM booking_reservations
       LEFT JOIN booking_reservation_overrides
         ON booking_reservation_overrides.reservation_id = booking_reservations.id
       ORDER BY booking_reservations.created_at DESC
       LIMIT ?`,
    )
    .bind(limit)
    .all<AdminReservationRow>();

  return result.results ?? [];
}

export function isUniqueSlotError(error: unknown) {
  return error instanceof Error && error.message.includes("uniq_booking_reservations_active_slot");
}
