import Link from "next/link";
import {
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  Headphones,
  Languages,
  Laptop,
  LockKeyhole,
  MailCheck,
  MapPin,
  MessageCircle,
  Monitor,
  Plane,
  Repeat2,
  ShieldCheck,
  Smartphone,
  Timer,
  Wifi,
} from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import { PhoneTextLink } from "@/components/ui/PhoneCTA";
import { canonicalUrl } from "@/lib/site";

export const metadata = {
  title: "Jak wygląda konsultacja psychologiczna online | zdalnypsycholog.pl",
  description:
    "Sprawdź, jak przebiega konsultacja psychologiczna online: wybór terminu, przygotowanie, rozmowa oraz podejście CBT i TSR w uporządkowanej pracy psychologicznej.",
  alternates: { canonical: canonicalUrl("/jak-to-dziala") },
};

const processSteps = [
  {
    n: "01",
    icon: CalendarDays,
    title: "Wybierasz termin",
    desc: "Sprawdzasz dostępne godziny i wybierasz termin, który pasuje do Twojego rytmu dnia.",
  },
  {
    n: "02",
    icon: MailCheck,
    title: "Otrzymujesz informacje organizacyjne",
    desc: "Po rezerwacji dostajesz wszystkie potrzebne informacje dotyczące spotkania.",
  },
  {
    n: "03",
    icon: Monitor,
    title: "Łączysz się z wybranego miejsca",
    desc: "W dniu konsultacji dołączasz z telefonu, komputera lub tabletu. Ważne, żeby mieć prywatność i spokojną przestrzeń.",
  },
  {
    n: "04",
    icon: MessageCircle,
    title: "Rozmawiamy o tym, czego potrzebujesz",
    desc: "Pierwsze spotkanie pomaga nazwać sytuację, uporządkować to, co się dzieje, i ustalić możliwy kierunek dalszego wsparcia.",
  },
];

const onlineBenefits = [
  {
    icon: Clock3,
    title: "Oszczędzasz czas",
    desc: "Nie tracisz czasu na dojazdy, parkowanie ani organizowanie całego dnia wokół wizyty.",
  },
  {
    icon: MapPin,
    title: "Masz dostęp z dowolnego miejsca",
    desc: "Możesz połączyć się z Polski, z zagranicy, z domu, z pracy albo z miejsca, w którym aktualnie jesteś.",
  },
  {
    icon: Repeat2,
    title: "Łatwiej utrzymać regularność",
    desc: "Krótsza logistyka często ułatwia kontynuowanie spotkań, także przy intensywnym trybie życia.",
  },
  {
    icon: Languages,
    title: "Rozmawiasz po polsku",
    desc: "To ważne, gdy mieszkasz za granicą i chcesz mówić o emocjach w języku, w którym czujesz się najbardziej naturalnie.",
  },
  {
    icon: LockKeyhole,
    title: "Masz więcej prywatności",
    desc: "Możesz wybrać miejsce, w którym czujesz się bezpiecznie i swobodnie.",
  },
];

const evidenceCards = [
  {
    icon: BrainCircuit,
    title: "CBT ma silną bazę dowodową",
    desc: "Terapia poznawczo-behawioralna jest jednym z najlepiej przebadanych podejść w pracy z lękiem, stresem i trudnościami emocjonalnymi.",
  },
  {
    icon: Globe2,
    title: "Online może zwiększać dostępność",
    desc: "Forma zdalna ułatwia kontakt ze specjalistą, gdy mieszkasz za granicą, dużo pracujesz albo nie masz łatwego dostępu do pomocy.",
  },
  {
    icon: BookOpenCheck,
    title: "Regularność ma znaczenie",
    desc: "Prostsza organizacja może ułatwiać utrzymanie ciągłości spotkań i spokojniejsze wdrażanie ustaleń między konsultacjami.",
  },
];

const requirements = [
  {
    icon: ShieldCheck,
    item: "spokojnego miejsca",
  },
  {
    icon: Wifi,
    item: "stabilnego internetu",
  },
  {
    icon: Smartphone,
    item: "telefonu, komputera lub tabletu",
  },
  {
    icon: Headphones,
    item: "słuchawek, jeśli chcesz mieć większą prywatność",
  },
  {
    icon: Timer,
    item: "około 50 minut bez rozpraszania",
  },
];

