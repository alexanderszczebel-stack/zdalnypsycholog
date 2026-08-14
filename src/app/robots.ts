import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/polityka-prywatnosci", "/polityka-cookies", "/regulamin"],
    },
    sitemap: canonicalUrl("/sitemap.xml").replace(/\/$/, ""),
  };
}
