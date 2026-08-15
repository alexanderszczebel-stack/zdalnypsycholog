import type { Metadata } from "next";
import type { AiLandingPage } from "@/data/aiLandingPages";
import { canonicalUrl } from "@/lib/site";

export function buildAiLandingMetadata(page: AiLandingPage): Metadata {
  return {
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
}
