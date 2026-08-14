import { getBookingRange } from "../../_lib/booking-core";
import { requireAdmin } from "../../_lib/admin";
import {
  createBlackout,
  createExtraSlot,
  deleteBlackout,
  deleteExtraSlot,
  getScheduleSettings,
  getUpcomingBlackouts,
  getUpcomingExtraSlots,
  requireDb,
  updateScheduleSettings,
} from "../../_lib/db";
import { errorResponse, HttpError, jsonResponse, readJsonBody } from "../../_lib/http";
import type { FunctionContext } from "../../_lib/types";

type AdminSchedulePayload = {
  action?: unknown;
  schedule?: {
    workingDays?: unknown;
    workStart?: unknown;
    workEnd?: unknown;
    minLeadMinutes?: unknown;
    maxAdvanceDays?: unknown;
    slotStepMinutes?: unknown;
  };
  date?: unknown;
  start_time?: unknown;
  end_time?: unknown;
  note?: unknown;
  id?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function toNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function scheduleToPublic(settings: Awaited<ReturnType<typeof getScheduleSettings>>) {
  return {
    workingDays: settings.workingDays,
    workStart: settings.workingHours.start,
    workEnd: settings.workingHours.end,
    minLeadMinutes: settings.minLeadMinutes,
    maxAdvanceDays: settings.maxAdvanceDays,
    slotStepMinutes: settings.slotStepMinutes,
  };
}

async function getSchedulePayload(context: FunctionContext) {
  const db = requireDb(context.env);
  const settings = await getScheduleSettings(db);
  const range = getBookingRange(settings);
  const [extraSlots, blackouts] = await Promise.all([
    getUpcomingExtraSlots(db, range.today, range.maxDate),
    getUpcomingBlackouts(db, range.today, range.maxDate),
  ]);

  return {
    schedule: scheduleToPublic(settings),
    defaults: {
      serviceName: settings.serviceName,
      durationMinutes: settings.durationMinutes,
      bufferMinutes: settings.bufferMinutes,
      holdMinutes: settings.holdMinutes,
      priceLabel: settings.priceLabel,
      timezone: settings.timezone,
    },
    extraSlots,
    blackouts,
  };
}

export async function onRequestGet(context: FunctionContext) {
  try {
    requireAdmin(context.request, context.env);
    return jsonResponse(await getSchedulePayload(context));
  } catch (error) {
    return errorResponse(error);
  }
}

export async function onRequestPost(context: FunctionContext) {
  try {
    requireAdmin(context.request, context.env);
    const db = requireDb(context.env);
    const payload = await readJsonBody<AdminSchedulePayload>(context.request);
    const action = cleanText(payload.action, 40);
    const nowIso = new Date().toISOString();

    if (action === "update_schedule") {
      const schedule = payload.schedule ?? {};
      await updateScheduleSettings(
        db,
        {
          workingDays: Array.isArray(schedule.workingDays)
            ? schedule.workingDays.map((day) => Number(day))
            : [],
          workStart: cleanText(schedule.workStart, 5),
          workEnd: cleanText(schedule.workEnd, 5),
          minLeadMinutes: toNumber(schedule.minLeadMinutes, 1440),
          maxAdvanceDays: toNumber(schedule.maxAdvanceDays, 30),
          slotStepMinutes: toNumber(schedule.slotStepMinutes, 30),
        },
        nowIso,
      );
      return jsonResponse({ ok: true, ...(await getSchedulePayload(context)) });
    }

    if (action === "add_extra_slot") {
      await createExtraSlot(
        db,
        {
          id: crypto.randomUUID(),
          date: cleanText(payload.date, 10),
          startTime: cleanText(payload.start_time, 5),
          endTime: cleanText(payload.end_time, 5),
          note: cleanText(payload.note, 180) || null,
        },
        nowIso,
      );
      return jsonResponse({ ok: true, ...(await getSchedulePayload(context)) });
    }

    if (action === "delete_extra_slot") {
      const id = cleanText(payload.id, 80);
      if (!id) throw new HttpError(400, "id_required", "Brakuje identyfikatora terminu.");
      await deleteExtraSlot(db, id);
      return jsonResponse({ ok: true, ...(await getSchedulePayload(context)) });
    }

    if (action === "add_blackout") {
      const startTime = cleanText(payload.start_time, 5);
      const endTime = cleanText(payload.end_time, 5);
      await createBlackout(
        db,
        {
          id: crypto.randomUUID(),
          date: cleanText(payload.date, 10),
          startTime: startTime || null,
          endTime: endTime || null,
          note: cleanText(payload.note, 180) || null,
        },
        nowIso,
      );
      return jsonResponse({ ok: true, ...(await getSchedulePayload(context)) });
    }

    if (action === "delete_blackout") {
      const id = cleanText(payload.id, 80);
      if (!id) throw new HttpError(400, "id_required", "Brakuje identyfikatora blokady.");
      await deleteBlackout(db, id);
      return jsonResponse({ ok: true, ...(await getSchedulePayload(context)) });
    }

    throw new HttpError(400, "action_invalid", "Nieznana akcja grafiku.");
  } catch (error) {
    return errorResponse(error);
  }
}
