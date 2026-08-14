import { BOOKING_SETTINGS, type BookingSettings } from "../../src/lib/booking-settings";
import type { BookingExtraSlotRow, BusyRange } from "./types";
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

type AvailabilityDay = {
  date: string;
  label: string;
  slots: Slot[];
};

function overlaps(start: number, end: number, ranges: BusyRange[]) {
  return ranges.some((range) => {
    const busyStart = new Date(range.start).getTime();
    const busyEnd = new Date(range.end).getTime();
    return start < busyEnd && end > busyStart;
  });
}

export function getBookingRange(settings: BookingSettings = BOOKING_SETTINGS, now = new Date()) {
  const today = localDateInTimeZone(now, settings.timezone);
  const maxDate = addDaysToLocalDate(today, settings.maxAdvanceDays);
  const rangeEnd = zonedTimeToUtc(maxDate, "23:59", settings.timezone);

  return {
    today,
    maxDate,
    timeMin: now.toISOString(),
    timeMax: rangeEnd.toISOString(),
  };
}

function addSlot(slots: Slot[], slot: Slot) {
  if (slots.some((existingSlot) => existingSlot.start === slot.start)) return;
  slots.push(slot);
}

function extraSlotToSlot(extraSlot: BookingExtraSlotRow, settings: BookingSettings) {
  const start = zonedTimeToUtc(extraSlot.date, extraSlot.start_time, settings.timezone);
  const end = zonedTimeToUtc(extraSlot.date, extraSlot.end_time, settings.timezone);

  if (end.getTime() <= start.getTime()) return null;

  return {
    date: extraSlot.date,
    start: start.toISOString(),
    end: end.toISOString(),
    timeLabel: formatTimeLabel(start.toISOString(), settings.timezone),
  };
}

export function generateSlots(
  settings: BookingSettings = BOOKING_SETTINGS,
  now = new Date(),
  extraSlots: BookingExtraSlotRow[] = [],
) {
  const today = localDateInTimeZone(now, settings.timezone);
  const slots: Slot[] = [];
  const earliestStart = now.getTime() + settings.minLeadMinutes * 60 * 1000;
  const workStart = minutesFromTime(settings.workingHours.start);
  const workEnd = minutesFromTime(settings.workingHours.end);
  const totalSlotMinutes = settings.durationMinutes + settings.bufferMinutes;

  for (let offset = 0; offset <= settings.maxAdvanceDays; offset += 1) {
    const date = addDaysToLocalDate(today, offset);
    if (!settings.workingDays.includes(weekdayIndex(date))) continue;

    for (
      let startMinute = workStart;
      startMinute + settings.durationMinutes <= workEnd;
      startMinute += settings.slotStepMinutes
    ) {
      const start = zonedTimeToUtc(date, timeFromMinutes(startMinute), settings.timezone);
      const end = new Date(start.getTime() + settings.durationMinutes * 60 * 1000);
      const blockedUntil = new Date(start.getTime() + totalSlotMinutes * 60 * 1000);

      if (start.getTime() < earliestStart) continue;
      if (blockedUntil.getTime() > zonedTimeToUtc(date, settings.workingHours.end, settings.timezone).getTime()) {
        continue;
      }

      addSlot(slots, {
        date,
        start: start.toISOString(),
        end: end.toISOString(),
        timeLabel: formatTimeLabel(start.toISOString(), settings.timezone),
      });
    }
  }

  extraSlots.forEach((extraSlot) => {
    const slot = extraSlotToSlot(extraSlot, settings);
    if (!slot) return;
    if (new Date(slot.start).getTime() < earliestStart) return;
    addSlot(slots, slot);
  });

  return slots.sort((left, right) => new Date(left.start).getTime() - new Date(right.start).getTime());
}

export function buildAvailability(
  busyRanges: BusyRange[],
  settings: BookingSettings = BOOKING_SETTINGS,
  now = new Date(),
  extraSlots: BookingExtraSlotRow[] = [],
) {
  const grouped = new Map<string, AvailabilityDay>();

  generateSlots(settings, now, extraSlots).forEach((slot) => {
    const startMs = new Date(slot.start).getTime();
    const endMs = new Date(slot.end).getTime() + settings.bufferMinutes * 60 * 1000;

    if (overlaps(startMs, endMs, busyRanges)) return;

    const day = grouped.get(slot.date) ?? {
      date: slot.date,
      label: formatDateLabel(slot.date, settings.timezone),
      slots: [],
    };
    day.slots.push(slot);
    grouped.set(slot.date, day);
  });

  return Array.from(grouped.values()).slice(0, settings.maxAdvanceDays + 1);
}

export function findGeneratedSlot(
  startIso: string,
  settings: BookingSettings = BOOKING_SETTINGS,
  now = new Date(),
  extraSlots: BookingExtraSlotRow[] = [],
) {
  return generateSlots(settings, now, extraSlots).find((slot) => slot.start === new Date(startIso).toISOString()) ?? null;
}

export function isSlotBusy(slot: Slot, ranges: BusyRange[], settings: BookingSettings = BOOKING_SETTINGS) {
  const startMs = new Date(slot.start).getTime();
  const endMs = getBlockedEndMs(slot.end, settings);
  return overlaps(startMs, endMs, ranges);
}

export function getBlockedEndIso(endIso: string, settings: BookingSettings = BOOKING_SETTINGS) {
  return new Date(getBlockedEndMs(endIso, settings)).toISOString();
}

function getBlockedEndMs(endIso: string, settings: BookingSettings) {
  return new Date(endIso).getTime() + settings.bufferMinutes * 60 * 1000;
}
