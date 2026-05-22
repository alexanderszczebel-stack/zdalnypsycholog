import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Psychologia online – artykuły i porady",
  description:
    "Artykuły o zdrowiu psychicznym, terapii online, ADHD, wypaleniu zawodowym i wielu innych tematach. Napisane przez psychologa.",
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
              Artykuły o zdrowiu psychicznym
            </h1>
            <p className="text-[color:var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Praktyczna wiedza z zakresu psychologii, napisana przystępnym językiem przez
              doświadczonego psychologa.
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
