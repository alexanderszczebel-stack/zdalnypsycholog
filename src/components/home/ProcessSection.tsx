"use client";
import { CalendarDays, MailCheck, Monitor, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  {
    n: "01",
    Icon: CalendarDays,
    title: "Wybierasz termin",
    desc: "Sprawdzasz dostępne terminy online i wybierasz godzinę konsultacji.",
    color: "#1F314D",
  },
  {
    n: "02",
    Icon: MailCheck,
    title: "Opłacasz konsultację",
    desc: "Płatność odbywa się podczas rezerwacji. Po niej otrzymujesz potwierdzenie.",
    color: "#BC6C25",
  },
  {
    n: "03",
    Icon: Monitor,
    title: "Łączysz się online",
    desc: "Dołączasz z telefonu, komputera lub tabletu, w spokojnym miejscu.",
    color: "#1F314D",
  },
  {
    n: "04",
    Icon: MessageCircle,
    title: "Omawiamy sytuację",
    desc: "Porządkujemy temat i ustalamy, jaki dalszy krok będzie adekwatny.",
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
          <p className="mt-4 text-[#6F6860]" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            Cały proces, od wyboru terminu po konsultację, odbywa się online.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 0.1}>
              <div
                className="h-full rounded-[24px] p-6"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(45,41,38,0.08)",
                }}
              >
                <div
                  className="mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: step.color }}
                >
                  <step.Icon size={22} strokeWidth={1.8} className="text-white" aria-hidden="true" />
                </div>
                <p className="mb-3 text-xs font-semibold tracking-widest" style={{ color: "#BC6C25" }}>
                  {step.n}
                </p>
                <h3
                  className="font-display mb-1.5 font-semibold text-[#2D2926]"
                  style={{ fontSize: "1rem" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6F6860]">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
