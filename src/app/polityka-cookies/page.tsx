import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Cookies",
  description: "Informacja o plikach cookies serwisu zdalnypsycholog.pl",
  robots: { index: false },
};

export default function PolitykaCookiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1F314D" }}>
        Polityka Cookies
      </h1>
      <p className="text-sm mb-10" style={{ color: "#9A8E85" }}>
        Ostatnia aktualizacja: Maj 2026
      </p>
      <div className="prose prose-slate max-w-none space-y-6" style={{ color: "#2D2926" }}>

        <p>Niniejsza Polityka Cookies wyjaśnia, czym są pliki cookies, jakie rodzaje stosujemy w serwisie zdalnypsycholog.pl oraz jak możesz nimi zarządzać.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>1. Czym są pliki cookies?</h2>
        <p>Pliki cookies (ciasteczka) to małe pliki tekstowe zapisywane na Twoim urządzeniu (komputerze, smartfonie, tablecie) podczas odwiedzania stron internetowych. Umożliwiają rozpoznanie urządzenia i zapamiętanie wybranych przez Ciebie ustawień.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>2. Jakie cookies stosujemy?</h2>
        <p><strong>Cookies niezbędne</strong>, konieczne do prawidłowego funkcjonowania serwisu. Nie wymagają Twojej zgody i nie można ich wyłączyć.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><code>cookie-consent</code>, zapamiętuje Twoją decyzję dotyczącą zgody na cookies (czas przechowywania: 12 miesięcy).</li>
        </ul>

        <p className="mt-4"><strong>Cookies analityczne</strong>, służą do analizy korzystania z serwisu. Stosowane wyłącznie za Twoją zgodą.</p>

        <p className="mt-4"><strong>Cookies funkcjonalne</strong>, zapamiętują Twoje preferencje, np. język interfejsu.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>3. Cookies podmiotów trzecich</h2>
        <p>Serwis korzysta z następujących usług zewnętrznych, które mogą ustawiać własne cookies:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Web3Forms</strong>, obsługa formularza kontaktowego. Nie przechowuje plików cookies.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>4. Jak zarządzać plikami cookies?</h2>
        <p>Możesz zarządzać plikami cookies na dwa sposoby:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Przez ustawienia przeglądarki</strong>, każda przeglądarka umożliwia zarządzanie plikami cookies (blokowanie, usuwanie, wgląd). Szczegóły znajdziesz w pomocy swojej przeglądarki.</li>
          <li><strong>Przez baner cookies</strong>, przy pierwszej wizycie możesz zaakceptować lub odrzucić cookies analityczne.</li>
        </ul>
        <p>Wyłączenie cookies niezbędnych może uniemożliwić prawidłowe działanie serwisu.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>5. Podstawa prawna</h2>
        <p>Cookies niezbędne stosowane są na podstawie prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO). Pozostałe cookies stosowane są na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO), którą możesz wycofać w dowolnym momencie.</p>

        <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: "#1F314D" }}>6. Kontakt</h2>
        <p>W sprawach dotyczących cookies skontaktuj się z nami: kontakt@zdalnypsycholog.pl</p>
        <p>Więcej informacji o przetwarzaniu danych osobowych znajdziesz w <a href="/polityka-prywatnosci" className="underline" style={{ color: "#BC6C25" }}>Polityce Prywatności</a>.</p>

      </div>
    </main>
  );
}
