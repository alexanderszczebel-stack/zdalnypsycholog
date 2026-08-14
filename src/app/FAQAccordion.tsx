"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Czy konsultacja online może być dla mnie?",
    a: "Może być dobrym rozwiązaniem, jeśli chcesz spokojnie nazwać trudność, uporządkować sytuację i sprawdzić możliwy dalszy kierunek. Ostateczny zakres pracy ustalany jest indywidualnie.",
  },
  {
    q: "Jak wygląda pierwsze spotkanie?",
    a: "Pierwsza konsultacja trwa 50 minut. Rozmawiamy o tym, co jest teraz najważniejsze, w jakim kontekście pojawia się trudność i jaki kolejny krok może być adekwatny.",
  },
  {
    q: "Czy mogę połączyć się z zagranicy?",
    a: "Tak. Konsultacje odbywają się online i mogą być prowadzone po polsku niezależnie od miejsca pobytu. Termin wybierasz online.",
  },
  {
    q: "Czy muszę mieć kamerę?",
    a: "Najlepiej, jeśli spotkanie odbywa się z kamerą i mikrofonem, w spokojnym miejscu. Jeśli masz ograniczenia techniczne, warto omówić to przed terminem.",
  },
  {
    q: "Czy rozmowa jest poufna?",
    a: "Tak. Konsultacje prowadzone są z poszanowaniem poufności i zasad etyki zawodu psychologa. Wyjątkiem są sytuacje bezpośredniego zagrożenia życia lub zdrowia.",
  },
  {
    q: "Co jeśli nie wiem, z czym dokładnie przychodzę?",
    a: "To wystarczający powód do konsultacji. Nie musisz mieć gotowej diagnozy ani precyzyjnego opisu problemu. Pierwsza rozmowa służy uporządkowaniu sytuacji.",
  },
  {
    q: "Czy mogę umówić się telefonicznie?",
    a: "Wybór terminu i płatność odbywają się online. Telefon pozostaje dostępny w sprawach organizacyjnych przed rezerwacją.",
  },
  {
    q: "Gdzie znajdę ceny konsultacji?",
    a: "Aktualne ceny znajdują się w zakładce Cennik. Na pozostałych stronach skupiamy się przede wszystkim na tym, czy ta forma konsultacji pasuje do Twojej sytuacji.",
  },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ border: "1px solid rgba(45,41,38,0.08)", background: "#fff" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[rgba(45,41,38,0.02)]"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold leading-snug text-[#2D2926]">{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 text-[#9A8E85] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        />
      </button>
      {open && <p className="px-6 pb-5 text-sm leading-relaxed text-[#6F6860]">{a}</p>}
    </div>
  );
}

export default function FAQAccordion() {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <FAQItem key={faq.q} q={faq.q} a={faq.a} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
