"use client";
import Image from "next/image";
import Link from "next/link";
import BookingCTA from "@/components/booking/BookingCTA";
import { PHONE_NUMBER } from "@/lib/contact";

const checkmarks = [
  'konsultacja online prowadzona indywidualnie',
  'wybór terminu i płatność online',
  'liczba dostępnych terminów w tygodniu jest ograniczona',
];

export default function HeroSection() {
  return (
    <section style={{ background: '#F6EFE6' }} className="px-6 pt-[92px] pb-12 md:pt-28 md:pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] gap-7 md:gap-12 items-center">

          {/* Lewa kolumna */}
          <div className="flex flex-col gap-0">
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4" style={{ color: '#BC6C25' }}>
              WSPARCIE PSYCHOLOGICZNE ONLINE
            </p>
            <h1
              className="font-bold text-[2rem] md:text-4xl leading-[1.08] md:leading-snug mb-4 md:mb-5"
              style={{ color: '#1F314D' }}
            >
              Konsultacja psychologiczna online, spokojnie i konkretnie.
            </h1>
            <p className="text-[0.98rem] md:text-lg leading-relaxed mb-5 md:mb-8" style={{ color: '#6F6860' }}>
              Porządkujemy problem, priorytety i dalszy kierunek pracy. Termin wybierasz
              online, a potwierdzenie otrzymujesz po dokonaniu płatności.
            </p>
            <div className="hidden sm:flex flex-col gap-3 mb-8">
              {checkmarks.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#BC6C25' }}></span>
                  <span className="text-sm" style={{ color: '#2D2926' }}>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <BookingCTA text="Wybierz termin konsultacji" className="btn-primary w-full sm:w-auto" />
              <Link href="/kontakt#formularz" className="btn-secondary w-full sm:w-auto">
                Mam pytanie organizacyjne
              </Link>
            </div>
            <div className="mt-4 hidden sm:flex flex-wrap gap-2">
              {["50 minut", "online", "ograniczona dostępność"].map((item) => (
                <span
                  key={item}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    color: '#1F314D',
                    background: 'rgba(255,255,255,0.62)',
                    border: '1px solid rgba(45,41,38,0.08)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: '#9A8E85' }}>
              Telefon organizacyjny: {PHONE_NUMBER} ·{" "}
              <Link href="/kontakt" className="underline underline-offset-2 hover:text-[#BC6C25]">
                formularz kontaktowy
              </Link>{" "}
              ·{" "}
              <Link href="/cennik" className="underline underline-offset-2 hover:text-[#BC6C25]">
                cennik
              </Link>
            </p>
          </div>

          {/* Prawa kolumna */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <Image
                src="/images/mikolaj.jpg"
                alt="Mikołaj Szczebel - psycholog online"
                width={420}
                height={520}
                className="rounded-3xl object-cover w-full h-[220px] sm:h-[360px] lg:h-auto"
                style={{ objectPosition: 'center top' }}
                priority
              />
              <div
                className="absolute left-4 right-4 bottom-4 rounded-2xl px-4 py-3 backdrop-blur-md"
                style={{
                  background: 'rgba(253,251,247,0.88)',
                  border: '1px solid rgba(45,41,38,0.08)',
                  boxShadow: '0 10px 30px rgba(31,49,77,0.10)',
                }}
              >
                <p className="font-semibold text-sm md:text-base" style={{ color: '#1F314D' }}>
                  Mikołaj Szczebel
                </p>
                <p className="text-xs md:text-sm" style={{ color: '#6F6860' }}>
                  psycholog · konsultacje online
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-sm sm:hidden">
              {["50 min", "online", "terminy ograniczone"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl px-2.5 py-2 text-center text-[0.7rem] font-medium leading-snug"
                  style={{
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(45,41,38,0.08)',
                    color: '#1F314D',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
