import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/polityka-prywatnosci", "/regulamin"] },
    sitemap: "https://www.zdalnypsycholog.pl/sitemap.xml",
  };
}
