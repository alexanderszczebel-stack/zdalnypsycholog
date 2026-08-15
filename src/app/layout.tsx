import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ConditionalNavbar, ConditionalFooter } from "@/components/layout/ConditionalNav";
import CookieBanner from "@/components/ui/CookieBanner";
import MetaPixel from "@/components/analytics/MetaPixel";
import { SITE_URL, canonicalUrl } from "@/lib/site";
import { CONTACT_EMAIL, PHONE_NUMBER, WHATSAPP_URL } from "@/lib/contact";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Psycholog Online | zdalnypsycholog, Wsparcie Psychologiczne Online",
    template: "%s | zdalnypsycholog",
  },
  description:
    "Profesjonalne konsultacje psychologiczne online. Wybierz termin, opłać konsultację online i otrzymaj potwierdzenie spotkania.",
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
    url: canonicalUrl("/"),
    siteName: "zdalnypsycholog",
    title: "Psycholog Online | zdalnypsycholog",
    description:
      "Profesjonalne konsultacje psychologiczne online. Wybór terminu i płatność odbywają się online.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "zdalnypsycholog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psycholog Online | zdalnypsycholog",
    description:
      "Profesjonalne konsultacje psychologiczne online. Wybór terminu i płatność odbywają się online.",
    images: [{ url: "/og-image.jpg", alt: "zdalnypsycholog" }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "zdalnypsycholog",
    description: "Konsultacje psychologiczne online dla osób dorosłych",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: PHONE_NUMBER,
    priceRange: "250 zł",
    areaServed: [
      { "@type": "Country", name: "Poland" },
      { "@type": "Place", name: "Online" },
    ],
    makesOffer: {
      "@type": "Offer",
      price: "250",
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: "Konsultacja psychologiczna online",
        serviceType: "Konsultacja psychologiczna online",
        areaServed: "Online",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mikołaj Szczebel",
    jobTitle: "Psycholog",
    url: canonicalUrl("/o-mnie"),
    email: CONTACT_EMAIL,
    telephone: PHONE_NUMBER,
    knowsAbout: ["psychologia", "CBT", "TSR", "konsultacje psychologiczne online"],
    worksFor: {
      "@type": "Organization",
      name: "zdalnypsycholog",
      url: SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT_EMAIL,
    telephone: PHONE_NUMBER,
    url: WHATSAPP_URL,
    availableLanguage: ["Polish"],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H4WF3HCYL8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
              window.gtag('js', new Date());

              window.gtag('config', 'G-H4WF3HCYL8');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ConditionalNavbar><Navbar /></ConditionalNavbar>
        <main className="pb-[80px] lg:pb-0">{children}</main>
        <ConditionalFooter><Footer /></ConditionalFooter>
        <MetaPixel />
        <CookieBanner />
      </body>
    </html>
  );
}
