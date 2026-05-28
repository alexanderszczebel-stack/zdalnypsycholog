import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wind, Activity, CloudRain, Users, Brain, HelpCircle } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CalendlyButton from "@/components/ui/CalendlyButton";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Umów konsultację psychologiczną online | zdalnypsycholog",
  description:
    "Pierwsza konsultacja psychologiczna online w 24–48h. 150 zł / 50 min. Bez zobowiązań, pełna poufność. Umów termin od razu.",
  robots: "noindex, nofollow",
};

const ctaClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#BC6C25] text-white font-semibold text-base py-4 px-8 shadow-md hover:bg-[#a55c1f] transition-colors cursor-pointer";

const helpCards = [
  { Icon: Wind, text: "Czujesz ciągłe napięcie lub lęk" },
  { Icon: Activity, text: "Jesteś przemęczony i wypalony" },
  { Icon: CloudRain, text: "Masz obniżony nastrój od dłuższego czasu" },
  { Icon: Users, text: "Masz trudności w relacjach z innymi" },
  { Icon: Brain, text: "Masz problem z koncentracją lub ADHD" },
  { Icon: HelpCircle, text: "Nie wiesz dokładnie co się dzieje — po prostu jest trudno" },
];

const reviews = [
  {
    text: "Już po pierwszej rozmowie poczułem ogromną ulgę i uporządkowanie sytuacji. Nie wiedziałem czego się spodziewać — okazało się, że to po prostu normalna rozmowa.",
    author: "Tomasz K.",
    label: "konsultacja jednorazowa",
  },
  {
    text: "Najbardziej pomogło mi to, że nie musiałam od razu wiedzieć kogo wybrać ani co mi jest. Zostałam spokojnie poprowadzona przez cały proces.",
    author: "Karolina W.",
    label: "po pierwszej sesji",
  },
  {
    text: "Cały proces był spokojny i prosty. To zdjęło ze mnie dużo napięcia zanim jeszcze zaczęłam rozmowę z psychologiem.",
    author: "Marta P.",
    label: "terapia online, 3 miesiące",
  },
];

const steps = [
  {
    n: "01",
    color: "#1F314D",
    title: "Krótka rozmowa o Twojej sytuacji",
    desc: "Zaczynamy od tego, co jest dla Ciebie teraz najtrudniejsze. Bez formularzy, bez diagnozy.",
  },
  {
    n: "02",
    color: "#BC6C25",
    title: "Zrozumienie problemu",
    desc: "Wspólnie porządkujemy co się dzieje i skąd może to wynikać.",
  },
  {
    n: "03",
    color: "#1F314D",
    title: "Plan działania",
    desc: "Ustalamy dalsze kroki — bez presji, w Twoim tempie.",
  },
];

