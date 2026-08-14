"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, CreditCard, RefreshCw, UserRound } from "lucide-react";
import { BOOKING_SETTINGS } from "@/lib/booking-settings";
import { trackEvent } from "@/lib/analytics";

type AvailabilitySlot = {
  date: string;
  start: string;
  end: string;
  timeLabel: string;
};

type AvailabilityDay = {
  date: string;
  label: string;
  slots: AvailabilitySlot[];
};

type AvailabilityResponse = {
  config: {
    serviceName: string;
    timezone: string;
    durationMinutes: number;
    priceLabel: string;
    priceValue: number;
    currency: string;
    holdMinutes: number;
  };
  days: AvailabilityDay[];
};

type ClientDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const emptyDetails: ClientDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  return document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=") ?? "";
}

function hasMarketingConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("cookie-consent") === "accepted";
}

function formatSummaryDate(startIso: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: BOOKING_SETTINGS.timezone,
  }).format(new Date(startIso));
}

function StepBadge({
  active,
  complete,
  label,
  number,
}: {
  active: boolean;
  complete: boolean;
  label: string;
  number: number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          complete || active ? "bg-[#1F314D] text-white" : "bg-[#F6EFE6] text-[#6F6860]"
        }`}
      >
        {complete ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : number}
      </span>
      <span className={`truncate text-sm font-semibold ${active ? "text-[#1F314D]" : "text-[#6F6860]"}`}>
        {label}
      </span>
    </div>
  );
}

export default function ReservationFlow() {
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStart, setSelectedStart] = useState("");
  const [details, setDetails] = useState<ClientDetails>(emptyDetails);

  const selectedDay = useMemo(
    () => availability?.days.find((day) => day.date === selectedDate) ?? null,
    [availability, selectedDate],
  );
  const selectedSlot = useMemo(
    () => selectedDay?.slots.find((slot) => slot.start === selectedStart) ?? null,
    [selectedDay, selectedStart],
  );
  const detailsComplete = Boolean(details.firstName.trim() && details.lastName.trim() && details.email.trim());
  const currentStep = selectedSlot && detailsComplete ? 4 : selectedSlot ? 3 : selectedDate ? 2 : 1;

  const fetchAvailability = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/booking/availability", { cache: "no-store" });
      const data = (await response.json()) as AvailabilityResponse & { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Nie udało się pobrać dostępnych terminów.");
      }

      setAvailability(data);
      setSelectedDate((currentDate) => {
        if (currentDate && data.days.some((day) => day.date === currentDate)) return currentDate;
        return data.days[0]?.date ?? "";
      });
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Nie udało się pobrać terminów.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    trackEvent("rozpoczecie_rezerwacji", {
      event_category: "booking",
      event_label: "custom_booking_flow",
    });
    const timeout = window.setTimeout(() => {
      void fetchAvailability();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedStart("");
    trackEvent("wybor_dnia_rezerwacji", {
      event_category: "booking",
      event_label: date,
    });
  };

  const handleSlotSelect = (slot: AvailabilitySlot) => {
    setSelectedStart(slot.start);
    trackEvent("wybor_terminu_rezerwacji", {
      event_category: "booking",
      event_label: slot.start,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!selectedSlot) {
      setError("Wybierz dostępny termin konsultacji.");
      return;
    }

    if (!detailsComplete) {
      setError("Podaj imię, nazwisko i adres e-mail.");
      return;
    }

    setSubmitting(true);
    trackEvent("rozpoczecie_checkoutu", {
      currency: BOOKING_SETTINGS.currency,
      event_category: "booking",
      event_label: selectedSlot.start,
      value: BOOKING_SETTINGS.priceValue,
    });

    try {
      const response = await fetch("/api/booking/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          start_datetime: selectedSlot.start,
          first_name: details.firstName,
          last_name: details.lastName,
          email: details.email,
          phone: details.phone || null,
          marketing_consent: hasMarketingConsent(),
          fbp: decodeURIComponent(getCookie("_fbp")),
          fbc: decodeURIComponent(getCookie("_fbc")),
        }),
      });
      const data = (await response.json()) as { checkout_url?: string; message?: string };

      if (!response.ok || !data.checkout_url) {
        throw new Error(data.message || "Nie udało się rozpocząć płatności.");
      }

      window.location.assign(data.checkout_url);
    } catch (submitError) {
      setSubmitting(false);
      setError(submitError instanceof Error ? submitError.message : "Nie udało się rozpocząć płatności.");
      void fetchAvailability();
    }
  };

  return (
    <section id="system-rezerwacji" className="scroll-mt-24 bg-white px-3 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-[1.5rem] bg-[#F6EFE6] p-3 sm:rounded-[2rem] sm:p-6 md:p-8"
          style={{ border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <div className="mb-6 grid gap-3 md:grid-cols-4">
            <StepBadge active={currentStep === 1} complete={currentStep > 1} label="Dzień" number={1} />
            <StepBadge active={currentStep === 2} complete={currentStep > 2} label="Godzina" number={2} />
            <StepBadge active={currentStep === 3} complete={currentStep > 3} label="Dane" number={3} />
            <StepBadge active={currentStep === 4} complete={false} label="Płatność" number={4} />
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="rounded-[1.25rem] bg-white p-5" style={{ border: "1px solid rgba(45,41,38,0.08)" }}>
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="section-label mb-2">Krok 1</p>
                  <h2 className="text-2xl font-bold leading-tight text-[#1F314D]">Wybierz dzień</h2>
                </div>
                <button
                  type="button"
                  onClick={fetchAvailability}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#1F314D] transition-colors hover:bg-[#F6EFE6]"
                  aria-label="Odśwież terminy"
                >
                  <RefreshCw size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>

              {loading ? (
                <div className="grid gap-3">
                  {[0, 1, 2].map((item) => (
                    <div key={item} className="h-16 animate-pulse rounded-2xl bg-[#F6EFE6]" />
                  ))}
                </div>
              ) : availability?.days.length ? (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {availability.days.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => handleDateSelect(day.date)}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        selectedDate === day.date
                          ? "border-[#1F314D] bg-[#1F314D] text-white"
                          : "border-[rgba(45,41,38,0.08)] bg-[#FDFBF7] text-[#1F314D] hover:border-[#BC6C25]"
                      }`}
                    >
                      <span className="block font-display text-base font-semibold">{day.label}</span>
                      <span className={selectedDate === day.date ? "text-sm text-white/72" : "text-sm text-[#6F6860]"}>
                        {day.slots.length} terminów
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl bg-[#FDFBF7] p-4 text-sm leading-relaxed text-[#6F6860]">
                  Brak dostępnych terminów w najbliższym okresie.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="rounded-[1.25rem] bg-white p-5" style={{ border: "1px solid rgba(45,41,38,0.08)" }}>
                <p className="section-label mb-2">Krok 2</p>
                <h2 className="text-2xl font-bold leading-tight text-[#1F314D]">Wybierz godzinę</h2>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {selectedDay?.slots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`min-h-12 rounded-2xl border px-3 py-2 font-display text-sm font-semibold transition-all ${
                        selectedStart === slot.start
                          ? "border-[#BC6C25] bg-[#BC6C25] text-white"
                          : "border-[rgba(45,41,38,0.08)] bg-[#FDFBF7] text-[#1F314D] hover:border-[#BC6C25]"
                      }`}
                    >
                      {slot.timeLabel}
                    </button>
                  ))}
                </div>
                {!selectedDay && (
                  <p className="mt-4 text-sm text-[#6F6860]">Najpierw wybierz dzień.</p>
                )}
              </div>

              <div className="rounded-[1.25rem] bg-white p-5" style={{ border: "1px solid rgba(45,41,38,0.08)" }}>
                <p className="section-label mb-2">Krok 3</p>
                <h2 className="text-2xl font-bold leading-tight text-[#1F314D]">Podaj dane</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                    Imię
                    <input
                      className="input-field"
                      autoComplete="given-name"
                      value={details.firstName}
                      onChange={(event) => setDetails({ ...details, firstName: event.target.value })}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                    Nazwisko
                    <input
                      className="input-field"
                      autoComplete="family-name"
                      value={details.lastName}
                      onChange={(event) => setDetails({ ...details, lastName: event.target.value })}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                    E-mail
                    <input
                      className="input-field"
                      autoComplete="email"
                      inputMode="email"
                      type="email"
                      value={details.email}
                      onChange={(event) => setDetails({ ...details, email: event.target.value })}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[#1F314D]">
                    Telefon opcjonalnie
                    <input
                      className="input-field"
                      autoComplete="tel"
                      inputMode="tel"
                      value={details.phone}
                      onChange={(event) => setDetails({ ...details, phone: event.target.value })}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-[#1F314D] p-5 text-white">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#E8D8C4]">Krok 4</p>
                <h2 className="font-display text-2xl font-semibold leading-tight text-white">
                  Podsumowanie
                </h2>
                <div className="mt-5 grid gap-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CalendarDays size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span>{selectedSlot ? formatSummaryDate(selectedSlot.start) : "Wybierz termin"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserRound size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span>{BOOKING_SETTINGS.durationMinutes} minut online</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span>{BOOKING_SETTINGS.priceLabel}</span>
                  </div>
                </div>

                {error && (
                  <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!selectedSlot || !detailsComplete || submitting}
                  className="btn-primary mt-6 w-full disabled:pointer-events-none disabled:opacity-60"
                >
                  <CreditCard size={18} strokeWidth={1.8} aria-hidden="true" />
                  <span>{submitting ? "Przekierowujemy do płatności..." : "Przejdź do płatności"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
