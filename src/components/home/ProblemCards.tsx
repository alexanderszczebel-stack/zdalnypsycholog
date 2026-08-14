"use client";
import BookingCTA from "@/components/booking/BookingCTA";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const cards = [
  {
    title: "Czuję napięcie lub lęk",
    desc: "Jeśli napięcie utrzymuje się i wpływa na codzienne funkcjonowanie, warto je uporządkować w konsultacji.",
    color: "#1F314D",
    bg: "rgba(31,49,77,0.06)",
  },
  {
    title: "Mam trudność w relacjach",
    desc: "Pracujemy nad rozumieniem schematów w relacjach i sposobów reagowania.",
    color: "#BC6C25",
    bg: "rgba(188,108,37,0.06)",
  },
  {
    title: "Nie wiem, co się ze mną dzieje",
    desc: "Pierwsza konsultacja pozwala nazwać problem i określić, jaki dalszy kierunek ma sens.",
    color: "#2D2926",
    bg: "rgba(45,41,38,0.04)",
  },
];

export default function ProblemCards() {
  return (
    <section className="section-padding bg-[#F6EFE6]">
      <div className="container-main">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14">
          <p className="section-label mb-4">Pierwsze rozpoznanie</p>
          <h2
            className="font-display font-semibold text-[#2D2926] mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Nie każdy problem od razu ma jasną nazwę.
          </h2>
          <p className="text-[#6F6860]" style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}>
            Konsultacja pomaga oddzielić objawy od mechanizmów i ustalić, czy dalsza praca
            psychologiczna będzie właściwa.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.1}>
              <motion.div
                className="relative overflow-hidden rounded-[28px] p-7 h-full cursor-default"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(45,41,38,0.08)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(45,41,38,0.10)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Decorative blob */}
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-full -translate-y-10 translate-x-10 opacity-60"
                  style={{ background: card.bg, filter: "blur(20px)" }}
                />

                <div
                  className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center"
                  style={{ background: card.bg }}
                >
                  <div
                    className="w-3 h-3 rounded-full opacity-80"
                    style={{ background: card.color }}
                  />
                </div>

                <h3
                  className="font-display font-semibold text-[#2D2926] mb-3"
                  style={{ fontSize: "1.125rem", lineHeight: 1.3 }}
                >
                  {card.title}
                </h3>
                <p className="text-[#6F6860] text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <BookingCTA text="Wybierz termin konsultacji" className="btn-primary" />
        </AnimatedSection>
      </div>
    </section>
  );
}
