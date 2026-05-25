"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    n: "1",
    q: "Co jest teraz dla Ciebie najtrudniejsze?",
    hint: "Wybierz to, co rezonuje — nie musisz być precyzyjny.",
    options: ["Lęk i napięcie", "Stres", "Relacje"],
    active: 0,
  },
  {
    n: "2",
    q: "Jaka forma wsparcia będzie dla Ciebie najbezpieczniejsza?",
    hint: "Możesz zmienić zdanie w każdej chwili.",
    options: ["Jednorazowa konsultacja", "Regularna terapia"],
    active: null,
  },
  {
    n: "3",
    q: "Dopasujemy termin i formę wsparcia.",
    hint: "Bez zobowiązań — spokojnie przeglądasz.",
    options: [],
    active: null,
  },
];

function CardContent({ step, index }: { step: typeof steps[0]; index: number }) {
  const isFirst = index === 0;

  return (
    <div
      className="relative rounded-[24px] overflow-hidden"
      style={{
        background: isFirst
          ? "linear-gradient(135deg, #1F314D 0%, #2A4268 100%)"
          : "rgba(255,255,255,0.75)",
        border: isFirst ? "none" : "1px solid rgba(45,41,38,0.08)",
        backdropFilter: "blur(10px)",
        boxShadow: isFirst
          ? "0 8px 40px rgba(31,49,77,0.22)"
          : "0 2px 20px rgba(45,41,38,0.06)",
      }}
    >
      <div className="p-6 md:p-7">
        {/* Step header */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-semibold flex-shrink-0"
            style={{
              background: isFirst ? "rgba(255,255,255,0.18)" : "rgba(31,49,77,0.08)",
              color: isFirst ? "white" : "#1F314D",
            }}
          >
            {step.n}
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {steps.map((_, si) => (
              <div
                key={si}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: si === index ? "20px" : "6px",
                  background: isFirst
                    ? si === index
                      ? "white"
                      : "rgba(255,255,255,0.3)"
                    : si === index
                    ? "#BC6C25"
                    : "rgba(45,41,38,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        <h3
          className="font-display font-semibold mb-2 leading-snug"
          style={{
            color: isFirst ? "white" : "#2D2926",
            fontSize: "1.0625rem",
          }}
        >
          {step.q}
        </h3>
        <p
          className="text-sm mb-5"
          style={{ color: isFirst ? "rgba(255,255,255,0.65)" : "#9A8E85" }}
        >
          {step.hint}
        </p>

        {step.options.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {step.options.map((opt, oi) => (
              <div
                key={opt}
                className="px-4 py-2 rounded-full text-sm font-medium cursor-default"
                style={
                  isFirst && oi === step.active
                    ? {
                        background: "#BC6C25",
                        color: "white",
                      }
                    : isFirst
                    ? {
                        background: "rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }
                    : {
                        background: "rgba(31,49,77,0.06)",
                        color: "#2D2926",
                        border: "1px solid rgba(45,41,38,0.08)",
                      }
                }
              >
                {opt}
              </div>
            ))}
          </div>
        )}

        {step.options.length === 0 && (
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
            style={{ background: isFirst ? "rgba(255,255,255,0.1)" : "rgba(31,49,77,0.05)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#BC6C25" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2.5 7l3 3 6-6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className="text-sm"
              style={{ color: isFirst ? "rgba(255,255,255,0.9)" : "#2D2926" }}
            >
              Pokażemy Ci dostępne terminy i formę wsparcia pasującą do Ciebie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizStepCard({ step, index, preview = false }: { step: typeof steps[0]; index: number; preview?: boolean }) {
  if (preview) {
    return (
      <div className="opacity-60">
        <CardContent step={step} index={index} />
      </div>
    );
  }

  return (
    <AnimatedSection delay={index * 0.12}>
      <CardContent step={step} index={index} />
    </AnimatedSection>
  );
}

export default function QuizPreview() {
  return (
    <section className="section-padding bg-[#FDFBF7]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <AnimatedSection className="lg:order-2">
            <p className="section-label mb-4">Główna ścieżka</p>
            <h2
              className="font-display font-semibold text-[#2D2926] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
            >
              Pierwszy krok może być prosty.
            </h2>
            <p
              className="text-[#6F6860] mb-8"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
            >
              Krótki quiz — bez diagnozy, bez presji, bez wiedzy medycznej. Po prostu opowiedz,
              co czujesz. Resztą zajmiemy się my.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                "Spokojne pytania, żadnych pułapek",
                "Mniej niż 2 minuty",
                "Możesz zmienić odpowiedź w każdej chwili",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[#6F6860] text-sm">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(188,108,37,0.12)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path
                        d="M1.5 5l2.5 2.5 4.5-4.5"
                        stroke="#BC6C25"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Link href="/quiz" className="btn-primary">
              Rozpocznij quiz
            </Link>
          </AnimatedSection>

          {/* Right — quiz mockup */}
          <div className="lg:order-1 flex flex-col gap-4">
            {steps.map((step, i) => (
              <QuizStepCard key={step.n} step={step} index={i} preview={i > 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
