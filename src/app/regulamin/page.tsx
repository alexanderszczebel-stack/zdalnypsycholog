import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin platformy zdalnypsycholog.pl",
  description: "Regulamin serwisu zdalnypsycholog.pl",
  robots: { index: false },
};

export default function RegulaminPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1F314D" }}>
        Regulamin platformy zdalnypsycholog.pl
      </h1>
      <p className="text-sm mb-10" style={{ color: "#9A8E85" }}>
        Ostatnia aktualizacja: Maj 2026
      </p>
      <div className="prose prose-slate max-w-none space-y-6" style={{ color: "#2D2926" }}>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>1. Postanowienia ogólne</h2>
        <p>Usługodawcą jest Mikołaj Szczebel, prowadzący serwis zdalnypsycholog.pl, kontakt: kontakt@zdalnypsycholog.pl. Usługi psychologiczne świadczone są wyłącznie online, na terytorium Polski i dla Polaków przebywających za granicą.</p>
        <p>Korzystanie z serwisu jest równoznaczne z akceptacją niniejszego Regulaminu.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>2. Rodzaj świadczonych usług</h2>
        <p>Serwis umożliwia:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>kontakt z psychologiem za pośrednictwem formularza kontaktowego,</li>
          <li>umówienie jednorazowej konsultacji psychologicznej online (50 minut),</li>
          <li>kontynuację wsparcia psychologicznego w ustalonym cyklu.</li>
        </ul>
        <p>Usługi świadczone są przez Mikołaja Szczebla, psychologa z 8-letnim doświadczeniem.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>3. Rezerwacja i płatność</h2>
        <p>Termin konsultacji wybierany jest online w dostępnym systemie rezerwacyjnym. Płatność za konsultację wymagana jest podczas rezerwacji, a termin zostaje potwierdzony po jej dokonaniu. Aktualne ceny dostępne są na stronie Cennik. Akceptowane metody płatności zależą od konfiguracji operatora płatności w systemie rezerwacyjnym.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>4. Odwołanie i zmiana terminu sesji</h2>
        <p>Odwołanie sesji bez opłat możliwe jest do 24 godzin przed planowanym terminem. Odwołanie w czasie krótszym niż 24 godziny wiąże się z pełną opłatą za sesję. Zmiana terminu możliwa jest na takich samych zasadach jak odwołanie.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>5. Poufność i tajemnica zawodowa</h2>
        <p>Wszystkie informacje przekazane podczas sesji objęte są tajemnicą zawodową i nie są udostępniane osobom trzecim, z wyjątkiem sytuacji wymaganych przez prawo (bezpośrednie zagrożenie życia lub zdrowia).</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>6. Wymagania techniczne</h2>
        <p>Do korzystania z konsultacji online wymagane są: stabilne połączenie z internetem, urządzenie z kamerą i mikrofonem, przeglądarka internetowa w aktualnej wersji.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>7. Ograniczenia odpowiedzialności</h2>
        <p>Usługodawca nie ponosi odpowiedzialności za przerwy w świadczeniu usług wynikające z awarii technicznych niezależnych od niego. Konsultacje psychologiczne nie zastępują leczenia psychiatrycznego. W sytuacji bezpośredniego zagrożenia życia należy skontaktować się ze służbami ratunkowymi (112).</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>8. Reklamacje</h2>
        <p>Reklamacje należy zgłaszać na adres kontakt@zdalnypsycholog.pl w terminie 14 dni od zdarzenia. Reklamacja zostanie rozpatrzona w ciągu 14 dni roboczych.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>9. Ochrona danych osobowych</h2>
        <p>Zasady przetwarzania danych osobowych opisane są w <a href="/polityka-prywatnosci" className="underline" style={{ color: "#BC6C25" }}>Polityce Prywatności</a>.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>10. Zmiany Regulaminu</h2>
        <p>Usługodawca zastrzega sobie prawo do zmiany Regulaminu. O zmianach użytkownicy zostaną poinformowani na stronie serwisu z 14-dniowym wyprzedzeniem.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>11. Prawo właściwe</h2>
        <p>Regulamin podlega prawu polskiemu. Wszelkie spory rozstrzygane będą przez sąd właściwy dla miejsca zamieszkania Usługodawcy.</p>

      </div>
    </main>
  );
}
