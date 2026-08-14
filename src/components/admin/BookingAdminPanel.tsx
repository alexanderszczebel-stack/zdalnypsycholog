"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  LockKeyhole,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Unlock,
  XCircle,
} from "lucide-react";

type ScheduleDraft = {
  workingDays: number[];
  workStart: string;
  workEnd: string;
  minLeadMinutes: number;
  maxAdvanceDays: number;
  slotStepMinutes: number;
};

type ScheduleResponse = {
  schedule: ScheduleDraft;
  defaults: {
    serviceName: string;
    durationMinutes: number;
    bufferMinutes: number;
    holdMinutes: number;
    priceLabel: string;
    timezone: string;
  };
  extraSlots: BookingExtraSlot[];
  blackouts: BookingBlackout[];
};

type BookingExtraSlot = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  note: string | null;
};

type BookingBlackout = {
  id: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  note: string | null;
};

type AdminReservation = {
  id: string;
  status: string;
  slot_start: string;
  slot_end: string;
  timezone: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  hold_expires_at: string;
  stripe_session_id: string | null;
  paid_at: string | null;
  google_event_id: string | null;
  google_meet_url: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
  admin_action: "released" | "cancelled" | null;
  admin_note: string | null;
  admin_updated_at: string | null;
};

type ExtraSlotForm = {
  date: string;
  startTime: string;
  endTime: string;
  note: string;
};

type BlackoutForm = {
  date: string;
  startTime: string;
  endTime: string;
  note: string;
};

const TOKEN_STORAGE_KEY = "zdalnypsycholog.bookingAdminToken";
const dayOptions = [
  { value: 1, label: "Pon" },
  { value: 2, label: "Wt" },
  { value: 3, label: "Śr" },
  { value: 4, label: "Czw" },
  { value: 5, label: "Pt" },
  { value: 6, label: "Sob" },
  { value: 0, label: "Nd" },
];

const statusLabels: Record<string, string> = {
  pending_checkout: "checkout",
  checkout_failed: "płatność nieudana",
  expired: "wygasła",
  paid: "opłacona",
  paid_conflict: "do sprawdzenia",
  calendar_created: "w kalendarzu",
  calendar_failed: "błąd kalendarza",
};

function getSavedToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? "";
}

function todayInputValue() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatDateTime(iso: string, timezone: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(iso));
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function authHeaders(token: string) {
  return {
    authorization: `Bearer ${token.trim()}`,
    "content-type": "application/json",
  };
}

function compactId(id: string) {
  return id.slice(0, 8);
}

function statusClassName(status: string, action: AdminReservation["admin_action"]) {
  if (action === "cancelled") return "bg-[#FBE8E7] text-[#8E2C24]";
  if (action === "released") return "bg-[#E8F3EE] text-[#216044]";
  if (status === "calendar_created") return "bg-[#E8F3EE] text-[#216044]";
  if (status === "paid_conflict" || status === "calendar_failed") return "bg-[#FFF2D7] text-[#865D13]";
  if (status === "pending_checkout") return "bg-[#E9EEF6] text-[#1F314D]";
  return "bg-[#F1ECE6] text-[#6F6860]";
}

