export type BookingStatus =
  | "pending_checkout"
  | "checkout_failed"
  | "expired"
  | "paid"
  | "paid_conflict"
  | "calendar_created"
  | "calendar_failed";

export type D1Value = string | number | null | ArrayBuffer | Uint8Array;

export type D1Result<T = Record<string, unknown>> = {
  results?: T[];
  success: boolean;
  error?: string;
  meta?: { changes?: number; last_row_id?: number; [key: string]: unknown };
};

export type D1PreparedStatement = {
  bind: (...values: D1Value[]) => D1PreparedStatement;
  first: <T = Record<string, unknown>>(columnName?: string) => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<D1Result<T>>;
  run: <T = Record<string, unknown>>() => Promise<D1Result<T>>;
};

export type D1Database = {
  prepare: (query: string) => D1PreparedStatement;
  batch: <T = Record<string, unknown>>(statements: D1PreparedStatement[]) => Promise<D1Result<T>[]>;
};

export type CloudflareEnv = {
  BOOKINGS_DB?: D1Database;
  BOOKING_SITE_URL?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_PRICE_ID?: string;
  GOOGLE_CALENDAR_ID?: string;
  GOOGLE_SERVICE_ACCOUNT_JSON?: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  GOOGLE_PRIVATE_KEY?: string;
  GOOGLE_IMPERSONATED_USER_EMAIL?: string;
  GOOGLE_SEND_CALENDAR_INVITES?: string;
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_GRAPH_API_VERSION?: string;
  META_TEST_EVENT_CODE?: string;
};

export type FunctionContext = {
  request: Request;
  env: CloudflareEnv;
  waitUntil: (promise: Promise<unknown>) => void;
  params: Record<string, string | string[]>;
  data: Record<string, unknown>;
  next: () => Promise<Response>;
};

export type BusyRange = {
  start: string;
  end: string;
};

export type ReservationRow = {
  id: string;
  status: BookingStatus;
  slot_start: string;
  slot_end: string;
  timezone: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  marketing_consent: number;
  fbp: string | null;
  fbc: string | null;
  user_agent: string | null;
  client_ip: string | null;
  hold_expires_at: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_checkout_url: string | null;
  paid_at: string | null;
  google_event_id: string | null;
  google_meet_url: string | null;
  meta_event_id: string | null;
  meta_capi_sent_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
};