const goodFor = [
  {
    icon: Globe2,
    text: "mieszkasz za granicą i chcesz rozmawiać po polsku",
  },
  {
    icon: MapPin,
    text: "nie masz łatwego dostępu do psychologa w okolicy",
  },
  {
    icon: BriefcaseBusiness,
    text: "dużo pracujesz i trudno Ci organizować dojazdy",
  },
  {
    icon: Plane,
    text: "często podróżujesz lub zmieniasz miejsce pobytu",
  },
  {
    icon: LockKeyhole,
    text: "zależy Ci na dyskrecji i spokojnej przestrzeni rozmowy",
  },
  {
    icon: CheckCircle2,
    text: "chcesz zacząć od pierwszej konsultacji i uporządkować sytuację",
  },
];

const sources = [
  {
    label: "APA Guidelines for the Practice of Telepsychology",
    href: "https://www.apa.org/about/policy/telepsychology-revisions",
  },
  {
    label: "JAMA Psychiatry: internet-based CBT for depression",
    href: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2774861",
  },
  {
    label: "NICE: digitally enabled therapies using CBT techniques",
    href: "https://www.nice.org.uk/news/articles/nice-recommends-8-digitally-enabled-therapies-to-treat-depression-and-anxiety",
  },
];

function OnlineVisual() {
  const visualSteps = [
    {
      label: "Termin",
      desc: "wybierasz dogodną godzinę",
    },
    {
      label: "Informacje",
      desc: "otrzymujesz szczegóły spotkania",
    },
    {
      label: "Rozmowa",
      desc: "łączysz się z prywatnego miejsca",
    },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] bg-white p-6 md:p-7"
      style={{
        border: "1px solid rgba(45,41,38,0.08)",
        boxShadow: "0 24px 70px rgba(31,49,77,0.13)",
      }}
      aria-hidden="true"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
            proces konsultacji
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight" style={{ color: "#1F314D" }}>
            Od terminu do pierwszej rozmowy
          </h2>
        </div>
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
          style={{ background: "#1F314D", color: "#FFFFFF" }}
        >
          <Laptop size={24} strokeWidth={1.7} aria-hidden="true" />
        </div>
      </div>

      <div
        className="rounded-3xl p-4"
        style={{ background: "linear-gradient(135deg, #1F314D 0%, #2A4268 100%)" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4A261]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
          <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/80">
            50 minut
          </span>
        </div>

        <div className="grid gap-3">
          {visualSteps.map((step, index) => (
            <div
              key={step.label}
              className="grid grid-cols-[2.75rem_1fr] items-center gap-3 rounded-2xl p-3"
              style={{
                background: index === 1 ? "rgba(244,162,97,0.18)" : "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold"
                style={{ background: index === 1 ? "#F4A261" : "rgba(255,255,255,0.14)", color: "#FFFFFF" }}
              >
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{step.label}</p>
                <p className="text-xs leading-relaxed text-white/68">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {["poufna rozmowa", "jasna struktura"].map((item) => (
          <div
            key={item}
            className="rounded-2xl px-4 py-3 text-sm font-semibold"
            style={{ background: "#F6EFE6", color: "#1F314D" }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JakToDzialaPage() {
  return (
    <main>
      <section style={{ background: "#F6EFE6" }} className="px-6 pb-14 pt-[92px] md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[1fr_430px] lg:items-center lg:gap-14">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              Jak to działa
            </p>
            <h1 className="text-[2.15rem] font-bold leading-[1.08] md:text-5xl" style={{ color: "#1F314D" }}>
              Jak wygląda konsultacja psychologiczna online?
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "#6F6860" }}>
              Wybierasz termin, opłacasz konsultację online, otrzymujesz informacje organizacyjne
              i łączysz się z psychologiem z miejsca, w którym możesz swobodnie porozmawiać.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
              <Link href="#przygotowanie" className="btn-secondary w-full sm:w-auto">
                Jak się przygotować
              </Link>
            </div>

            <p className="mt-5 text-sm leading-relaxed" style={{ color: "#6F6860" }}>
              W sprawach organizacyjnych możesz zadzwonić:{" "}
              <PhoneTextLink className="font-semibold text-[#1F314D] hover:text-[#BC6C25]" />.
              Wybór terminu i płatność odbywają się online.
            </p>
          </div>

          <OnlineVisual />
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              proces
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
              Konsultacja online krok po kroku
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {processSteps.map(({ n, icon: Icon, title, desc }) => (
              <article
                key={n}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(246,239,230,0.45)",
                  border: "1px solid rgba(45,41,38,0.08)",
                  boxShadow: "0 12px 30px rgba(31,49,77,0.05)",
                }}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: n === "02" ? "#BC6C25" : "#1F314D", color: "#FFFFFF" }}
                  >
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#BC6C25" }}>
                    {n}
                  </span>
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "#1F314D" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed md:text-base" style={{ color: "#6F6860" }}>
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F6EFE6" }} className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              wygoda i dostępność
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
              Dlaczego forma online może być dla Ciebie wygodna?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {onlineBenefits.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="rounded-2xl bg-white p-5"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <Icon size={22} strokeWidth={1.8} className="mb-4 text-[#BC6C25]" aria-hidden="true" />
                <h3 className="text-base font-semibold leading-snug" style={{ color: "#1F314D" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6F6860" }}>
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              podejście oparte na wiedzy
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
              Czy terapia online może być skuteczna?
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed" style={{ color: "#6F6860" }}>
              <p>
                Terapia online nie jest już rozwiązaniem awaryjnym. Badania nad zdalnymi formami wsparcia
                psychologicznego wskazują, że dobrze prowadzona pomoc może być skuteczna, szczególnie w
                podejściach opartych na terapii poznawczo-behawioralnej CBT.
              </p>
              <p>
                W praktyce znaczenie ma dopasowanie metody, regularność spotkań i zaangażowanie w pracę między
                konsultacjami. Forma online może obniżać barierę rozpoczęcia pomocy i ułatwiać kontakt ze
                specjalistą, zwłaszcza przy ograniczonej dostępności czasu.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {evidenceCards.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(246,239,230,0.45)",
                  border: "1px solid rgba(45,41,38,0.08)",
                }}
              >
                <div className="flex gap-4">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: "#1F314D", color: "#FFFFFF" }}
                  >
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: "#1F314D" }}>
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed md:text-base" style={{ color: "#6F6860" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="mx-auto mt-8 max-w-6xl rounded-2xl p-5"
          style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#1F314D" }}>
            Na czym się opieramy?
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6F6860" }}>
            Wnioski są spójne z przeglądami badań dotyczącymi CBT i cyfrowych form wsparcia oraz z wytycznymi
            instytucjonalnymi dotyczącymi telepsychologii. To nie oznacza gwarancji efektu dla każdej osoby,
            dlatego zakres pracy ustalany jest indywidualnie.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold underline underline-offset-4 hover:text-[#BC6C25]"
                style={{ color: "#1F314D" }}
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="przygotowanie" style={{ background: "#F6EFE6" }} className="scroll-mt-24 px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              przygotowanie
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
              Czego potrzebujesz?
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "#6F6860" }}>
              Wystarczy kilka praktycznych warunków, które pomagają zadbać o komfort i poufność rozmowy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requirements.map(({ icon: Icon, item }) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-5"
                style={{ border: "1px solid rgba(45,41,38,0.08)" }}
              >
                <Icon size={22} strokeWidth={1.8} className="mb-4 text-[#BC6C25]" aria-hidden="true" />
                <p className="text-sm font-semibold leading-snug" style={{ color: "#1F314D" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              dla kogo
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl" style={{ color: "#1F314D" }}>
              Kiedy konsultacja online może być dobrym wyborem?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goodFor.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex gap-4 rounded-2xl p-5"
                style={{
                  background: "rgba(246,239,230,0.45)",
                  border: "1px solid rgba(45,41,38,0.08)",
                }}
              >
                <Icon size={22} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" aria-hidden="true" />
                <p className="text-sm font-semibold leading-relaxed" style={{ color: "#1F314D" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F6EFE6" }} className="px-6 py-16 md:py-20">
        <div
          className="mx-auto grid max-w-6xl gap-6 rounded-3xl bg-white p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9"
          style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 18px 45px rgba(31,49,77,0.08)" }}
        >
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#BC6C25" }}>
              pierwszy krok
            </p>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: "#1F314D" }}>
              Chcesz sprawdzić, czy konsultacja online będzie dla Ciebie odpowiednia?
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: "#6F6860" }}>
              Konsultacje odbywają się po wyborze terminu online i dokonaniu płatności.
              Po rezerwacji otrzymujesz potwierdzenie oraz informacje organizacyjne.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
            <p className="text-sm leading-relaxed" style={{ color: "#6F6860" }}>
              Możesz też{" "}
              <Link
                href="/kontakt#formularz"
                className="font-semibold underline underline-offset-4 hover:text-[#BC6C25]"
                style={{ color: "#1F314D" }}
              >
                napisać przez formularz
              </Link>
              {" "}w sprawie organizacyjnej
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
