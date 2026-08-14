export type HelpArea = {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  articleSlug: string;
  articleTitle: string;
  excerpt: string;
  shape: string;
};

export const helpAreas: HelpArea[] = [
  {
    id: 1,
    title: "Lęk i niepokój",
    shortTitle: "Lęk i napięcie",
    description:
      "Gdy niepokój, napięcie i gonitwa myśli utrudniają odpoczynek, decyzje albo codzienne funkcjonowanie.",
    tags: ["napięcie", "zamartwianie", "poczucie zagrożenia"],
    articleSlug: "lek-i-niepokoj",
    articleTitle: "Lęk i niepokój - kiedy warto skorzystać ze wsparcia psychologa?",
    excerpt:
      "Jak rozumieć napięcie, zamartwianie się i trudność w wyciszeniu oraz kiedy konsultacja może być dobrym pierwszym krokiem.",
    shape: "M10,30 Q20,10 30,30 Q20,50 10,30Z",
  },
  {
    id: 2,
    title: "Stres i przeciążenie",
    shortTitle: "Stres",
    description:
      "Gdy obowiązki, presja i brak regeneracji zaczynają przekraczać dostępne zasoby.",
    tags: ["presja", "brak regeneracji", "ciągła gotowość"],
    articleSlug: "stres-i-przeciazenie",
    articleTitle: "Stres i przeciążenie - kiedy warto porozmawiać z psychologiem?",
    excerpt:
      "O sygnałach przeciążenia, granicy między mobilizacją a kosztem oraz o tym, jak konsultacja pomaga uporządkować sytuację.",
    shape: "M15,15 L35,15 L35,35 L15,35Z",
  },
  {
    id: 3,
    title: "Wypalenie",
    shortTitle: "Wypalenie",
    description:
      "Gdy zmęczenie, dystans i spadek zaangażowania nie mijają po odpoczynku.",
    tags: ["wyczerpanie", "dystans", "utrata energii"],
    articleSlug: "wypalenie-zawodowe",
    articleTitle: "Wypalenie - kiedy zmęczenie wymaga uwagi?",
    excerpt:
      "Jak odróżnić zwykłe zmęczenie od narastającego wypalenia i kiedy warto skonsultować ten stan.",
    shape: "M10,25 Q25,5 40,25 Q25,45 10,25Z",
  },
  {
    id: 4,
    title: "Obniżony nastrój",
    shortTitle: "Obniżony nastrój",
    description:
      "Gdy spada energia, motywacja i poczucie sensu, a codzienne sprawy zaczynają wymagać coraz większego wysiłku.",
    tags: ["spadek energii", "wycofanie", "brak motywacji"],
    articleSlug: "obnizony-nastroj",
    articleTitle: "Obniżony nastrój - kiedy warto przyjrzeć się temu bliżej?",
    excerpt:
      "Spokojne omówienie sygnałów obniżonego nastroju, bez diagnozowania i bez obietnic prostych rozwiązań.",
    shape: "M25,10 L40,35 L10,35Z",
  },
  {
    id: 5,
    title: "Relacje",
    shortTitle: "Relacje",
    description:
      "Gdy konflikty, dystans, samotność albo powtarzające się schematy utrudniają bliski kontakt.",
    tags: ["konflikty", "schematy", "granice"],
    articleSlug: "relacje",
    articleTitle: "Trudności w relacjach - jak może pomóc konsultacja psychologiczna?",
    excerpt:
      "O powtarzających się schematach, napięciu w kontakcie i pierwszym uporządkowaniu tego, co dzieje się w relacjach.",
    shape: "M20,10 Q40,20 30,40 Q10,30 20,10Z",
  },
  {
    id: 6,
    title: "Przeciążenie emocjonalne",
    shortTitle: "Przeciążenie emocjonalne",
    description:
      "Gdy emocji jest za dużo naraz, a próby poradzenia sobie z nimi przestają wystarczać.",
    tags: ["nadmiar emocji", "brak zasobów", "trudność w działaniu"],
    articleSlug: "przeciazenie-emocjonalne",
    articleTitle: "Przeciążenie emocjonalne - jak rozpoznać, że jest za dużo?",
    excerpt:
      "Co może oznaczać poczucie emocjonalnego przeładowania i jak konsultacja pomaga odzyskać orientację.",
    shape: "M12,20 Q25,6 38,20 Q35,42 15,38Z",
  },
  {
    id: 7,
    title: "Niska samoocena",
    shortTitle: "Samoocena",
    description:
      "Gdy surowa ocena siebie wpływa na decyzje, relacje, pracę albo gotowość do działania.",
    tags: ["samokrytyka", "porównywanie", "poczucie wartości"],
    articleSlug: "niska-samoocena",
    articleTitle: "Niska samoocena - kiedy warto skorzystać ze wsparcia?",
    excerpt:
      "Jak samokrytyka i porównywanie mogą wpływać na codzienność oraz jak wygląda pierwsze porządkowanie tego tematu.",
    shape: "M25,10 A15,15 0 1,1 24.9,10Z",
  },
  {
    id: 8,
    title: "ADHD u dorosłych",
    shortTitle: "ADHD",
    description:
      "Gdy trudności z koncentracją, organizacją, impulsywnością lub chaosem zaczynają wyraźnie przeszkadzać w codzienności.",
    tags: ["koncentracja", "organizacja", "impulsywność"],
    articleSlug: "adhd-u-doroslych",
    articleTitle: "ADHD u dorosłych - kiedy warto skonsultować trudności?",
    excerpt:
      "O sygnałach, które mogą wymagać diagnostyki lub konsultacji, oraz o ostrożnym porządkowaniu trudności w dorosłości.",
    shape: "M10,20 L20,10 L40,20 L30,40 L10,40Z",
  },
  {
    id: 9,
    title: "Kryzys emocjonalny",
    shortTitle: "Kryzys emocjonalny",
    description:
      "Gdy wydarzenie, decyzja lub narastające napięcie przekraczają dotychczasowe sposoby radzenia sobie.",
    tags: ["zmiana", "strata", "decyzje"],
    articleSlug: "kryzys-emocjonalny",
    articleTitle: "Kryzys emocjonalny - kiedy rozmowa z psychologiem może być pomocna?",
    excerpt:
      "Jak rozumieć kryzys bez oceniania siebie i kiedy warto skorzystać z profesjonalnej rozmowy.",
    shape: "M25,10 Q45,25 25,40 Q5,25 25,10Z",
  },
];
