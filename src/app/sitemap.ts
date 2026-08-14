import type { MetadataRoute } from "next";
import { aiLandingPages } from "@/data/aiLandingPages";
import { getAllPosts } from "@/lib/blog";
import { canonicalUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: canonicalUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: canonicalUrl("/o-mnie"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: canonicalUrl("/jak-to-dziala"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: canonicalUrl("/obszary-pomocy"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: canonicalUrl("/cennik"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: canonicalUrl("/blog"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: canonicalUrl("/kontakt"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: canonicalUrl("/polacy-za-granica"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: canonicalUrl("/faq"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: canonicalUrl("/bezpieczenstwo-i-prywatnosc"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const aiLandingRoutes: MetadataRoute.Sitemap = aiLandingPages.map((page) => ({
    url: canonicalUrl(`/${page.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...aiLandingRoutes, ...blogRoutes];
}
