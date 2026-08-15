import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ContactForm from "@/components/contact/ContactForm";
import TrackedAnchor from "@/components/analytics/TrackedAnchor";
import BookingCTA from "@/components/booking/BookingCTA";
import { canonicalUrl } from "@/lib/site";
import { CalendarDays, Mail, MessageCircle, Phone, Clock } from "lucide-react";
import {
  CONTACT_EMAIL,
  PHONE_EVENT_LABEL,
  PHONE_HREF,
  PHONE_NUMBER,
  WHATSAPP_LABEL,
  WHATSAPP_URL,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Kontakt | Konsultacja psychologiczna online",
  description:
    "Wybierz termin konsultacji psychologicznej online lub zadaj krótkie pytanie organizacyjne przed rezerwacją.",
  alternates: { canonical: canonicalUrl("/kontakt") },
};

const minieFaq = [
  {
    q: "Czy mogę umówić wizytę telefonicznie?",
    a: "Wybór terminu i płatność odbywają się online. Telefon pozostaje dostępny w sprawach organizacyjnych przed rezerwacją.",
  },
  {
    q: "Czy mogę zadać pytanie przed umówieniem wizyty?",
    a: "Tak. Możesz zadzwonić, napisać przez WhatsApp, skorzystać z formularza kontaktowego albo najpierw przejść przez ankietę 'Dobierz ścieżkę'.",
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
              Kontakt i dostępne terminy
            </h1>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-xl mx-auto">
              Konsultacje odbywają się po wyborze terminu online i dokonaniu płatności. Formularz
              i telefon pozostają dostępne do pytań organizacyjnych.
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
                <div
                  className="rounded-2xl p-5 mb-6 bg-white shadow-[var(--shadow-card)]"
                  style={{ border: "1px solid rgba(45,41,38,0.06)" }}
                >
                  <p className="text-sm leading-relaxed text-[color:var(--color-text-secondary)] mb-4">
                    Liczba dostępnych terminów w tygodniu jest ograniczona. Główna ścieżka to
                    wybór terminu i płatność online.
                  </p>
                  <div className="flex flex-col gap-3">
                    <BookingCTA text="Wybierz termin konsultacji" className="btn-primary" />
                    <a href="/dobierz-sciezke" className="btn-secondary">
                      Dobierz pierwszy krok
                    </a>
                    <a href="#formularz" className="btn-secondary">
                      Mam pytanie organizacyjne
                    </a>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">E-mail</p>
                      <TrackedAnchor
                        href={`mailto:${CONTACT_EMAIL}`}
                        eventName="klik_email"
                        eventParams={{
                          event_category: "kontakt",
                          event_label: `mailto:${CONTACT_EMAIL}`,
                        }}
                        className="text-[color:var(--color-primary)] text-sm hover:underline"
                      >
                        {CONTACT_EMAIL}
                      </TrackedAnchor>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">Telefon</p>
                      <TrackedAnchor
                        href={PHONE_HREF}
                        eventName="klik_telefon"
                        eventParams={{
                          event_category: "kontakt",
                          event_label: PHONE_EVENT_LABEL,
                        }}
                        className="text-[color:var(--color-primary)] text-sm hover:underline"
                      >
                        {PHONE_NUMBER}
                      </TrackedAnchor>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">WhatsApp</p>
                      <TrackedAnchor
                        href={WHATSAPP_URL}
                        eventName="klik_telefon"
                        eventParams={{
                          event_category: "whatsapp",
                          event_label: WHATSAPP_URL,
                        }}
                        className="text-[color:var(--color-primary)] text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {WHATSAPP_LABEL}
                      </TrackedAnchor>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <CalendarDays size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">
                        Terminy online
                      </p>
                      <TrackedAnchor
                        href="/rezerwacja"
                        eventName="przejscie_do_wyboru_terminu"
                        eventParams={{ event_category: "booking", event_label: "/rezerwacja" }}
                        className="text-[color:var(--color-primary)] text-sm hover:underline"
                      >
                        Wybierz termin konsultacji
                      </TrackedAnchor>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-[color:var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--color-text-primary)] mb-0.5">Czas odpowiedzi</p>
                      <p className="text-[color:var(--color-text-secondary)] text-sm">
                        Po rezerwacji otrzymasz potwierdzenie i informacje organizacyjne na
                        podany adres e-mail.
                      </p>
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
            <div id="formularz" className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)]">
              <h2 className="font-display font-bold text-xl text-[color:var(--color-text-primary)] mb-6">
                Formularz kontaktowy jako opcja dodatkowa
              </h2>
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
