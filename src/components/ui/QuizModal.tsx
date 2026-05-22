"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export type QuizAnswers = {
  challenge?: string;
  supportType?: string;
  availability?: string;
};

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const step1Options = [
  "Lęk i napięcie",
  "Stres",
  "Relacje",
  "Obniżony nastrój",
  "Wypalenie",
  "Nie wiem",
];
const step2Options = [
  "Jednorazowa konsultacja",
  "Regularna terapia",
  "Chcę najpierw porozmawiać",
  "Nie wiem",
];
const step3Options = ["Rano", "Po południu", "Wieczorem", "Weekend"];

const stepMeta = [
  {
    step: 1,
    question: "Co jest teraz dla Ciebie najtrudniejsze?",
    hint: "Wybierz to, co najbardziej rezonuje. Możesz się pomylić — to nie egzamin.",
    key: "challenge" as keyof QuizAnswers,
    options: step1Options,
    cols: 2,
  },
  {
    step: 2,
    question: "Jakiej formy wsparcia szukasz?",
    hint: "Możesz zmienić zdanie w każdej chwili — to tylko punkt wyjścia.",
    key: "supportType" as keyof QuizAnswers,
    options: step2Options,
    cols: 1,
  },
  {
    step: 3,
    question: "Kiedy najłatwiej Ci znaleźć czas?",
    hint: "Pomożemy dobrać specjalistę z dostępnością, która Ci pasuje.",
    key: "availability" as keyof QuizAnswers,
    options: step3Options,
    cols: 2,
  },
];

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const totalSteps = stepMeta.length;
  const isDone = step === totalSteps + 1;
  const current = stepMeta[step - 1];

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setAnswers({});
      }, 350);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const select = (key: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 380);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(31,49,77,0.55)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Quiz — wybór specjalisty"
          >
            <div
              className="relative w-full sm:max-w-lg rounded-t-[32px] sm:rounded-[32px] overflow-hidden"
              style={{
                background: "#FDFBF7",
                boxShadow: "0 24px 80px rgba(31,49,77,0.25)",
                maxHeight: "90vh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-6 pt-6 pb-5"
                style={{
                  background: "linear-gradient(135deg, #1F314D 0%, #2A4268 100%)",
                }}
              >
                {/* Progress bar */}
                {!isDone && (
                  <div className="flex gap-1.5 mb-5">
                    {stepMeta.map((s) => (
                      <div
                        key={s.step}
                        className="h-1 rounded-full flex-1 transition-all duration-500"
                        style={{
                          background:
                            step > s.step
                              ? "#BC6C25"
                              : step === s.step
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(255,255,255,0.2)",
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    {!isDone && (
                      <p className="text-white/55 text-xs font-medium mb-1.5 tracking-wider uppercase">
                        Krok {step} z {totalSteps}
                      </p>
                    )}
                    <h2
                      className="font-display font-semibold text-white leading-snug"
                      style={{ fontSize: "1.125rem" }}
                    >
                      {isDone
                        ? "Gotowe — mamy Ci coś do pokazania."
                        : current.question}
                    </h2>
                    {!isDone && (
                      <p className="text-white/60 text-sm mt-1.5">{current.hint}</p>
                    )}
                  </div>

                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/15"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    aria-label="Zamknij quiz"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 160px)" }}>
                <AnimatePresence mode="wait">
                  {!isDone ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className={`grid gap-3 ${
                          current.cols === 2 ? "grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {current.options.map((opt) => {
                          const selected = answers[current.key] === opt;
                          return (
                            <motion.button
                              key={opt}
                              onClick={() => select(current.key, opt)}
                              className="w-full text-left px-4 py-4 rounded-2xl text-sm font-medium transition-all duration-200"
                              style={{
                                background: selected
                                  ? "#1F314D"
                                  : "rgba(255,255,255,0.72)",
                                color: selected ? "white" : "#2D2926",
                                border: selected
                                  ? "1.5px solid #1F314D"
                                  : "1.5px solid rgba(45,41,38,0.10)",
                                boxShadow: selected
                                  ? "0 4px 20px rgba(31,49,77,0.18)"
                                  : "0 1px 6px rgba(45,41,38,0.04)",
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                            >
                              {opt}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center py-4"
                    >
                      {/* Success icon */}
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                        style={{ background: "rgba(31,49,77,0.08)" }}
                      >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                          <circle cx="14" cy="14" r="13" stroke="#1F314D" strokeWidth="1.5" />
                          <path
                            d="M8 14l4 4 8-8"
                            stroke="#BC6C25"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <h3
                        className="font-display font-semibold text-[#2D2926] mb-3"
                        style={{ fontSize: "1.25rem" }}
                      >
                        Na tej podstawie możemy spokojnie porozmawiać o tym, czego potrzebujesz.
                      </h3>
                      <p className="text-[#9A8E85] text-sm mb-7 max-w-sm mx-auto leading-relaxed">
                        Umów konsultację i wybierz termin, który Ci pasuje.
                        Bez presji, we własnym tempie.
                      </p>

                      <Link
                        href="/kontakt"
                        onClick={onClose}
                        className="btn-primary w-full justify-center mb-3"
                      >
                        Umów konsultację
                      </Link>
                      <button
                        onClick={onClose}
                        className="w-full text-center text-[#9A8E85] text-sm py-2 hover:text-[#6F6860] transition-colors"
                      >
                        Wróć na stronę główną
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Back button */}
                {step > 1 && !isDone && (
                  <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(45,41,38,0.07)" }}>
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="flex items-center gap-2 text-[#9A8E85] text-sm hover:text-[#6F6860] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Wróć
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
