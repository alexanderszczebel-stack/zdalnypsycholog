import type { Metadata } from "next";
import AiIntentPage from "@/components/landing/AiIntentPage";
import { getAiLandingPage } from "@/data/aiLandingPages";
import { canonicalUrl } from "@/lib/site";

const page = getAiLandingPage("konsultacja-cbt-tsr-online");

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  robots: { index: true, follow: true },
  alternates: { canonical: canonicalUrl(`/${page.slug}`) },
  openGraph: {
    title: page.metaTitle,
    description: page.metaDescription,
    url: canonicalUrl(`/${page.slug}`),
    type: "website",
  },
};

export default function KonsultacjaCbtTsrOnlinePage() {
  return <AiIntentPage page={page} />;
}
