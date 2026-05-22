import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    quote:
      "Najbardziej pomogło mi to, że nie musiałam od razu wiedzieć, kogo wybrać. Zostałam spokojnie poprowadzona przez cały proces.",
    author: "Karolina W.",
    context: "po pierwszej sesji",
  },
  {
    quote:
      "Cały proces był spokojny i prosty. To zdjęło ze mnie dużo napięcia — zanim jeszcze zaczęłam rozmowę z psychologiem.",
    author: "Marta P.",
    context: "terapia online, 3 miesiące",
  },
  {
    quote:
      "Czułam, że jestem prowadzona krok po kroku, bez presji. Mogłam wycofać się w każdej chwili i to poczucie bezpieczeństwa bardzo pomogło.",
    author: "Anna K.",
    context: "konsultacja jednorazowa",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#F6EFE6]">
      <div className="container-main">
        <AnimatedSection className="max-w-xl mx-auto text-center mb-12">
          <p className="section-label mb-4">Doświadczenia</p>
          <h2
            className="font-display font-semibold text-[#2D2926]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
          >
            Co mówią osoby, które zrobiły pierwszy krok.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                className="relative rounded-[24px] p-7 h-full overflow-hidden"
                style={{
                  background: i === 1
                    ? "linear-gradient(135deg, #1F314D 0%, #2A4268 100%)"
                    : "rgba(255,255,255,0.72)",
                  border: i === 1 ? "none" : "1px solid rgba(45,41,38,0.08)",
                  boxShadow: i === 1
                    ? "0 8px 40px rgba(31,49,77,0.18)"
                    : "0 2px 20px rgba(45,41,38,0.05)",
                }}
              >
                {/* Large decorative quote mark */}
                <div
                  className="absolute top-4 right-5 font-display text-8xl leading-none select-none"
                  style={{
                    color: i === 1 ? "rgba(255,255,255,0.08)" : "rgba(45,41,38,0.06)",
                    fontSize: "6rem",
                  }}
                >
                  &ldquo;
                </div>

                <p
                  className="relative z-10 mb-6 leading-relaxed"
                  style={{
                    color: i === 1 ? "rgba(255,255,255,0.92)" : "#2D2926",
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div
                  className="pt-5"
                  style={{
                    borderTop: i === 1
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "1px solid rgba(45,41,38,0.08)",
                  }}
                >
                  <p
                    className="font-display font-semibold text-sm"
                    style={{ color: i === 1 ? "rgba(255,255,255,0.9)" : "#2D2926" }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: i === 1 ? "rgba(255,255,255,0.5)" : "#9A8E85" }}
                  >
                    {t.context}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
