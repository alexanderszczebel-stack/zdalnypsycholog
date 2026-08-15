"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import BookingCTA from "@/components/booking/BookingCTA";

const navLinks = [
  { href: "/o-mnie", label: "O mnie" },
  { href: "/jak-to-dziala", label: "Jak to działa" },
  { href: "/obszary-pomocy", label: "Obszary pomocy" },
  { href: "/dobierz-sciezke", label: "Dobierz ścieżkę" },
  { href: "/cennik", label: "Cennik" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (pathname === "/umow" || pathname === "/polacy-za-granica") return null;

  return (
    <>
      <header
        className="site-navbar fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          background: '#F6EFE6',
          borderBottom: '1px solid rgba(45,41,38,0.08)',
        }}
      >
        <div className="container-main flex items-center justify-between h-[68px] md:h-[76px]">
          {/* Logo */}
          <Link href="/" aria-label="zdalnypsycholog, strona główna">
            <Logo size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Główna nawigacja">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-[#1F314D] bg-[#E8D8C4]/50"
                    : "text-[#6F6860] hover:text-[#2D2926] hover:bg-[#E8D8C4]/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <BookingCTA
              text="Wybierz termin konsultacji"
              className="btn-primary text-sm px-5 py-2.5"
              iconSize={15}
            />
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -mr-1 rounded-xl text-[#2D2926] hover:bg-[#E8D8C4]/40 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="lg:hidden fixed inset-0 top-[68px] bg-[#FDFBF7] z-40 flex flex-col md:top-[76px]"
            aria-label="Menu mobilne"
          >
            <div className="flex-1 overflow-y-auto px-5 pt-6 pb-32">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-2xl text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "text-[#1F314D] bg-[#E8D8C4]/60"
                        : "text-[#2D2926] hover:bg-[#F6EFE6]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div
                className="mt-6 rounded-2xl p-4"
                style={{
                  background: "rgba(31,49,77,0.04)",
                  border: "1px solid rgba(45,41,38,0.08)",
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#BC6C25] mb-2">
                  Kontakt
                </p>
                <p className="text-lg font-semibold text-[#1F314D]">Rezerwacja online</p>
                <p className="text-sm text-[#6F6860] mt-1">
                  Konsultacje odbywają się po wyborze terminu online i dokonaniu płatności.
                  Telefon pozostaje dostępny w sprawach organizacyjnych.
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile sticky bottom CTA */}
      <div
        className="site-mobile-sticky lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FDFBF7]/96 backdrop-blur-md border-t border-[rgba(45,41,38,0.08)]"
        style={{ padding: "12px 16px", paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <BookingCTA
          text="Wybierz termin konsultacji"
          className="btn-primary w-full justify-center"
        />
      </div>
    </>
  );
}
