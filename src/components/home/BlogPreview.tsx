import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

const categories = ["Zrozumienie siebie", "Relacje", "Praca i wypalenie", "Terapia online"];

const articles = [
  {
    category: "Terapia online",
    title: "Jak wygląda pierwsza konsultacja z psychologiem online?",
    excerpt:
      "Wiele osób zastanawia się, czego się spodziewać. Spokojnie — nikt nie oczekuje gotowości ani precyzyjnych odpowiedzi.",
    readTime: "4 min",
    href: "/blog/jak-wyglada-konsultacja",
  },
  {
    category: "Zrozumienie siebie",
    title: "Kiedy stres zaczyna być sygnałem, że warto porozmawiać?",
    excerpt:
      "Stres jest naturalny. Ale jest też taki poziom napięcia, który mówi nam, że potrzebujemy wsparcia — i to jest w porządku.",
    readTime: "5 min",
    href: "/blog/kiedy-stres-to-sygnal",
  },
  {
    category: "Terapia online",
    title: "Jak wybrać psychologa, jeśli nie wiesz, od czego zacząć?",
    excerpt:
      "Nie musisz wiedzieć, jakiego specjalisty szukasz. Kilka spokojnych pytań wystarczy, żeby znaleźć właściwy kierunek.",
    readTime: "6 min",
    href: "/blog/jak-wybrac-psychologa",
  },
];

const categoryColors: Record<string, string> = {
  "Zrozumienie siebie": "rgba(31,49,77,0.10)",
  "Relacje": "rgba(188,108,37,0.10)",
  "Praca i wypalenie": "rgba(45,41,38,0.07)",
  "Terapia online": "rgba(31,49,77,0.07)",
};

const categoryTextColors: Record<string, string> = {
  "Zrozumienie siebie": "#1F314D",
  "Relacje": "#BC6C25",
  "Praca i wypalenie": "#6F6860",
  "Terapia online": "#1F314D",
};

export default function BlogPreview() {
  return (
    <section className="section-padding bg-[#FDFBF7]">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <AnimatedSection className="max-w-xl">
            <p className="section-label mb-4">Wiedza i refleksja</p>
            <h2
              className="font-display font-semibold text-[#2D2926]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
            >
              Spokojne odpowiedzi na trudne pytania.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <Link href="/blog" className="btn-ghost whitespace-nowrap">
              Wszystkie artykuły →
            </Link>
          </AnimatedSection>
        </div>

        {/* Category filter pills */}
        <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?kategoria=${encodeURIComponent(cat)}`}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: "rgba(45,41,38,0.06)",
                color: "#6F6860",
                border: "1px solid transparent",
              }}
            >
              {cat}
            </Link>
          ))}
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <AnimatedSection key={article.href} delay={i * 0.1}>
              <Link
                href={article.href}
                className="group block rounded-[24px] overflow-hidden h-full transition-all duration-350"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(45,41,38,0.08)",
                  boxShadow: "0 2px 20px rgba(45,41,38,0.05)",
                }}
              >
                {/* Top decorative bar */}
                <div
                  className="h-1 w-full transition-all duration-400 group-hover:h-1.5"
                  style={{
                    background: i === 0
                      ? "linear-gradient(90deg, #1F314D, #BC6C25)"
                      : i === 1
                      ? "linear-gradient(90deg, #BC6C25, #E8D8C4)"
                      : "linear-gradient(90deg, #1F314D, transparent)",
                  }}
                />

                <div className="p-6 md:p-7 flex flex-col h-[calc(100%-4px)]">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: categoryColors[article.category] || "rgba(45,41,38,0.06)",
                        color: categoryTextColors[article.category] || "#6F6860",
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="text-[#9A8E85] text-xs">{article.readTime} czytania</span>
                  </div>

                  <h3
                    className="font-display font-semibold text-[#2D2926] mb-3 leading-snug group-hover:text-[#1F314D] transition-colors"
                    style={{ fontSize: "1.0625rem" }}
                  >
                    {article.title}
                  </h3>

                  <p className="text-[#6F6860] text-sm leading-relaxed flex-1">{article.excerpt}</p>

                  <div
                    className="mt-5 pt-4 flex items-center gap-1.5 text-[#BC6C25] text-sm font-medium"
                    style={{ borderTop: "1px solid rgba(45,41,38,0.07)" }}
                  >
                    Czytaj dalej
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 7h8M8 4l3 3-3 3"
                        stroke="#BC6C25"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
