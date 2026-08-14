import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ConditionalNavbar, ConditionalFooter } from "@/components/layout/ConditionalNav";
import CookieBanner from "@/components/ui/CookieBanner";
import { SITE_URL, canonicalUrl } from "@/lib/site";
import { CALENDESK_BOOKING_URL, CONTACT_EMAIL, PHONE_NUMBER, WHATSAPP_URL } from "@/lib/contact";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "zdalnypsycholog",
  description: "Profesjonalne konsultacje psychologiczne online",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  telephone: PHONE_NUMBER,
  sameAs: [WHATSAPP_URL, CALENDESK_BOOKING_URL].filter(Boolean),
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
        <main className="pb-[80px] md:pb-0">{children}</main>
        <ConditionalFooter><Footer /></ConditionalFooter>
        <CookieBanner />
      </body>
    </html>
  );
}
