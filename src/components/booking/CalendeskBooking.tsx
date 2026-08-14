"use client";

import { useEffect, useRef } from "react";
import { CalendarDays, CreditCard, LockKeyhole, MailCheck } from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import {
  BOOKING_ENABLED,
  CALENDESK_BOOKING_URL,
  CALENDESK_EMBED_URL,
  THANK_YOU_BOOKING_PATH,
} from "@/lib/contact";
import { appendAllowedUtmParams } from "@/lib/utm";

export default function CalendeskBooking() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const bookingReady = BOOKING_ENABLED && Boolean(CALENDESK_BOOKING_URL || CALENDESK_EMBED_URL);
  const showEmbed = BOOKING_ENABLED && Boolean(CALENDESK_EMBED_URL);

  useEffect(() => {
    if (CALENDESK_EMBED_URL && iframeRef.current) {
      iframeRef.current.src = appendAllowedUtmParams(CALENDESK_EMBED_URL, window.location.href);
    }
  }, []);

  return (
    <section id="rezerwacja" className="scroll-mt-8 bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div
          className="grid gap-6 rounded-[2rem] p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8"
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
              Termin zostaje potwierdzony dopiero po dokonaniu płatności. Adres przekierowania po
              udanej płatności: <span className="font-semibold text-[#1F314D]">{THANK_YOU_BOOKING_PATH}</span>
            </p>
          </div>

          <div
            className="min-h-[360px] rounded-[1.5rem] bg-white p-5 md:min-h-[520px]"
            style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 14px 36px rgba(31,49,77,0.06)" }}
          >
            {showEmbed ? (
              <iframe
                ref={iframeRef}
                src={CALENDESK_EMBED_URL}
                title="Calendesk - wybór terminu konsultacji"
                className="h-[680px] min-h-[520px] w-full rounded-2xl border-0"
                loading="lazy"
              />
            ) : bookingReady ? (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center">
                <MailCheck size={34} strokeWidth={1.7} className="mb-5 text-[#BC6C25]" aria-hidden="true" />
                <h3 className="text-2xl font-bold leading-tight text-[#1F314D]">
                  Przejdź do wyboru terminu online
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">
                  Rezerwacja otworzy się w bezpiecznym panelu rezerwacji. Parametry kampanii UTM
                  zostaną zachowane w adresie przejścia.
                </p>
                <BookingCTA
                  href={CALENDESK_BOOKING_URL}
                  text="Rozpocznij rezerwację"
                  className="btn-primary mt-6 w-full sm:w-auto"
                  eventName="rozpoczecie_rezerwacji"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            ) : (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center">
                <LockKeyhole size={34} strokeWidth={1.7} className="mb-5 text-[#BC6C25]" aria-hidden="true" />
                <h3 className="text-2xl font-bold leading-tight text-[#1F314D]">
                  Rezerwacja online jest chwilowo niedostępna
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">
                  Skontaktuj się telefonicznie albo przez formularz, żeby ustalić najbliższy
                  możliwy termin konsultacji.
                </p>
                <BookingCTA
                  href="/kontakt#formularz"
                  text="Napisz przez formularz"
                  className="btn-primary mt-6 w-full sm:w-auto"
                  eventName="klik_glowne_cta"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
