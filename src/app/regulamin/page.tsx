import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin serwisu ZdalnyPsycholog.pl",
  robots: { index: false },
};

export default function RegulaminPage() {
  return (
    <section className="pt-32 md:pt-40 pb-20 bg-[color:var(--color-bg-main)]">
      <div className="container-main max-w-3xl">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)] mb-8">
          Regulamin
        </h1>
        <div className="prose prose-base text-[color:var(--color-text-secondary)] space-y-6">
          <p>
            Niniejszy Regulamin określa zasady korzystania z usług świadczonych przez
            ZdalnyPsycholog.pl.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            1. Postanowienia ogólne
          </h2>
          <p>
            Usługodawcą jest Mikołaj Szczebel. Usługi psychologiczne świadczone są wyłącznie
            online, na terytorium Polski i dla Polaków za granicą.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            2. Rezerwacja i płatność
          </h2>
          <p>
            Rezerwacja sesji następuje przez formularz kontaktowy. Płatność za sesję wymagana
            jest przed jej odbyciem. Akceptowane metody płatności: PayU, Stripe.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            3. Odwołanie sesji
          </h2>
          <p>
            Odwołanie sesji bez opłat możliwe jest do 24 godzin przed planowanym terminem.
            Odwołanie w czasie krótszym niż 24 godziny wiąże się z pełną opłatą za sesję.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            4. Ważność pakietów
          </h2>
          <p>
            Sesje zakupione w pakiecie są ważne przez 6 miesięcy od daty zakupu.
          </p>
          <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mt-8 mb-3">
            5. Poufność
          </h2>
          <p>
            Wszystkie informacje przekazane podczas sesji objęte są tajemnicą zawodową i nie
            są udostępniane osobom trzecim, z wyjątkiem sytuacji wymaganych przez prawo.
          </p>
        </div>
      </div>
    </section>
  );
}
