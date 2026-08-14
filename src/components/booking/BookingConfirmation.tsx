"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalendarCheck, Clock, MailCheck, Video } from "lucide-react";
import { trackMetaPurchase } from "@/lib/analytics";

type BookingStatus = {
  reservation_id: string;
  status: string;
  is_paid: boolean;
  is_finalized: boolean;
  needs_manual_confirmation: boolean;
  service_name: string;
  duration_minutes: number;
  price_label: string;
  timezone: string;
  date: string;
  start_datetime: string;
  end_datetime: string;
  start_time_label: string;
  end_time_label: string;
  google_meet_url: string | null;
  meta_event_id: string | null;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("reservation_id") ?? "";
  const [status, setStatus] = useState<BookingStatus | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(reservationId));
  const missingReservation = !reservationId;
  const visibleError = missingReservation ? "Brakuje identyfikatora rezerwacji." : error;

  const shouldPoll = useMemo(() => {
    if (!status) return Boolean(reservationId) && !visibleError;
    return status.status === "pending_checkout" || status.status === "paid";
  }, [reservationId, status, visibleError]);

  useEffect(() => {
    if (!reservationId) return;

    let cancelled = false;

    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `/api/booking/status?reservation_id=${encodeURIComponent(reservationId)}`,
          { cache: "no-store" },
        );
        const data = (await response.json()) as BookingStatus & { message?: string };

        if (!response.ok) {
          throw new Error(data.message || "Nie udało się pobrać statusu rezerwacji.");
        }

        if (!cancelled) {
          setStatus(data);
          setError("");
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : "Nie udało się pobrać statusu.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchStatus();
    const interval = window.setInterval(() => {
      if (shouldPoll) void fetchStatus();
    }, 3500);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [reservationId, shouldPoll]);

  useEffect(() => {
    if (!status?.is_paid || !status.meta_event_id) return;

    const storageKey = `meta_purchase_${status.meta_event_id}`;
    if (window.localStorage.getItem(storageKey)) return;

    trackMetaPurchase(status.meta_event_id);
    window.localStorage.setItem(storageKey, "sent");
  }, [status]);

  const isFinalized = status?.is_finalized;
  const isPaidButProcessing = status?.is_paid && !status.is_finalized && !status.needs_manual_confirmation;
  const isManual = status?.needs_manual_confirmation;

  return (
    <section className="bg-[#FDFBF7] px-5 pb-16 pt-[92px] md:pb-24 md:pt-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-semibold text-[#6F6860] hover:text-[#1F314D]"
        >
          Strona główna
        </Link>

        <div
          className="rounded-[2rem] bg-white p-6 md:p-8"
          style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 18px 48px rgba(31,49,77,0.08)" }}
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
            <CalendarCheck size={28} strokeWidth={1.8} aria-hidden="true" />
          </div>

          {loading && (
            <>
              <p className="section-label mb-3">Rezerwacja</p>
              <h1 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-5xl">
                Finalizujemy Twoją rezerwację...
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#6F6860]">
                Potwierdzenie płatności może potrwać chwilę. Status odświeża się automatycznie.
              </p>
            </>
          )}

          {!loading && visibleError && (
            <>
              <p className="section-label mb-3">Status</p>
              <h1 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-5xl">
                Nie znaleźliśmy opłaconej rezerwacji
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#6F6860]">{visibleError}</p>
              <Link href="/rezerwacja" className="btn-primary mt-6">
                Wróć do rezerwacji
              </Link>
            </>
          )}

          {!loading && status && !visibleError && (
            <>
              <p className="section-label mb-3">Potwierdzenie</p>
              <h1 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-5xl">
                {status.is_paid ? "Wizyta została opłacona" : "Finalizujemy Twoją rezerwację..."}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#6F6860]">
                {isFinalized
                  ? "Termin został zapisany w kalendarzu. Potwierdzenie powinno przyjść na e-mail."
                  : isManual
                    ? "Płatność jest potwierdzona, ale termin wymaga ręcznego dokończenia po stronie organizacyjnej."
                    : isPaidButProcessing
                      ? "Płatność jest potwierdzona. Tworzymy wydarzenie i link Google Meet."
                      : "Czekamy na potwierdzenie płatności ze Stripe."}
              </p>

              <div className="mt-8 grid gap-3">
                <div className="flex gap-3 rounded-2xl bg-[#FDFBF7] p-4">
                  <Clock size={20} strokeWidth={1.8} className="mt-0.5 text-[#BC6C25]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#1F314D]">{formatDate(status.date)}</p>
                    <p className="text-sm text-[#6F6860]">
                      {status.start_time_label} - {status.end_time_label}, {status.timezone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl bg-[#FDFBF7] p-4">
                  <MailCheck size={20} strokeWidth={1.8} className="mt-0.5 text-[#BC6C25]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#1F314D]">{status.service_name}</p>
                    <p className="text-sm text-[#6F6860]">
                      {status.duration_minutes} minut, {status.price_label}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl bg-[#FDFBF7] p-4">
                  <Video size={20} strokeWidth={1.8} className="mt-0.5 text-[#BC6C25]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#1F314D]">Google Meet</p>
                    {status.google_meet_url ? (
                      <a
                        href={status.google_meet_url}
                        className="break-all text-sm font-semibold text-[#BC6C25] hover:text-[#1F314D]"
                      >
                        {status.google_meet_url}
                      </a>
                    ) : (
                      <p className="text-sm text-[#6F6860]">Link pojawi się po finalizacji kalendarza.</p>
                    )}
                  </div>
                </div>
              </div>

              {!isFinalized && !isManual && (
                <p className="mt-6 rounded-2xl bg-[#F6EFE6] p-4 text-sm leading-relaxed text-[#6F6860]">
                  Status odświeża się automatycznie. Nie trzeba ponownie wykonywać płatności.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
