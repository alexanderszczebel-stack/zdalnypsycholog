import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PricingCard from "@/components/offer/PricingCard";
import FAQSection from "@/components/home/FAQSection";
import { Shield, Video, FileText, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Oferta i Cennik | Konsultacje Psychologiczne Online",
  description:
    "Przejrzyste ceny konsultacji psychologicznych online. Pojedyncze sesje i pakiety. Płatność online, pełna elastyczność.",
};

const packages = [
  {
    title: "Pojedyncza Konsultacja",
    price: "180 zł",
    duration: "50 minut",
    forWho: "Idealna na start lub jednorazowe wsparcie",
    features: [
      "Indywidualne podejście",
      "Bezpieczna przestrzeń",
      "Plan dalszych kroków",
      "Szyfrowane połączenie wideo",
    ],
    ctaLabel: "Zarezerwuj sesję",
    highlighted: false,
  },
  {
    title: "Pakiet 5 Sesji",
    price: "850 zł",
    duration: "5 × 50 minut • oszczędzasz 50 zł",
    forWho: "Regularne wsparcie, widoczne postępy",
    features: [
      "Wszystko z pojedynczej sesji",
      "Indywidualny plan terapeutyczny",
      "E-mail wsparcie między sesjami",
      "Elastyczne terminy",
    ],
    ctaLabel: "Wybierz pakiet 5 sesji",
    highlighted: true,
    badge: "Polecany",
  },
  {
    title: "Pakiet 10 Sesji",
    price: "1 600 zł",
    duration: "10 × 50 minut • oszczędzasz 200 zł",
    forWho: "Długoterminowa zmiana i głęboka praca",
    features: [
      "Wszystko z pakietu 5 sesji",
      "Priorytetowe terminy",
      "Możliwość przeniesienia sesji",
      "Wsparcie między sesjami",
    ],
    ctaLabel: "Wybierz pakiet 10 sesji",
    highlighted: false,
  },
];

const sessionIncludes = [
  { icon: Video, label: "Szyfrowane połączenie wideo" },
  { icon: Shield, label: "Pełna poufność (RODO)" },
  { icon: FileText, label: "Indywidualny plan terapii" },
  { icon: Lightbulb, label: "Narzędzia do pracy własnej" },
];

const pricingFaq = [
  { q: "Czy mogę zapłacić po sesji?", a: "Nie, płatność z góry zapewnia płynność procesu terapeutycznego." },
  { q: "Czy oferujecie zniżki studenckie?", a: "Śledź nasze media społecznościowe — regularnie informujemy o promocjach i zniżkach." },
  { q: "Czy możliwe są raty?", a: "W wyjątkowych sytuacjach jest to możliwe — skontaktuj się z nami bezpośrednio." },
  { q: "Jak długo ważne są sesje w pakiecie?", a: "Sesje z pakietu są ważne przez 6 miesięcy od daty zakupu." },
  { q: "Czy wystawiacie faktury?", a: "Tak, faktury wystawiamy na życzenie. Poproś o fakturę podczas rezerwacji." },
];

export default function OfertaICennikPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 bg-[color:var(--color-bg-main)]">
        <div className="container-main text-center">
          <AnimatedSection>
            <span className="section-label justify-center">Oferta i Cennik</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-[color:var(--color-text-primary)] mb-4 leading-tight">
              Transparentne ceny, bez zobowiązań
            </h1>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              W ZdalnyPsycholog.pl wierzymy w transparentność. Poniżej znajdziesz wszystkie opcje
              wsparcia — bez ukrytych kosztów, bez zobowiązań.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, i) => (
              <AnimatedSection key={pkg.title} delay={i * 0.1}>
                <PricingCard {...pkg} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg-secondary)] py-16">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)] text-center mb-10">
              Co zawiera każda sesja
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sessionIncludes.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[color:var(--color-primary)]/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={24} className="text-[color:var(--color-primary)]" />
                    </div>
                    <p className="text-sm font-medium text-[color:var(--color-text-primary)]">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-main max-w-3xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[color:var(--color-bg-secondary)] rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg text-[color:var(--color-text-primary)] mb-3">
                  Metody płatności
                </h3>
                <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">
                  Akceptujemy: <strong>PayU, Stripe</strong>.<br />
                  Waluty: PLN, EUR, USD, GBP.<br />
                  Płatność przed sesją, faktury na życzenie.
                </p>
              </div>
              <div className="bg-[color:var(--color-bg-secondary)] rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg text-[color:var(--color-text-primary)] mb-3">
                  Polityka odwołań
                </h3>
                <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">
                  Odwołanie do 24h przed sesją — <strong>bezpłatne</strong>.<br />
                  Poniżej 24h — pełna opłata.<br />
                  W wyjątkowych sytuacjach — prosimy o kontakt.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg-main)] section-padding">
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)]">
              Pytania o płatności
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {pricingFaq.map((item) => (
              <div key={item.q} className="py-4">
                <p className="font-semibold text-[color:var(--color-text-primary)] text-sm mb-1">{item.q}</p>
                <p className="text-[color:var(--color-text-secondary)] text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
