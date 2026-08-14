import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bezpieczeństwo i prywatność",
  description:
    "Informacje o poufności, bezpieczeństwie danych i zasadach korzystania z konsultacji psychologicznych online.",
  alternates: { canonical: canonicalUrl("/bezpieczenstwo-i-prywatnosc") },
};

const items = [
  {
    title: "Poufność rozmowy",
    text: "Konsultacje odbywają się zgodnie z zasadami poufności i etyki pracy psychologa. To, co mówisz podczas spotkania, pozostaje w ramach procesu pomocy.",
  },
  {
    title: "Bezpieczne miejsce do rozmowy",
    text: "Do spotkania wybierz spokojne miejsce, w którym nikt nie będzie Ci przeszkadzał. Warto zadbać o słuchawki, stabilny internet i prywatność po swojej stronie.",
  },
  {
    title: "Dane osobowe",
    text: "Dane przekazywane przez formularz kontaktowy są wykorzystywane wyłącznie do obsługi zapytania, ustalenia terminu oraz realizacji konsultacji.",
  },
  {
    title: "Sytuacje kryzysowe",
    text: "Konsultacja online nie zastępuje interwencji kryzysowej. W sytuacji bezpośredniego zagrożenia życia lub zdrowia zadzwoń pod numer 112.",
  },
];

export default function BezpieczenstwoPage() {
  return (
    <main className="pt-32 md:pt-40 pb-20 bg-[#F6EFE6]">
      <div className="container-main max-w-3xl">
        <p className="section-label mb-4">Bezpieczeństwo</p>
        <h1 className="font-display font-semibold text-4xl text-[#2D2926]">
          Bezpieczeństwo i prywatność
        </h1>
        <p className="text-[#6F6860] mt-4 max-w-2xl leading-relaxed">
          Kilka zasad, które pomagają zadbać o komfort, poufność i bezpieczeństwo
          konsultacji psychologicznej online.
        </p>

        <div className="mt-10 grid gap-4">
          {items.map((item) => (
            <section
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
              style={{ border: "1px solid rgba(45,41,38,0.06)" }}
            >
              <h2 className="font-display font-semibold text-lg text-[#1F314D]">
                {item.title}
              </h2>
              <p className="text-[#6F6860] mt-2 leading-relaxed">{item.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
