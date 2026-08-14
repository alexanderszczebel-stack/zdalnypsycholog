"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { CalendarDays, CreditCard, LockKeyhole } from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import {
  BOOKING_ENABLED,
  CALENDLY_EMBED_URL,
  CALENDLY_URL,
  CONTACT_EMAIL,
  THANK_YOU_BOOKING_PATH,
} from "@/lib/contact";
import { appendAllowedUtmParams } from "@/lib/utm";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        parentElement: HTMLElement;
        resize?: boolean;
        url: string;
      }) => void;
    };
  }
}

function getAllowedCalendlyOrigin() {
  const calendlyUrl = CALENDLY_EMBED_URL || CALENDLY_URL;

  if (!calendlyUrl) return "";

  try {
    return new URL(calendlyUrl).origin;
  } catch {
    return "";
  }
}

export default function CalendlyBooking() {
  const calendlyContainerRef = useRef<HTMLDivElement>(null);
  const bookingReady = BOOKING_ENABLED && Boolean(CALENDLY_URL || CALENDLY_EMBED_URL);
  const calendlyEmbedUrl = CALENDLY_EMBED_URL || CALENDLY_URL;

  const initializeCalendly = useCallback(() => {
    if (!calendlyContainerRef.current || !calendlyEmbedUrl || !window.Calendly) {
      return;
    }

    calendlyContainerRef.current.innerHTML = "";
    window.Calendly.initInlineWidget({
      parentElement: calendlyContainerRef.current,
      resize: true,
      url: appendAllowedUtmParams(calendlyEmbedUrl, window.location.href),
    });
  }, [calendlyEmbedUrl]);

  useEffect(() => {
    initializeCalendly();
  }, [initializeCalendly]);

  useEffect(() => {
    const allowedOrigin = getAllowedCalendlyOrigin();

    if (!allowedOrigin) return;

    const handleCalendlyMessage = (event: MessageEvent) => {
      if (event.origin !== allowedOrigin) return;
      if (!event.data || typeof event.data !== "object") return;

      // Miejsce na przyszłą obsługę udokumentowanych zdarzeń Calendly po potwierdzonej płatności.
    };

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return (
    <section id="system-rezerwacji" className="scroll-mt-24 bg-white px-3 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div
          className="grid gap-5 rounded-[1.5rem] p-3 sm:rounded-[2rem] sm:p-6 md:grid-cols-[0.85fr_1.15fr] md:gap-6 md:p-8"
          style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#BC6C25]">
              Cena i rezerwacja
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#1F314D] md:text-4xl">
              Konsultacja psychologiczna online
            </h2>

            <div className="mt-6 grid gap-3">
              {[
                { icon: CalendarDays, label: "Czas", value: "50 minut" },
                { icon: CreditCard, label: "Cena", value: "250 zł" },
                { icon: LockKeyhole, label: "Płatność", value: "podczas rezerwacji" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3"
                  style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1F314D] text-white">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-widest text-[#9A8E85]">
                      {label}
                    </span>
                    <span className="block text-base font-semibold text-[#1F314D]">{value}</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#6F6860]">
              Termin powinien być potwierdzany dopiero po dokonaniu płatności w Calendly. Adres
              przekierowania po udanej płatności:{" "}
              <span className="font-semibold text-[#1F314D]">{THANK_YOU_BOOKING_PATH}</span>
            </p>
          </div>

          <div
            className="min-h-[360px] rounded-[1.25rem] bg-white p-2 sm:rounded-[1.5rem] sm:p-5 md:min-h-[520px]"
            style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 14px 36px rgba(31,49,77,0.06)" }}
          >
            {bookingReady ? (
              <div className="flex h-full min-h-[520px] flex-col">
                <Script
                  src="https://assets.calendly.com/assets/external/widget.js"
                  strategy="afterInteractive"
                  onLoad={initializeCalendly}
                  onReady={initializeCalendly}
                />
                <div
                  ref={calendlyContainerRef}
                  aria-label="Calendly - wybór terminu konsultacji"
                  className="min-h-[720px] w-full max-w-full overflow-hidden rounded-2xl md:min-h-[780px]"
                  style={{ minWidth: 0 }}
                />
                <div className="mt-4 rounded-2xl bg-[#F6EFE6] p-4">
                  <p className="text-sm leading-relaxed text-[#6F6860]">
                    Gdyby osadzony kalendarz nie załadował się poprawnie, możesz otworzyć
                    rezerwację bezpośrednio w Calendly.
                  </p>
                  <BookingCTA
                    href={CALENDLY_URL}
                    text="Otwórz Calendly"
                    className="btn-secondary mt-3 w-full sm:w-auto"
                    eventName="rozpoczecie_rezerwacji"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center">
                <LockKeyhole size={34} strokeWidth={1.7} className="mb-5 text-[#BC6C25]" aria-hidden="true" />
                <h3 className="text-2xl font-bold leading-tight text-[#1F314D]">
                  Rezerwacja online jest chwilowo niedostępna
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">
                  Do czasu uruchomienia panelu rezerwacji możesz wysłać krótkie pytanie
                  organizacyjne na adres{" "}
                  <a className="font-semibold text-[#1F314D] hover:text-[#BC6C25]" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
                <BookingCTA
                  href="/kontakt#formularz"
                  text="Napisz przez formularz"
                  className="btn-primary mt-6 w-full sm:w-auto"
                  eventName="booking_cta_click"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
