"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HelpCircle, RotateCcw, ShieldCheck } from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import { trackEvent } from "@/lib/analytics";

type AnswerKey = "topic" | "support" | "readiness";
type Answers = Partial<Record<AnswerKey, string>>;

type QuizOption = {
  id: string;
  label: string;
  detail: string;
};

type Question = {
  key: AnswerKey;
  eyebrow: string;
  title: string;
  hint: string;
  options: QuizOption[];
};

type Recommendation = {
  title: string;
  description: string;
  href: string;
  label: string;
  related: { href: string; label: string }[];
};

const questions: Question[] = [
  {
    key: "topic",
    eyebrow: "1 z 3",
    title: "Co chcesz teraz najbardziej uporządkować?",
    hint: "Wybierz najbliższy temat. To nie jest diagnoza i nie musisz mieć pewności.",
    options: [
      {
        id: "lek",
        label: "Lęk i napięcie",
        detail: "zamartwianie, natłok myśli, napięcie w ciele",
      },
      {
        id: "stres",
        label: "Stres i przeciążenie",
        detail: "presja, brak regeneracji, poczucie bycia w ciągłej gotowości",
      },
      {
        id: "relacje",
        label: "Relacje",
        detail: "konflikty, granice, bliskość, powtarzające się schematy",
      },
      {
        id: "nastroj",
        label: "Obniżony nastrój",
        detail: "spadek energii, motywacji albo poczucia sensu",
      },
      {
        id: "adhd",
        label: "Koncentracja i ADHD",
        detail: "organizacja, planowanie, chaos, trudność z domykaniem spraw",
      },
      {
        id: "samoocena",
        label: "Samoocena",
        detail: "samokrytyka, porównywanie się, poczucie wartości",
      },
      {
        id: "panika",
        label: "Ataki paniki",
        detail: "nagłe fale lęku, objawy z ciała, obawa przed kolejnym napadem",
      },
      {
        id: "nie-wiem",
        label: "Trudno mi to nazwać",
        detail: "czuję, że coś wymaga rozmowy, ale nie mam jednej kategorii",
      },
    ],
  },
  {
    key: "support",
    eyebrow: "2 z 3",
    title: "Czego potrzebujesz od pierwszego kroku?",
    hint: "Ta odpowiedź pomaga dobrać sposób wejścia na stronę, nie formę leczenia.",
    options: [
      {
        id: "pierwsza-konsultacja",
        label: "Spokojnie nazwać sytuację",
        detail: "zacząć od pierwszej konsultacji i uporządkowania tematu",
      },
      {
        id: "cbt",
        label: "Więcej struktury",
        detail: "zobaczyć związek myśli, emocji, ciała i zachowań",
      },
      {
        id: "tsr",
        label: "Małe konkretne kroki",
        detail: "szukać zasobów, wyjątków i realnego następnego ruchu",
      },
      {
        id: "czy-online",
        label: "Sprawdzić, czy online pasuje",
        detail: "najpierw zobaczyć, kiedy konsultacja zdalna ma sens",
      },
    ],
  },
  {
    key: "readiness",
    eyebrow: "3 z 3",
    title: "Co będzie dla Ciebie najłatwiejsze teraz?",
    hint: "Możesz przejść od razu do terminów albo najpierw przeczytać krótki przewodnik.",
    options: [
      {
        id: "termin",
        label: "Chcę zobaczyć terminy",
        detail: "przejść do rezerwacji i płatności online",
      },
      {
        id: "pytanie",
        label: "Mam pytanie organizacyjne",
        detail: "zapytać przed rezerwacją o sprawy techniczne lub organizacyjne",
      },
      {
        id: "poczytac",
        label: "Chcę najpierw poczytać",
        detail: "zobaczyć przewodnik dopasowany do tematu",
      },
      {
        id: "zagranica",
        label: "Jestem za granicą",
        detail: "sprawdzić konsultację online po polsku poza Polską",
      },
    ],
  },
];

