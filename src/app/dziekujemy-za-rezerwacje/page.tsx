import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { PhoneTextLink } from "@/components/ui/PhoneCTA";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Twoja konsultacja została zarezerwowana",
  description: "Potwierdzenie rezerwacji konsultacji online.",
  robots: { index: false, follow: false },
  alternates: { canonical: canonicalUrl("/dziekujemy-za-rezerwacje") },
};

export default function DziekujemyZaRezerwacjePage() {
  return (
    <main className="min-h-screen bg-[#F6EFE6] px-6 py-20 md:py-28">
      <section
        className="mx-auto max-w-2xl rounded-[2rem] bg-white p-7 text-center md:p-10"
        style={{ border: "1px solid rgba(45,41,38,0.08)", boxShadow: "0 22px 60px rgba(31,49,77,0.12)" }}
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F314D] text-white">
          <CheckCircle2 size={28} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold leading-tight text-[#1F314D] md:text-4xl">
          Twoja konsultacja została zarezerwowana
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#6F6860] md:text-lg">
          Potwierdzenie oraz informacje dotyczące spotkania otrzymasz na podany adres e-mail.
        </p>
        <div
          className="mt-8 rounded-2xl p-5 text-left"
          style={{ background: "#F6EFE6", border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <div className="flex gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#BC6C25]">
              <Phone size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-[#1F314D]">
                W razie problemów organizacyjnych możesz skontaktować się telefonicznie.
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#6F6860]">
                Telefon: <PhoneTextLink className="font-semibold text-[#1F314D] hover:text-[#BC6C25]" />
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="btn-secondary mt-8">
          Wróć na stronę główną
        </Link>
      </section>
    </main>
  );
}
