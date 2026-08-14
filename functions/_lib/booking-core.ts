import { BOOKING_SETTINGS } from "../../src/lib/booking-settings";
import type { BusyRange } from "./types";
import {
  addDaysToLocalDate,
  formatDateLabel,
  formatTimeLabel,
  localDateInTimeZone,
  minutesFromTime,
  timeFromMinutes,
  weekdayIndex,
  zonedTimeToUtc,
} from "./time";

type Slot = {
  date: string;
  start: string;
  end: string;
  timeLabel: string;
};

function overlaps(start: number, end: number, ranges: BusyRange[]) {
  return ranges.some((range) => {
    const busyStart = new Date(range.start).getTime();
    const busyEnd = new Date(range.end).getTime();
    return start < busyEnd && end > busyStart;
  });
}

export function getBookingRange(now = new Date()) {
  const today = localDateInTimeZone(now, BOOKING_SETTINGS.timezone);
  const maxDate = addDaysToLocalDate(today, BOOKING_SETTINGS.maxAdvanceDays);
  const rangeEnd = zonedTimeToUtc(maxDate, "23:59", BOOKING_SETTINGS.timezone);

  return {
    today,
    timeMin: now.toISOString(),
    timeMax: rangeEnd.toISOString(),
  };
}

export function generateSlots(now = new Date()) {
  const today = localDateInTimeZone(now, BOOKING_SETTINGS.timezone);
  const slots: Slot[] = [];
  const earliestStart = now.getTime() + BOOKING_SETTINGS.minLeadMinutes * 60 * 1000;
  const workStart = minutesFromTime(BOOKING_SETTINGS.workingHours.start);
  const workEnd = minutesFromTime(BOOKING_SETTINGS.workingHours.end);
  const totalSlotMinutes = BOOKING_SETTINGS.durationMinutes + BOOKING_SETTINGS.bufferMinutes;

  for (let offset = 0; offset <= BOOKING_SETTINGS.maxAdvanceDays; offset += 1) {
    const date = addDaysToLocalDate(today, offset);
    if (!(BOOKING_SETTINGS.workingDays as readonly number[]).includes(weekdayIndex(date))) continue;

    for (
      let startMinute = workStart;
      startMinute + BOOKING_SETTINGS.durationMinutes <= workEnd;
      startMinute += BOOKING_SETTINGS.slotStepMinutes
    ) {
      const start = zonedTimeToUtc(date, timeFromMinutes(startMinute), BOOKING_SETTINGS.timezone);
      const end = new Date(start.getTime() + BOOKING_SETTINGS.durationMinutes * 60 * 1000);
      const blockedUntil = new Date(start.getTime() + totalSlotMinutes * 60 * 1000);

      if (start.getTime() < earliestStart) continue;
      if (blockedUntil.getTime() > zonedTimeToUtc(date, BOOKING_SETTINGS.workingHours.end, BOOKING_SETTINGS.timezone).getTime()) {
        continue;
      }

      slots.push({
        date,
        start: start.toISOString(),
        end: end.toISOString(),
        timeLabel: formatTimeLabel(start.toISOString(), BOOKING_SETTINGS.timezone),
      });
    }
  }

  return slots;
}

export function buildAvailability(busyRanges: BusyRange[], now = new Date()) {
  const grouped = new Map<string, { date: string; label: string; slots: Slot[] }>();

  generateSlots(now).forEach((slot) => {
    const startMs = new Date(slot.start).getTime();
    const endMs = new Date(slot.end).getTime() + BOOKING_SETTINGS.bufferMinutes * 60 * 1000;

    if (overlaps(startMs, endMs, busyRanges)) return;

    const day = grouped.get(slot.date) ?? {
      date: slot.date,
      label: formatDateLabel(slot.date, BOOKING_SETTINGS.timezone),
      slots: [],
    };
    day.slots.push(slot);
    grouped.set(slot.date, day);
  });

  return Array.from(grouped.values()).slice(0, BOOKING_SETTINGS.maxAdvanceDays + 1);
}

export function findGeneratedSlot(startIso: string, now = new Date()) {
  return generateSlots(now).find((slot) => slot.start === new Date(startIso).toISOString()) ?? null;
}

export function isSlotBusy(slot: Slot, ranges: BusyRange[]) {
  const startMs = new Date(slot.start).getTime();
  const endMs = getBlockedEndMs(slot.end);
  return overlaps(startMs, endMs, ranges);
}

export function getBlockedEndIso(endIso: string) {
  return new Date(getBlockedEndMs(endIso)).toISOString();
}

function getBlockedEndMs(endIso: string) {
  return new Date(endIso).getTime() + BOOKING_SETTINGS.bufferMinutes * 60 * 1000;
}
