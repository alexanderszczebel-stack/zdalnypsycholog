import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CloudRain,
  CreditCard,
  HelpCircle,
  Layers,
  MailCheck,
  MessageCircle,
  ShieldCheck,
  Users,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BookingCTA from "@/components/booking/BookingCTA";
import { PhoneTextLink } from "@/components/ui/PhoneCTA";
import ContactForm from "./ContactForm";
import FAQAccordion from "./FAQAccordion";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Psycholog online | Konsultacje psychologiczne CBT i TSR",
  description:
    "Konsultacje psychologiczne online prowadzone indywidualnie przez Mikołaja Szczebla. Wybierz termin online, opłać konsultację i otrzymaj potwierdzenie spotkania.",
  robots: { index: true, follow: true },
  alternates: { canonical: canonicalUrl("/") },
};

type CardItem = {
  Icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
};

const identificationItems: CardItem[] = [
  {
    Icon: Wind,
    title: "Lęk i napięcie",
    text: "Gdy trudno zatrzymać analizowanie, a ciało pozostaje w gotowości.",
    href: "/blog/lek-i-niepokoj",
  },
  {
    Icon: Activity,
    title: "Stres i przeciążenie",
    text: "Gdy obowiązki przekraczają dostępne zasoby i coraz trudniej się regenerować.",
    href: "/blog/stres-i-przeciazenie",
  },
  {
    Icon: Users,
    title: "Relacje",
    text: "Gdy powtarzające się schematy utrudniają rozmowę, bliskość lub stawianie granic.",
    href: "/blog/relacje",
  },
  {
    Icon: CloudRain,
    title: "Obniżony nastrój",
    text: "Gdy spadek energii, motywacji lub sensu utrzymuje się dłużej niż zwykle.",
    href: "/blog/obnizony-nastroj",
  },
  {
    Icon: Brain,
    title: "ADHD i koncentracja",
    text: "Gdy potrzebujesz uporządkować trudności z uwagą, planowaniem lub impulsywnością.",
    href: "/blog/adhd-u-doroslych",
  },
  {
    Icon: HelpCircle,
    title: "Trudno to nazwać",
    text: "Gdy nie masz gotowej diagnozy, ale czujesz, że warto uporządkować sytuację.",
    href: "/obszary-pomocy",
  },
];

const onlineBenefits: CardItem[] = [
  {
    Icon: Clock3,
    title: "Mniej logistyki",
    text: "Spotkanie odbywa się bez dojazdów, w miejscu, w którym możesz spokojnie porozmawiać.",
  },
  {
    Icon: ShieldCheck,
    title: "Jasne ramy rozmowy",
    text: "Konsultacja ma ustaloną strukturę, czas i cel. Omawiamy to, co wymaga uporządkowania.",
  },
  {
    Icon: MessageCircle,
    title: "Po polsku, także za granicą",
    text: "Możesz rozmawiać w swoim języku niezależnie od miejsca, w którym aktualnie mieszkasz.",
  },
];

const processSteps = [
  {
    n: "01",
    Icon: CalendarDays,
    title: "Wybierasz dostępny termin",
    text: "Przechodzisz do sekcji rezerwacji i wybierasz godzinę konsultacji online.",
  },
  {
    n: "02",
    Icon: CreditCard,
    title: "Opłacasz konsultację online",
    text: "Płatność odbywa się podczas rezerwacji. Termin zostaje potwierdzony po jej dokonaniu.",
  },
  {
    n: "03",
    Icon: MailCheck,
    title: "Otrzymujesz potwierdzenie",
    text: "Na podany adres e-mail przychodzą informacje organizacyjne dotyczące spotkania.",
  },
  {
    n: "04",
    Icon: MessageCircle,
    title: "Łączysz się z psychologiem",
    text: "W umówionym terminie dołączasz do konsultacji z prywatnego, spokojnego miejsca.",
  },
];

