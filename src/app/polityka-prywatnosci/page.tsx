import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka Prywatności",
  description: "Polityka prywatności serwisu ZdalnyPsycholog.pl",
  robots: { index: false },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <section className="pt-32 md:pt-40 pb-20 bg-[color:var(--color-bg-main)]">
      <div className="container-main max-w-3xl">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)] mb-8">
          Polityka Prywatności
        </h1>
        <div className="prose prose-base text-[color:var(--color-text-secondary)] space-y-6">
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
            użytkowników serwisu ZdalnyPsycholog.pl.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            1. Administrator danych
          </h2>
          <p>
            Administratorem danych osobowych jest Mikołaj Szczebel, prowadzący serwis
            ZdalnyPsycholog.pl. Kontakt: kontakt@zdalnypsycholog.pl
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            2. Cel przetwarzania danych
          </h2>
          <p>
            Dane zbierane są wyłącznie w celu odpowiedzi na wiadomości przesłane przez formularz
            kontaktowy, umówienia konsultacji oraz realizacji usług psychologicznych.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            3. Prawa użytkownika
          </h2>
          <p>
            Każdy użytkownik ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia
            oraz wniesienia sprzeciwu wobec ich przetwarzania. W celu realizacji tych praw
            skontaktuj się z administratorem.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            4. Pliki cookies
          </h2>
          <p>
            Serwis może używać plików cookies w celu poprawy funkcjonalności. Możesz zarządzać
            plikami cookies w ustawieniach swojej przeglądarki.
          </p>
        </div>
      </div>
    </section>
  );
}
