CREATE TABLE IF NOT EXISTS booking_reservations (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (
    status IN (
      'pending_checkout',
      'checkout_failed',
      'expired',
      'paid',
      'paid_conflict',
      'calendar_created',
      'calendar_failed'
    )
  ),
  slot_start TEXT NOT NULL,
  slot_end TEXT NOT NULL,
  timezone TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  marketing_consent INTEGER NOT NULL DEFAULT 0,
  fbp TEXT,
  fbc TEXT,
  user_agent TEXT,
  client_ip TEXT,
  hold_expires_at TEXT NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  stripe_checkout_url TEXT,
  paid_at TEXT,
  google_event_id TEXT,
  google_meet_url TEXT,
  meta_event_id TEXT,
  meta_capi_sent_at TEXT,
  failure_reason TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_booking_reservations_active_slot
ON booking_reservations(slot_start)
WHERE status IN ('pending_checkout','paid','calendar_created','calendar_failed');

CREATE UNIQUE INDEX IF NOT EXISTS uniq_booking_reservations_stripe_session
ON booking_reservations(stripe_session_id)
WHERE stripe_session_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_booking_reservations_range
ON booking_reservations(slot_start, slot_end, status, hold_expires_at);

CREATE INDEX IF NOT EXISTS idx_booking_reservations_email
ON booking_reservations(email, created_at);

CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  stripe_created INTEGER,
  status TEXT NOT NULL CHECK (status IN ('processing','processed','failed')),
  reservation_id TEXT,
  received_at TEXT NOT NULL,
  processed_at TEXT,
  error TEXT
);

CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_status
ON stripe_webhook_events(status, received_at);
