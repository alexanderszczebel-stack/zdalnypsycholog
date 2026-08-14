import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, MessageCircle, ShieldCheck } from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import PhoneCTA, { PhoneTextLink, WhatsAppCTA } from "@/components/ui/PhoneCTA";
import type { AiLandingPage } from "@/data/aiLandingPages";
import { canonicalUrl } from "@/lib/site";

type AiIntentPageProps = {
  page: AiLandingPage;
};

function buildSchema(page: AiLandingPage) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.metaDescription,
      url: canonicalUrl(`/${page.slug}`),
      inLanguage: "pl-PL",
      about: page.quickFacts.join(", "),
      isPartOf: {
        "@type": "WebSite",
        name: "zdalnypsycholog.pl",
        url: canonicalUrl("/"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
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
          name: page.title,
          item: canonicalUrl(`/${page.slug}`),
        },
      ],
    },
  ];
}

export default function AiIntentPage({ page }: AiIntentPageProps) {
  const schema = buildSchema(page);

  return (
    <main className="bg-[#FDFBF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-[#F6EFE6] px-5 pb-14 pt-[92px] md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div className="max-w-3xl">
            <p className="section-label mb-4">{page.eyebrow}</p>
            <h1 className="font-display text-[2.15rem] font-semibold leading-[1.08] text-[#1F314D] md:text-5xl">
              {page.title}
            </h1>
            <div className="mt-6 grid gap-4">
              {page.lead.map((paragraph) => (
                <p key={paragraph} className="max-w-2xl text-base leading-relaxed text-[#6F6860] md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {page.quickFacts.map((fact) => (
                <span
                  key={fact}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    border: "1px solid rgba(45,41,38,0.08)",
                    color: "#1F314D",
                  }}
                >
                  {fact}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
              <Link href="/kontakt#formularz" className="btn-secondary w-full sm:w-auto">
                Zadaj pytanie
              </Link>
            </div>
          </div>

          <aside
            className="rounded-[2rem] bg-white p-6"
            style={{
              border: "1px solid rgba(45,41,38,0.08)",
              boxShadow: "0 24px 70px rgba(31,49,77,0.12)",
            }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
              <MessageCircle size={24} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl font-semibold leading-tight text-[#1F314D]">
              Pierwszy krok to rozmowa.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">
              Możesz umówić termin online albo najpierw skontaktować się telefonicznie. Telefon:{" "}
              <PhoneTextLink className="font-semibold text-[#1F314D] hover:text-[#BC6C25]" />.
            </p>
            <div className="mt-6 grid gap-3">
              <PhoneCTA text="Zadzwoń" className="btn-primary w-full" />
              <WhatsAppCTA text="Napisz na WhatsApp" className="btn-secondary w-full" />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl p-6"
                style={{
                  background: "#FDFBF7",
                  border: "1px solid rgba(45,41,38,0.08)",
                  boxShadow: "0 12px 30px rgba(31,49,77,0.04)",
                }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#BC6C25]">
                  <CheckCircle2 size={21} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h2 className="font-display text-xl font-semibold leading-snug text-[#1F314D]">
                  {section.title}
                </h2>
                <div className="mt-3 grid gap-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-[#6F6860]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-5 grid gap-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-[#6F6860]">
                        <CheckCircle2 size={16} strokeWidth={1.9} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE6] px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div>
            <p className="section-label mb-3">Dla kogo</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-4xl">
              To może być dobry moment na konsultację, jeśli...
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6F6860]">
              Nie trzeba czekać, aż trudność stanie się skrajna. Pierwsza rozmowa może pomóc
              sprawdzić, co dzieje się teraz i jaki krok jest możliwy.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {page.goodFit.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl bg-white p-5"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <ShieldCheck size={19} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" />
                <p className="text-sm font-semibold leading-relaxed text-[#1F314D]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="section-label mb-3 justify-center">FAQ</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-4xl">
              Najczęstsze pytania
            </h2>
          </div>
          <div className="mt-10 grid gap-4">
            {page.faq.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl bg-[#FDFBF7] p-6"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <div className="flex gap-3">
                  <HelpCircle size={20} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#1F314D]">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6F6860]">{item.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FDFBF7] px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(31,49,77,0.05)", border: "1px solid rgba(31,49,77,0.10)" }}
          >
            <div className="flex gap-3">
              <AlertTriangle size={20} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" />
              <p className="text-sm leading-relaxed text-[#6F6860]">
                Konsultacja online nie zastępuje interwencji kryzysowej. W sytuacji bezpośredniego
                zagrożenia życia lub zdrowia skontaktuj się z numerem alarmowym{" "}
                <strong className="font-semibold text-[#1F314D]">112</strong> albo najbliższą pomocą
                kryzysową.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold leading-tight text-[#1F314D] md:text-3xl">
              Przydatne linki
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F314D] transition-colors hover:text-[#BC6C25]"
                  style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                >
                  {link.label}
                  <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
              <Link href="/kontakt#formularz" className="btn-secondary w-full sm:w-auto">
                Formularz kontaktowy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
