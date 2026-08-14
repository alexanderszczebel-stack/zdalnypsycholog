import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Activity,
  Clock3,
  Compass,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import { PhoneTextLink } from "@/components/ui/PhoneCTA";
import { PHONE_NUMBER } from "@/lib/contact";
import { canonicalUrl } from "@/lib/site";

export const metadata = {
  title: "O mnie, Mikołaj Szczebel | Psycholog online",
  description:
    "Konsultacje psychologiczne online prowadzone indywidualnie, w uporządkowanym i praktycznym modelu pracy. Wybór terminu i płatność odbywają się online.",
  alternates: { canonical: canonicalUrl("/o-mnie") },
};

const heroPoints = [
  "konsultacje online prowadzone indywidualnie",
  "termin wybierany online",
  "płatność podczas rezerwacji",
  "liczba dostępnych terminów w tygodniu jest ograniczona",
];

const bioCards = [
  {
    title: "Psychologiczna diagnoza sytuacji",
    text: "Pierwszym krokiem jest precyzyjne nazwanie trudności, kontekstu i mechanizmów, które ją podtrzymują.",
  },
  {
    title: "Praktyczny kierunek pracy",
    text: "Konsultacja ma prowadzić do większej jasności, lepszego rozumienia reakcji i konkretnych decyzji dotyczących dalszych kroków.",
  },
  {
    title: "Jasne ramy kontaktu",
    text: "Spotkania odbywają się po wyborze terminu online i dokonaniu płatności przed konsultacją.",
  },
];

const workPrinciples = [
  {
    icon: Compass,
    title: "Konkretnie i bez oceniania",
    text: "Rozmowa skupia się na realnym problemie, bez uproszczeń i gotowych recept.",
  },
  {
    icon: Layers,
    title: "Z porządkowaniem mechanizmów",
    text: "Oddzielamy objawy, przyczyny i czynniki, które utrzymują napięcie lub trudność.",
  },
  {
    icon: Clock3,
    title: "W tempie dopasowanym do sytuacji",
    text: "Zakres pracy ustalany jest indywidualnie, z zachowaniem czytelnej struktury konsultacji.",
  },
  {
    icon: ShieldCheck,
    title: "Online, w bezpiecznych ramach",
    text: "Konsultacje prowadzone są z dbałością o poufność, komfort i profesjonalny przebieg spotkania.",
  },
];

const supportAreas = [
  {
    icon: Wind,
    title: "Stres i napięcie",
    text: "gdy organizm pozostaje w ciągłej gotowości",
  },
  {
    icon: Activity,
    title: "Lęk i niepokój",
    text: "gdy trudno zatrzymać analizowanie i przewidywanie",
  },
  {
    icon: Sparkles,
    title: "Przeciążenie",
    text: "gdy obowiązki przekraczają dostępne zasoby",
  },
  {
    icon: MessageCircle,
    title: "Relacje",
    text: "gdy powtarzające się schematy utrudniają kontakt",
  },
  {
    icon: Layers,
    title: "Wypalenie",
    text: "gdy znika energia, sens i możliwość regeneracji",
  },
  {
    icon: Compass,
    title: "Poczucie utknięcia",
    text: "gdy potrzebujesz nazwać problem i wybrać kierunek",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Krótki kontakt wstępny",
    text: "Ustalamy, czy konsultacja psychologiczna online jest właściwą formą wsparcia w Twojej sytuacji.",
  },
  {
    n: "02",
    title: "Pierwsza konsultacja",
    text: "Porządkujemy najważniejsze informacje, objawy, kontekst i oczekiwania wobec dalszej pracy.",
  },
  {
    n: "03",
    title: "Dalszy kierunek",
    text: "Jeśli kontynuacja ma sens, ustalamy częstotliwość spotkań i konkretne obszary do pracy.",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="mb-3 text-xs font-semibold uppercase tracking-widest md:text-sm"
      style={{ color: "#BC6C25" }}
    >
      {children}
    </p>
  );
}

