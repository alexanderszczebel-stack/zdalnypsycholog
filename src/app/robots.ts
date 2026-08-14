import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin-rezerwacje"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin-rezerwacje"],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin-rezerwacje", "/polityka-prywatnosci", "/polityka-cookies", "/regulamin"],
      },
    ],
    sitemap: canonicalUrl("/sitemap.xml").replace(/\/$/, ""),
  };
}
