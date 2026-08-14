"use client";
import Link from "next/link";
import BookingCTA from "@/components/booking/BookingCTA";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const tags = ["Lęk i napięcie", "Stres", "Relacje", "Wypalenie", "Samoocena", "ADHD"];

export default function SpecialistsSection() {
  return (
    <section className="section-padding bg-[#F6EFE6]">
      <div className="container-main">
        <AnimatedSection className="max-w-xl mb-12">
          <p className="section-label mb-4">Psycholog</p>
          <h2
            className="font-display font-semibold text-[#2D2926]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Przy którym łatwiej zrobić pierwszy krok.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <motion.div
            className="rounded-[28px] overflow-hidden max-w-2xl"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(45,41,38,0.08)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 20px rgba(45,41,38,0.06)",
            }}
            whileHover={{ y: -3, boxShadow: "0 12px 44px rgba(45,41,38,0.10)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top accent bar */}
            <div
              className="h-1.5 w-full"
              style={{ background: "linear-gradient(90deg, #1F314D, #BC6C25)" }}
            />

            <div className="p-7 md:p-9">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-display font-semibold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1F314D 0%, #2A4268 100%)",
                    color: "white",
                    boxShadow: "0 6px 24px rgba(31,49,77,0.22)",
                  }}
                >
                  MS
                </div>

                <div className="flex-1">
                  <p
                    className="font-display font-semibold text-[#2D2926] mb-0.5"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Mikołaj Szczebel
                  </p>
                  <p className="text-[#9A8E85] text-sm">Psycholog online</p>

                  <div className="flex gap-6 mb-4 mt-3">
                    <div>
                      <p className="font-semibold text-[#1F314D] text-lg">Online</p>
                      <p className="text-xs text-[#9A8E85]">Polska i zagranica</p>
                    </div>
                    <div className="w-px" style={{background: 'rgba(45,41,38,0.12)'}}></div>
                    <div>
                      <p className="font-semibold text-[#1F314D] text-lg">Telefon</p>
                      <p className="text-xs text-[#9A8E85]">ustalenie terminu</p>
                    </div>
                    <div className="w-px" style={{background: 'rgba(45,41,38,0.12)'}}></div>
                    <div>
                      <p className="font-semibold text-[#1F314D] text-lg">CBT/TSR</p>
                      <p className="text-xs text-[#9A8E85]">uporządkowana praca</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: "rgba(45,41,38,0.06)",
                          color: "#6F6860",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-[#6F6860] mt-3">
                    Konsultacja online prowadzona indywidualnie. Szczegóły cen znajdują się
                    w zakładce cennika, a termin ustalany jest bezpośrednio.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Lęk i napięcie', 'Stres', 'Relacje', 'Wypalenie'].map(area => (
                      <span key={area}
                        className="px-3 py-1 rounded-full text-xs text-[#6F6860]"
                        style={{background: 'rgba(232,216,196,0.4)', border: '1px solid rgba(45,41,38,0.08)'}}>
                        {area}
                      </span>
                    ))}
                    <a href="/obszary-pomocy"
                      className="px-3 py-1 rounded-full text-xs font-medium text-[#BC6C25]"
                      style={{background: 'rgba(188,108,37,0.08)', border: '1px solid rgba(188,108,37,0.2)'}}>
                      Wszystkie obszary →
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    {/* Availability */}
                    <div
                      className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 w-fit"
                      style={{ background: "rgba(31,49,77,0.04)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                        style={{ background: "#2A7A4B" }}
                      />
                      <p className="text-sm text-[#6F6860]">Liczba terminów ograniczona</p>
                    </div>

                    <Link href="/o-mnie" className="btn-secondary text-sm py-2.5 px-5 w-fit">
                      Poznaj mnie
                    </Link>
                    <BookingCTA text="Wybierz termin" className="btn-primary text-sm py-2.5 px-5 w-fit" iconSize={15} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
