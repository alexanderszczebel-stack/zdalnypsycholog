import AnimatedSection from "@/components/ui/AnimatedSection";
import { LogoMark } from "@/components/layout/Logo";

const trustBlocks = [
  {
    title: "Poufność rozmów",
    desc: "Każda sesja objęta jest pełną tajemnicą zawodową. Twoje sprawy pozostają między Tobą a specjalistą.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="10" width="16" height="10" rx="3" stroke="#1F314D" strokeWidth="1.6" />
        <path d="M7 10V7a4 4 0 0 1 8 0v3" stroke="#1F314D" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="11" cy="15" r="1.5" fill="#BC6C25" />
      </svg>
    ),
  },
  {
    title: "Sprawdzeni specjaliści",
    desc: "Każdy specjalista przechodzi weryfikację wykształcenia i uprawnień przed dołączeniem do platformy.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="#1F314D" strokeWidth="1.6" />
        <path d="M7.5 11l2.5 2.5 5-5" stroke="#BC6C25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Bezpieczne płatności i terminy",
    desc: "Płatności szyfrowane, terminy elastyczne. Możesz odwołać lub przełożyć sesję bez stresu.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="18" height="12" rx="3" stroke="#1F314D" strokeWidth="1.6" />
        <path d="M2 10h18" stroke="#1F314D" strokeWidth="1.6" />
        <rect x="5" y="13" width="4" height="2" rx="1" fill="#BC6C25" />
      </svg>
    ),
  },
];

export default function WhyOnlineSection() {
  return (
    <section className="section-padding bg-[#FDFBF7]">
      <div className="container-main">
        {/* Trust section */}
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14">
          <div className="flex justify-center mb-5">
            <div
              className="p-4 rounded-3xl"
              style={{ background: "rgba(31,49,77,0.06)" }}
            >
              <LogoMark size={48} />
            </div>
          </div>
          <p className="section-label mb-4 justify-center">Bezpieczeństwo</p>
          <h2
            className="font-display font-semibold text-[#2D2926] mb-5"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Bezpieczeństwo i poufność są częścią procesu.
          </h2>
          <p
            className="text-[#6F6860]"
            style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
          >
            Rozmawiasz z certyfikowanym specjalistą, w szyfrowanym środowisku, bez śladów
            w historii wizyt. Tylko Ty i Twój psycholog.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {trustBlocks.map((block, i) => (
            <AnimatedSection key={block.title} delay={i * 0.1}>
              <div
                className="rounded-[24px] p-7 h-full"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(45,41,38,0.08)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(31,49,77,0.06)" }}
                >
                  {block.icon}
                </div>
                <h3
                  className="font-display font-semibold text-[#2D2926] mb-2.5"
                  style={{ fontSize: "1.0625rem" }}
                >
                  {block.title}
                </h3>
                <p className="text-[#6F6860] text-sm leading-relaxed">{block.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Crisis disclaimer */}
        <AnimatedSection>
          <div
            className="rounded-2xl px-6 py-4 flex gap-4 items-start max-w-3xl mx-auto"
            style={{ background: "rgba(45,41,38,0.04)", border: "1px solid rgba(45,41,38,0.06)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="10" cy="10" r="8" stroke="#9A8E85" strokeWidth="1.5" />
              <path d="M10 7v4" stroke="#9A8E85" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="14" r="0.8" fill="#9A8E85" />
            </svg>
            <p className="text-[#9A8E85] text-sm leading-relaxed">
              W sytuacji bezpośredniego zagrożenia życia lub zdrowia skontaktuj się z numerem
              alarmowym <strong className="text-[#6F6860] font-semibold">112</strong> albo
              najbliższą placówką pomocy kryzysowej.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
