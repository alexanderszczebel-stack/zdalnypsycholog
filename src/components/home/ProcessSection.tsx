"use client";
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

        <div className="flex flex-col gap-4">
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