const trustItems = [
  "Psycholog online, praca w nurcie poznawczo-behawioralnym (CBT) i TSR.",
  "Konsultacje prowadzone indywidualnie, po wyborze terminu i dokonaniu płatności online.",
  "Podejście oparte na uporządkowanej rozmowie, zrozumieniu mechanizmów i konkretnych krokach.",
  "Liczba dostępnych terminów w tygodniu jest ograniczona.",
];

const blogPosts = [
  {
    title: "Czy psycholog online może pomóc?",
    text: "Kiedy konsultacja online jest dobrym rozwiązaniem i czego można się spodziewać po pierwszym spotkaniu.",
    href: "/blog/psycholog-online-czy-dziala",
    label: "Terapia online",
  },
  {
    title: "Stres i przeciążenie",
    text: "Jak rozpoznać moment, w którym napięcie przestaje być tylko chwilowym zmęczeniem.",
    href: "/blog/stres-i-przeciazenie",
    label: "Przeciążenie",
  },
  {
    title: "Lęk i niepokój",
    text: "Co może oznaczać długotrwałe napięcie i jak przygotować się do rozmowy z psychologiem.",
    href: "/blog/lek-i-niepokoj",
    label: "Lęk",
  },
];

function SectionIntro({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="section-label mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[#6F6860] md:text-lg">{text}</p>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      className="rounded-full px-4 py-2 text-sm font-medium"
      style={{
        background: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(45,41,38,0.08)",
        color: "#1F314D",
      }}
    >
      {children}
    </span>
  );
}

