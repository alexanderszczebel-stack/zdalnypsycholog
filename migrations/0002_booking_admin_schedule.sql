CREATE TABLE IF NOT EXISTS booking_schedule_config (
  id TEXT PRIMARY KEY CHECK (id = 'default'),
  working_days TEXT NOT NULL DEFAULT '[1,2,3,4,5]',
  work_start TEXT NOT NULL DEFAULT '10:00',
  work_end TEXT NOT NULL DEFAULT '20:00',
  min_lead_minutes INTEGER NOT NULL DEFAULT 1440,
  max_advance_days INTEGER NOT NULL DEFAULT 30,
  slot_step_minutes INTEGER NOT NULL DEFAULT 30,
  updated_at TEXT NOT NULL
);

INSERT OR IGNORE INTO booking_schedule_config (
  id,
  working_days,
  work_start,
  work_end,
  min_lead_minutes,
  max_advance_days,
  slot_step_minutes,
  updated_at
)
VALUES (
  'default',
  '[1,2,3,4,5]',
  '10:00',
  '20:00',
  1440,
  30,
  30,
  '2026-08-14T00:00:00.000Z'
);

CREATE TABLE IF NOT EXISTS booking_extra_slots (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_booking_extra_slots_date
ON booking_extra_slots(date);

CREATE TABLE IF NOT EXISTS booking_blackouts (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  start_time TEXT,
  end_time TEXT,
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_booking_blackouts_date
ON booking_blackouts(date);

CREATE TABLE IF NOT EXISTS booking_reservation_overrides (
  reservation_id TEXT PRIMARY KEY,
  action TEXT NOT NULL CHECK (action IN ('released','cancelled')),
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_booking_reservation_overrides_action
ON booking_reservation_overrides(action, updated_at);
