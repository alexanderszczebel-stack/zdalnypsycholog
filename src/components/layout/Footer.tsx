import Link from "next/link";
import Logo, { LogoMark } from "./Logo";
import BookingCTA from "@/components/booking/BookingCTA";
import TrackedAnchor from "@/components/analytics/TrackedAnchor";
import {
  CONTACT_EMAIL,
  PHONE_EVENT_LABEL,
  PHONE_HREF,
  PHONE_NUMBER,
  WHATSAPP_LABEL,
  WHATSAPP_URL,
} from "@/lib/contact";

const navColumns = [
  {
    label: "Strona",
    links: [
      { href: "/o-mnie", label: "O mnie" },
      { href: "/jak-to-dziala", label: "Jak to działa" },
      { href: "/obszary-pomocy", label: "Obszary pomocy" },
      { href: "/cennik", label: "Cennik" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    label: "Wiedza",
    links: [
      { href: "/blog?kategoria=Terapia+online", label: "Terapia online" },
    ],
  },
  {
    label: "Informacje",
    links: [
      { href: "/kontakt", label: "Kontakt" },
      { href: "/bezpieczenstwo-i-prywatnosc", label: "Bezpieczeństwo" },
      { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
      { href: "/polityka-cookies", label: "Polityka cookies" },
      { href: "/regulamin", label: "Regulamin" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#1F314D" }}
    >
      {/* Subtle logo motif background */}
      <div className="absolute bottom-0 right-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <LogoMark size={300} />
      </div>

      <div className="container-main py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-8 mb-12">
          {/* Brand column */}
          <div>
            <div className="mb-5">
              <Logo variant="full" theme="light" size="md" />
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Konsultacje psychologiczne online prowadzone indywidualnie. Wybór terminu i
              płatność odbywają się online.
            </p>
            <div className="flex flex-col gap-2">
              <BookingCTA
                text="Wybierz termin konsultacji"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                eventName="przejscie_do_wyboru_terminu"
                iconSize={15}
              />
              <TrackedAnchor
                href={`mailto:${CONTACT_EMAIL}`}
                eventName="klik_email"
                eventParams={{
                  event_category: "kontakt",
                  event_label: `mailto:${CONTACT_EMAIL}`,
                }}
                className="text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {CONTACT_EMAIL}
              </TrackedAnchor>
              <TrackedAnchor
                href={PHONE_HREF}
                eventName="klik_telefon"
                eventParams={{
                  event_category: "kontakt",
                  event_label: PHONE_EVENT_LABEL,
                }}
                className="text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {PHONE_NUMBER}
              </TrackedAnchor>
              <p className="max-w-xs text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                Masz pytanie organizacyjne przed rezerwacją? Zadzwoń. Wybór terminu i płatność
                odbywają się online.
              </p>
              <TrackedAnchor
                href={WHATSAPP_URL}
                eventName="klik_whatsapp"
                eventParams={{
                  event_category: "whatsapp",
                  event_label: WHATSAPP_URL,
                }}
                className="text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.45)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {WHATSAPP_LABEL}
              </TrackedAnchor>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.label}>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {col.label}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Crisis disclaimer */}
        <div
          className="rounded-2xl px-5 py-4 mb-10 flex gap-3 items-start"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" />
            <path d="M9 6v4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="9" cy="12.5" r="0.7" fill="rgba(255,255,255,0.35)" />
          </svg>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            W sytuacji bezpośredniego zagrożenia życia lub zdrowia skontaktuj się z numerem
            alarmowym{" "}
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>112</strong> albo
            najbliższą placówką pomocy kryzysowej. Platforma zdalnypsycholog nie zastępuje
            interwencji kryzysowej.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © {new Date().getFullYear()} zdalnypsycholog. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-5">
            {[
              { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
              { href: "/regulamin", label: "Regulamin" },
              { href: "/bezpieczenstwo-i-prywatnosc", label: "Bezpieczeństwo" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
