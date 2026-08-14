type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const formatterOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
} as const;

export function pad2(value: number) {
  return String(value).padStart(2, "0");
}

export function parseLocalDate(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return null;

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

export function parseTime(time: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return { hour, minute };
}

export function minutesFromTime(time: string) {
  const parsed = parseTime(time);
  if (!parsed) return 0;

  return parsed.hour * 60 + parsed.minute;
}

export function timeFromMinutes(minutes: number) {
  return `${pad2(Math.floor(minutes / 60))}:${pad2(minutes % 60)}`;
}

export function getZonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    ...formatterOptions,
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  ) as Record<string, number>;

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour === 24 ? 0 : values.hour,
    minute: values.minute,
  };
}

export function localDateInTimeZone(date: Date, timeZone: string) {
  const parts = getZonedParts(date, timeZone);
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;
}

export function addDaysToLocalDate(date: string, days: number) {
  const parsed = parseLocalDate(date);
  if (!parsed) return date;

  const nextDate = new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day + days, 12, 0, 0));
  return `${nextDate.getUTCFullYear()}-${pad2(nextDate.getUTCMonth() + 1)}-${pad2(nextDate.getUTCDate())}`;
}

export function weekdayIndex(date: string) {
  const parsed = parseLocalDate(date);
  if (!parsed) return -1;

  return new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day, 12, 0, 0)).getUTCDay();
}

export function zonedTimeToUtc(date: string, time: string, timeZone: string) {
  const parsedDate = parseLocalDate(date);
  const parsedTime = parseTime(time);

  if (!parsedDate || !parsedTime) {
    throw new Error("Invalid local date or time");
  }

  const desiredUtc = Date.UTC(
    parsedDate.year,
    parsedDate.month - 1,
    parsedDate.day,
    parsedTime.hour,
    parsedTime.minute,
    0,
    0,
  );

  let utcGuess = desiredUtc;

  for (let index = 0; index < 3; index += 1) {
    const actual = getZonedParts(new Date(utcGuess), timeZone);
    const actualUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      0,
      0,
    );
    utcGuess += desiredUtc - actualUtc;
  }

  return new Date(utcGuess);
}

export function formatDateLabel(date: string, timeZone: string) {
  const utcDate = zonedTimeToUtc(date, "12:00", timeZone);
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone,
  }).format(utcDate);
}

export function formatTimeLabel(isoDate: string, timeZone: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date(isoDate));
}
