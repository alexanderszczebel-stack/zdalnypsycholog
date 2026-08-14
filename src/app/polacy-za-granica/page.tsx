import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Globe2,
  Languages,
  MailCheck,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import CalendeskBooking from "@/components/booking/CalendeskBooking";
import { PhoneTextLink } from "@/components/ui/PhoneCTA";
import { canonicalUrl } from "@/lib/site";
import FAQPolacy from "./FAQPolacy";

export const metadata = {
  title: "Psycholog online po polsku dla Polaków za granicą | ZdalnyPsycholog.pl",
  description:
    "Konsultacje psychologiczne online po polsku dla osób mieszkających za granicą. Spotkanie trwa 50 minut i kosztuje 250 zł. Wybierz termin online.",
  robots: { index: true, follow: true },
  alternates: { canonical: canonicalUrl("/polacy-za-granica") },
};

const painPoints = [
  "Na zewnątrz wszystko wygląda w porządku, ale w środku narasta napięcie.",
  "Masz codzienny kontakt z ludźmi, ale brakuje rozmowy po polsku o tym, co naprawdę ważne.",
  "Funkcjonujesz pod presją pracy, formalności i oczekiwania, że trzeba sobie radzić.",
  "Czujesz samotność lub przeciążenie, mimo że życie z zewnątrz wygląda stabilnie.",
  "Trudno odpocząć, bo myśli stale wracają do obowiązków, relacji albo decyzji.",
  "Nie chcesz tłumaczyć od początku polskiego kontekstu rodzinnego, kulturowego i emocjonalnego.",
];

const firstMeeting = [
  "porządkujemy najważniejsze informacje i aktualny kontekst",
  "nazywamy główną trudność bez pośpiechu i presji",
  "sprawdzamy, jaki dalszy kierunek pracy może być adekwatny",
];

const bookingSteps = [
  {
    icon: CalendarDays,
    title: "Wybierasz dostępny termin",
    text: "Przechodzisz do sekcji rezerwacji i wybierasz godzinę konsultacji online.",
  },
  {
    icon: CreditCard,
    title: "Opłacasz konsultację online",
    text: "Płatność odbywa się podczas rezerwacji. Dopiero wtedy termin zostaje potwierdzony.",
  },
  {
    icon: MailCheck,
    title: "Otrzymujesz potwierdzenie",
    text: "Na podany adres e-mail przychodzą informacje organizacyjne dotyczące spotkania.",
  },
];

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#BC6C25]">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight text-[#1F314D] md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-relaxed text-[#6F6860] md:text-lg">{text}</p> : null}
    </div>
  );
}

