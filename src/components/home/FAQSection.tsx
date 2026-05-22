"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const faqs = [
  {
    q: "Czy terapia online jest skuteczna?",
    a: "Tak. Liczne badania kliniczne potwierdzają, że terapia online jest równie skuteczna jak tradycyjna. Kluczem jest relacja z terapeutą i regularność — nie miejsce spotkania.",
  },
  {
    q: "Jak wybrać psychologa?",
    a: "Możesz skorzystać z naszego krótkiego quizu, który pomoże dopasować specjalistę do Twojej sytuacji. Możesz też samodzielnie przeglądać profile specjalistów i wybrać kogoś, kto budzi Twoje zaufanie.",
  },
  {
    q: "Czy rozmowy są poufne?",
    a: "Absolutnie. Każdy specjalista jest związany tajemnicą zawodową. Twoje rozmowy są szyfrowane i nie są udostępniane osobom trzecim. Jesteś bezpieczny.",
  },
  {
    q: "Co jeśli nie wiem, z czym dokładnie przychodzę?",
    a: "To jest w porządku — i bardzo częste. Nie musisz wiedzieć, czego dokładnie potrzebujesz. Wystarczy, że czujesz, że coś jest trudne. Specjalista pomoże Ci to nazwać.",
  },
  {
    q: "Czy mogę zmienić specjalistę?",
    a: "Tak, w każdej chwili. Dopasowanie między klientem a specjalistą jest ważne i nie każda para od razu pasuje. Zmiana specjalisty jest czymś normalnym i wspieramy Cię w tym procesie.",
  },
  {
    q: "Jak wygląda pierwsza konsultacja?",
    a: "Pierwsza sesja to przede wszystkim rozmowa — bez presji, bez oceniania. Specjalista chce Cię poznać i zrozumieć Twoją sytuację. To nie jest egzamin. Możesz mówić tyle, ile chcesz.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-[#F6EFE6]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left */}
          <AnimatedSection>
            <p className="section-label mb-4">FAQ</p>
            <h2
              className="font-display font-semibold text-[#2D2926] mb-5"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
            >
              Pytania, które warto zadać.
            </h2>
            <p
              className="text-[#6F6860]"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
            >
              Zebraliśmy odpowiedzi na pytania, które słyszymy najczęściej.
              Jeśli czegoś tu nie ma — napisz do nas.
            </p>
          </AnimatedSection>

          {/* Accordion */}
          <AnimatedSection delay={0.1}>
            <div
              className="rounded-[28px] overflow-hidden divide-y"
              style={{
                background: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(45,41,38,0.08)",
              }}
            >
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderColor: "rgba(45,41,38,0.06)" }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-[rgba(45,41,38,0.02)] transition-colors"
                    aria-expanded={open === i}
                  >
                    <span
                      className="font-display font-semibold text-[#2D2926] leading-snug"
                      style={{ fontSize: "0.9375rem" }}
                    >
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: open === i ? "#1F314D" : "rgba(31,49,77,0.08)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path
                          d="M6 2v8M2 6h8"
                          stroke={open === i ? "white" : "#1F314D"}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="px-6 pb-5 text-[#6F6860] text-sm leading-relaxed"
                          style={{ lineHeight: 1.75 }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
