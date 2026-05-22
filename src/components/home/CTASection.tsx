import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LogoMark } from "@/components/layout/Logo";

export default function CTASection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1F314D 0%, #2A4268 60%, #1a2d47 100%)",
      }}
    >
      {/* Subtle background motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #E8D8C4, transparent 70%)" }}
        />
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-5"
          style={{ background: "#BC6C25" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-5"
          style={{ background: "#E8D8C4" }}
        />
      </div>

      <div className="container-main relative text-center">
        <AnimatedSection>
          {/* Logo mark in light version */}
          <div className="flex justify-center mb-8">
            <div
              className="p-5 rounded-3xl"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <LogoMark size={52} className="opacity-90" />
            </div>
          </div>

          <h2
            className="font-display font-semibold text-white mb-4 max-w-2xl mx-auto"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            Nie musisz robić dużego kroku.{" "}
            <span style={{ color: "#E8D8C4" }}>Wystarczy pierwszy.</span>
          </h2>

          <p
            className="mb-10 max-w-md mx-auto"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
            }}
          >
            Krótki quiz pomoże Ci spokojnie znaleźć odpowiednie wsparcie.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
            <Link href="/quiz" className="btn-primary">
              Zrób pierwszy krok
            </Link>
            <Link
              href="/o-mnie"
              className="inline-flex items-center justify-center gap-2 font-display font-semibold text-[0.9375rem] px-6 py-3 rounded-full border border-white/25 text-white hover:border-white/50 hover:bg-white/10 transition-all duration-250"
            >
              Poznaj Mikołaja
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              "Bez zobowiązań",
              "Pełna poufność",
              "Prosty wybór terminu",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <div className="w-1 h-1 rounded-full" style={{ background: "#BC6C25" }} />
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
