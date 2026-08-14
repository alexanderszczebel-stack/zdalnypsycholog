import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CreditCard, MailCheck, ShieldCheck } from "lucide-react";
import ReservationFlow from "@/components/booking/ReservationFlow";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rezerwacja konsultacji online",
  description:
    "Wybierz dogodny termin konsultacji psychologicznej online i opłać spotkanie przez system rezerwacji.",
  robots: { index: false, follow: true },
  alternates: { canonical: canonicalUrl("/rezerwacja") },
};

const bookingHighlights = [
  { icon: CalendarDays, label: "Wybór terminu", text: "sprawdzasz wolne godziny online" },
  { icon: CreditCard, label: "Płatność online", text: "opłacasz konsultację przez Stripe" },
  { icon: MailCheck, label: "Potwierdzenie", text: "otrzymujesz informacje organizacyjne e-mailem" },
];

export default function RezerwacjaPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <section className="bg-[#F6EFE6] px-5 pb-12 pt-[92px] md:pb-16 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6F6860] transition-colors hover:text-[#1F314D]"
            >
              <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
              Strona główna
            </Link>
            <p className="section-label mb-4">Rezerwacja online</p>
            <h1 className="font-display text-[2.35rem] font-semibold leading-[1.08] text-[#1F314D] md:text-6xl">
              Umów konsultację online
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-[#1F314D] md:text-lg">
              Wybierz dogodny termin i opłać konsultację online. Po zaksięgowaniu płatności
              otrzymasz potwierdzenie wizyty.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6F6860] md:text-base">
              System rezerwacji prowadzi przez wybór terminu, dane organizacyjne i płatność
              Stripe w jednym uporządkowanym procesie.
            </p>
          </div>

          <div
            className="rounded-[2rem] bg-white p-5"
            style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 18px 48px rgba(31,49,77,0.09)" }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
              <ShieldCheck size={23} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl font-semibold leading-tight text-[#1F314D]">
              Prosty proces bez dodatkowych kroków
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">
              Najpierw wybierasz termin, potem płacisz online, a potwierdzenie przychodzi po
              skutecznej płatności.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {bookingHighlights.map(({ icon: Icon, label, text }) => (
            <div
              key={label}
              className="flex min-h-28 gap-4 rounded-2xl bg-[#FDFBF7] p-5"
              style={{ border: "1px solid rgba(45,41,38,0.08)" }}
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#BC6C25]">
                <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-base font-semibold text-[#1F314D]">{label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-[#6F6860]">{text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <ReservationFlow />
    </div>
  );
}