const topicRecommendations: Record<string, Recommendation> = {
  lek: {
    title: "Zacznij od strony o lęku i napięciu.",
    description:
      "To najlepszy pierwszy krok, jeśli najwięcej dzieje się wokół napięcia, niepokoju, zamartwiania albo trudności z wyciszeniem.",
    href: "/psycholog-online-lek-i-napiecie",
    label: "Przewodnik o lęku",
    related: [
      { href: "/psycholog-online-ataki-paniki", label: "Ataki paniki" },
      { href: "/cbt-online", label: "CBT online" },
    ],
  },
  stres: {
    title: "Zacznij od strony o stresie i przeciążeniu.",
    description:
      "Ten przewodnik pomaga nazwać presję, zmęczenie, brak regeneracji i pierwsze sygnały przeciążenia.",
    href: "/psycholog-online-stres-i-przeciazenie",
    label: "Przewodnik o stresie",
    related: [
      { href: "/czy-konsultacja-online-jest-dla-mnie", label: "Czy online pasuje" },
      { href: "/pierwsza-konsultacja-psychologiczna-online", label: "Pierwsza konsultacja" },
    ],
  },
  relacje: {
    title: "Zacznij od strony o relacjach.",
    description:
      "To dobry kierunek, jeśli chodzi o konflikty, granice, samotność, napięcie w bliskości albo powtarzające się schematy.",
    href: "/psycholog-online-relacje",
    label: "Przewodnik o relacjach",
    related: [
      { href: "/tsr-online", label: "TSR online" },
      { href: "/pierwsza-konsultacja-psychologiczna-online", label: "Pierwsza konsultacja" },
    ],
  },
  nastroj: {
    title: "Zacznij od strony o obniżonym nastroju.",
    description:
      "Ten przewodnik jest dla osób, które widzą spadek energii, motywacji, sensu albo coraz większy wysiłek w codziennych sprawach.",
    href: "/psycholog-online-obnizony-nastroj",
    label: "Przewodnik o nastroju",
    related: [
      { href: "/psycholog-online-stres-i-przeciazenie", label: "Stres i przeciążenie" },
      { href: "/konsultacja-psychologiczna-online", label: "Konsultacja online" },
    ],
  },
  adhd: {
    title: "Zacznij od strony o koncentracji i ADHD.",
    description:
      "To właściwy przewodnik, jeśli największą trudnością jest chaos, planowanie, uwaga, impulsywność albo przeciążenie zadaniami.",
    href: "/psycholog-online-adhd-koncentracja",
    label: "Przewodnik o ADHD",
    related: [
      { href: "/cbt-online", label: "CBT online" },
      { href: "/psycholog-online-stres-i-przeciazenie", label: "Przeciążenie" },
    ],
  },
  samoocena: {
    title: "Zacznij od strony o samoocenie.",
    description:
      "Ten kierunek pasuje, gdy wiele decyzji, relacji albo działań zatrzymuje surowa ocena siebie.",
    href: "/psycholog-online-samoocena",
    label: "Przewodnik o samoocenie",
    related: [
      { href: "/psycholog-online-relacje", label: "Relacje" },
      { href: "/tsr-online", label: "TSR online" },
    ],
  },
  panika: {
    title: "Zacznij od strony o atakach paniki.",
    description:
      "To bezpieczniejszy punkt startu, jeśli pojawiają się nagłe fale lęku, silne objawy z ciała lub obawa przed kolejnym napadem.",
    href: "/psycholog-online-ataki-paniki",
    label: "Przewodnik o panice",
    related: [
      { href: "/psycholog-online-lek-i-napiecie", label: "Lęk i napięcie" },
      { href: "/cbt-online", label: "CBT online" },
    ],
  },
  "nie-wiem": {
    title: "Zacznij od pierwszej konsultacji.",
    description:
      "Jeśli trudno wskazać jeden temat, pierwsza rozmowa może pomóc nazwać sytuację i ustalić adekwatny dalszy krok.",
    href: "/pierwsza-konsultacja-psychologiczna-online",
    label: "Jak wygląda pierwsza konsultacja",
    related: [
      { href: "/konsultacja-psychologiczna-online", label: "Konsultacja online" },
      { href: "/obszary-pomocy", label: "Obszary pomocy" },
    ],
  },
};

const supportOverrides: Record<string, Pick<Recommendation, "href" | "label">> = {
  cbt: { href: "/cbt-online", label: "Zobacz CBT online" },
  tsr: { href: "/tsr-online", label: "Zobacz TSR online" },
  "czy-online": {
    href: "/czy-konsultacja-online-jest-dla-mnie",
    label: "Sprawdź, czy online pasuje",
  },
};

function getQuestionProgress(step: number) {
  return Math.round(((step + 1) / questions.length) * 100);
}

