"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LogoMark } from "@/components/layout/Logo";

type Answers = {
  challenge?: string;
  supportType?: string;
  availability?: string;
};

const steps = [
  {
    step: 1,
    question: "Co jest teraz dla Ciebie najtrudniejsze?",
    hint: "Wybierz to, co rezonuje najbardziej. Możesz się pomylić — to nie egzamin.",
    key: "challenge" as keyof Answers,
    options: ["Lęk i napięcie", "Stres", "Relacje", "Obniżony nastrój", "Wypalenie", "Nie wiem"],
    cols: 2,
  },
  {
    step: 2,
    question: "Jakiej formy wsparcia szukasz?",
    hint: "Możesz zmienić zdanie w każdej chwili — to tylko punkt wyjścia.",
    key: "supportType" as keyof Answers,
    options: ["Jednorazowa konsultacja", "Regularna terapia", "Chcę najpierw porozmawiać", "Nie wiem"],
    cols: 1,
  },
  {
    step: 3,
    question: "Kiedy najłatwiej Ci znaleźć czas?",
    hint: "Pomożemy dobrać specjalistę z dostępnością, która Ci pasuje.",
    key: "availability" as keyof Answers,
    options: ["Rano", "Po południu", "Wieczorem", "Weekend"],
    cols: 2,
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const isDone = step === steps.length + 1;
  const current = steps[step - 1];

  const select = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 350);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#FDFBF7" }}
    >
      {/* Minimal quiz header */}
      <header className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(45,41,38,0.08)" }}>
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size={32} />
          <span className="font-display font-semibold text-[#1F314D] text-base" style={{ letterSpacing: "-0.02em" }}>
            zdalnypsycholog
          </span>
        </Link>

        {!isDone && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-1.5">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="h-1.5 w-10 rounded-full transition-all duration-500"
                  style={{
                    background:
                      step > s.step
                        ? "#BC6C25"
                        : step === s.step
                        ? "#1F314D"
                        : "rgba(45,41,38,0.12)",
                  }}
                />
              ))}
            </div>
            <span className="text-[#9A8E85] text-sm">
              {step} / {steps.length}
            </span>
          </div>
        )}

      </header>

      {/* Quiz body */}
      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Step label */}
                <p className="section-label mb-4">Krok {current.step} z {steps.length}</p>

                <h1
                  className="font-display font-semibold text-[#2D2926] mb-3"
                  style={{ fontSize: "clamp(1.375rem, 3vw, 1.75rem)", lineHeight: 1.25 }}
                >
                  {current.question}
                </h1>
                <p className="text-[#9A8E85] text-sm mb-8">{current.hint}</p>

                {/* Options */}
                <div
                  className={`grid gap-3 ${
                    current.cols === 2
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {current.options.map((opt) => {
                    const isSelected = answers[current.key] === opt;
                    return (
                      <motion.button
                        key={opt}
                        onClick={() => select(current.key, opt)}
                        className="w-full text-left px-5 py-4 rounded-2xl text-sm font-medium transition-all"
                        style={{
                          background: isSelected
                            ? "#1F314D"
                            : "rgba(255,255,255,0.8)",
                          color: isSelected ? "white" : "#2D2926",
                          border: isSelected
                            ? "1.5px solid #1F314D"
                            : "1.5px solid rgba(45,41,38,0.10)",
                          boxShadow: isSelected
                            ? "0 4px 20px rgba(31,49,77,0.18)"
                            : "0 1px 6px rgba(45,41,38,0.05)",
                        }}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Back */}
                {step > 1 && (
                  <div className="mt-7">
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="flex items-center gap-2 text-[#9A8E85] text-sm hover:text-[#6F6860] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Poprzednie pytanie
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                {/* Success visual */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-7 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1F314D, #2A4268)",
                    boxShadow: "0 8px 32px rgba(31,49,77,0.22)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path
                      d="M8 16l5 5 11-11"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h1
                  className="font-display font-semibold text-[#2D2926] mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", lineHeight: 1.2 }}
                >
                  Na tej podstawie możemy spokojnie porozmawiać o tym, czego potrzebujesz.
                </h1>

                <p className="text-[#6F6860] mb-8 max-w-sm mx-auto" style={{ lineHeight: 1.75 }}>
                  Umów konsultację i wybierz termin, który Ci pasuje.
                  Nikt nie będzie Cię poganiać — możesz zacząć, kiedy jesteś gotowy.
                </p>

                {/* Summary chips */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {Object.values(answers).map((a, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm"
                      style={{
                        background: "rgba(31,49,77,0.08)",
                        color: "#1F314D",
                        border: "1px solid rgba(31,49,77,0.12)",
                      }}
                    >
                      {a}
                    </span>
                  ))}
                </div>

                <Link href="/kontakt" className="btn-primary w-full sm:w-auto justify-center mb-4">
                  Umów konsultację
                </Link>

                <div className="mt-3">
                  <Link
                    href="/"
                    className="text-sm text-[#9A8E85] hover:text-[#6F6860] transition-colors"
                  >
                    Wróć na stronę główną
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer note */}
      <div className="text-center px-5 pb-8">
        <p className="text-xs text-[#9A8E85]">
          Quiz nie jest diagnozą medyczną. W sytuacji kryzysu zadzwoń pod numer{" "}
          <strong className="text-[#6F6860]">112</strong>.
        </p>
      </div>
    </div>
  );
}