export default function UmowPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F6EFE6" }}>

      {/* ── HEADER ── */}
      <header
        className="py-4 px-6 flex items-center"
        style={{ borderBottom: "1px solid rgba(45,41,38,0.08)", background: "#F6EFE6" }}
      >
        <div className="flex items-center gap-2.5">
          <LogoMark size={32} />
          <span
            className="font-display font-semibold text-[#1F314D] text-base"
            style={{ letterSpacing: "-0.02em" }}
          >
            zdalnypsycholog
          </span>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="container mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Tekst */}
          <AnimatedSection>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ color: "#BC6C25" }}
            >
              Psycholog online • Pierwsze terminy w 24–48h
            </p>
            <h1
              className="font-display font-semibold text-[#1F314D] mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              Szybka pomoc psychologiczna online.{" "}
              <span style={{ color: "#BC6C25" }}>Bez długiego czekania.</span>
            </h1>
            <p className="text-[#6F6860] mb-8" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
              Jeśli czujesz przeciążenie, lęk, stres lub spadek nastroju —
              możesz umówić pierwszą konsultację już dziś.
            </p>

            <CalendlyButton text="Umów konsultację →" className={ctaClass} />

            <p className="text-[#9A8E85] mt-3" style={{ fontSize: "0.8125rem" }}>
              50 min · 150 zł · bez zobowiązań · pełna poufność
            </p>

            <div className="flex flex-col gap-4 mt-6">
              {[
                "Dostępność w 24–48h",
                "Konsultacje online w całej Polsce",
                "Poufność i tajemnica zawodowa",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[#6F6860] text-base">
                  <span className="text-[#BC6C25] font-bold text-xl">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Zdjęcie */}
          <AnimatedSection delay={0.12} className="flex justify-center md:justify-end">
            <div className="w-full max-w-[420px]" style={{ aspectRatio: "3/4" }}>
              <Image
                src="/images/mikolaj.jpg"
                alt="Mikołaj Szczebel - psycholog online"
                width={420}
                height={560}
                className="rounded-3xl object-cover w-full h-full"
                style={{ objectPosition: "center top" }}
                priority
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TO MOŻE CI POMÓC ── */}
      <section style={{ background: "#fff" }} className="py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-5">
          <AnimatedSection>
            <h2
              className="font-display font-semibold text-[#2D2926] text-center mb-12"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              To może Ci pomóc, jeśli…
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {helpCards.map(({ Icon, text }, i) => (
              <AnimatedSection key={text} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-5 shadow-sm flex flex-col gap-3 h-full"
                  style={{ background: "#fff", border: "1px solid rgba(45,41,38,0.07)" }}
                >
                  <Icon size={20} style={{ color: "#BC6C25" }} />
                  <p className="text-[#2D2926] text-sm leading-snug font-medium">{text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <p className="text-center text-[#9A8E85] italic mt-10 max-w-lg mx-auto text-sm leading-relaxed">
              Nie musisz wiedzieć dokładnie co się dzieje.<br />
              Wystarczy że czujesz, że coś jest nie tak.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── JAK WYGLĄDA PIERWSZA WIZYTA ── */}
      <section style={{ background: "#F6EFE6" }} className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-5">
          <AnimatedSection>
            <h2
              className="font-display font-semibold text-[#2D2926] text-center mb-14"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              Jak wygląda pierwsza konsultacja?
            </h2>
          </AnimatedSection>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <AnimatedSection key={step.n} delay={i * 0.1}>
                <div className="flex gap-5 items-start relative">
                  {i < steps.length - 1 && (
                    <div
                      className="absolute left-[19px] top-[44px] w-px"
                      style={{ height: "calc(100% - 4px)", background: "rgba(45,41,38,0.12)" }}
                    />
                  )}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-display font-semibold z-10"
                    style={{ background: step.color }}
                  >
                    {step.n}
                  </div>
                  <div className="pb-10">
                    <h3
                      className="font-display font-semibold text-[#2D2926] mb-1.5"
                      style={{ fontSize: "1.0625rem" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#6F6860] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPINIE ── */}
      <section style={{ background: "#fff" }} className="py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-5">
          <AnimatedSection>
            <h2
              className="font-display font-semibold text-[#2D2926] text-center mb-12"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              Co mówią osoby, które zrobiły pierwszy krok.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.author} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-6 shadow-sm flex flex-col gap-4 h-full"
                  style={{ background: "#fff", border: "1px solid rgba(45,41,38,0.06)" }}
                >
                  <p className="text-[#BC6C25] text-lg tracking-wide">★★★★★</p>
                  <p className="text-[#2D2926] text-sm leading-relaxed flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-[#2D2926] font-semibold text-sm">{r.author}</p>
                    <p className="text-[#9A8E85] text-xs mt-0.5">{r.label}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── O MIKOŁAJU ── */}
      <section style={{ background: "#F6EFE6" }} className="py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            <AnimatedSection>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "#BC6C25" }}
              >
                Psycholog online
              </p>
              <h2
                className="font-display font-semibold text-[#2D2926] mb-5"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
              >
                Mikołaj Szczebel
              </h2>
              <p className="text-[#6F6860] mb-8" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
                Psycholog z 8-letnim doświadczeniem. Przeprowadziłem ponad 1500 sesji
                z osobami zmagającymi się z lękiem, stresem, wypaleniem i trudnościami
                w relacjach. Pracuję online — spokojnie, bez presji, w Twoim tempie.
              </p>

              <div
                className="flex gap-6 mb-8 pb-6"
                style={{ borderBottom: "1px solid rgba(45,41,38,0.10)" }}
              >
                {[
                  ["8 lat", "doświadczenia"],
                  ["1500+", "sesji"],
                  ["4.9/5", "ocena Google"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <p className="font-display font-semibold text-[#1F314D] text-xl">{val}</p>
                    <p className="text-[#9A8E85] text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <CalendlyButton text="Umów konsultację →" className={ctaClass} />
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="flex justify-center md:justify-end">
              <div className="w-full max-w-[320px]" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/images/mikolaj.jpg"
                  alt="Mikołaj Szczebel - psycholog online"
                  width={320}
                  height={427}
                  className="rounded-3xl object-cover w-full h-full"
                  style={{ objectPosition: "center top" }}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA KOŃCOWE ── */}
      <section
        className="py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #1F314D 0%, #2A4268 100%)" }}
      >
        <AnimatedSection className="container mx-auto max-w-2xl px-5 text-center">
          <h2
            className="font-display font-semibold text-white mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Pierwszy krok możesz zrobić dziś.
          </h2>
          <p
            className="mb-10"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.0625rem", lineHeight: 1.7 }}
          >
            Pierwsze wolne terminy dostępne w 24–48 godzin.
          </p>
          <CalendlyButton text="Umów konsultację w 24–48h →" className={ctaClass} />
          <p className="mt-4" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8125rem" }}>
            50 min · 150 zł · bez zobowiązań
          </p>
        </AnimatedSection>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#fff" }} className="py-16 md:py-20">
        <div className="container mx-auto max-w-2xl px-5">
          <AnimatedSection>
            <h2
              className="font-display font-semibold text-[#2D2926] text-center mb-10"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              Najczęstsze pytania
            </h2>
          </AnimatedSection>
          <FAQAccordion />
        </div>
      </section>

      {/* ── MINI FOOTER ── */}
      <footer
        className="py-8 text-center"
        style={{ background: "#F6EFE6", borderTop: "1px solid rgba(45,41,38,0.08)" }}
      >
        <p className="text-[#9A8E85] text-xs mb-2">© 2026 zdalnypsycholog</p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Link
            href="/polityka-prywatnosci"
            className="text-[#9A8E85] text-xs hover:text-[#6F6860] transition-colors"
          >
            Polityka prywatności
          </Link>
          <span className="text-[#9A8E85] text-xs">|</span>
          <Link
            href="/regulamin"
            className="text-[#9A8E85] text-xs hover:text-[#6F6860] transition-colors"
          >
            Regulamin
          </Link>
        </div>
        <p className="text-[#9A8E85] text-xs max-w-xs mx-auto leading-relaxed">
          W sytuacji bezpośredniego zagrożenia życia zadzwoń pod numer{" "}
          <strong className="text-[#6F6860]">112</strong>.
        </p>
      </footer>

      {/* ── MOBILE STICKY CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50"
        style={{ background: "#fff", borderTop: "1px solid rgba(45,41,38,0.08)" }}
      >
        <CalendlyButton
          text="Umów konsultację →"
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#BC6C25] text-white font-semibold text-base py-4 px-8 shadow-md hover:bg-[#a55c1f] transition-colors cursor-pointer"
        />
      </div>
    </div>
  );
}