export default function PathwayQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const isComplete = step >= questions.length;
  const currentQuestion = questions[Math.min(step, questions.length - 1)];

  const recommendation = useMemo(() => {
    const base = topicRecommendations[answers.topic || "nie-wiem"] || topicRecommendations["nie-wiem"];
    const override = answers.support ? supportOverrides[answers.support] : undefined;

    if (!override) return base;

    return {
      ...base,
      href: override.href,
      label: override.label,
    };
  }, [answers.topic, answers.support]);

  const chooseOption = (question: Question, option: QuizOption) => {
    const nextAnswers = { ...answers, [question.key]: option.id };
    setAnswers(nextAnswers);
    trackEvent("ankieta_sciezki_krok", {
      event_category: "ankieta_sciezki",
      event_label: question.key,
      answer: option.id,
    });

    if (step === questions.length - 1) {
      trackEvent("ankieta_sciezki_wynik", {
        event_category: "ankieta_sciezki",
        event_label: nextAnswers.topic || "nie-wiem",
        support: nextAnswers.support || "",
        readiness: nextAnswers.readiness || "",
      });
    }

    setStep((current) => current + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <section className="bg-white px-5 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <aside
          className="rounded-2xl p-6 lg:sticky lg:top-28"
          style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
            <HelpCircle size={23} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl font-semibold leading-tight text-[#1F314D]">
            To jest ankieta organizacyjna, nie diagnoza.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">
            Odpowiedzi pomagają wybrać najbliższą stronę i pierwszy krok. Nie zastępują konsultacji,
            nie są zapisywane jako formularz medyczny i możesz pominąć ankietę w każdej chwili.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "bez etykietowania i rozpoznawania zaburzeń",
              "wynik prowadzi do przewodnika albo rezerwacji",
              "w sprawach pilnych właściwa jest pomoc kryzysowa",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <ShieldCheck size={17} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" />
                <p className="text-sm leading-relaxed text-[#6F6860]">{item}</p>
              </div>
            ))}
          </div>
        </aside>

        <div
          className="overflow-hidden rounded-[2rem]"
          style={{
            background: "#FDFBF7",
            border: "1px solid rgba(45,41,38,0.08)",
            boxShadow: "0 22px 60px rgba(31,49,77,0.10)",
          }}
        >
          {!isComplete ? (
            <div>
              <div className="bg-[#1F314D] px-6 py-6 text-white md:px-8">
                <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-[#F4A261] transition-all duration-300"
                    style={{ width: `${getQuestionProgress(step)}%` }}
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  {currentQuestion.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {currentQuestion.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/66">
                  {currentQuestion.hint}
                </p>
              </div>

              <div className="grid gap-3 p-5 md:grid-cols-2 md:p-8">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseOption(currentQuestion, option)}
                    className="group min-h-28 rounded-2xl bg-white p-5 text-left transition duration-200 hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block font-display text-lg font-semibold leading-snug text-[#1F314D]">
                          {option.label}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-[#6F6860]">
                          {option.detail}
                        </span>
                      </span>
                      <ArrowRight
                        size={18}
                        strokeWidth={1.8}
                        className="mt-1 flex-shrink-0 text-[#BC6C25] transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ))}
              </div>

              {step > 0 ? (
                <div className="border-t border-[rgba(45,41,38,0.08)] px-5 py-4 md:px-8">
                  <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(0, current - 1))}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#6F6860] transition-colors hover:text-[#1F314D]"
                  >
                    <RotateCcw size={15} strokeWidth={1.8} aria-hidden="true" />
                    Wróć do poprzedniego pytania
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
                <CheckCircle2 size={28} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p className="section-label mb-3">Proponowany pierwszy krok</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-[#1F314D]">
                {recommendation.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6F6860]">
                {recommendation.description}
              </p>

              <div
                className="mt-7 rounded-2xl p-5"
                style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <p className="font-display text-lg font-semibold text-[#1F314D]">
                  Co możesz zrobić teraz?
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {answers.readiness === "pytanie" ? (
                    <Link href="/kontakt#formularz" className="btn-primary w-full sm:w-auto">
                      Mam pytanie organizacyjne
                    </Link>
                  ) : (
                    <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
                  )}
                  <Link href={recommendation.href} className="btn-secondary w-full sm:w-auto">
                    {recommendation.label}
                  </Link>
                  {answers.readiness !== "pytanie" ? (
                    <Link href="/kontakt#formularz" className="btn-secondary w-full sm:w-auto">
                      Mam pytanie organizacyjne
                    </Link>
                  ) : null}
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {recommendation.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-[#1F314D] transition-colors hover:text-[#BC6C25]"
                    style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                  >
                    {link.label}
                    <ArrowRight
                      size={15}
                      strokeWidth={1.8}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#6F6860] transition-colors hover:text-[#1F314D]"
              >
                <RotateCcw size={15} strokeWidth={1.8} aria-hidden="true" />
                Wypełnij ankietę jeszcze raz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
