import type { Metadata } from "next";
import Link from "next/link";
import BookingCTA from "@/components/booking/BookingCTA";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ | Najczęstsze pytania o konsultacje online",
  description:
    "Najczęstsze pytania o konsultacje psychologiczne online, pierwsze spotkanie, poufność, cenę i rezerwację online.",
  alternates: { canonical: canonicalUrl("/faq") },
};

const faqs = [
  {
    q: "Czy konsultacja online jest dla mnie?",
    a: "Może być dobrym rozwiązaniem, jeśli chcesz uporządkować sytuację, nazwać trudność i sprawdzić możliwy dalszy kierunek pracy. Nie musisz przychodzić z gotową diagnozą.",
  },
  {
    q: "Jak wygląda pierwsze spotkanie?",
    a: "Pierwsza konsultacja trwa 50 minut. Omawiamy najważniejszy temat, kontekst trudności, dotychczasowe sposoby radzenia sobie i to, jaki kolejny krok może być adekwatny.",
  },
  {
    q: "Czy mogę połączyć się z zagranicy?",
    a: "Tak. Konsultacje prowadzone są online i po polsku. Termin ustalany jest indywidualnie, z uwzględnieniem dostępności i strefy czasowej.",
  },
  {
    q: "Czy muszę mieć kamerę?",
    a: "Najlepiej, jeśli spotkanie odbywa się z kamerą i mikrofonem, w miejscu zapewniającym prywatność. Jeśli masz ograniczenia techniczne, omów to przed konsultacją.",
  },
  {
    q: "Jak się przygotować?",
    a: "Wystarczy spokojne miejsce, stabilne połączenie internetowe oraz kilka zdań o tym, co obecnie najbardziej utrudnia funkcjonowanie. Nie musisz mieć gotowego planu rozmowy.",
  },
  {
    q: "Czy rozmowa jest poufna?",
    a: "Tak. Konsultacje prowadzone są z poszanowaniem poufności i zasad etyki zawodu psychologa. Wyjątkiem są sytuacje bezpośredniego zagrożenia życia lub zdrowia.",
  },
  {
    q: "Czy terapia online może być skuteczna?",
    a: "Badania i praktyka kliniczna wskazują, że praca online może być pomocna w wielu sytuacjach, szczególnie gdy spotkanie ma jasne ramy, a osoba ma warunki do spokojnej rozmowy. Nie jest to jednak forma odpowiednia dla każdej sytuacji.",
  },
  {
    q: "Co jeśli nie wiem, z czym dokładnie przychodzę?",
    a: "To normalne. Pierwsza konsultacja służy właśnie temu, żeby uporządkować objawy, kontekst i możliwe dalsze kroki.",
  },
  {
    q: "Czy mogę umówić się telefonicznie?",
    a: "Wybór terminu i płatność odbywają się online. Telefon pozostaje dostępny w sprawach organizacyjnych przed rezerwacją.",
  },
  {
    q: "Gdzie znajdę cennik?",
    a: "Aktualne ceny konsultacji znajdują się w zakładce Cennik. Tam znajdziesz też informację o pakietach konsultacji indywidualnych i konsultacji dla par.",
  },
  {
    q: "Czy 50 minut wystarczy na pierwszą konsultację?",
    a: "50 minut zwykle wystarcza, żeby nazwać najważniejszy temat, zebrać kontekst i ustalić możliwy dalszy krok. Jeśli potrzebna jest kontynuacja, jest to omawiane po pierwszym spotkaniu.",
  },
  {
    q: "Czy płatność online jest bezpieczna?",
    a: "Płatność odbywa się online przez Stripe podczas rezerwacji. Termin zostaje potwierdzony po skutecznej płatności.",
  },
  {
    q: "Czy po płatności dostanę informacje o spotkaniu?",
    a: "Tak. Po rezerwacji i płatności otrzymasz potwierdzenie oraz informacje organizacyjne na podany adres e-mail.",
  },
  {
    q: "Czy mogę zadać pytanie, jeśli nie wiem, czy konsultacja jest dla mnie?",
    a: "Tak. Możesz skorzystać z ankiety 'Dobierz ścieżkę', formularza kontaktowego, telefonu albo WhatsApp w sprawach organizacyjnych.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <main className="bg-[#F6EFE6] pb-20 pt-32 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-main max-w-4xl">
        <p className="section-label mb-4">FAQ</p>
        <h1 className="font-display text-4xl font-semibold text-[#1F314D] md:text-5xl">
          Najczęstsze pytania
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6F6860] md:text-lg">
          Krótkie odpowiedzi na pytania, które najczęściej pojawiają się przed pierwszą
          konsultacją psychologiczną online.
        </p>

        <div className="mt-10 grid gap-4">
          {faqs.map((item) => (
            <section
              key={item.q}
              className="rounded-2xl bg-white p-6 shadow-sm"
              style={{ border: "1px solid rgba(45,41,38,0.06)" }}
            >
              <h2 className="font-display text-lg font-semibold text-[#1F314D]">{item.q}</h2>
              <p className="mt-2 leading-relaxed text-[#6F6860]">{item.a}</p>
            </section>
          ))}
        </div>

        <section
          className="mt-12 rounded-3xl p-7 md:p-9"
          style={{ background: "#FFFFFF", border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <h2 className="font-display text-2xl font-semibold text-[#1F314D]">
            Chcesz ustalić termin?
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-[#6F6860]">
            Wybierz dostępny termin online. Po dokonaniu płatności otrzymasz potwierdzenie
            oraz informacje organizacyjne dotyczące spotkania.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
            <Link href="/kontakt#formularz" className="btn-secondary w-full sm:w-auto">
              Mam pytanie organizacyjne
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
