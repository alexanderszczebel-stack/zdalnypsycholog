import { BOOKING_SETTINGS } from "../../../src/lib/booking-settings";
import { buildAvailability, getBookingRange } from "../../_lib/booking-core";
import { cleanupExpiredHolds, getActiveBusyRanges, requireDb } from "../../_lib/db";
import { errorResponse, jsonResponse } from "../../_lib/http";
import { fetchGoogleBusy } from "../../_lib/google-calendar";
import type { FunctionContext } from "../../_lib/types";

export async function onRequestGet(context: FunctionContext) {
  try {
    const db = requireDb(context.env);
    const now = new Date();
    const nowIso = now.toISOString();
    const range = getBookingRange(now);

    await cleanupExpiredHolds(db, nowIso);

    const [googleBusy, reservationBusy] = await Promise.all([
      fetchGoogleBusy(context.env, range.timeMin, range.timeMax),
      getActiveBusyRanges(db, range.timeMin, range.timeMax, nowIso),
    ]);
    const days = buildAvailability([...googleBusy, ...reservationBusy], now);

    return jsonResponse({
      config: {
        serviceName: BOOKING_SETTINGS.serviceName,
        timezone: BOOKING_SETTINGS.timezone,
        durationMinutes: BOOKING_SETTINGS.durationMinutes,
        priceLabel: BOOKING_SETTINGS.priceLabel,
        priceValue: BOOKING_SETTINGS.priceValue,
        currency: BOOKING_SETTINGS.currency,
        holdMinutes: BOOKING_SETTINGS.holdMinutes,
        minLeadMinutes: BOOKING_SETTINGS.minLeadMinutes,
        maxAdvanceDays: BOOKING_SETTINGS.maxAdvanceDays,
      },
      days,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
