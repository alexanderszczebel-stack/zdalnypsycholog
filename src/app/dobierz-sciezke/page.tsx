import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Compass, MessageCircle, ShieldCheck } from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import PathwayQuiz from "@/components/quiz/PathwayQuiz";
import { PhoneTextLink } from "@/components/ui/PhoneCTA";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nie wiesz, od czego zacząć? Dobierz pierwszy krok",
  description:
    "Krótka ankieta organizacyjna bez diagnozowania. Sprawdź, od jakiej strony lub konsultacji psychologicznej online najlepiej zacząć.",
  robots: { index: true, follow: true },
  alternates: { canonical: canonicalUrl("/dobierz-sciezke") },
  openGraph: {
    title: "Dobierz pierwszy krok | zdalnypsycholog.pl",
    description:
      "Krótka ankieta organizacyjna, która pomaga wybrać najbliższy przewodnik albo przejść do rezerwacji konsultacji online.",
    url: canonicalUrl("/dobierz-sciezke"),
    type: "website",
  },
};

const faqs = [
  {
    question: "Czy ankieta stawia diagnozę?",
    answer:
      "Nie. Ankieta ma wyłącznie charakter organizacyjny i edukacyjny. Pomaga wybrać najbliższy przewodnik lub pierwszy krok przed konsultacją.",
  },
  {
    question: "Czy moje odpowiedzi są wysyłane jako formularz medyczny?",
    answer:
      "Nie. Ankieta działa lokalnie w przeglądarce i nie zastępuje kontaktu z psychologiem ani dokumentacji medycznej.",
  },
  {
    question: "Czy mogę pominąć ankietę?",
    answer:
      "Tak. Możesz od razu wybrać termin konsultacji online albo zadać krótkie pytanie organizacyjne przez formularz kontaktowy.",
  },
  {
    question: "Co jeśli sytuacja jest pilna?",
    answer:
      "W sytuacji bezpośredniego zagrożenia życia lub zdrowia należy skontaktować się z numerem alarmowym 112 albo najbliższą pomocą kryzysową.",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Dobierz pierwszy krok",
    description: metadata.description,
    url: canonicalUrl("/dobierz-sciezke"),
    inLanguage: "pl-PL",
    isPartOf: {
      "@type": "WebSite",
      name: "zdalnypsycholog.pl",
      url: canonicalUrl("/"),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dobierz pierwszy krok",
        item: canonicalUrl("/dobierz-sciezke"),
      },
    ],
  },
];

const paths = [
  {
    icon: CalendarDays,
    title: "Od razu termin",
    text: "Dla osób, które wiedzą, że chcą rozpocząć od konsultacji online i przejść przez płatność.",
    href: "/rezerwacja",
    label: "Wybierz termin",
  },
  {
    icon: BookOpen,
    title: "Najpierw przewodnik",
    text: "Dla osób, które chcą spokojnie nazwać problem i zobaczyć, czy konsultacja będzie właściwa.",
    href: "/obszary-pomocy",
    label: "Zobacz obszary",
  },
  {
    icon: MessageCircle,
    title: "Pytanie organizacyjne",
    text: "Dla osób, które chcą dopytać o kwestie techniczne, płatność, dostępność lub formę kontaktu.",
    href: "/kontakt#formularz",
    label: "Zadaj pytanie",
  },
];

export default function DobierzSciezkePage() {
  return (
    <main className="bg-[#FDFBF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-[#F6EFE6] px-5 pb-14 pt-[92px] md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Dobór pierwszego kroku</p>
            <h1 className="font-display text-[2.15rem] font-semibold leading-[1.08] text-[#1F314D] md:text-5xl">
              Nie wiesz, od czego zacząć rozmowę z psychologiem online?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#6F6860] md:text-lg">
              Krótka ankieta pomoże wybrać najbliższy temat, przewodnik albo przejście do
              rezerwacji. Bez diagnozowania, bez oceniania i bez konieczności idealnego nazwania
              problemu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#ankieta" className="btn-primary w-full sm:w-auto">
                <Compass size={17} strokeWidth={1.9} aria-hidden="true" />
                Przejdź do ankiety
              </a>
              <BookingCTA text="Wybierz termin konsultacji" className="btn-secondary w-full sm:w-auto" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#6F6860]">
              W sprawach organizacyjnych możesz zadzwonić:{" "}
              <PhoneTextLink className="font-semibold text-[#1F314D] hover:text-[#BC6C25]" />.
            </p>
          </div>

          <aside
            className="rounded-[2rem] bg-white p-6"
            style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 24px 70px rgba(31,49,77,0.12)" }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
              <ShieldCheck size={24} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl font-semibold leading-tight text-[#1F314D]">
              Możesz przyjść bez gotowej diagnozy.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">
              Pierwsza konsultacja służy nazwaniu sytuacji, zrozumieniu kontekstu i ustaleniu
              dalszego kroku. Ankieta tylko porządkuje wejście na stronę.
            </p>
          </aside>
        </div>
      </section>

      <div id="ankieta" className="scroll-mt-24">
        <PathwayQuiz />
      </div>

      <section className="bg-[#F6EFE6] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="section-label mb-3">Trzy ścieżki</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-4xl">
              Nie każdy potrzebuje tego samego kroku przed pierwszą konsultacją.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {paths.map(({ icon: Icon, title, text, href, label }) => (
              <Link key={href} href={href} className="group block h-full">
                <article
                  className="flex h-full flex-col rounded-2xl bg-white p-6 transition duration-300 group-hover:-translate-y-1"
                  style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#BC6C25]">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-[#1F314D]">
                    {title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6F6860]">{text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#BC6C25]">
                    {label}
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-4xl">
            Najczęstsze pytania o ankietę
          </h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl bg-[#FDFBF7] p-6"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <h3 className="font-display text-lg font-semibold text-[#1F314D]">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6F6860]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
