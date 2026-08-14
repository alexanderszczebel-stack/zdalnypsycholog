"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { helpAreas, type HelpArea } from "@/data/helpAreas";

function AreaCard({ area, index }: { area: HelpArea; index: number }) {
  return (
    <AnimatedSection delay={index * 0.06}>
      <motion.div
        className="group relative h-full overflow-hidden rounded-[24px]"
        style={{
          background: "rgba(255,255,255,0.68)",
          border: "1px solid rgba(45,41,38,0.08)",
          backdropFilter: "blur(8px)",
        }}
        whileHover={{ y: -3, boxShadow: "0 10px 40px rgba(45,41,38,0.10)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href={`/blog/${area.articleSlug}`} className="block h-full p-6">
          {/* Abstract shape */}
          <div className="mb-4 opacity-40 transition-opacity duration-500 group-hover:opacity-70">
            <svg width="42" height="42" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <path d={area.shape} fill="#1F314D" />
            </svg>
          </div>

          <h3
            className="font-display mb-2 font-semibold text-[#2D2926]"
            style={{ fontSize: "1rem", lineHeight: 1.35 }}
          >
            {area.shortTitle}
          </h3>
          <p className="text-sm leading-relaxed text-[#6F6860]">{area.description}</p>
          <p className="mt-4 text-sm font-semibold text-[#1F314D] transition-colors group-hover:text-[#BC6C25]">
            Przeczytaj artykuł
          </p>
        </Link>

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
            Obszary pracy konsultacyjnej
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {helpAreas.map((area, i) => (
            <AreaCard key={area.title} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
