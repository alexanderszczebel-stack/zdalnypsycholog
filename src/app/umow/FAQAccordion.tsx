"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Czy terapia online działa tak samo jak stacjonarna?",
    a: "Tak — badania potwierdzają porównywalną skuteczność. Dla wielu osób online jest nawet wygodniejsze i mniej stresujące niż wizyta w gabinecie.",
  },
  {
    q: "Ile trwa pierwsza konsultacja i ile kosztuje?",
    a: "Pierwsza konsultacja trwa 50 minut i kosztuje 150 zł. Płatność przed sesją, kartą lub przelewem. Bez umów i zobowiązań.",
  },
  {
    q: "Czy to jest poufne?",
    a: "Tak — obowiązuje pełna tajemnica zawodowa. Twoje sprawy pozostają wyłącznie między Tobą a psychologiem.",
  },
  {
    q: "Czy muszę wiedzieć co mi jest żeby się zapisać?",
    a: "Nie — wystarczy że czujesz że coś jest trudne. Nie potrzebujesz diagnozy ani gotowego opisu problemu.",
  },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(45,41,38,0.08)", background: "#fff" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-[rgba(45,41,38,0.02)] transition-colors"
      >
        <span className="font-semibold text-[#2D2926] text-sm leading-snug">{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 text-[#9A8E85] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p className="px-6 pb-5 text-[#6F6860] text-sm leading-relaxed">{a}</p>
      )}
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
