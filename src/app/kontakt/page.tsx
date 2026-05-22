import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt | Umów Konsultację Psychologiczną Online",
  description:
    "Skontaktuj się z ZdalnyPsycholog.pl. Umów konsultację, zadaj pytanie lub napisz wiadomość. Odpowiemy w ciągu 24 godzin.",
};

const minieFaq = [
  {
    q: "Czy mogę umówić wizytę telefonicznie?",
    a: "Tak, zadzwoń do nas w godzinach pracy (pon–pt, 9:00–17:00). Chętnie pomożemy wybrać odpowiedni termin.",
  },
  {
    q: "Czy mogę zadać pytanie przed umówieniem wizyty?",
    a: "Oczywiście! Skorzystaj z formularza kontaktowego lub napisz e-mail. Odpiszemy w ciągu 24 godzin.",
  },
  {
    q: "Gdzie znajdę Politykę Prywatności?",
    a: "Politykę Prywatności znajdziesz w stopce strony lub pod adresem /polityka-prywatnosci.",
  },
];

export default function KontaktPage() {
  return (
    <section className="pt-32 md:pt-40 section-padding bg-[color:var(--color-bg-main)]">
      <div className="container-main">
        <div className="text-center mb-14">
          <AnimatedSection>
            <span className="section-label justify-center">Kontakt</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-[color:var(--color-text-primary)] mb-4 leading-tight">
              Napisz do nas
            </h1>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-xl mx-auto">
              Masz pytania? Chcesz umówić wizytę? Jesteśmy tu dla Ciebie.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedSection>
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mb-5">
                  Dane kontaktowe
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">E-mail</p>
                      <a href="mailto:kontakt@zdalnypsycholog.pl" className="text-[color:var(--color-primary)] text-sm hover:underline">
                        kontakt@zdalnypsycholog.pl
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">Telefon</p>
                      <a href="tel:+48123456789" className="text-[color:var(--color-primary)] text-sm hover:underline">
                        +48 123 456 789
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">Czas odpowiedzi</p>
                      <p className="text-[color:var(--color-text-secondary)] text-sm">Do 24h w dni robocze (pon–pt, 9:00–17:00)</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mb-5">
                  Często zadawane pytania
                </h2>
                <div className="space-y-4">
                  {minieFaq.map((item) => (
                    <div key={item.q} className="bg-white rounded-xl p-4 shadow-[var(--shadow-card)]">
                      <p className="font-semibold text-sm text-[color:var(--color-text-primary)] mb-1">{item.q}</p>
                      <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)]">
              <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mb-6">
                Formularz kontaktowy
              </h2>
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