function HeroVisual() {
  return (
    <div
      className="mx-auto w-full max-w-[460px] rounded-[2rem] p-5 md:p-6"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(45,41,38,0.08)",
        boxShadow: "0 24px 70px rgba(31,49,77,0.13)",
      }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-[#BC6C25]">Pierwsza konsultacja</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-[#1F314D]">
            Spokojna rozmowa online
          </h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#BC6C25]">
          <MessageCircle size={24} strokeWidth={1.8} aria-hidden="true" />
        </div>
      </div>

      <div className="rounded-[1.35rem] bg-[#1F314D] p-5 text-white">
        <div className="grid gap-3">
          {[
            "nazywamy sytuację i najważniejsze trudności",
            "sprawdzamy, co podtrzymuje napięcie",
            "ustalamy adekwatny dalszy krok",
          ].map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2 size={18} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#F4A261]" />
              <p className="text-sm leading-relaxed text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "czas", value: "50 minut" },
          { label: "cena", value: "250 zł" },
          { label: "potwierdzenie", value: "po płatności" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl px-4 py-3"
            style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.06)" }}
          >
            <p className="text-xs font-semibold uppercase text-[#9A8E85]">{item.label}</p>
            <p className="mt-1 text-sm font-semibold text-[#1F314D]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrisisNote() {
  return (
    <div
      className="rounded-2xl px-5 py-4 text-sm leading-relaxed"
      style={{ background: "rgba(31,49,77,0.05)", border: "1px solid rgba(31,49,77,0.10)", color: "#6F6860" }}
    >
      W sytuacji bezpośredniego zagrożenia życia lub zdrowia skontaktuj się z numerem
      alarmowym <strong className="font-semibold text-[#1F314D]">112</strong> albo najbliższą pomocą
      kryzysową. Konsultacja online nie zastępuje interwencji kryzysowej.
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <section className="bg-[#F6EFE6] px-5 pb-14 pt-[92px] md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:items-center">
          <div className="max-w-3xl">
            <p className="section-label mb-4">Psycholog online · CBT i TSR</p>
            <h1 className="font-display text-[2.12rem] font-semibold leading-[1.07] text-[#1F314D] md:text-6xl">
              Wsparcie psychologiczne online, kiedy potrzebujesz spokojnie nazwać to, co się dzieje.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#6F6860] md:text-lg">
              Konsultacje prowadzone są indywidualnie, w podejściu CBT i TSR. Wybierasz termin
              online, opłacasz spotkanie i otrzymujesz potwierdzenie konsultacji.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#1F314D]">
              50 minut · 250 zł · konsultacja online
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <Pill>CBT i TSR</Pill>
              <Pill>po polsku</Pill>
              <Pill>50 minut</Pill>
              <Pill>250 zł</Pill>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingCTA
                text="Wybierz termin konsultacji"
                className="btn-primary w-full sm:w-auto"
              />
              <Link href="#jak-to-dziala" className="btn-secondary w-full sm:w-auto">
                Zobacz, jak to działa
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#6F6860]">
              Termin zostaje potwierdzony po dokonaniu płatności podczas rezerwacji.
            </p>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionIntro
              eyebrow="Dla kogo"
              title="To może być dobry moment na rozmowę, jeśli..."
              text="Nie musisz mieć gotowej diagnozy. Pierwsza konsultacja pomaga uporządkować sytuację i sprawdzić, jaki kolejny krok będzie właściwy."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {identificationItems.map(({ Icon, title, text, href }) => (
                <Link key={title} href={href || "/obszary-pomocy"} className="group block h-full">
                  <article
                    className="flex h-full flex-col rounded-2xl p-5 transition duration-300 group-hover:-translate-y-1"
                    style={{
                      background: "#FDFBF7",
                      border: "1px solid rgba(45,41,38,0.08)",
                      boxShadow: "0 10px 28px rgba(31,49,77,0.04)",
                    }}
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#BC6C25]">
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[#1F314D]">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6F6860]">{text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#BC6C25]">
                      Czytaj więcej
                      <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE6] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionIntro
                eyebrow="Dlaczego online"
                title="Konsultacja online ma sens, gdy potrzebujesz dostępnej i uporządkowanej formy rozmowy."
                text="Online nie musi oznaczać mniej profesjonalnie. W wielu sytuacjach pozwala szybciej rozpocząć rozmowę, bez dojazdów i z miejsca, w którym możesz zadbać o prywatność."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
                <Link href="/jak-to-dziala" className="btn-secondary w-full sm:w-auto">
                  Zobacz, jak wygląda konsultacja
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {onlineBenefits.map(({ Icon, title, text }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl bg-white p-5"
                  style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#1F314D]">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#6F6860]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="jak-to-dziala" className="scroll-mt-24 bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="Pierwsza konsultacja"
            title="Cztery krótkie kroki od wyboru terminu do pierwszej rozmowy."
            text="Proces ma być prosty i przewidywalny: wybierasz termin, opłacasz konsultację online i otrzymujesz potwierdzenie spotkania."
            align="center"
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map(({ n, Icon, title, text }) => (
              <article
                key={n}
                className="rounded-2xl p-6"
                style={{
                  background: "#FDFBF7",
                  border: "1px solid rgba(45,41,38,0.08)",
                  boxShadow: "0 12px 30px rgba(31,49,77,0.04)",
                }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <span className="font-display text-sm font-semibold text-[#BC6C25]">{n}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1F314D]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6F6860]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE6] px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(320px,430px)_1fr] lg:items-center">
          <div
            className="overflow-hidden rounded-[2rem] bg-white p-3"
            style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 22px 60px rgba(31,49,77,0.12)" }}
          >
            <Image
              src="/images/mikolaj.jpg"
              alt="Mikołaj Szczebel - psycholog online"
              width={520}
              height={620}
              className="h-[360px] w-full rounded-[1.55rem] object-cover md:h-[500px]"
              style={{ objectPosition: "center top" }}
            />
          </div>

          <div>
            <SectionIntro
              eyebrow="Specjalista"
              title="Mikołaj Szczebel, psycholog online pracujący w podejściu CBT i TSR."
              text="W konsultacjach koncentruję się na nazwaniu trudności, zrozumieniu mechanizmów i wyznaczeniu możliwego dalszego kroku. Rozmowa jest prowadzona w jasnych ramach, bez oceniania i bez presji."
            />
            <div className="mt-7 grid gap-3">
              {trustItems.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 size={19} strokeWidth={1.8} className="mt-0.5 flex-shrink-0 text-[#BC6C25]" />
                  <p className="text-base leading-relaxed text-[#6F6860]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/o-mnie" className="btn-secondary w-full sm:w-auto">
                Poznaj specjalistę
              </Link>
              <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-label mb-3">Polacy za granicą</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#1F314D] md:text-4xl">
              Po polsku, online, gdziekolwiek jesteś.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#6F6860] md:text-lg">
              Rozmowa w ojczystym języku często pomaga precyzyjniej nazwać emocje, relacje
              i kontekst zmiany kraju. Konsultacja online pozwala rozpocząć pracę bez szukania
              gabinetu w miejscu zamieszkania.
            </p>
            <Link href="/polacy-za-granica" className="btn-secondary mt-7 w-full sm:w-auto">
              Psycholog po polsku za granicą
            </Link>
          </div>
          <div
            className="rounded-[2rem] p-7"
            style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.08)" }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
              <Layers size={23} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#1F314D]">
              Nie zawężamy kontaktu do jednego kraju.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#6F6860] md:text-base">
              Jeśli mieszkasz poza Polską albo często zmieniasz miejsce pobytu, najważniejsza
              jest możliwość spokojnej rozmowy po polsku i ustalenie terminu w dostępnych ramach.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F6EFE6] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionIntro
              eyebrow="Blog"
              title="Przeczytaj, jeśli chcesz najpierw lepiej nazwać temat."
              text="Artykuły mają charakter edukacyjny. Nie zastępują konsultacji, ale pomagają przygotować pierwszą rozmowę."
            />
            <Link href="/blog" className="btn-secondary w-full md:w-auto">
              Wszystkie artykuły
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.href} href={post.href} className="group block h-full">
                <article
                  className="flex h-full flex-col rounded-2xl bg-white p-6 transition duration-300 group-hover:-translate-y-1"
                  style={{ border: "1px solid rgba(45,41,38,0.08)" }}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#BC6C25]">
                    <BookOpen size={21} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <p className="mb-3 text-xs font-semibold uppercase text-[#BC6C25]">{post.label}</p>
                  <h3 className="font-display text-xl font-semibold leading-snug text-[#1F314D]">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6F6860]">{post.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#BC6C25]">
                    Czytaj artykuł
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionIntro
              eyebrow="Kontakt"
              title="Wybierz termin konsultacji online."
              text="Rezerwacja prowadzi przez wybór terminu i płatność online. Formularz pozostaje opcją do krótkich pytań organizacyjnych przed rezerwacją."
            />
            <div className="mt-7 flex flex-col gap-3">
              <BookingCTA
                text="Wybierz termin konsultacji"
                className="btn-primary w-full justify-center sm:w-fit"
              />
              <Link href="#formularz" className="btn-secondary w-full justify-center sm:w-fit">
                Mam pytanie organizacyjne
              </Link>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#6F6860]">
              Masz pytanie organizacyjne przed rezerwacją? Zadzwoń:{" "}
              <PhoneTextLink className="font-semibold text-[#1F314D] hover:text-[#BC6C25]" />.
              Wybór terminu i płatność odbywają się online.
            </p>
            <div className="mt-8">
              <CrisisNote />
            </div>
          </div>

          <div id="formularz">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-[#FDFBF7] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionIntro
            eyebrow="FAQ"
            title="Najczęstsze pytania przed pierwszą konsultacją."
            text="Krótko i konkretnie: co trzeba przygotować, jak wygląda spotkanie online i jak ustalany jest termin."
            align="center"
          />
          <div className="mt-10">
            <FAQAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}
