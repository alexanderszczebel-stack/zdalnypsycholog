"use client";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const areas = [
  {
    title: "Lęk i napięcie",
    desc: "Niepokój, który trudno nazwać. Napięcie, które nie odpuszcza.",
    shape: "M10,30 Q20,10 30,30 Q20,50 10,30Z",
  },
  {
    title: "Stres",
    desc: "Przeciążenie, które kumuluje się z dnia na dzień.",
    shape: "M15,15 L35,15 L35,35 L15,35Z",
  },
  {
    title: "Obniżony nastrój",
    desc: "Kiedy trudno znaleźć energię lub sens w codziennych sprawach.",
    shape: "M25,10 L40,35 L10,35Z",
  },
  {
    title: "Relacje",
    desc: "Trudności z bliskimi, konflikty, samotność — w parze lub poza nią.",
    shape: "M20,10 Q40,20 30,40 Q10,30 20,10Z",
  },
  {
    title: "Wypalenie",
    desc: "Zmęczenie, które sięga głębiej niż brak snu.",
    shape: "M10,25 Q25,5 40,25 Q25,45 10,25Z",
  },
  {
    title: "Samoocena",
    desc: "Poczucie, że nie jest się wystarczającym — w pracy, w relacjach, w życiu.",
    shape: "M25,10 A15,15 0 1,1 24.9,10Z",
  },
  {
    title: "ADHD",
    desc: "Trudności z koncentracją, organizacją czasu, impulsywność i rozproszenie.",
    shape: "M10,20 L20,10 L40,20 L30,40 L10,40Z",
  },
  {
    title: "Kryzys emocjonalny",
    desc: "Momenty, kiedy coś się przełomało — i potrzebujesz być przez kogoś wysłuchany.",
    shape: "M25,10 Q45,25 25,40 Q5,25 25,10Z",
  },
];

function AreaCard({ area, index }: { area: typeof areas[0]; index: number }) {
  return (
    <AnimatedSection delay={index * 0.06}>
      <motion.div
        className="group relative rounded-[24px] p-6 h-full cursor-default overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.68)",
          border: "1px solid rgba(45,41,38,0.08)",
          backdropFilter: "blur(8px)",
        }}
        whileHover={{ y: -3, boxShadow: "0 10px 40px rgba(45,41,38,0.10)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Abstract shape */}
        <div className="mb-4 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
          <svg width="42" height="42" viewBox="0 0 50 50" fill="none" aria-hidden="true">
            <path d={area.shape} fill="#1F314D" />
          </svg>
        </div>

        <h3
          className="font-display font-semibold text-[#2D2926] mb-2"
          style={{ fontSize: "1rem", lineHeight: 1.35 }}
        >
          {area.title}
        </h3>
        <p className="text-[#6F6860] text-sm leading-relaxed">{area.desc}</p>

        {/* Hover accent line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
          style={{ background: "linear-gradient(90deg, #BC6C25, transparent)" }}
        />
      </motion.div>
    </AnimatedSection>
  );
}

export default function HelpAreasSection() {
  return (
    <section className="section-padding bg-[#F6EFE6]">
      <div className="container-main">
        <AnimatedSection className="max-w-xl mb-12">
          <p className="section-label mb-4">Obszary wsparcia</p>
          <h2
            className="font-display font-semibold text-[#2D2926]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            W czym możemy pomóc?
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area, i) => (
            <AreaCard key={area.title} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
