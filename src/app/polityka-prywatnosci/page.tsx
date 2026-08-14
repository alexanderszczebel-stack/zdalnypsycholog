import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Prywatności",
  description: "Polityka prywatności serwisu zdalnypsycholog.pl",
  robots: { index: false },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1F314D" }}>
        Polityka Prywatności
      </h1>
      <p className="text-sm mb-10" style={{ color: "#9A8E85" }}>
        Ostatnia aktualizacja: Maj 2026
      </p>
      <div className="prose prose-slate max-w-none space-y-6" style={{ color: "#2D2926" }}>

        <p>Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników serwisu zdalnypsycholog.pl.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>1. Administrator danych</h2>
        <p>Administratorem danych osobowych jest Mikołaj Szczebel, prowadzący serwis zdalnypsycholog.pl pod adresem Warszawa. Kontakt: kontakt@zdalnypsycholog.pl</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>2. Cel i podstawa przetwarzania danych</h2>
        <p>Dane osobowe przetwarzane są w następujących celach:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>odpowiedź na zapytania przesłane przez formularz kontaktowy, podstawa: art. 6 ust. 1 lit. a RODO (zgoda),</li>
          <li>umówienie i realizacja konsultacji psychologicznych, podstawa: art. 6 ust. 1 lit. b RODO (wykonanie umowy),</li>
          <li>wypełnienie obowiązków prawnych, podstawa: art. 6 ust. 1 lit. c RODO.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>3. Zakres zbieranych danych</h2>
        <p>Zbieramy wyłącznie dane niezbędne do realizacji usługi: imię, adres e-mail, treść wiadomości oraz dane podane dobrowolnie podczas konsultacji.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>4. Okres przechowywania danych</h2>
        <p>Dane przechowywane są przez okres niezbędny do realizacji celu, dla którego zostały zebrane, a po jego upływie przez czas wymagany przepisami prawa (maksymalnie 5 lat).</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>5. Prawa użytkownika</h2>
        <p>Każdy użytkownik ma prawo do:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>dostępu do swoich danych osobowych,</li>
          <li>sprostowania (poprawiania) danych,</li>
          <li>usunięcia danych (&quot;prawo do bycia zapomnianym&quot;),</li>
          <li>ograniczenia przetwarzania,</li>
          <li>przenoszenia danych,</li>
          <li>wniesienia sprzeciwu wobec przetwarzania,</li>
          <li>cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania dokonanego przed cofnięciem).</li>
        </ul>
        <p>Aby skorzystać z powyższych praw, skontaktuj się: kontakt@zdalnypsycholog.pl</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>6. Odbiorcy danych</h2>
        <p>Dane nie są sprzedawane ani udostępniane podmiotom trzecim, z wyjątkiem:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>dostawcy usługi formularza kontaktowego (Web3Forms),</li>
          <li>sytuacji wymaganych przez przepisy prawa.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>7. Pliki cookies</h2>
        <p>Serwis używa plików cookies. Szczegółowe informacje dostępne są w <a href="/polityka-cookies" className="underline" style={{ color: "#BC6C25" }}>Polityce Cookies</a>.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>8. Skarga do organu nadzorczego</h2>
        <p>Masz prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jeśli uznasz, że przetwarzanie Twoich danych narusza przepisy RODO.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>9. Zmiany Polityki Prywatności</h2>
        <p>Administrator zastrzega sobie prawo do zmiany niniejszej Polityki. O istotnych zmianach użytkownicy zostaną poinformowani na stronie serwisu.</p>

      </div>
    </main>
  );
}
