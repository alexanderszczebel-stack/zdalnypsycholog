import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Obszary pomocy i psychologia online",
  description:
    "Spokojne, eksperckie artykuły o obszarach pomocy psychologicznej: lęku, stresie, wypaleniu, relacjach, samoocenie i konsultacjach online.",
  alternates: { canonical: canonicalUrl("/blog") },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-32 md:pt-40 section-padding bg-[color:var(--color-bg-main)]">
      <div className="container-main">
        <div className="text-center mb-14">
          <AnimatedSection>
            <span className="section-label justify-center">Blog</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-[color:var(--color-text-primary)] mb-4 leading-tight">
              Artykuły o obszarach pomocy
            </h1>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Krótkie teksty edukacyjne, które pomagają nazwać trudność, sprawdzić
              możliwe sygnały przeciążenia i zdecydować, czy konsultacja może być dobrym krokiem.
            </p>
          </AnimatedSection>
        </div>

        {posts.length === 0 ? (
          <AnimatedSection className="text-center py-20">
            <p className="text-[color:var(--color-text-muted)]">Brak artykułów.</p>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.08}>
                <BlogCard post={post} index={i} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