export default function OMniePage() {
  return (
    <main>
      <section style={{ background: "#F6EFE6" }} className="px-6 pb-14 pt-[92px] md:pb-20 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)] lg:gap-14">
            <div className="max-w-3xl">
              <SectionLabel>O mnie</SectionLabel>
              <h1 className="mb-5 max-w-3xl text-[2.15rem] font-bold leading-[1.08] md:text-5xl" style={{ color: "#1F314D" }}>
                Konsultacje psychologiczne prowadzone spokojnie, konkretnie i w jasnych ramach.
              </h1>
              <p className="mb-7 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "#6F6860" }}>
                Nazywam się Mikołaj Szczebel. Jestem psychologiem pracującym w nurcie
                poznawczo-behawioralnym (CBT) oraz Terapii Skoncentrowanej na
                Rozwiązaniach (TSR). W konsultacjach online pomagam uporządkować
                trudności związane z przeciążeniem, lękiem, napięciem i relacjami,
                a następnie wyznaczyć konkretny kierunek dalszej pracy.
              </p>

              <div className="mb-8 grid gap-3 sm:grid-cols-3">
                {heroPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl px-4 py-3 text-sm leading-snug"
                    style={{
                      background: "rgba(255,255,255,0.68)",
                      border: "1px solid rgba(45,41,38,0.08)",
                      color: "#2D2926",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <BookingCTA
                  text="Wybierz termin konsultacji"
                  className="btn-primary w-full sm:w-auto"
                />
                <Link href="/kontakt#formularz" className="btn-secondary w-full sm:w-auto">
                  Mam pytanie organizacyjne
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#9A8E85" }}>
                Termin zostaje potwierdzony po dokonaniu płatności podczas rezerwacji.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0">
              <div
                className="relative overflow-hidden rounded-[2rem] p-3"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(45,41,38,0.08)",
                  boxShadow: "0 24px 70px rgba(31,49,77,0.14)",
                }}
              >
                <Image
                  src="/images/mikolaj.jpg"
                  alt="Mikołaj Szczebel - psycholog online"
                  width={520}
                  height={620}
                  className="h-[330px] w-full rounded-[1.55rem] object-cover sm:h-[440px] lg:h-[500px]"
                  style={{ objectPosition: "center top" }}
                  priority
                />
                <div
                  className="absolute bottom-6 left-6 right-6 rounded-2xl px-5 py-4 backdrop-blur-md"
                  style={{
                    background: "rgba(253,251,247,0.9)",
                    border: "1px solid rgba(45,41,38,0.08)",
                  }}
                >
                  <p className="text-base font-semibold" style={{ color: "#1F314D" }}>
                    Mikołaj Szczebel
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#6F6860" }}>
                    psycholog · konsultacje online · CBT / TSR
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {["online", "indywidualnie", "po ustaleniu"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl px-3 py-3 text-center text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.66)",
                      border: "1px solid rgba(45,41,38,0.08)",
                      color: "#1F314D",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div>
              <SectionLabel>krótkie bio</SectionLabel>
              <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
                Pracuję z osobami, które chcą lepiej zrozumieć problem i odzyskać wpływ na codzienne funkcjonowanie.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: "#6F6860" }}>
                Konsultacja nie wymaga gotowej diagnozy ani przygotowania rozbudowanej historii.
                Wystarczy, że wskażesz, co obecnie najbardziej utrudnia Ci funkcjonowanie.
              </p>
            </div>

            <div className="grid gap-4">
              {bioCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(246,239,230,0.52)",
                    border: "1px solid rgba(45,41,38,0.08)",
                  }}
                >
                  <h3 className="text-base font-semibold" style={{ color: "#1F314D" }}>
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed md:text-base" style={{ color: "#6F6860" }}>
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-10 grid gap-6 rounded-[2rem] p-6 md:grid-cols-[1fr_2fr] md:p-8"
            style={{ background: "#1F314D" }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#F4A261" }}>
                statement
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                To nie jest rozmowa bez kierunku. Konsultacja ma pomóc nazwać problem,
                uporządkować fakty i zobaczyć możliwe następne kroki.
              </p>
            </div>
            <blockquote className="text-xl font-semibold leading-snug md:text-2xl" style={{ color: "#FFFFFF" }}>
              „Najważniejsze jest precyzyjne zrozumienie sytuacji i dobranie takiego
              kierunku pracy, który ma sens w konkretnym życiu, nie tylko w teorii.”
            </blockquote>
          </div>
        </div>
      </section>

      <section style={{ background: "#F6EFE6" }} className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <SectionLabel>jak pracuję</SectionLabel>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
              Spokojna struktura, bez nadmiaru obietnic i bez przypadkowego prowadzenia rozmowy.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workPrinciples.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6"
                style={{
                  border: "1px solid rgba(45,41,38,0.08)",
                  boxShadow: "0 12px 30px rgba(31,49,77,0.06)",
                }}
              >
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(188,108,37,0.12)", color: "#BC6C25" }}
                >
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "#1F314D" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed md:text-base" style={{ color: "#6F6860" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionLabel>obszary wsparcia</SectionLabel>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
                Z czym najczęściej zgłaszają się osoby na konsultację?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: "#6F6860" }}>
                Nie musisz mieć gotowego rozpoznania. Wystarczy, że widzisz obszar,
                który wymaga uporządkowania i profesjonalnej rozmowy.
              </p>
              <Link
                href="/jak-to-dziala"
                className="mt-6 inline-flex text-sm font-semibold underline underline-offset-4 hover:text-[#BC6C25]"
                style={{ color: "#1F314D" }}
              >
                Zobacz, jak wygląda konsultacja
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportAreas.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(246,239,230,0.5)",
                    border: "1px solid rgba(45,41,38,0.08)",
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
                      style={{ background: "#FFFFFF", color: "#BC6C25" }}
                    >
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold" style={{ color: "#1F314D" }}>
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#6F6860" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#F6EFE6" }} className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <SectionLabel>przebieg współpracy</SectionLabel>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
              Konsultacje odbywają się po wyborze terminu online i dokonaniu płatności.
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "#6F6860" }}>
              Po rezerwacji otrzymujesz potwierdzenie oraz informacje organizacyjne dotyczące
              spotkania. Liczba miejsc w tygodniu jest ograniczona.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.n}
                className="relative overflow-hidden rounded-2xl bg-white p-6"
                style={{
                  border: "1px solid rgba(45,41,38,0.08)",
                  boxShadow: "0 12px 30px rgba(31,49,77,0.06)",
                }}
              >
                <span className="text-sm font-semibold" style={{ color: "#BC6C25" }}>
                  {step.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: "#1F314D" }}>
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: "#6F6860" }}>
                  {step.text}
                </p>
                <div
                  className="absolute bottom-0 left-0 h-1 w-full"
                  style={{ background: step.n === "02" ? "#BC6C25" : "rgba(31,49,77,0.18)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div
            className="grid gap-8 rounded-[2rem] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10"
            style={{
              background: "linear-gradient(135deg, #1F314D 0%, #253B5F 100%)",
              boxShadow: "0 24px 70px rgba(31,49,77,0.18)",
            }}
          >
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#F4A261" }}>
                konsultacja online
              </p>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#FFFFFF" }}>
                Sprawdź możliwość rozpoczęcia konsultacji.
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.76)" }}>
                Wybór terminu i płatność odbywają się online. W sprawach organizacyjnych
                możesz zadzwonić:{" "}
                <PhoneTextLink className="font-semibold underline underline-offset-4 hover:text-[#F4A261]" />
                .
              </p>
              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.66)" }}>
                Liczba dostępnych terminów w tygodniu jest ograniczona.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-[280px]">
              <BookingCTA
                text="Wybierz termin konsultacji"
                className="btn-primary w-full"
              />
              <Link
                href="/kontakt#formularz"
                className="btn-secondary w-full bg-white/10 text-white border-white/35 hover:bg-white hover:text-[#1F314D]"
              >
                Mam pytanie organizacyjne
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between" style={{ color: "#6F6860" }}>
            <span>Telefon: {PHONE_NUMBER}</span>
            <span>Wybór terminu i płatność odbywają się online.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
