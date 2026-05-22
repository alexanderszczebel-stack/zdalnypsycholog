import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zdalnypsycholog.pl"),
  title: {
    default: "Psycholog Online | zdalnypsycholog — Wsparcie Psychologiczne Online",
    template: "%s | zdalnypsycholog",
  },
  description:
    "Znajdź profesjonalne wsparcie psychologiczne online. Spokojnie, bezpiecznie i bez presji — gdziekolwiek jesteś. Certyfikowani specjaliści, prosty wybór terminu.",
  keywords: [
    "psycholog online",
    "terapia online",
    "psychoterapeuta online",
    "pomoc psychologiczna online",
    "konsultacje psychologiczne",
    "wsparcie psychologiczne",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://www.zdalnypsycholog.pl",
    siteName: "zdalnypsycholog",
    title: "Psycholog Online | zdalnypsycholog",
    description:
      "Znajdź wsparcie, które rozumie. Spokojnie, bezpiecznie i online — bez presji.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "zdalnypsycholog" }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.zdalnypsycholog.pl" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "zdalnypsycholog",
  description: "Platforma profesjonalnego wsparcia psychologicznego online",
  url: "https://www.zdalnypsycholog.pl",
  email: "kontakt@zdalnypsycholog.pl",
  areaServed: { "@type": "Country", name: "Poland" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="pb-[80px] md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
