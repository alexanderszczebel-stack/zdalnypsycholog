import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Compass } from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import { helpAreas } from "@/data/helpAreas";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { canonicalUrl } from "@/lib/site";

export const metadata = {
  title: "Obszary pomocy | zdalnypsycholog.pl",
  description:
    "Lęk, stres, wypalenie, obniżony nastrój, relacje i inne obszary wsparcia psychologicznego online. Przeczytaj artykuły i sprawdź, kiedy warto skorzystać z konsultacji.",
  alternates: { canonical: canonicalUrl("/obszary-pomocy") },
};

const consultationGuides = [
  getAiLandingPage("konsultacja-psychologiczna-online"),
  getAiLandingPage("psycholog-online-lek-i-napiecie"),
  getAiLandingPage("psycholog-online-stres-i-przeciazenie"),
  getAiLandingPage("psycholog-online-relacje"),
  getAiLandingPage("psycholog-online-obnizony-nastroj"),
  getAiLandingPage("psycholog-online-adhd-koncentracja"),
  getAiLandingPage("psycholog-online-samoocena"),
  getAiLandingPage("psycholog-online-ataki-paniki"),
  getAiLandingPage("cbt-online"),
  getAiLandingPage("tsr-online"),
  getAiLandingPage("czy-konsultacja-online-jest-dla-mnie"),
  getAiLandingPage("pierwsza-konsultacja-psychologiczna-online"),
];

export default function ObszaryPomocyPage() {
  return (
    <main>
      <section style={{ background: "#F6EFE6" }} className="px-6 pb-16 pt-[92px] md:pb-20 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
                Obszary pomocy
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl" style={{ color: "#1F314D" }}>
                Z czym możesz zgłosić się na konsultację psychologiczną?
              </h1>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "#6F6860" }}>
                Poniżej znajdziesz najczęstsze obszary pracy konsultacyjnej. Każda karta prowadzi
                do krótkiego artykułu, który pomaga spokojnie rozpoznać temat i sprawdzić, kiedy
                rozmowa z psychologiem może być właściwym krokiem.
              </p>
            </div>

            <div
              className="rounded-3xl p-6"
              style={{
                background: "rgba(255,255,255,0.68)",
                border: "1px solid rgba(45,41,38,0.08)",
              }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: "#1F314D", color: "#FFFFFF" }}>
                <BookOpen size={21} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p className="font-semibold" style={{ color: "#1F314D" }}>
                Najpierw wiedza, potem decyzja.
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6F6860" }}>
                Artykuły nie zastępują konsultacji, ale pomagają nazwać problem i przygotować
                pierwszą rozmowę.
              </p>
              <Link
                href="/dobierz-sciezke"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1F314D] transition-colors hover:text-[#BC6C25]"
              >
                <Compass size={15} strokeWidth={1.8} aria-hidden="true" />
                Dobierz pierwszy krok
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
                Artykuły według obszaru
              </p>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
                Wybierz temat, który jest najbliższy Twojej sytuacji.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-[#BC6C25]"
              style={{ color: "#1F314D" }}
            >
              Wszystkie artykuły
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {helpAreas.map((area) => (
              <Link key={area.id} href={`/blog/${area.articleSlug}`} className="group block h-full">
                <article
                  className="flex h-full flex-col rounded-2xl p-6 transition duration-300 group-hover:-translate-y-1"
                  style={{
                    background: "rgba(246,239,230,0.46)",
                    border: "1px solid rgba(45,41,38,0.08)",
                    boxShadow: "0 12px 30px rgba(31,49,77,0.05)",
                  }}
                >
                  <div className="mb-5 opacity-45 transition-opacity duration-300 group-hover:opacity-75">
                    <svg width="46" height="46" viewBox="0 0 50 50" fill="none" aria-hidden="true">
                      <path d={area.shape} fill="#1F314D" />
                    </svg>
                  </div>

                  <h2 className="text-xl font-bold" style={{ color: "#1F314D" }}>
                    {area.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed md:text-base" style={{ color: "#6F6860" }}>
                    {area.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: "#FFFFFF",
                          color: "#6F6860",
                          border: "1px solid rgba(45,41,38,0.08)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-[#BC6C25]"
                    style={{ color: "#1F314D" }}
                  >
                    Przeczytaj artykuł
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </article>
              </Link>
            ))}
          </div>

          <div
            className="mt-12 grid gap-6 rounded-3xl p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9"
            style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.08)" }}
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold md:text-3xl" style={{ color: "#1F314D" }}>
                Nie wiesz, od czego zacząć?
              </h2>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "#6F6860" }}>
                Jeśli trudno przypisać swoją sytuację do jednej kategorii, pierwsza konsultacja
                może pomóc uporządkować najważniejsze informacje i ustalić dalszy kierunek.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <BookingCTA text="Wybierz termin konsultacji" className="btn-primary" />
              <Link href="/dobierz-sciezke" className="btn-secondary">
                Dobierz pierwszy krok
              </Link>
              <Link href="/kontakt#formularz" className="btn-secondary">
                Mam pytanie organizacyjne
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
                Przewodniki konsultacyjne
              </p>
              <h2 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: "#1F314D" }}>
                Konkretne odpowiedzi przed pierwszą rozmową.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {consultationGuides.map((guide) => (
                <Link key={guide.slug} href={`/${guide.slug}`} className="group block h-full">
                  <article
                    className="flex h-full flex-col rounded-2xl bg-white p-5 transition duration-300 group-hover:-translate-y-1"
                    style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                  >
                    <h3 className="font-display text-lg font-semibold text-[#1F314D]">{guide.eyebrow}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6F6860]">
                      {guide.metaDescription}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#BC6C25]">
                      Czytaj więcej
                      <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#F6EFE6" }} className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              pierwsza rozmowa
            </p>
            <h2 className="text-3xl font-bold leading-tight" style={{ color: "#1F314D" }}>
              Nie musisz mieć gotowej diagnozy ani idealnie pasować do kategorii.
            </h2>
          </div>
          <div className="space-y-4">
            {[
              "Wystarczy, że potrafisz wskazać, co obecnie najbardziej utrudnia funkcjonowanie.",
              "Podczas konsultacji porządkujemy objawy, kontekst i możliwe pierwsze kroki.",
              "Artykuły mają charakter edukacyjny i nie zastępują indywidualnej konsultacji.",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 size={19} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" aria-hidden="true" />
                <p className="text-base leading-relaxed" style={{ color: "#6F6860" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
