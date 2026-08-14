export type AiLandingPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string[];
  quickFacts: string[];
  sections: {
    title: string;
    body: string[];
    bullets?: string[];
  }[];
  goodFit: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    href: string;
    label: string;
  }[];
};

export const aiLandingPages = [
  {
    slug: "pierwsza-konsultacja-psychologiczna-online",
    metaTitle: "Pierwsza konsultacja psychologiczna online",
    metaDescription:
      "Jak wygląda pierwsza konsultacja psychologiczna online, jak się przygotować i kiedy warto umówić spokojną rozmowę z psychologiem.",
    eyebrow: "Pierwsza konsultacja",
    title: "Jak wygląda pierwsza konsultacja psychologiczna online",
    lead: [
      "Pierwsza konsultacja psychologiczna online to spokojna rozmowa, która pomaga nazwać aktualną trudność, zrozumieć kontekst i ustalić, jaki dalszy krok będzie adekwatny.",
      "Nie musisz mieć gotowej diagnozy ani idealnie przygotowanej historii. Wystarczy, że chcesz uporządkować to, co obecnie utrudnia codzienne funkcjonowanie.",
    ],
    quickFacts: ["50 minut", "online", "po polsku", "CBT i TSR"],
    sections: [
      {
        title: "Przed spotkaniem",
        body: [
          "Warto zadbać o spokojne miejsce, stabilne połączenie internetowe oraz czas bez pośpiechu po rozmowie.",
          "Jeśli nie wiesz, od czego zacząć, wystarczy powiedzieć, co ostatnio najbardziej przeszkadza w codziennym funkcjonowaniu.",
        ],
      },
      {
        title: "W trakcie konsultacji",
        body: [
          "Rozmowa zwykle obejmuje aktualną trudność, okoliczności jej pojawienia się, dotychczasowe sposoby radzenia sobie, oczekiwania wobec pomocy i możliwy dalszy kierunek.",
        ],
        bullets: [
          "nazywamy najważniejszą trudność",
          "porządkujemy kontekst i objawy",
          "sprawdzamy możliwe pierwsze kroki",
        ],
      },
      {
        title: "Po konsultacji",
        body: [
          "Po pierwszej rozmowie można ustalić, czy warto kontynuować pracę, jaki cel byłby realny oraz jaka forma kontaktu będzie najlepsza.",
          "Jeśli potrzebna jest inna forma pomocy, warto omówić to wprost.",
        ],
      },
    ],
    goodFit: [
      "nie wiesz, czy Twoja trudność jest wystarczającym powodem do konsultacji",
      "chcesz spokojnie nazwać to, co się dzieje",
      "potrzebujesz rozmowy bez oceniania i pośpiechu",
      "chcesz ustalić, jaki kolejny krok ma sens",
    ],
    faq: [
      {
        question: "Czy muszę przygotować listę tematów?",
        answer:
          "Nie. Lista może pomóc, ale nie jest wymagana. Psycholog pomaga uporządkować rozmowę i doprecyzować najważniejszy temat konsultacji.",
      },
      {
        question: "Czy pierwsza konsultacja jest diagnozą?",
        answer:
          "Pierwsza konsultacja nie zawsze kończy się diagnozą. Jej celem jest zrozumienie sytuacji i ustalenie adekwatnego kolejnego kroku.",
      },
      {
        question: "Ile trwa konsultacja?",
        answer: "Standardowa konsultacja trwa 50 minut i odbywa się online.",
      },
    ],
    relatedLinks: [
      { href: "/jak-to-dziala", label: "Jak działa konsultacja online" },
      { href: "/cennik", label: "Cennik konsultacji" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    slug: "psycholog-online-lek-i-napiecie",
    metaTitle: "Psycholog online przy lęku i napięciu",
    metaDescription:
      "Konsultacja psychologiczna online, gdy doświadczasz lęku, napięcia, natłoku myśli albo trudności z uspokojeniem ciała.",
    eyebrow: "Lęk i napięcie",
    title: "Psycholog online przy lęku, napięciu i natłoku myśli",
    lead: [
      "Jeśli lęk, napięcie albo ciągłe analizowanie utrudniają odpoczynek, sen, pracę lub relacje, konsultacja psychologiczna online może pomóc uporządkować sytuację i nazwać pierwszy konkretny krok.",
      "Spotkanie nie wymaga gotowej diagnozy. Wystarczy, że czujesz, że obecny sposób radzenia sobie przestaje wystarczać.",
    ],
    quickFacts: ["lęk", "napięcie", "natłok myśli", "CBT i TSR"],
    sections: [
      {
        title: "Kiedy warto umówić konsultację",
        body: [
          "Konsultacja może być pomocna, gdy lęk zaczyna wpływać na codzienne decyzje, sen, relacje albo poczucie bezpieczeństwa.",
        ],
        bullets: [
          "czujesz napięcie w ciele i trudno Ci się wyciszyć",
          "często przewidujesz najgorsze scenariusze",
          "wracasz myślami do tych samych tematów",
          "unikasz sytuacji, które wcześniej były neutralne",
          "potrzebujesz sprawdzić, co może podtrzymywać lęk",
        ],
      },
      {
        title: "Jak wygląda pierwsza rozmowa",
        body: [
          "Pierwsze spotkanie trwa 50 minut i odbywa się online. Rozmowa służy zrozumieniu, w jakich sytuacjach pojawia się lęk, co go nasila, co pomaga chociaż trochę oraz jaki kolejny krok będzie adekwatny.",
          "Praca może korzystać z perspektywy CBT i TSR, czyli z podejść skoncentrowanych na związku myśli, emocji, zachowań oraz na praktycznych zasobach i możliwych zmianach.",
        ],
      },
      {
        title: "Czego nie trzeba mieć przed spotkaniem",
        body: [
          "Nie musisz mieć diagnozy, gotowej historii ani pewności, czy to już powód do konsultacji. Możesz przyjść z opisem codziennych trudności: snu, napięcia, obaw, pracy, relacji lub podejmowania decyzji.",
        ],
      },
    ],
    goodFit: [
      "często czujesz napięcie albo niepokój",
      "myśli trudno zatrzymać nawet po zakończeniu obowiązków",
      "unikałeś lub unikałaś sytuacji z powodu lęku",
      "chcesz zacząć od spokojnego rozpoznania sytuacji",
    ],
    faq: [
      {
        question: "Czy psycholog online może pomóc przy lęku?",
        answer:
          "Może pomóc uporządkować sytuację, rozpoznać czynniki nasilające lęk i zaplanować adekwatny kolejny krok. Zakres dalszej pracy ustalany jest indywidualnie po pierwszej konsultacji.",
      },
      {
        question: "Czy muszę wiedzieć, skąd bierze się lęk?",
        answer:
          "Nie. Pierwsza konsultacja właśnie temu służy: spokojnemu nazwaniu trudności i sprawdzeniu, co dzieje się w codziennym funkcjonowaniu.",
      },
      {
        question: "Czy konsultacja online jest poufna?",
        answer:
          "Tak. Konsultacje prowadzone są z poszanowaniem poufności i zasad etycznych zawodu psychologa, z wyjątkami dotyczącymi bezpośredniego zagrożenia życia lub zdrowia.",
      },
    ],
    relatedLinks: [
      { href: "/blog/lek-i-niepokoj", label: "Artykuł o lęku i niepokoju" },
      { href: "/pierwsza-konsultacja-psychologiczna-online", label: "Pierwsza konsultacja" },
      { href: "/obszary-pomocy", label: "Obszary pomocy" },
    ],
  },
  {
    slug: "psycholog-online-stres-i-przeciazenie",
    metaTitle: "Psycholog online przy stresie i przeciążeniu",
    metaDescription:
      "Konsultacja psychologiczna online, gdy stres, presja i przeciążenie utrudniają regenerację, sen albo codzienne funkcjonowanie.",
    eyebrow: "Stres i przeciążenie",
    title: "Psycholog online przy stresie, presji i przeciążeniu",
    lead: [
      "Gdy obowiązki przekraczają dostępne zasoby, trudno odpoczywać nawet wtedy, kiedy pojawia się wolny czas.",
      "Konsultacja psychologiczna online może pomóc zobaczyć, co podtrzymuje przeciążenie, gdzie odzyskać wpływ i jaki krok będzie realny na teraz.",
    ],
    quickFacts: ["stres", "presja", "regeneracja", "granice"],
    sections: [
      {
        title: "Objawy, z którymi często przychodzą osoby przeciążone",
        body: [
          "Przeciążenie rzadko pojawia się z dnia na dzień. Często narasta stopniowo i dopiero po czasie zaczyna wpływać na ciało, emocje i relacje.",
        ],
        bullets: [
          "trudność z regeneracją po pracy",
          "ciągłe poczucie bycia pod presją",
          "rozdrażnienie lub spadek cierpliwości",
          "problemy ze snem",
          "poczucie winy przy odpoczynku",
          "trudność z odmawianiem albo stawianiem granic",
        ],
      },
      {
        title: "Co można omówić na konsultacji",
        body: [
          "Na pierwszym spotkaniu można przyjrzeć się temu, jakie sytuacje najbardziej obciążają, które reakcje pomagają krótkoterminowo, ale długoterminowo nasilają zmęczenie, oraz jakie zmiany są możliwe bez przewracania całego życia naraz.",
        ],
      },
      {
        title: "CBT i TSR w pracy ze stresem",
        body: [
          "Perspektywa CBT pomaga zobaczyć związek między myślami, emocjami, zachowaniem i reakcjami ciała. TSR pomaga szukać małych, realnych kroków oraz wzmacniać sposoby radzenia sobie, które już czasem działają.",
        ],
      },
    ],
    goodFit: [
      "odpoczynek nie daje już realnej regeneracji",
      "dużo funkcjonujesz na napięciu i kontroli",
      "trudno Ci odmawiać albo kończyć pracę",
      "chcesz rozpoznać, co konkretnie najbardziej obciąża",
    ],
    faq: [
      {
        question: "Czy przeciążenie jest wystarczającym powodem do konsultacji?",
        answer:
          "Tak. Nie trzeba czekać, aż trudności staną się skrajne. Konsultacja może pomóc wcześniej uporządkować sytuację i zaplanować realne zmiany.",
      },
      {
        question: "Czy jedna konsultacja wystarczy?",
        answer:
          "Czasem jedna rozmowa pomaga nazwać sytuację i ustalić kierunek. Jeśli potrzebna jest dalsza praca, jest to omawiane indywidualnie.",
      },
      {
        question: "Czy konsultacja dotyczy tylko stresu zawodowego?",
        answer:
          "Nie. Przeciążenie może dotyczyć pracy, relacji, opieki nad bliskimi, zmian życiowych albo kilku obszarów naraz.",
      },
    ],
    relatedLinks: [
      { href: "/blog/stres-i-przeciazenie", label: "Artykuł o stresie" },
      { href: "/blog/wypalenie-zawodowe", label: "Artykuł o wypaleniu" },
      { href: "/pierwsza-konsultacja-psychologiczna-online", label: "Pierwsza konsultacja" },
    ],
  },
  {
    slug: "konsultacja-cbt-tsr-online",
    metaTitle: "Konsultacja psychologiczna online CBT i TSR",
    metaDescription:
      "Konsultacje psychologiczne online prowadzone z wykorzystaniem perspektywy CBT i TSR: zrozumienie trudności i ustalenie kolejnego kroku.",
    eyebrow: "CBT i TSR",
    title: "Konsultacja psychologiczna online w podejściu CBT i TSR",
    lead: [
      "CBT i TSR to dwa praktyczne sposoby pracy, które pomagają rozumieć trudności i szukać realnych zmian.",
      "W konsultacji online można przyjrzeć się temu, co dzieje się w myślach, emocjach, zachowaniu i codziennych reakcjach, a następnie ustalić pierwszy możliwy krok.",
    ],
    quickFacts: ["CBT", "TSR", "rozmowa online", "konkretne kroki"],
    sections: [
      {
        title: "Co wnosi perspektywa CBT",
        body: [
          "CBT pomaga zobaczyć, jak interpretacje sytuacji, emocje, reakcje ciała i zachowania wpływają na siebie nawzajem.",
          "Taka perspektywa bywa przydatna między innymi przy lęku, stresie, obniżonym nastroju i powtarzających się schematach.",
        ],
      },
      {
        title: "Co wnosi perspektywa TSR",
        body: [
          "TSR koncentruje się na zasobach, wyjątkach od problemu i małych zmianach, które mogą być możliwe już teraz.",
          "Nie oznacza ignorowania trudności, tylko szukanie punktów oparcia i sprawdzanie, co może wspierać zmianę.",
        ],
      },
      {
        title: "Kiedy takie podejście może pasować",
        body: [
          "Może pasować, gdy potrzebujesz rozmowy uporządkowanej, konkretnej i nastawionej na zrozumienie aktualnej sytuacji oraz kolejnego kroku, zamiast ogólnych porad.",
        ],
      },
    ],
    goodFit: [
      "chcesz lepiej rozumieć związek myśli, emocji i zachowań",
      "potrzebujesz konkretnej struktury rozmowy",
      "szukasz małych kroków, które można sprawdzić w codzienności",
      "zależy Ci na spokojnym, indywidualnym ustaleniu kierunku",
    ],
    faq: [
      {
        question: "Czy CBT i TSR są terapią?",
        answer:
          "Mogą być elementem pracy psychologicznej lub terapeutycznej, ale dokładny zakres zależy od kwalifikacji specjalisty, celu i ustaleń po konsultacji.",
      },
      {
        question: "Czy podejście CBT może być pomocne przy lęku?",
        answer:
          "Perspektywa CBT bywa pomocna w rozumieniu mechanizmów lęku, a TSR w szukaniu realnych kroków i zasobów. Decyzja o dalszej pracy zależy od indywidualnej sytuacji.",
      },
      {
        question: "Czy konsultacja online różni się od stacjonarnej?",
        answer:
          "Forma kontaktu jest inna, ale rozmowa nadal może obejmować aktualne trudności, cele, kontekst i plan dalszych kroków.",
      },
    ],
    relatedLinks: [
      { href: "/o-mnie", label: "O psychologu" },
      { href: "/jak-to-dziala", label: "Jak wygląda konsultacja" },
      { href: "/obszary-pomocy", label: "Obszary pomocy" },
    ],
  },
  {
    slug: "psycholog-online-jak-wybrac",
    metaTitle: "Jak wybrać psychologa online",
    metaDescription:
      "Jak wybrać psychologa online: kwalifikacje, sposób pracy, poufność, pierwsza konsultacja i czerwone flagi przed umówieniem spotkania.",
    eyebrow: "Wybór specjalisty",
    title: "Jak wybrać psychologa online przed pierwszą konsultacją",
    lead: [
      "Dobry wybór psychologa online nie polega tylko na znalezieniu wolnego terminu.",
      "Warto sprawdzić kwalifikacje, sposób pracy, zasady poufności, formę kontaktu oraz to, czy pierwsza rozmowa daje poczucie jasności i szacunku.",
    ],
    quickFacts: ["kwalifikacje", "poufność", "pierwsza rozmowa", "realistyczny opis"],
    sections: [
      {
        title: "Na co zwrócić uwagę",
        body: [
          "Przed umówieniem spotkania warto sprawdzić, czy specjalista jasno opisuje swoje kwalifikacje, obszary pracy, przebieg konsultacji oraz zasady kontaktu.",
        ],
        bullets: [
          "czy wiadomo, jak wygląda pierwsza konsultacja",
          "czy opisane są zasady poufności",
          "czy strona zawiera dane kontaktowe",
          "czy komunikacja unika obietnic gwarantowanego efektu",
        ],
      },
      {
        title: "Czerwone flagi",
        body: [
          "Ostrożnie warto podchodzić do obietnic natychmiastowego rozwiązania trudności, gwarancji efektu, presji na szybką decyzję albo braku informacji o kwalifikacjach i zasadach kontaktu.",
        ],
      },
      {
        title: "Co może być dobrym znakiem",
        body: [
          "Dobrym znakiem jest jasne opisanie pierwszej konsultacji, spokojny język, realistyczne podejście do pomocy i możliwość zadania pytania przed umówieniem spotkania.",
        ],
      },
    ],
    goodFit: [
      "porównujesz różne formy konsultacji online",
      "chcesz wiedzieć, o co zapytać przed spotkaniem",
      "zależy Ci na jasnych zasadach i spokojnej komunikacji",
      "nie chcesz podejmować decyzji pod presją",
    ],
    faq: [
      {
        question: "Czy psycholog online powinien mieć opis kwalifikacji?",
        answer:
          "Tak. Informacja o kwalifikacjach i sposobie pracy pomaga podjąć bardziej świadomą decyzję.",
      },
      {
        question: "Czy warto zadzwonić przed pierwszą konsultacją?",
        answer:
          "Tak, szczególnie jeśli chcesz upewnić się, czy dana forma pomocy pasuje do Twojej sytuacji.",
      },
      {
        question: "Czy psycholog online powinien obiecywać szybki efekt?",
        answer:
          "Nie. Rzetelna komunikacja powinna unikać gwarancji efektu i uwzględniać indywidualny charakter pomocy psychologicznej.",
      },
    ],
    relatedLinks: [
      { href: "/o-mnie", label: "Kwalifikacje i sposób pracy" },
      { href: "/bezpieczenstwo-i-prywatnosc", label: "Bezpieczeństwo i prywatność" },
      { href: "/pierwsza-konsultacja-psychologiczna-online", label: "Pierwsza konsultacja" },
    ],
  },
  {
    slug: "psycholog-online-ataki-paniki",
    metaTitle: "Psycholog online przy atakach paniki",
    metaDescription:
      "Konsultacja psychologiczna online, gdy pojawiają się ataki paniki, silny lęk, kołatanie serca, duszność albo obawa przed kolejnym napadem.",
    eyebrow: "Ataki paniki",
    title: "Psycholog online przy atakach paniki i silnym lęku",
    lead: [
      "Atak paniki może być bardzo intensywnym doświadczeniem: pojawia się nagły lęk, napięcie w ciele, przyspieszone bicie serca, duszność albo myśl, że zaraz stanie się coś złego.",
      "Konsultacja psychologiczna online może pomóc uporządkować, co się dzieje, jakie sytuacje poprzedzają napady i jaki pierwszy krok będzie adekwatny oraz bezpieczny.",
    ],
    quickFacts: ["panika", "silny lęk", "ciało i myśli", "pierwszy krok"],
    sections: [
      {
        title: "Kiedy warto szukać wsparcia",
        body: [
          "Warto umówić konsultację, gdy napady paniki zaczynają wpływać na codzienne decyzje, sen, wychodzenie z domu, pracę albo relacje.",
          "Jeśli objawy są nowe, bardzo silne albo budzą obawę o zdrowie somatyczne, warto skonsultować je także medycznie.",
        ],
        bullets: [
          "boisz się kolejnego napadu",
          "unikasz miejsc lub sytuacji",
          "trudno odróżnić lęk od zagrożenia",
          "potrzebujesz spokojnie omówić objawy",
        ],
      },
      {
        title: "Co można omówić na pierwszej konsultacji",
        body: [
          "Pierwsza rozmowa pomaga nazwać objawy, sprawdzić, kiedy się pojawiają, co je nasila oraz jakie reakcje pomagają krótkoterminowo, ale mogą utrwalać błędne koło lęku.",
        ],
      },
      {
        title: "Jak pracować z lękiem",
        body: [
          "Perspektywa CBT pomaga rozumieć związek reakcji ciała, interpretacji objawów i zachowań zabezpieczających. TSR może wspierać szukanie małych kroków i sytuacji, w których odzyskujesz choć trochę wpływu.",
        ],
      },
    ],
    goodFit: [
      "doświadczasz nagłych fal lęku lub paniki",
      "martwisz się objawami z ciała",
      "chcesz zrozumieć mechanizm napadów",
      "potrzebujesz pierwszej spokojnej rozmowy online",
    ],
    faq: [
      {
        question: "Czy atak paniki jest powodem do konsultacji psychologicznej?",
        answer:
          "Tak. Konsultacja może pomóc uporządkować objawy, zrozumieć kontekst i zaplanować dalsze kroki. Przy nowych lub nietypowych objawach warto równolegle zadbać o konsultację medyczną.",
      },
      {
        question: "Czy muszę mieć diagnozę zaburzenia panicznego?",
        answer:
          "Nie. Na pierwszą konsultację można przyjść bez diagnozy, z opisem tego, co dzieje się w ciele, myślach i codziennym funkcjonowaniu.",
      },
      {
        question: "Czy konsultacja online może odbyć się z domu?",
        answer:
          "Tak. Spotkanie odbywa się przez wideo, dlatego warto zadbać o spokojne miejsce i czas bez pośpiechu po rozmowie.",
      },
    ],
    relatedLinks: [
      { href: "/psycholog-online-lek-i-napiecie", label: "Psycholog online przy lęku" },
      { href: "/pierwsza-konsultacja-psychologiczna-online", label: "Pierwsza konsultacja" },
      { href: "/rezerwacja", label: "Wybierz termin" },
    ],
  },
  {
    slug: "psycholog-online-wieczorem",
    metaTitle: "Psycholog online wieczorem",
    metaDescription:
      "Konsultacje psychologiczne online w godzinach popołudniowych i wieczornych dla osób, które potrzebują spotkania po pracy lub obowiązkach.",
    eyebrow: "Terminy popołudniowe",
    title: "Psycholog online wieczorem, po pracy lub po obowiązkach",
    lead: [
      "Nie każda osoba może umówić konsultację w środku dnia. Dla części osób łatwiej zadbać o rozmowę wtedy, gdy praca, opieka nad bliskimi albo inne obowiązki są już za nimi.",
      "W systemie rezerwacji można sprawdzić aktualne wolne godziny online i wybrać termin, który nie wymaga dojazdu ani organizowania wizyty stacjonarnej.",
    ],
    quickFacts: ["online", "po pracy", "bez dojazdu", "aktualne terminy"],
    sections: [
      {
        title: "Dla kogo taka forma może być wygodna",
        body: [
          "Konsultacja online wieczorem może pasować osobom, które w ciągu dnia mają ograniczoną elastyczność, mieszkają poza dużym miastem albo potrzebują rozmowy z domu.",
        ],
        bullets: [
          "pracujesz w stałych godzinach",
          "łatwiej Ci rozmawiać po zakończeniu obowiązków",
          "nie chcesz tracić czasu na dojazd",
          "jesteś poza Polską i szukasz wsparcia po polsku",
        ],
      },
      {
        title: "Jak sprawdzić najbliższe terminy",
        body: [
          "Aktualna dostępność jest pobierana z kalendarza i systemu rezerwacji. Jeśli konkretnej godziny nie widać, może być już zajęta, zablokowana albo poza ustawionym grafikiem.",
        ],
      },
      {
        title: "O czym pamiętać przed spotkaniem",
        body: [
          "Warto wybrać miejsce, w którym można rozmawiać swobodnie i poufnie. Dobrze zostawić sobie kilka minut po konsultacji, zamiast wracać natychmiast do kolejnych zadań.",
        ],
      },
    ],
    goodFit: [
      "szukasz konsultacji online poza środkiem dnia",
      "chcesz uniknąć dojazdu do gabinetu",
      "potrzebujesz rozmowy po polsku",
      "wolisz sprawdzić terminy samodzielnie online",
    ],
    faq: [
      {
        question: "Czy wieczorne terminy są zawsze dostępne?",
        answer:
          "Nie zawsze. Dostępność zależy od aktualnego grafiku i rezerwacji w kalendarzu, dlatego najlepiej sprawdzić ją w systemie rezerwacji.",
      },
      {
        question: "Czy konsultacja wieczorem różni się od dziennej?",
        answer:
          "Zakres rozmowy jest taki sam. Różni się tylko godzina spotkania i to, że dla wielu osób wieczór jest organizacyjnie łatwiejszy.",
      },
      {
        question: "Czy mogę umówić spotkanie z zagranicy?",
        answer:
          "Tak, konsultacje odbywają się online po polsku. Warto tylko uwzględnić różnicę czasu względem strefy Europe/Warsaw.",
      },
    ],
    relatedLinks: [
      { href: "/rezerwacja", label: "Aktualne terminy" },
      { href: "/polacy-za-granica", label: "Pomoc online dla Polaków za granicą" },
      { href: "/jak-to-dziala", label: "Jak działa konsultacja online" },
    ],
  },
] satisfies AiLandingPage[];

export type AiLandingPageSlug = (typeof aiLandingPages)[number]["slug"];

export function getAiLandingPage(slug: AiLandingPageSlug) {
  const page = aiLandingPages.find((landingPage) => landingPage.slug === slug);

  if (!page) {
    throw new Error(`Unknown AI landing page slug: ${slug}`);
  }

  return page;
}
