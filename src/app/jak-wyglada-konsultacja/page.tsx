import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Play, Lock, Shield, Wifi } from "lucide-react";

export const metadata: Metadata = {
  title: "Jak Wygląda Konsultacja | Psycholog Online",
  description:
    "Dowiedz się, jak przebiega konsultacja online z Mikołajem Szczeblem. Krok po kroku od rezerwacji do planu terapii.",
};

const steps = [
  {
    number: "1",
    title: "Rezerwacja terminu",
    description:
      "Wybierz dogodny termin przez intuicyjny formularz kontaktowy. Proces zajmuje mniej niż 2 minuty. Możesz wybrać dowolną strefę czasową — jesteśmy do dyspozycji klientów z całego świata.",
  },
  {
    number: "2",
    title: "Potwierdzenie e-mailem",
    description:
      "Otrzymasz e-mail z potwierdzeniem terminu, linkiem do bezpiecznego pokoju wirtualnego oraz prostymi instrukcjami. Nie musisz instalować żadnych dodatkowych aplikacji.",
  },
  {
    number: "3",
    title: "Sesja online",
    description:
      "Spotkaj się z Mikołajem online w ustalonym terminie. Rozmowa odbywa się w atmosferze pełnego zaufania i dyskrecji. Możesz rozmawiać z dowolnego miejsca — ważne, byś czuł się komfortowo.",
  },
  {
    number: "4",
    title: "Plan dalszej pracy",
    description:
      "Po konsultacji wspólnie ustalicie, czy i jak kontynuować współpracę. Mikołaj przedstawi swoje obserwacje i zaproponuje indywidualny plan terapeutyczny. Bez presji, bez zobowiązań.",
  },
];

const firstSessionExpectations = [
  "Otwartą, życzliwą rozmowę — bez oceniania",
  "Pytania o Twoje obecne trudności i oczekiwania",
  "Przestrzeń do opowiedzenia swojej historii we własnym tempie",
  "Wstępną diagnozę i omówienie możliwych kierunków pracy",
  "Odpowiedzi na wszystkie Twoje pytania",
];

const additionalFaq = [
  {
    q: "Jak długo trwa typowa terapia?",
    a: "To zależy od indywidualnych potrzeb. Niektórzy klienci potrzebują kilku sesji, inni pracują ze mną przez wiele miesięcy. Nie ma jednej odpowiedzi — razem ustalimy tempo, które jest dla Ciebie odpowiednie.",
  },
  {
    q: "Czy mogę rozmawiać z telefonu?",
    a: "Tak. Platforma działa zarówno na komputerach, jak i urządzeniach mobilnych. Polecamy jednak, aby podczas sesji siedzieć wygodnie w cichym miejscu.",
  },
  {
    q: "Co jeśli spóźnię się na sesję?",
    a: "Poinformuj nas jak najszybciej przez e-mail lub telefon. W miarę możliwości postaramy się zakończyć sesję w zaplanowanym oknie czasowym lub zaproponować dodatkowy czas.",
  },
  {
    q: "Czy sesje są nagrywane?",
    a: "Nie. Sesje nie są w żaden sposób rejestrowane. Twoja prywatność i dyskrecja to nasz absolutny priorytet.",
  },
];

export default function JakWyglądaKonsultacjaPage() {
  return (
    <>
      <section className="pt-32 md:pt-40 pb-20 bg-[color:var(--color-bg-main)]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <span className="section-label justify-center">Jak to działa</span>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-[color:var(--color-text-primary)] mb-4 leading-tight">
                Jak wygląda konsultacja online?
              </h1>
              <p className="text-[color:var(--color-text-secondary)] text-lg">
                Wszystko zaprojektowane z myślą o Twoim komforcie — od rezerwacji po zakończenie sesji.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-main max-w-2xl">
          <AnimatedSection>
            <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center cursor-pointer group">
              <div className="flex flex-col items-center gap-3 text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                  <Play size={28} className="fill-white text-white ml-1" />
                </div>
                <p className="text-sm text-white/70">Jak wygląda sesja? — 2 minuty</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg-secondary)] section-padding">
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)]">
              Krok po kroku
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.1}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[color:var(--color-primary)] text-white font-display font-bold text-lg flex items-center justify-center">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-6">
                Czego możesz się spodziewać po pierwszej sesji
              </h2>
              <ul className="space-y-3">
                {firstSessionExpectations.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)] mb-6">
                Platforma i bezpieczeństwo
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Lock size={18} className="text-[color:var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[color:var(--color-text-primary)] mb-1">Szyfrowanie end-to-end</p>
                    <p className="text-[color:var(--color-text-secondary)] text-sm">Każde połączenie jest w pełni szyfrowane. Nikt poza Wami dwojgiem nie ma dostępu do rozmowy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Shield size={18} className="text-[color:var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[color:var(--color-text-primary)] mb-1">Zgodność z RODO</p>
                    <p className="text-[color:var(--color-text-secondary)] text-sm">Platforma spełnia wszystkie wymogi RODO. Twoje dane są bezpieczne i nie są udostępniane osobom trzecim.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                    <Wifi size={18} className="text-[color:var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[color:var(--color-text-primary)] mb-1">Bez instalacji</p>
                    <p className="text-[color:var(--color-text-secondary)] text-sm">Nie potrzebujesz żadnych dodatkowych aplikacji. Wystarczy nowoczesna przeglądarka internetowa.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg-main)] section-padding">
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[color:var(--color-text-primary)]">
              Dodatkowe pytania
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {additionalFaq.map((item) => (
              <div key={item.q} className="py-5">
                <p className="font-display font-semibold text-base text-[color:var(--color-text-primary)] mb-2">{item.q}</p>
                <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
