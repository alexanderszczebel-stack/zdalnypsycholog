import { buildAvailability, getBookingRange } from "../../_lib/booking-core";
import {
  blackoutRowsToBusyRanges,
  cleanupExpiredHolds,
  getActiveBusyRanges,
  getScheduleSettings,
  getUpcomingBlackouts,
  getUpcomingExtraSlots,
  requireDb,
} from "../../_lib/db";
import { errorResponse, jsonResponse } from "../../_lib/http";
import { fetchGoogleBusy } from "../../_lib/google-calendar";
import type { FunctionContext } from "../../_lib/types";

export async function onRequestGet(context: FunctionContext) {
  try {
    const db = requireDb(context.env);
    const now = new Date();
    const nowIso = now.toISOString();
    const settings = await getScheduleSettings(db);
    const range = getBookingRange(settings, now);

    await cleanupExpiredHolds(db, nowIso);

    const [googleBusy, reservationBusy, blackouts, extraSlots] = await Promise.all([
      fetchGoogleBusy(context.env, range.timeMin, range.timeMax),
      getActiveBusyRanges(db, range.timeMin, range.timeMax, nowIso),
      getUpcomingBlackouts(db, range.today, range.maxDate),
      getUpcomingExtraSlots(db, range.today, range.maxDate),
    ]);
    const days = buildAvailability(
      [...googleBusy, ...reservationBusy, ...blackoutRowsToBusyRanges(blackouts, settings)],
      settings,
      now,
      extraSlots,
    );

    return jsonResponse({
      config: {
        serviceName: settings.serviceName,
        timezone: settings.timezone,
        durationMinutes: settings.durationMinutes,
        priceLabel: settings.priceLabel,
        priceValue: settings.priceValue,
        currency: settings.currency,
        holdMinutes: settings.holdMinutes,
        minLeadMinutes: settings.minLeadMinutes,
        maxAdvanceDays: settings.maxAdvanceDays,
        workingDays: settings.workingDays,
        workingHours: settings.workingHours,
      },
      days,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