export default function BookingAdminPanel() {
  const initialDate = useMemo(() => todayInputValue(), []);
  const [token, setToken] = useState(getSavedToken);
  const [tokenInput, setTokenInput] = useState(getSavedToken);
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [scheduleData, setScheduleData] = useState<ScheduleResponse | null>(null);
  const [scheduleDraft, setScheduleDraft] = useState<ScheduleDraft | null>(null);
  const [extraSlotForm, setExtraSlotForm] = useState<ExtraSlotForm>({
    date: initialDate,
    startTime: "18:00",
    endTime: "18:50",
    note: "",
  });
  const [blackoutForm, setBlackoutForm] = useState<BlackoutForm>({
    date: initialDate,
    startTime: "",
    endTime: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isAuthorized = Boolean(token.trim());

  const applyScheduleData = useCallback((data: ScheduleResponse) => {
    setScheduleData(data);
    setScheduleDraft(data.schedule);
  }, []);

  const refresh = useCallback(async () => {
    const currentToken = token.trim();
    if (!currentToken) return;

    setLoading(true);
    setError("");

    try {
      const headers = authHeaders(currentToken);
      const [bookingsResponse, scheduleResponse] = await Promise.all([
        fetch("/api/admin/bookings?limit=80", { headers, cache: "no-store" }),
        fetch("/api/admin/schedule", { headers, cache: "no-store" }),
      ]);

      const bookingsJson = (await bookingsResponse.json()) as {
        reservations?: AdminReservation[];
        message?: string;
      };
      const scheduleJson = (await scheduleResponse.json()) as ScheduleResponse & { message?: string };

      if (!bookingsResponse.ok) {
        throw new Error(bookingsJson.message || "Nie udało się pobrać rezerwacji.");
      }

      if (!scheduleResponse.ok) {
        throw new Error(scheduleJson.message || "Nie udało się pobrać grafiku.");
      }

      setReservations(bookingsJson.reservations ?? []);
      applyScheduleData(scheduleJson);
      setMessage("Dane odświeżone.");
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Nie udało się odświeżyć panelu.");
    } finally {
      setLoading(false);
    }
  }, [applyScheduleData, token]);

  useEffect(() => {
    if (!token) return;
    const timeout = window.setTimeout(() => {
      void refresh();
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [refresh, token]);

  const saveToken = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedToken = tokenInput.trim();
    if (!normalizedToken) {
      setError("Wklej token panelu admina.");
      return;
    }

    window.localStorage.setItem(TOKEN_STORAGE_KEY, normalizedToken);
    setToken(normalizedToken);
    setMessage("Token zapisany w tej przeglądarce.");
    setError("");
  };

  const clearToken = () => {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken("");
    setTokenInput("");
    setReservations([]);
    setScheduleData(null);
    setScheduleDraft(null);
    setMessage("Token usunięty z tej przeglądarki.");
  };

  const mutateSchedule = async (payload: Record<string, unknown>, successMessage: string) => {
    const currentToken = token.trim();
    if (!currentToken) return;

    setSaving(String(payload.action ?? "schedule"));
    setError("");

    try {
      const response = await fetch("/api/admin/schedule", {
        method: "POST",
        headers: authHeaders(currentToken),
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as ScheduleResponse & { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Nie udało się zapisać zmian grafiku.");
      }

      applyScheduleData(data);
      setMessage(successMessage);
      await refresh();
    } catch (mutationError) {
      setError(mutationError instanceof Error ? mutationError.message : "Nie udało się zapisać zmian.");
    } finally {
      setSaving("");
    }
  };

  const saveSchedule = () => {
    if (!scheduleDraft) return;
    void mutateSchedule(
      {
        action: "update_schedule",
        schedule: scheduleDraft,
      },
      "Grafik zapisany.",
    );
  };

  const addExtraSlot = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void mutateSchedule(
      {
        action: "add_extra_slot",
        date: extraSlotForm.date,
        start_time: extraSlotForm.startTime,
        end_time: extraSlotForm.endTime,
        note: extraSlotForm.note,
      },
      "Dodatkowy termin dodany.",
    );
  };

  const addBlackout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void mutateSchedule(
      {
        action: "add_blackout",
        date: blackoutForm.date,
        start_time: blackoutForm.startTime,
        end_time: blackoutForm.endTime,
        note: blackoutForm.note,
      },
      "Blokada dodana.",
    );
  };

  const updateBooking = async (reservation: AdminReservation, action: "release" | "cancel") => {
    const currentToken = token.trim();
    if (!currentToken) return;

    const defaultNote =
      action === "cancel"
        ? "Rezerwacja anulowana ręcznie w panelu admina."
        : "Termin zwolniony ręcznie w panelu admina.";
    const note = window.prompt("Notatka do tej akcji", defaultNote);
    if (note === null) return;

    setSaving(`${action}:${reservation.id}`);
    setError("");

    try {
      const response = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: authHeaders(currentToken),
        body: JSON.stringify({
          action,
          reservation_id: reservation.id,
          note,
        }),
      });
      const data = (await response.json()) as { message?: string; calendar_delete_error?: string | null };

      if (!response.ok) {
        throw new Error(data.message || "Nie udało się zmienić rezerwacji.");
      }

      setMessage(
        data.calendar_delete_error
          ? `Rezerwacja zmieniona. Google Calendar: ${data.calendar_delete_error}`
          : action === "cancel"
            ? "Rezerwacja anulowana."
            : "Termin zwolniony.",
      );
      await refresh();
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "Nie udało się zmienić rezerwacji.");
    } finally {
      setSaving("");
    }
  };

  const toggleWorkingDay = (day: number) => {
    if (!scheduleDraft) return;
    const nextDays = scheduleDraft.workingDays.includes(day)
      ? scheduleDraft.workingDays.filter((workingDay) => workingDay !== day)
      : [...scheduleDraft.workingDays, day].sort((left, right) => left - right);

    setScheduleDraft({ ...scheduleDraft, workingDays: nextDays });
  };

  const recentReservations = reservations.slice(0, 40);

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-4 py-6 text-[#2D2926] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-[rgba(45,41,38,0.10)] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">Panel rezerwacji</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-4xl">
              Grafik i rezerwacje
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={!isAuthorized || loading}
              className="btn-secondary px-4 py-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <RefreshCw size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{loading ? "Odświeżanie..." : "Odśwież"}</span>
            </button>
            {isAuthorized ? (
              <button type="button" onClick={clearToken} className="btn-secondary px-4 py-2">
                <LockKeyhole size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>Wyloguj</span>
              </button>
            ) : null}
          </div>
        </header>

        <form
          onSubmit={saveToken}
          className="mt-6 grid gap-3 rounded-2xl bg-white p-4 shadow-card md:grid-cols-[1fr_auto]"
          style={{ border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
            Token dostępu
            <input
              className="input-field"
              type="password"
              autoComplete="current-password"
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="Wklej token admina"
            />
          </label>
          <button type="submit" className="btn-primary self-end px-5 py-3">
            <Unlock size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>Zapisz token</span>
          </button>
        </form>

        {(message || error) && (
          <div
            className={`mt-4 rounded-2xl p-4 text-sm font-semibold ${
              error ? "bg-[#FBE8E7] text-[#8E2C24]" : "bg-[#E8F3EE] text-[#216044]"
            }`}
          >
            {error || message}
          </div>
        )}

        {scheduleDraft && scheduleData ? (
          <section className="mt-6 grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
            <div className="grid gap-5">
              <div
                className="rounded-2xl bg-white p-5 shadow-card"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">Grafik</p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-[#1F314D]">Stałe godziny</h2>
                  </div>
                  <Clock size={22} strokeWidth={1.8} className="text-[#BC6C25]" aria-hidden="true" />
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-4 gap-2">
                    {dayOptions.map((day) => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => toggleWorkingDay(day.value)}
                        className={`min-h-11 rounded-xl border text-sm font-semibold transition-colors ${
                          scheduleDraft.workingDays.includes(day.value)
                            ? "border-[#1F314D] bg-[#1F314D] text-white"
                            : "border-[rgba(45,41,38,0.10)] bg-[#FDFBF7] text-[#6F6860]"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                      Start
                      <input
                        className="input-field"
                        type="time"
                        value={scheduleDraft.workStart}
                        onChange={(event) => setScheduleDraft({ ...scheduleDraft, workStart: event.target.value })}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                      Koniec
                      <input
                        className="input-field"
                        type="time"
                        value={scheduleDraft.workEnd}
                        onChange={(event) => setScheduleDraft({ ...scheduleDraft, workEnd: event.target.value })}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                      Lead min
                      <input
                        className="input-field"
                        type="number"
                        min={0}
                        value={scheduleDraft.minLeadMinutes}
                        onChange={(event) =>
                          setScheduleDraft({ ...scheduleDraft, minLeadMinutes: Number(event.target.value) })
                        }
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                      Dni
                      <input
                        className="input-field"
                        type="number"
                        min={1}
                        value={scheduleDraft.maxAdvanceDays}
                        onChange={(event) =>
                          setScheduleDraft({ ...scheduleDraft, maxAdvanceDays: Number(event.target.value) })
                        }
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                      Krok
                      <input
                        className="input-field"
                        type="number"
                        min={10}
                        value={scheduleDraft.slotStepMinutes}
                        onChange={(event) =>
                          setScheduleDraft({ ...scheduleDraft, slotStepMinutes: Number(event.target.value) })
                        }
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={saveSchedule}
                    disabled={Boolean(saving)}
                    className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60"
                  >
                    <Save size={17} strokeWidth={1.8} aria-hidden="true" />
                    <span>Zapisz grafik</span>
                  </button>
                </div>
              </div>

              <div
                className="rounded-2xl bg-white p-5 shadow-card"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">Wyjątki</p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-[#1F314D]">Dodatkowy termin</h2>
                  </div>
                  <CalendarDays size={22} strokeWidth={1.8} className="text-[#BC6C25]" aria-hidden="true" />
                </div>

                <form onSubmit={addExtraSlot} className="grid gap-3">
                  <input
                    className="input-field"
                    type="date"
                    value={extraSlotForm.date}
                    onChange={(event) => setExtraSlotForm({ ...extraSlotForm, date: event.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="input-field"
                      type="time"
                      value={extraSlotForm.startTime}
                      onChange={(event) => setExtraSlotForm({ ...extraSlotForm, startTime: event.target.value })}
                      required
                    />
                    <input
                      className="input-field"
                      type="time"
                      value={extraSlotForm.endTime}
                      onChange={(event) => setExtraSlotForm({ ...extraSlotForm, endTime: event.target.value })}
                      required
                    />
                  </div>
                  <input
                    className="input-field"
                    value={extraSlotForm.note}
                    onChange={(event) => setExtraSlotForm({ ...extraSlotForm, note: event.target.value })}
                    placeholder="Notatka"
                  />
                  <button type="submit" className="btn-primary w-full" disabled={Boolean(saving)}>
                    <Plus size={17} strokeWidth={1.8} aria-hidden="true" />
                    <span>Dodaj termin</span>
                  </button>
                </form>
              </div>

              <div
                className="rounded-2xl bg-white p-5 shadow-card"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">Blokady</p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-[#1F314D]">Niedostępność</h2>
                  </div>
                  <XCircle size={22} strokeWidth={1.8} className="text-[#BC6C25]" aria-hidden="true" />
                </div>

                <form onSubmit={addBlackout} className="grid gap-3">
                  <input
                    className="input-field"
                    type="date"
                    value={blackoutForm.date}
                    onChange={(event) => setBlackoutForm({ ...blackoutForm, date: event.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="input-field"
                      type="time"
                      value={blackoutForm.startTime}
                      onChange={(event) => setBlackoutForm({ ...blackoutForm, startTime: event.target.value })}
                    />
                    <input
                      className="input-field"
                      type="time"
                      value={blackoutForm.endTime}
                      onChange={(event) => setBlackoutForm({ ...blackoutForm, endTime: event.target.value })}
                    />
                  </div>
                  <input
                    className="input-field"
                    value={blackoutForm.note}
                    onChange={(event) => setBlackoutForm({ ...blackoutForm, note: event.target.value })}
                    placeholder="Notatka"
                  />
                  <button type="submit" className="btn-secondary w-full" disabled={Boolean(saving)}>
                    <Plus size={17} strokeWidth={1.8} aria-hidden="true" />
                    <span>Dodaj blokadę</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="grid gap-5">
              <div
                className="rounded-2xl bg-white p-5 shadow-card"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25]">Rezerwacje</p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-[#1F314D]">
                      Ostatnie {recentReservations.length}
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#F6EFE6] px-3 py-1 text-xs font-semibold text-[#6F6860]">
                    {scheduleData.defaults.priceLabel}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-separate border-spacing-y-2 text-left text-sm">
                    <thead className="text-xs uppercase tracking-widest text-[#9A8E85]">
                      <tr>
                        <th className="px-3 py-2">Termin</th>
                        <th className="px-3 py-2">Pacjent</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Kontakt</th>
                        <th className="px-3 py-2">Akcje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReservations.map((reservation) => {
                        const canRelease = reservation.admin_action !== "released";
                        const canCancel = reservation.admin_action !== "cancelled";
                        return (
                          <tr key={reservation.id} className="bg-[#FDFBF7] align-top">
                            <td className="rounded-l-2xl px-3 py-3">
                              <p className="font-semibold text-[#1F314D]">
                                {formatDateTime(reservation.slot_start, reservation.timezone)}
                              </p>
                              <p className="mt-1 text-xs text-[#9A8E85]">ID {compactId(reservation.id)}</p>
                            </td>
                            <td className="px-3 py-3">
                              <p className="font-semibold text-[#1F314D]">
                                {reservation.first_name} {reservation.last_name}
                              </p>
                              <p className="mt-1 text-xs text-[#6F6860]">{reservation.email}</p>
                            </td>
                            <td className="px-3 py-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName(
                                  reservation.status,
                                  reservation.admin_action,
                                )}`}
                              >
                                {reservation.admin_action === "cancelled"
                                  ? "anulowana"
                                  : reservation.admin_action === "released"
                                    ? "zwolniona"
                                    : statusLabels[reservation.status] ?? reservation.status}
                              </span>
                              {reservation.failure_reason ? (
                                <p className="mt-2 max-w-72 text-xs leading-relaxed text-[#6F6860]">
                                  {reservation.failure_reason}
                                </p>
                              ) : null}
                            </td>
                            <td className="px-3 py-3">
                              <p className="text-xs text-[#6F6860]">{reservation.phone || "brak telefonu"}</p>
                              <p className="mt-1 text-xs text-[#9A8E85]">
                                {reservation.google_event_id ? "Google event zapisany" : "bez eventu"}
                              </p>
                            </td>
                            <td className="rounded-r-2xl px-3 py-3">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => void updateBooking(reservation, "release")}
                                  disabled={!canRelease || Boolean(saving)}
                                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[rgba(31,49,77,0.18)] px-3 text-xs font-semibold text-[#1F314D] disabled:pointer-events-none disabled:opacity-40"
                                >
                                  <Unlock size={14} strokeWidth={1.8} aria-hidden="true" />
                                  <span>Zwolnij</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => void updateBooking(reservation, "cancel")}
                                  disabled={!canCancel || Boolean(saving)}
                                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#FBE8E7] px-3 text-xs font-semibold text-[#8E2C24] disabled:pointer-events-none disabled:opacity-40"
                                >
                                  <XCircle size={14} strokeWidth={1.8} aria-hidden="true" />
                                  <span>Anuluj</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div
                  className="rounded-2xl bg-white p-5 shadow-card"
                  style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                >
                  <h2 className="font-display text-xl font-semibold text-[#1F314D]">Dodatkowe terminy</h2>
                  <div className="mt-4 grid gap-2">
                    {scheduleData.extraSlots.length ? (
                      scheduleData.extraSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#FDFBF7] p-3">
                          <div>
                            <p className="font-semibold text-[#1F314D]">
                              {formatDate(slot.date)}, {slot.start_time}-{slot.end_time}
                            </p>
                            {slot.note ? <p className="text-xs text-[#6F6860]">{slot.note}</p> : null}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              void mutateSchedule(
                                { action: "delete_extra_slot", id: slot.id },
                                "Dodatkowy termin usunięty.",
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-[#8E2C24] hover:bg-[#FBE8E7]"
                            aria-label="Usuń dodatkowy termin"
                          >
                            <Trash2 size={16} strokeWidth={1.8} aria-hidden="true" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="rounded-xl bg-[#FDFBF7] p-3 text-sm text-[#6F6860]">Brak dodatkowych terminów.</p>
                    )}
                  </div>
                </div>

                <div
                  className="rounded-2xl bg-white p-5 shadow-card"
                  style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                >
                  <h2 className="font-display text-xl font-semibold text-[#1F314D]">Blokady</h2>
                  <div className="mt-4 grid gap-2">
                    {scheduleData.blackouts.length ? (
                      scheduleData.blackouts.map((blackout) => (
                        <div key={blackout.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#FDFBF7] p-3">
                          <div>
                            <p className="font-semibold text-[#1F314D]">
                              {formatDate(blackout.date)}
                              {blackout.start_time && blackout.end_time
                                ? `, ${blackout.start_time}-${blackout.end_time}`
                                : ", cały dzień"}
                            </p>
                            {blackout.note ? <p className="text-xs text-[#6F6860]">{blackout.note}</p> : null}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              void mutateSchedule(
                                { action: "delete_blackout", id: blackout.id },
                                "Blokada usunięta.",
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-[#8E2C24] hover:bg-[#FBE8E7]"
                            aria-label="Usuń blokadę"
                          >
                            <Trash2 size={16} strokeWidth={1.8} aria-hidden="true" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="rounded-xl bg-[#FDFBF7] p-3 text-sm text-[#6F6860]">Brak blokad.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div
            className="mt-6 rounded-2xl bg-white p-8 text-center shadow-card"
            style={{ border: "1px solid rgba(45,41,38,0.08)" }}
          >
            <LockKeyhole size={28} strokeWidth={1.8} className="mx-auto text-[#BC6C25]" aria-hidden="true" />
            <p className="mt-4 font-semibold text-[#1F314D]">Wklej token, żeby załadować panel.</p>
          </div>
        )}
      </div>
    </div>
  );
}
