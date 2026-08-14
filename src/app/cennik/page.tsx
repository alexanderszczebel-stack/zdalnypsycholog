import type { Metadata } from "next";
import Link from "next/link";
import BookingCTA from "@/components/booking/BookingCTA";
import { PhoneTextLink } from "@/components/ui/PhoneCTA";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cennik konsultacji psychologicznych online",
  description:
    "Cennik konsultacji psychologicznych online. Konsultacja trwa 50 minut, a termin zostaje potwierdzony po dokonaniu płatności.",
  alternates: { canonical: canonicalUrl("/cennik") },
};

const pricingGroups = [
  {
    title: "Konsultacja indywidualna",
    note: "Spotkanie online, 50 minut",
    options: [
      { label: "1 sesja", price: "250 zł" },
      { label: "Pakiet 4 sesji", price: "900 zł" },
    ],
  },
  {
    title: "Konsultacja dla par",
    note: "Spotkanie online dla dwojga, po wcześniejszym ustaleniu celu konsultacji",
    options: [
      { label: "1 sesja dla par", price: "310 zł" },
      { label: "Pakiet 4 sesji dla par", price: "1100 zł" },
    ],
  },
];

export default function CennikPage() {
  return (
    <main className="pt-32 md:pt-40 pb-20 bg-[#F6EFE6]">
      <section className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="section-label justify-center mb-4">Cennik</p>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-[#1F314D] leading-tight">
            Cennik konsultacji online
          </h1>
          <p className="text-[#6F6860] mt-5 text-lg leading-relaxed">
            Konsultacje prowadzone są indywidualnie. Wybór terminu i płatność odbywają się
            online, a termin zostaje potwierdzony po dokonaniu płatności.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {pricingGroups.map((group) => (
            <section
              key={group.title}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              style={{ border: "1px solid rgba(45,41,38,0.08)" }}
            >
              <div className="pb-5 mb-5" style={{ borderBottom: "1px solid rgba(45,41,38,0.08)" }}>
                <h2 className="font-display font-semibold text-2xl text-[#1F314D]">
                  {group.title}
                </h2>
                <p className="text-sm text-[#9A8E85] mt-2 leading-relaxed">{group.note}</p>
              </div>

              <div className="space-y-4">
                {group.options.map((option) => (
                  <div
                    key={option.label}
                    className="flex items-center justify-between gap-4 rounded-xl px-4 py-4"
                    style={{ background: "rgba(31,49,77,0.035)" }}
                  >
                    <p className="text-[#2D2926] font-medium">{option.label}</p>
                    <p className="font-display font-semibold text-2xl text-[#1F314D] whitespace-nowrap">
                      {option.price}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section
          className="max-w-3xl mx-auto mt-10 rounded-2xl p-6 md:p-8 text-center bg-white"
          style={{ border: "1px solid rgba(45,41,38,0.08)" }}
        >
          <p className="text-[#2D2926] text-lg leading-relaxed">
            Aby zarezerwować konsultację, wybierz dostępny termin online.
          </p>
          <p className="text-[#6F6860] text-sm mt-3">
            Liczba dostępnych terminów w tygodniu jest ograniczona. Możesz też napisać przez{" "}
            <Link href="/kontakt#formularz" className="font-semibold text-[#1F314D] hover:text-[#BC6C25] transition-colors">
              formularz kontaktowy
            </Link>{" "}
            w sprawie organizacyjnej. Telefon:{" "}
            <PhoneTextLink className="font-semibold text-[#1F314D] hover:text-[#BC6C25] transition-colors" />.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mt-6">
            <BookingCTA text="Wybierz termin konsultacji" className="btn-primary" />
            <Link href="/kontakt#formularz" className="btn-secondary">
              Mam pytanie organizacyjne
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
