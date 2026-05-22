"use client";
import Link from "next/link";
import { motion } from "framer-motion";

function HeroAbstractVisual() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] aspect-square flex items-center justify-center select-none mx-auto">
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 50% 55%, #F2E7D8 0%, #FDFBF7 70%)" }}
      />
      <div
        className="absolute inset-6 rounded-full opacity-30"
        style={{ border: "1.5px solid #E8D8C4" }}
      />
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-[72%] h-[72%]"
        aria-hidden="true"
      >
        <ellipse cx="112" cy="88" rx="44" ry="44" fill="#1F314D" opacity="0.88" />
        <path
          d="M28 270 C28 196 68 152 118 148 L148 148 C148 148 128 172 124 214 C121 244 128 268 136 280 L52 280 C38 280 28 271 28 270Z"
          fill="#1F314D" opacity="0.82"
        />
        <ellipse cx="208" cy="88" rx="44" ry="44" fill="#BC6C25" opacity="0.78" />
        <path
          d="M292 270 C292 196 252 152 202 148 L172 148 C172 148 192 172 196 214 C199 244 192 268 184 280 L268 280 C282 280 292 271 292 270Z"
          fill="#BC6C25" opacity="0.68"
        />
        <path
          d="M148 148 L172 148 C172 148 192 172 196 214 C199 244 192 268 184 280 L136 280 C128 268 121 244 124 214 C128 172 148 148 148 148Z"
          fill="#E8D8C4" opacity="0.88"
        />
        <path d="M112 48 Q160 28 208 48" stroke="#E8D8C4" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55" />
        <circle cx="160" cy="214" r="6" fill="white" opacity="0.6" />
        <circle cx="160" cy="214" r="12" fill="white" opacity="0.15" />
      </svg>
      <div className="absolute top-8 right-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-30" style={{ background: "#BC6C25", filter: "blur(18px)" }} />
      <div className="absolute bottom-12 left-8 w-14 h-14 sm:w-20 sm:h-20 rounded-full opacity-20" style={{ background: "#1F314D", filter: "blur(24px)" }} />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative pt-[88px] md:pt-[112px] overflow-hidden bg-[#FDFBF7]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(232,216,196,0.25) 0%, transparent 70%)" }}
      />

      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center py-10 sm:py-14 lg:py-20">

          {/* Ilustracja — na mobile na górze */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroAbstractVisual />
          </motion.div>

          {/* Tekst — na mobile pod ilustracją */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="section-label mb-4"
            >
              Wsparcie psychologiczne online
            </motion.div>

            <motion.h1
              className="font-display font-semibold text-[#2D2926] mb-5 leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(1.875rem, 5vw, 3.75rem)" }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Pomoc psychologiczna{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #1F314D 0%, #2A4268 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                zawsze blisko.
              </span>{" "}
              Gdziekolwiek jesteś.
            </motion.h1>

            <motion.p
              className="text-[#6F6860] mb-7 max-w-lg"
              style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.75 }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Znajdź wsparcie, które rozumie. Spokojnie, bezpiecznie i online — bez presji,
              bez oceniania, w tempie, które jest dla Ciebie dobre.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/quiz" className="btn-primary hidden md:inline-flex">
                Zrób pierwszy krok
              </Link>
              <Link href="/o-mnie" className="btn-secondary text-sm">
                Poznaj Mikołaja
              </Link>
            </motion.div>

            <motion.p
              className="text-xs text-[#9A8E85] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42 }}
            >
              Zajmie 2 minuty · bez rejestracji · bez zobowiązań
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
