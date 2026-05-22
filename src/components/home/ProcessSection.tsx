"use client";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    n: "01",
    title: "Opowiedz, czego potrzebujesz",
    desc: "Wypełnij krótki quiz albo wybierz specjalistę samodzielnie.",
    color: "#1F314D",
  },
  {
    n: "02",
    title: "Wybierz osobę i termin",
    desc: "Zobacz dostępność, specjalizacje i spokojnie podejmij decyzję.",
    color: "#BC6C25",
  },
  {
    n: "03",
    title: "Połącz się online",
    desc: "Spotkaj się z psychologiem w bezpiecznej rozmowie wideo.",
    color: "#1F314D",
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-[#FDFBF7]">
      <div className="container-main">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
          <p className="section-label mb-4">Jak to działa</p>
          <h2
            className="font-display font-semibold text-[#2D2926]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Prosta droga do rozmowy.
          </h2>
        </AnimatedSection>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute top-[38px] left-[16%] right-[16%] h-px"
              style={{ background: "linear-gradient(90deg, #E8D8C4 0%, #BC6C25 50%, #E8D8C4 100%)" }}
            />

            <div className="grid grid-cols-3 gap-10">
              {steps.map((step, i) => (
                <AnimatedSection key={step.n} delay={i * 0.15}>
                  <div className="text-center">
                    {/* Circle */}
                    <motion.div
                      className="w-[76px] h-[76px] rounded-full mx-auto mb-7 flex flex-col items-center justify-center relative z-10"
                      style={{
                        background: i === 1 ? "#BC6C25" : "#1F314D",
                        boxShadow: i === 1
                          ? "0 6px 24px rgba(188,108,37,0.28)"
                          : "0 6px 24px rgba(31,49,77,0.20)",
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="font-display font-semibold text-white text-lg leading-none">
                        {step.n}
                      </span>
                    </motion.div>

                    <h3
                      className="font-display font-semibold text-[#2D2926] mb-3"
                      style={{ fontSize: "1.125rem", lineHeight: 1.3 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#6F6860] text-sm leading-relaxed max-w-[200px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden flex flex-col gap-4">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 0.1}>
              <div
                className="flex gap-5 p-6 rounded-[24px]"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(45,41,38,0.08)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: i === 1 ? "#BC6C25" : "#1F314D",
                  }}
                >
                  <span className="font-display font-semibold text-white text-sm">
                    {step.n}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-display font-semibold text-[#2D2926] mb-1.5"
                    style={{ fontSize: "1rem" }}
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
  );
}
