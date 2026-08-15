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
  {
    slug: "psycholog-online-relacje",
    metaTitle: "Psycholog online przy trudnościach w relacjach",
    metaDescription:
      "Konsultacja psychologiczna online, gdy konflikty, granice, samotność albo powtarzające się schematy utrudniają relacje.",
    eyebrow: "Relacje",
    title: "Psycholog online przy trudnościach w relacjach, granicach i bliskości",
    lead: [
      "Trudności w relacjach często nie zaczynają się od jednego wydarzenia. Czasem narastają przez powtarzające się konflikty, wycofanie, poczucie niezrozumienia albo trudność w stawianiu granic.",
      "Konsultacja psychologiczna online może pomóc nazwać schemat, zobaczyć własne reakcje i ustalić pierwszy realny krok w kontakcie z innymi.",
    ],
    quickFacts: ["relacje", "granice", "komunikacja", "schematy"],
    sections: [
      {
        title: "Kiedy warto porozmawiać",
        body: [
          "Rozmowa może być pomocna, gdy relacje zaczynają kosztować coraz więcej napięcia, a dotychczasowe sposoby rozmowy nie przynoszą zmiany.",
        ],
        bullets: [
          "często wracają podobne konflikty",
          "trudno powiedzieć wprost, czego potrzebujesz",
          "łatwo wycofujesz się albo reagujesz zbyt mocno",
          "granice są przekraczane lub trudne do utrzymania",
        ],
      },
      {
        title: "Co omawiamy na konsultacji",
        body: [
          "Pierwsza konsultacja pomaga rozpoznać sytuacje, w których pojawia się napięcie, oraz zobaczyć, jakie przekonania, emocje i zachowania utrwalają schemat.",
        ],
      },
      {
        title: "Bez szukania winnego",
        body: [
          "Celem rozmowy nie jest wskazanie, kto ma rację, tylko spokojne zrozumienie dynamiki i znalezienie kroku, który może poprawić jasność, granice albo sposób komunikacji.",
        ],
      },
    ],
    goodFit: [
      "powtarzają się konflikty lub ciche wycofanie",
      "chcesz lepiej rozumieć swoje reakcje w relacjach",
      "trudno Ci stawiać granice bez poczucia winy",
      "potrzebujesz spokojnie nazwać, co dzieje się w kontakcie z innymi",
    ],
    faq: [
      {
        question: "Czy mogę przyjść samodzielnie z tematem relacji?",
        answer:
          "Tak. Konsultacja indywidualna może dotyczyć relacji, komunikacji, granic i powtarzających się schematów, nawet jeśli druga osoba nie bierze udziału w spotkaniu.",
      },
      {
        question: "Czy to jest terapia par?",
        answer:
          "Ta strona dotyczy przede wszystkim indywidualnej konsultacji online. Jeśli potrzebna jest konsultacja dla par, warto omówić to organizacyjnie przed rezerwacją.",
      },
      {
        question: "Czy muszę wiedzieć, jaki jest problem?",
        answer:
          "Nie. Wystarczy opisać sytuacje, które wracają lub budzą napięcie. Pierwsza konsultacja pomaga doprecyzować temat.",
      },
    ],
    relatedLinks: [
      { href: "/blog/relacje", label: "Artykuł o relacjach" },
      { href: "/tsr-online", label: "TSR online" },
      { href: "/pierwsza-konsultacja-psychologiczna-online", label: "Pierwsza konsultacja" },
    ],
  },
  {
    slug: "psycholog-online-obnizony-nastroj",
    metaTitle: "Psycholog online przy obniżonym nastroju",
    metaDescription:
      "Konsultacja psychologiczna online, gdy spada energia, motywacja, poczucie sensu albo codzienne sprawy wymagają coraz większego wysiłku.",
    eyebrow: "Obniżony nastrój",
    title: "Psycholog online przy obniżonym nastroju i spadku energii",
    lead: [
      "Obniżony nastrój może stopniowo wpływać na pracę, relacje, sen, motywację i sposób myślenia o sobie.",
      "Pierwsza konsultacja online może pomóc bezpiecznie nazwać to, co się dzieje, bez pochopnego diagnozowania i bez presji na gotowe rozwiązania.",
    ],
    quickFacts: ["nastrój", "energia", "motywacja", "pierwsza rozmowa"],
    sections: [
      {
        title: "Sygnały, które warto potraktować poważnie",
        body: [
          "Warto porozmawiać, gdy spadek energii nie mija po odpoczynku albo zaczyna zmieniać codzienne funkcjonowanie.",
        ],
        bullets: [
          "trudniej rozpocząć lub kończyć codzienne sprawy",
          "rzeczy, które kiedyś dawały satysfakcję, tracą znaczenie",
          "pojawia się wycofanie z kontaktów",
          "rośnie samokrytyka albo poczucie bezradności",
        ],
      },
      {
        title: "Jak może pomóc konsultacja",
        body: [
          "Rozmowa pomaga oddzielić objawy, kontekst życiowy, przeciążenie i możliwe czynniki podtrzymujące gorszy nastrój.",
        ],
      },
      {
        title: "Kiedy potrzebny jest inny rodzaj pomocy",
        body: [
          "Jeśli pojawia się ryzyko zrobienia sobie krzywdy, myśli samobójcze lub bezpośrednie zagrożenie, potrzebna jest pilna pomoc kryzysowa lub medyczna, a nie oczekiwanie na konsultację online.",
        ],
      },
    ],
    goodFit: [
      "od dłuższego czasu masz mniej energii",
      "trudno Ci nazwać, czy to zmęczenie, smutek czy przeciążenie",
      "chcesz uporządkować sytuację bez oceniania",
      "potrzebujesz ustalić, jaki rodzaj dalszej pomocy ma sens",
    ],
    faq: [
      {
        question: "Czy obniżony nastrój musi oznaczać depresję?",
        answer:
          "Nie zawsze. Obniżony nastrój może mieć różne przyczyny. Konsultacja pomaga uporządkować obraz sytuacji i ustalić, czy potrzebna jest dalsza diagnostyka lub inna forma pomocy.",
      },
      {
        question: "Czy mogę umówić konsultację, jeśli nie mam siły mówić dużo?",
        answer:
          "Tak. Nie trzeba mieć gotowej, długiej historii. Rozmowa może zacząć się od kilku zdań o tym, co ostatnio jest najtrudniejsze.",
      },
      {
        question: "Czy konsultacja online wystarczy przy silnych objawach?",
        answer:
          "To zależy od sytuacji. Przy silnych, nagłych lub zagrażających objawach może być potrzebna pilna pomoc medyczna lub psychiatryczna.",
      },
    ],
    relatedLinks: [
      { href: "/blog/obnizony-nastroj", label: "Artykuł o obniżonym nastroju" },
      { href: "/psycholog-online-stres-i-przeciazenie", label: "Stres i przeciążenie" },
      { href: "/konsultacja-psychologiczna-online", label: "Konsultacja online" },
    ],
  },
  {
    slug: "psycholog-online-adhd-koncentracja",
    metaTitle: "Psycholog online ADHD i trudności z koncentracją",
    metaDescription:
      "Konsultacja psychologiczna online przy trudnościach z koncentracją, organizacją, planowaniem, chaosem i podejrzeniu ADHD u dorosłych.",
    eyebrow: "ADHD i koncentracja",
    title: "Psycholog online przy ADHD, koncentracji i trudnościach z organizacją",
    lead: [
      "Trudności z koncentracją, chaosem, planowaniem albo domykaniem spraw mogą wpływać na pracę, relacje i samoocenę.",
      "Konsultacja online nie zastępuje pełnej diagnostyki ADHD, ale może pomóc uporządkować objawy, codzienne trudności i dalsze możliwe kroki.",
    ],
    quickFacts: ["koncentracja", "organizacja", "ADHD", "dalszy krok"],
    sections: [
      {
        title: "Z czym można przyjść",
        body: [
          "Warto porozmawiać, gdy trudności z uwagą, organizacją lub impulsywnością zaczynają realnie przeszkadzać w codzienności.",
        ],
        bullets: [
          "odkładanie zadań mimo ważnych konsekwencji",
          "chaos w planowaniu i priorytetach",
          "poczucie, że stale gasisz pożary",
          "samokrytyka związana z niedomykaniem spraw",
        ],
      },
      {
        title: "Co daje pierwsza konsultacja",
        body: [
          "Pierwsza rozmowa pomaga zebrać najważniejsze informacje, odróżnić trudności organizacyjne od przeciążenia i ustalić, czy warto szukać dalszej diagnostyki.",
        ],
      },
      {
        title: "Bez etykietowania",
        body: [
          "Nie trzeba przychodzić z diagnozą. Można przyjść z opisem konkretnych sytuacji: pracy, nauki, relacji, obowiązków, snu i napięcia.",
        ],
      },
    ],
    goodFit: [
      "trudno Ci utrzymać uwagę lub plan",
      "masz poczucie chaosu mimo dużego wysiłku",
      "podejrzewasz ADHD i chcesz uporządkować dalsze kroki",
      "chcesz pracować nad codziennymi strategiami bez obiecywania cudów",
    ],
    faq: [
      {
        question: "Czy konsultacja online jest diagnozą ADHD?",
        answer:
          "Nie. Konsultacja może pomóc uporządkować trudności i wskazać możliwe dalsze kroki, ale pełna diagnoza ADHD wymaga odpowiedniej procedury diagnostycznej.",
      },
      {
        question: "Czy mogę przyjść bez diagnozy?",
        answer:
          "Tak. Możesz opisać konkretne trudności z koncentracją, planowaniem, impulsywnością lub organizacją.",
      },
      {
        question: "Czy CBT może pomóc przy organizacji?",
        answer:
          "Perspektywa CBT może pomagać analizować myśli, emocje i zachowania utrudniające działanie. Zakres pracy ustala się indywidualnie.",
      },
    ],
    relatedLinks: [
      { href: "/blog/adhd-u-doroslych", label: "Artykuł o ADHD u dorosłych" },
      { href: "/cbt-online", label: "CBT online" },
      { href: "/psycholog-online-stres-i-przeciazenie", label: "Stres i przeciążenie" },
    ],
  },
  {
    slug: "psycholog-online-samoocena",
    metaTitle: "Psycholog online przy niskiej samoocenie",
    metaDescription:
      "Konsultacja psychologiczna online, gdy samokrytyka, porównywanie się lub niskie poczucie wartości utrudniają decyzje, relacje i codzienne działanie.",
    eyebrow: "Samoocena",
    title: "Psycholog online przy niskiej samoocenie i silnej samokrytyce",
    lead: [
      "Niska samoocena często nie wygląda jak jeden problem. Może pojawiać się w decyzjach, relacjach, pracy, unikaniu działania albo ciągłym porównywaniu się z innymi.",
      "Konsultacja online może pomóc zobaczyć, jak działa wewnętrzny krytyk i jakie sytuacje najmocniej uruchamiają poczucie niewystarczalności.",
    ],
    quickFacts: ["samoocena", "samokrytyka", "poczucie wartości", "relacje"],
    sections: [
      {
        title: "Kiedy warto przyjrzeć się samoocenie",
        body: [
          "Warto porozmawiać, gdy sposób myślenia o sobie regularnie ogranicza działanie, relacje albo poczucie spokoju.",
        ],
        bullets: [
          "często porównujesz się z innymi",
          "trudno Ci przyjmować dobre informacje o sobie",
          "unikasz decyzji z obawy przed oceną",
          "błędy długo wracają w myślach",
        ],
      },
      {
        title: "Co można uporządkować",
        body: [
          "Na konsultacji można zobaczyć, w jakich sytuacjach samokrytyka jest najsilniejsza, jakie przekonania ją podtrzymują i jaki pierwszy krok będzie możliwy.",
        ],
      },
      {
        title: "Bez prostych haseł",
        body: [
          "Praca nad samooceną nie polega na powtarzaniu sloganów. Chodzi o spokojne rozumienie mechanizmów i budowanie bardziej adekwatnego sposobu traktowania siebie.",
        ],
      },
    ],
    goodFit: [
      "często myślisz o sobie surowiej niż o innych",
      "lęk przed oceną zatrzymuje Cię przed działaniem",
      "relacje uruchamiają poczucie bycia niewystarczającym",
      "chcesz lepiej rozumieć samokrytyczne myśli",
    ],
    faq: [
      {
        question: "Czy niska samoocena jest wystarczającym powodem do konsultacji?",
        answer:
          "Tak. Jeśli samokrytyka wpływa na decyzje, relacje lub codzienne funkcjonowanie, może być ważnym tematem konsultacji.",
      },
      {
        question: "Czy konsultacja polega na dawaniu porad?",
        answer:
          "Nie chodzi o gotowe rady, tylko o zrozumienie schematu, emocji i reakcji oraz ustalenie realnego pierwszego kroku.",
      },
      {
        question: "Czy temat samooceny łączy się z relacjami?",
        answer:
          "Często tak. Sposób oceniania siebie może wpływać na granice, bliskość, konflikty i gotowość do mówienia o potrzebach.",
      },
    ],
    relatedLinks: [
      { href: "/blog/niska-samoocena", label: "Artykuł o samoocenie" },
      { href: "/psycholog-online-relacje", label: "Relacje" },
      { href: "/tsr-online", label: "TSR online" },
    ],
  },
  {
    slug: "konsultacja-psychologiczna-online",
    metaTitle: "Konsultacja psychologiczna online",
    metaDescription:
      "Konsultacja psychologiczna online: 50 minut rozmowy, jasne zasady, płatność online i potwierdzenie terminu po rezerwacji.",
    eyebrow: "Konsultacja online",
    title: "Konsultacja psychologiczna online: pierwszy krok do uporządkowania sytuacji",
    lead: [
      "Konsultacja psychologiczna online to 50 minut rozmowy poświęconej aktualnej trudności, kontekstowi i możliwemu dalszemu krokowi.",
      "Nie musisz mieć gotowej diagnozy. Możesz przyjść z poczuciem przeciążenia, lęku, trudności w relacjach albo z tematem, którego jeszcze nie umiesz nazwać.",
    ],
    quickFacts: ["50 minut", "250 zł", "online", "płatność przy rezerwacji"],
    sections: [
      {
        title: "Dla kogo jest konsultacja",
        body: [
          "Konsultacja jest dla osób dorosłych, które chcą spokojnie porozmawiać z psychologiem, nazwać trudność i ustalić, co dalej.",
        ],
        bullets: [
          "gdy trudno samodzielnie uporządkować sytuację",
          "gdy objawy zaczynają wpływać na codzienność",
          "gdy potrzebujesz profesjonalnej rozmowy bez oceniania",
          "gdy chcesz sprawdzić, czy kontynuacja pracy ma sens",
        ],
      },
      {
        title: "Jak wygląda proces",
        body: [
          "Wybierasz termin online, podajesz dane organizacyjne, opłacasz konsultację przez Stripe i otrzymujesz potwierdzenie spotkania.",
        ],
      },
      {
        title: "Czego można się spodziewać",
        body: [
          "Rozmowa jest uporządkowana, ale dopasowana do sytuacji. Omawiamy trudność, dotychczasowe sposoby radzenia sobie, oczekiwania i możliwy kolejny krok.",
        ],
      },
    ],
    goodFit: [
      "chcesz zacząć od jednej rozmowy",
      "potrzebujesz nazwać problem i uporządkować objawy",
      "wolisz spotkanie online bez dojazdu",
      "chcesz znać cenę i proces przed rezerwacją",
    ],
    faq: [
      {
        question: "Ile kosztuje konsultacja psychologiczna online?",
        answer: "Konsultacja indywidualna trwa 50 minut i kosztuje 250 zł.",
      },
      {
        question: "Kiedy termin jest potwierdzony?",
        answer:
          "Termin zostaje potwierdzony po dokonaniu płatności podczas rezerwacji online.",
      },
      {
        question: "Czy konsultacja online jest dla każdej sytuacji?",
        answer:
          "Nie. W sytuacji bezpośredniego zagrożenia życia lub zdrowia potrzebna jest pilna pomoc kryzysowa lub medyczna.",
      },
    ],
    relatedLinks: [
      { href: "/cennik", label: "Cennik" },
      { href: "/jak-to-dziala", label: "Jak to działa" },
      { href: "/dobierz-sciezke", label: "Dobierz pierwszy krok" },
    ],
  },
  {
    slug: "cbt-online",
    metaTitle: "CBT online, konsultacja w podejściu poznawczo-behawioralnym",
    metaDescription:
      "CBT online jako uporządkowana perspektywa pracy z myślami, emocjami, reakcjami ciała i zachowaniami podczas konsultacji psychologicznej.",
    eyebrow: "CBT online",
    title: "CBT online: uporządkowana rozmowa o myślach, emocjach i zachowaniach",
    lead: [
      "Podejście poznawczo-behawioralne pomaga zobaczyć, jak myśli, emocje, reakcje ciała i zachowania wpływają na siebie nawzajem.",
      "W konsultacji online perspektywa CBT może pomóc uporządkować lęk, stres, napięcie, przeciążenie albo trudności w codziennym działaniu.",
    ],
    quickFacts: ["CBT", "struktura", "mechanizmy", "online"],
    sections: [
      {
        title: "Co oznacza perspektywa CBT",
        body: [
          "CBT nie polega na pozytywnym myśleniu. Chodzi o sprawdzanie, jakie interpretacje, emocje i zachowania tworzą błędne koła albo podtrzymują trudność.",
        ],
      },
      {
        title: "Kiedy może pasować",
        body: [
          "CBT może być dobrym punktem odniesienia, gdy chcesz pracować bardziej konkretnie, rozumieć mechanizmy i szukać możliwych zmian w codziennych reakcjach.",
        ],
        bullets: [
          "lęk i zamartwianie się",
          "napięcie i stres",
          "unikanie trudnych sytuacji",
          "samokrytyczne myśli",
        ],
      },
      {
        title: "Jak wygląda online",
        body: [
          "Forma online nadal pozwala prowadzić rozmowę w jasnej strukturze: temat, kontekst, mechanizm, możliwy eksperyment lub krok między spotkaniami.",
        ],
      },
    ],
    goodFit: [
      "lubisz rozumieć, co podtrzymuje problem",
      "potrzebujesz uporządkowanej rozmowy",
      "chcesz pracować na konkretnych sytuacjach z codzienności",
      "szukasz podejścia bez obietnic szybkich efektów",
    ],
    faq: [
      {
        question: "Czy CBT online działa tak samo jak stacjonarnie?",
        answer:
          "Forma kontaktu jest inna, ale wiele elementów CBT można omawiać online. Ważne są warunki do spokojnej i poufnej rozmowy.",
      },
      {
        question: "Czy CBT jest tylko na lęk?",
        answer:
          "Nie. Perspektywa CBT bywa użyteczna w pracy z lękiem, stresem, nastrojem, samokrytyką i codziennymi schematami działania.",
      },
      {
        question: "Czy dostanę gotowe zadania?",
        answer:
          "Zakres pracy ustala się indywidualnie. Czasem pomocne są obserwacje lub małe kroki między spotkaniami, ale nie są one celem samym w sobie.",
      },
    ],
    relatedLinks: [
      { href: "/konsultacja-cbt-tsr-online", label: "CBT i TSR" },
      { href: "/psycholog-online-lek-i-napiecie", label: "Lęk i napięcie" },
      { href: "/psycholog-online-adhd-koncentracja", label: "ADHD i koncentracja" },
    ],
  },
  {
    slug: "tsr-online",
    metaTitle: "TSR online, konsultacja skoncentrowana na rozwiązaniach",
    metaDescription:
      "TSR online jako spokojna rozmowa o zasobach, wyjątkach od problemu i małych realnych krokach w konsultacji psychologicznej.",
    eyebrow: "TSR online",
    title: "TSR online: rozmowa o zasobach, wyjątkach i najbliższym kroku",
    lead: [
      "Terapia Skoncentrowana na Rozwiązaniach pomaga szukać tego, co już choć trochę działa, oraz małych kroków możliwych w konkretnym życiu.",
      "W konsultacji online perspektywa TSR może być pomocna, gdy potrzebujesz mniej etykietowania, a więcej jasności, wpływu i praktycznego kierunku.",
    ],
    quickFacts: ["TSR", "zasoby", "małe kroki", "online"],
    sections: [
      {
        title: "Na czym polega TSR",
        body: [
          "TSR nie ignoruje problemu. Pomaga jednak zobaczyć sytuacje, w których trudność jest choć trochę mniejsza, oraz zasoby, które można wzmacniać.",
        ],
      },
      {
        title: "Kiedy może pasować",
        body: [
          "TSR może być pomocne, gdy chcesz zacząć od konkretnego, możliwego kroku, a nie od wielomiesięcznego analizowania całej historii życia.",
        ],
        bullets: [
          "poczucie utknięcia",
          "trudności w relacjach",
          "samoocena i sprawczość",
          "przeciążenie i brak wpływu",
        ],
      },
      {
        title: "Co dzieje się na konsultacji",
        body: [
          "Rozmowa może obejmować oczekiwany kierunek zmiany, wyjątki od problemu, zasoby i małe działania, które da się sprawdzić po spotkaniu.",
        ],
      },
    ],
    goodFit: [
      "chcesz zobaczyć, co może być pierwszym małym krokiem",
      "nie chcesz być sprowadzany do etykiety problemu",
      "potrzebujesz więcej poczucia wpływu",
      "szukasz spokojnej rozmowy nastawionej na przyszłość",
    ],
    faq: [
      {
        question: "Czy TSR oznacza szybkie rozwiązanie problemu?",
        answer:
          "Nie. TSR koncentruje się na zasobach i kierunku zmiany, ale nie obiecuje natychmiastowych efektów.",
      },
      {
        question: "Czy TSR nadaje się do rozmowy online?",
        answer:
          "Tak, jeśli masz warunki do spokojnego spotkania. Pytania, refleksja i planowanie kroków mogą odbywać się online.",
      },
      {
        question: "Czy TSR można łączyć z CBT?",
        answer:
          "W konsultacji można korzystać z obu perspektyw, jeśli pasuje to do tematu i celu rozmowy.",
      },
    ],
    relatedLinks: [
      { href: "/konsultacja-cbt-tsr-online", label: "CBT i TSR" },
      { href: "/psycholog-online-relacje", label: "Relacje" },
      { href: "/psycholog-online-samoocena", label: "Samoocena" },
    ],
  },
  {
    slug: "psycholog-po-polsku-za-granica",
    metaTitle: "Psycholog po polsku za granicą online",
    metaDescription:
      "Konsultacja psychologiczna online po polsku dla osób mieszkających za granicą, które chcą rozmawiać w ojczystym języku.",
    eyebrow: "Polacy za granicą",
    title: "Psycholog po polsku za granicą, online i bez dojazdu",
    lead: [
      "Życie za granicą może oznaczać zmianę języka, rytmu, relacji i systemu wsparcia. W trudniejszych momentach rozmowa po polsku bywa po prostu bardziej precyzyjna.",
      "Konsultacja online pozwala rozmawiać z psychologiem po polsku niezależnie od miejsca pobytu, z uwzględnieniem dostępnych terminów i strefy Europe/Warsaw.",
    ],
    quickFacts: ["po polsku", "online", "za granicą", "bez dojazdu"],
    sections: [
      {
        title: "Z czym często zgłaszają się osoby za granicą",
        body: [
          "Tematem konsultacji może być samotność, przeciążenie adaptacją, relacje na odległość, praca, tęsknota, poczucie zawieszenia albo trudność w proszeniu o pomoc w obcym systemie.",
        ],
      },
      {
        title: "Dlaczego język ma znaczenie",
        body: [
          "O emocjach, niuansach relacji i własnej historii często łatwiej mówić w języku, w którym powstawały najważniejsze doświadczenia.",
        ],
      },
      {
        title: "Jak zarezerwować spotkanie",
        body: [
          "Wybierasz termin online, opłacasz konsultację i otrzymujesz potwierdzenie. Przy rezerwacji warto uwzględnić różnicę czasu względem Polski.",
        ],
      },
    ],
    goodFit: [
      "mieszkasz poza Polską i chcesz rozmawiać po polsku",
      "trudno Ci znaleźć specjalistę w obecnym kraju",
      "zmiana kraju nasiliła napięcie lub samotność",
      "potrzebujesz konsultacji bez organizowania dojazdu",
    ],
    faq: [
      {
        question: "Czy mogę połączyć się z innego kraju?",
        answer:
          "Tak. Konsultacje odbywają się online, dlatego możesz dołączyć z miejsca, w którym masz prywatność i stabilny internet.",
      },
      {
        question: "W jakiej strefie czasowej są terminy?",
        answer:
          "Terminy są prowadzone według strefy Europe/Warsaw. Przy rezerwacji warto porównać ją ze swoją lokalną godziną.",
      },
      {
        question: "Czy rozmowa po polsku ma znaczenie?",
        answer:
          "Dla wielu osób tak, bo pozwala precyzyjniej nazywać emocje, wspomnienia i relacje. To szczególnie ważne przy tematach osobistych.",
      },
    ],
    relatedLinks: [
      { href: "/polacy-za-granica", label: "Więcej dla Polaków za granicą" },
      { href: "/psycholog-online-wieczorem", label: "Terminy wieczorne" },
      { href: "/konsultacja-psychologiczna-online", label: "Konsultacja online" },
    ],
  },
  {
    slug: "czy-konsultacja-online-jest-dla-mnie",
    metaTitle: "Czy konsultacja psychologiczna online jest dla mnie",
    metaDescription:
      "Sprawdź, kiedy konsultacja psychologiczna online może być dobrym pierwszym krokiem, a kiedy potrzebna jest inna forma pomocy.",
    eyebrow: "Czy online pasuje",
    title: "Czy konsultacja psychologiczna online jest dla mnie?",
    lead: [
      "Konsultacja online może być dobrym pierwszym krokiem, jeśli potrzebujesz uporządkowanej rozmowy, masz warunki do prywatnego spotkania i nie jesteś w sytuacji bezpośredniego zagrożenia.",
      "Nie jest jednak najlepszą formą dla każdej sytuacji. Dlatego warto jasno sprawdzić, kiedy online ma sens, a kiedy potrzebna jest pilniejsza lub inna pomoc.",
    ],
    quickFacts: ["online", "poufność", "pierwszy krok", "granice pomocy"],
    sections: [
      {
        title: "Kiedy online może być dobrym wyborem",
        body: [
          "Forma online sprawdza się, gdy możesz znaleźć spokojne miejsce, stabilny internet i chcesz zacząć od rozmowy o aktualnej trudności.",
        ],
        bullets: [
          "mieszkasz daleko albo za granicą",
          "trudno Ci organizować dojazdy",
          "chcesz rozmawiać po polsku",
          "potrzebujesz pierwszego uporządkowania sytuacji",
        ],
      },
      {
        title: "Kiedy wybrać inną pomoc",
        body: [
          "Jeśli istnieje bezpośrednie zagrożenie życia lub zdrowia, nasilone myśli samobójcze albo potrzeba pilnej interwencji, właściwsza jest pomoc kryzysowa, medyczna lub numer alarmowy 112.",
        ],
      },
      {
        title: "Jak się przygotować",
        body: [
          "Wystarczy prywatne miejsce, urządzenie z kamerą i mikrofonem, stabilny internet oraz kilka zdań o tym, co obecnie najbardziej utrudnia funkcjonowanie.",
        ],
      },
    ],
    goodFit: [
      "chcesz sprawdzić, czy online będzie wystarczająco komfortowe",
      "nie wiesz, czy problem nadaje się na konsultację",
      "potrzebujesz jasnych granic i zasad przed rezerwacją",
      "chcesz wybrać między kontaktem, przewodnikiem i rezerwacją",
    ],
    faq: [
      {
        question: "Czy kamera jest konieczna?",
        answer:
          "Najlepiej, gdy spotkanie odbywa się z kamerą i mikrofonem, w miejscu zapewniającym prywatność. Ograniczenia techniczne warto omówić przed konsultacją.",
      },
      {
        question: "Czy konsultacja online jest poufna?",
        answer:
          "Tak, konsultacja odbywa się z poszanowaniem poufności i zasad etycznych, z wyjątkami dotyczącymi bezpośredniego zagrożenia życia lub zdrowia.",
      },
      {
        question: "Czy mogę najpierw zadać pytanie?",
        answer:
          "Tak. Formularz, telefon i WhatsApp pozostają dostępne w sprawach organizacyjnych przed rezerwacją.",
      },
    ],
    relatedLinks: [
      { href: "/dobierz-sciezke", label: "Dobierz pierwszy krok" },
      { href: "/jak-to-dziala", label: "Jak wygląda konsultacja" },
      { href: "/rezerwacja", label: "Wybierz termin" },
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