function HeroVisual() {
  return (
    <div
      className="relative w-full max-w-full overflow-hidden rounded-[2rem] bg-white p-5 md:p-6"
      style={{
        border: "1px solid rgba(45,41,38,0.08)",
        boxShadow: "0 24px 70px rgba(31,49,77,0.13)",
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#BC6C25]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8D8C4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6B7C93]/45" />
        </div>
        <span className="rounded-full bg-[#F6EFE6] px-3 py-1 text-xs font-semibold text-[#1F314D]">
          konsultacja online
        </span>
      </div>

      <div className="rounded-3xl bg-[#1F314D] p-5 text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#F4A261]">
          50 minut · 250 zł
        </p>
        <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
          Termin potwierdzony po płatności.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/72">
          Rezerwacja online prowadzi przez wybór dostępnej godziny i opłacenie konsultacji.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {[
          { label: "1", text: "wybór terminu online" },
          { label: "2", text: "płatność podczas rezerwacji" },
          { label: "3", text: "potwierdzenie spotkania e-mail" },
        ].map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[2.25rem_1fr] items-center gap-3 rounded-2xl bg-[#F6EFE6] p-4"
            style={{ border: "1px solid rgba(45,41,38,0.06)" }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#1F314D]">
              {item.label}
            </span>
            <span className="text-sm font-semibold leading-snug text-[#1F314D]">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PolacyZaGranicaPage() {
  return (
    <main data-standalone-landing="polacy-za-granica" className="overflow-x-hidden bg-[#FDFBF7]">
      <section className="overflow-hidden bg-[#F6EFE6] px-6 pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-center lg:gap-14">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#BC6C25]">
              Konsultacja psychologiczna online
            </p>
            <h1 className="max-w-full text-[2.1rem] font-bold leading-[1.08] text-[#1F314D] md:text-5xl">
              Psycholog online po polsku dla osób mieszkających za granicą
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#6F6860] md:text-lg">
              Kiedy na zewnątrz wszystko wygląda w porządku, ale w środku narasta napięcie,
              samotność lub przeciążenie.
            </p>
            <p className="mt-5 text-sm font-semibold text-[#1F314D]">
              Konsultacja online · 50 minut · 250 zł
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#6F6860]">
              Termin zostaje potwierdzony po opłaceniu spotkania.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingCTA
                href="#rezerwacja"
                text="Wybierz termin konsultacji"
                className="btn-primary w-full sm:w-auto"
                eventName="przejscie_do_wyboru_terminu"
              />
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Z czym możesz przyjść"
            title="Życie poza Polską bywa obciążające także wtedy, gdy wiele rzeczy działa."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((item) => (
              <article
                key={item}
                className="rounded-2xl p-5"
                style={{ background: "rgba(246,239,230,0.45)", border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <CheckCircle2 size={20} strokeWidth={1.8} className="mb-4 text-[#BC6C25]" aria-hidden="true" />
                <p className="text-sm font-semibold leading-relaxed text-[#1F314D]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE6] px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[340px_1fr] lg:items-center">
          <div
            className="overflow-hidden rounded-[2rem] bg-white p-4"
            style={{ border: "1px solid rgba(45,41,38,0.08)" }}
          >
            <Image
              src="/images/mikolaj.jpg"
              alt="Mikołaj Szczebel, psycholog prowadzący konsultacje online"
              width={420}
              height={520}
              priority
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              style={{ objectPosition: "center top" }}
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#BC6C25]">
              Psycholog
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#1F314D] md:text-4xl">
              Mikołaj Szczebel
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6F6860]">
              Nazywam się Mikołaj Szczebel. Jestem psychologiem i pracuję w podejściu CBT oraz
              TSR. Podczas pierwszej konsultacji wspólnie porządkujemy sytuację, określamy
              najważniejszą trudność i ustalamy możliwy dalszy kierunek pracy.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["CBT", "TSR", "konsultacje online", "rozmowa po polsku"].map((item) => (
                <span key={item} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F314D]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#BC6C25]">
              Pierwsze spotkanie
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[#1F314D] md:text-4xl">
              Pierwsza konsultacja służy uporządkowaniu sytuacji.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6F6860]">
              Spotkanie trwa 50 minut. Rozmowa ma jasne ramy: omawiamy aktualny kontekst,
              najważniejszą trudność i możliwe dalsze kroki. Nie musisz mieć gotowej diagnozy
              ani dokładnego planu rozmowy.
            </p>
          </div>
          <div
            className="rounded-[2rem] bg-[#F6EFE6] p-6"
            style={{ border: "1px solid rgba(45,41,38,0.08)" }}
          >
            <MessageCircle size={30} strokeWidth={1.7} className="mb-6 text-[#BC6C25]" aria-hidden="true" />
            <div className="grid gap-4">
              {firstMeeting.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 size={19} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" />
                  <p className="text-sm font-semibold leading-relaxed text-[#1F314D]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE6] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Proces"
            title="Rezerwacja w trzech krokach"
            text="Cała ścieżka ma prowadzić do potwierdzonej konsultacji: termin, płatność, potwierdzenie."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {bookingSteps.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="rounded-2xl bg-white p-6"
                style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 12px 30px rgba(31,49,77,0.04)" }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-[#BC6C25]">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#1F314D]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CalendeskBooking />

      <section className="bg-[#FDFBF7] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionIntro eyebrow="FAQ" title="Najczęstsze pytania przed rezerwacją" />
          <div className="mt-10">
            <FAQPolacy />
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE6] px-6 py-16 md:py-20">
        <div
          className="mx-auto grid max-w-6xl gap-6 rounded-3xl bg-white p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9"
          style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 18px 45px rgba(31,49,77,0.08)" }}
        >
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#BC6C25]">
              Rezerwacja
            </p>
            <h2 className="text-2xl font-bold leading-tight text-[#1F314D] md:text-3xl">
              Jeśli chcesz rozpocząć konsultacje, wybierz dostępny termin online.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#6F6860]">
              Termin zostaje potwierdzony po dokonaniu płatności podczas rezerwacji.
            </p>
          </div>
          <BookingCTA
            href="#rezerwacja"
            text="Wybierz termin konsultacji"
            className="btn-primary w-full sm:w-auto"
            eventName="przejscie_do_wyboru_terminu"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div
          className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between"
          style={{ background: "rgba(246,239,230,0.55)", border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <div className="flex gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
              <Phone size={20} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-[#1F314D]">
                Masz pytanie organizacyjne przed rezerwacją?
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#6F6860]">
                Zadzwoń: <PhoneTextLink className="font-semibold text-[#1F314D] hover:text-[#BC6C25]" />
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#6F6860]">
                Wybór terminu i płatność odbywają się online.
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-[#BC6C25]" aria-hidden="true">
            <ShieldCheck size={22} strokeWidth={1.8} />
            <Languages size={22} strokeWidth={1.8} />
            <Globe2 size={22} strokeWidth={1.8} />
            <Clock3 size={22} strokeWidth={1.8} />
            <UserRound size={22} strokeWidth={1.8} />
          </div>
        </div>
      </section>
    </main>
  );
}
