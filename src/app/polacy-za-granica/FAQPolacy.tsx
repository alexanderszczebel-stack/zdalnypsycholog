"use client";
import { useState } from 'react';

const faqItems = [
  {
    q: 'Czy mogę skorzystać z konsultacji, mieszkając poza Polską?',
    a: 'Tak. Konsultacje odbywają się online i możesz połączyć się z dowolnego miejsca.',
  },
  {
    q: 'Czy spotkanie odbywa się po polsku?',
    a: 'Tak. Cała konsultacja odbywa się w języku polskim.',
  },
  {
    q: 'Ile trwa konsultacja?',
    a: 'Spotkanie trwa 50 minut.',
  },
  {
    q: 'Ile kosztuje konsultacja?',
    a: 'Koszt jednej konsultacji wynosi 250 zł.',
  },
  {
    q: 'Kiedy termin jest potwierdzony?',
    a: 'Termin zostaje potwierdzony po dokonaniu płatności podczas rezerwacji.',
  },
  {
    q: 'Co zrobić, jeżeli muszę odwołać spotkanie?',
    a: 'Zgodnie z regulaminem odwołanie lub zmiana terminu bez opłat są możliwe do 24 godzin przed planowanym terminem. Odwołanie w czasie krótszym niż 24 godziny wiąże się z pełną opłatą za sesję.',
  },
];

export default function FAQPolacy() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="rounded-[24px] overflow-hidden divide-y" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(45,41,38,0.08)' }}>
      {faqItems.map((item, i) => (
        <div key={i} style={{ borderColor: 'rgba(45,41,38,0.06)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
            style={{ background: 'transparent' }}
          >
            <span className="font-semibold text-sm leading-snug" style={{ color: '#2D2926' }}>{item.q}</span>
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
              style={{ background: open === i ? '#1F314D' : 'rgba(31,49,77,0.08)', color: open === i ? 'white' : '#1F314D' }}
            >
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#6F6860' }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
