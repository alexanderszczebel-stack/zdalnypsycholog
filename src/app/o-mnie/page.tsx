import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "O Mnie – Mikołaj Szczebel, Psycholog Online",
  description:
    "Poznaj Mikołaja Szczebla – doświadczonego psychologa online. Dowiedz się o jego podejściu, kwalifikacjach i filozofii pracy.",
};

const qualifications = [
  "Magister Psychologii, Uniwersytet Warszawski",
  "Certyfikowany Psychoterapeuta Poznawczo-Behawioralny (CBT)",
  "Ukończone szkolenie z Terapii Schematów",
  "8 lat doświadczenia w pracy jako psycholog",
  "Specjalizacja: lęk, depresja, wypalenie zawodowe, ADHD u dorosłych, kryzysy życiowe",
  "Członek Polskiego Towarzystwa Terapii Poznawczo-Behawioralnej",
];

const approaches = [
  {
    title: "CBT i Terapia Schematów",
    description: "Sprawdzone metody, dostosowane do Twoich indywidualnych potrzeb.",
  },
  {
    title: "Aktywna współpraca",
    description: "Jesteś ekspertem od swojego życia, ja dostarczam narzędzi i wsparcia.",
  },
  {
    title: "Zaufanie i szacunek",
    description: "Bezpieczna przestrzeń na każdą rozmowę, bez oceniania.",
  },
];

export default function OmniePage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 bg-[color:var(--color-bg-main)]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="section-label">O Mnie</span>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-[color:var(--color-text-primary)] mb-6 leading-tight">
                Cześć, jestem Mikołaj.
              </h1>
              <div className="prose prose-base text-[color:var(--color-text-secondary)] leading-relaxed space-y-4">
                <p>
                  Witaj na ZdalnyPsycholog.pl! Nazywam się Mikołaj Szczebel i jestem psychologiem
                  z pasją do wspierania ludzi w ich drodze do lepszego samopoczucia i pełniejszego
                  życia. Wierzę, że każdy z nas zasługuje na spokój, równowagę i szczęście,
                  a terapia online jest skutecznym narzędziem, by to osiągnąć.
                </p>
                <p>
                  Moja przygoda z psychologią rozpoczęła się wiele lat temu, kiedy zrozumiałem,
                  jak ogromny wpływ na nasze życie ma zdrowie psychiczne. Ukończyłem psychologię
                  na renomowanej uczelni, a następnie kontynuowałem rozwój, specjalizując się
                  w terapii poznawczo-behawioralnej (CBT) oraz terapii schematów.
                </p>
                <p>
                  W mojej pracy stawiam na autentyczność, empatię i budowanie bezpiecznej
                  przestrzeni, w której możesz swobodnie wyrażać swoje myśli i uczucia.
                  Nie oceniam — wspieram. Moim celem jest nie tylko pomoc w rozwiązaniu
                  bieżących problemów, ale też wyposażenie Cię w narzędzia, które pozwolą
                  radzić sobie z przyszłymi trudnościami i żyć świadomie.
                </p>
                <p>
                  ZdalnyPsycholog.pl powstało z myślą o tych, którzy cenią sobie komfort,
                  dyskrecję i elastyczność. Niezależnie od tego, gdzie jesteś — w Polsce
                  czy za granicą — możesz liczyć na profesjonalne i ciepłe wsparcie.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary-light)] rounded-3xl flex items-end p-8">
                <div className="text-white">
                  <p className="font-display font-bold text-2xl mb-1">Mikołaj Szczebel</p>
                  <p className="text-white/70">Psycholog online • CBT • 8 lat doświadczenia</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg-secondary)] py-16">
        <div className="container-main">
          <AnimatedSection>
            <blockquote className="bg-white rounded-2xl p-8 border-l-4 border-[color:var(--color-primary)] shadow-[var(--shadow-card)]">
              <p className="font-display font-semibold text-xl md:text-2xl text-[color:var(--color-text-primary)] italic leading-relaxed">
                &ldquo;Wierzę, że każdy kryzys jest szansą na rozwój. Moim zadaniem jest pomóc
                Ci odnaleźć w sobie siłę, by przekształcić wyzwania w osobisty triumf.&rdquo;
              </p>
              <footer className="mt-4 text-[color:var(--color-text-muted)] text-sm">— Mikołaj Szczebel</footer>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-6">
                Kwalifikacje
              </h2>
              <ul className="space-y-3">
                {qualifications.map((q) => (
                  <li key={q} className="flex gap-3 items-start">
                    <Check size={18} className="text-[color:var(--color-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-6">
                Podejście do pracy
              </h2>
              <div className="space-y-5">
                {approaches.map((a) => (
                  <div key={a.title} className="bg-[color:var(--color-bg-secondary)] rounded-xl p-5">
                    <h3 className="font-display font-semibold text-base text-[color:var(--color-text-primary)] mb-1">
                      {a.title}
                    </h3>
                    <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg-secondary)] py-16">
        <div className="container-main max-w-3xl">
          <AnimatedSection>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-4">
              Poza gabinetem
            </h2>
            <p className="text-[color:var(--color-text-secondary)] leading-relaxed">
              Poza pracą cenię sobie bliskość natury i aktywny wypoczynek. Moje pasje to długie
              wędrówki po górach i dobra książka. Wierzę, że równowaga między życiem zawodowym
              a prywatnym jest kluczem do dobrego samopoczucia — i dokładnie to staram się
              przekazywać swoim klientom.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-20 text-center">
        <div className="container-main">
          <AnimatedSection>
            <p className="text-[color:var(--color-text-secondary)] text-lg mb-6">
              Chcesz się dowiedzieć więcej?
            </p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-8">
              Umów bezpłatną konsultację.
            </h2>
            <Link href="/kontakt" className="btn-primary">
              Zarezerwuj wizytę
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
