import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import BookingCTA from "@/components/booking/BookingCTA";
import { canonicalUrl } from "@/lib/site";
import { AlertCircle, ArrowLeft, Calendar, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: canonicalUrl(`/blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const relatedPosts = getAllPosts()
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);

  return (
    <article className="pt-32 md:pt-40 pb-20 bg-[color:var(--color-bg-main)]">
      <div className="container-main max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[color:var(--color-primary)] text-sm font-medium mb-8 hover:underline underline-offset-4"
        >
          <ArrowLeft size={16} />
          Powrót do bloga
        </Link>

        <header className="mb-10">
          <span className="inline-block bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[color:var(--color-text-primary)] leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[color:var(--color-text-muted)] text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} min czytania
            </span>
          </div>
        </header>

        <div
          className="max-w-none text-[color:var(--color-text-secondary)] leading-relaxed
            [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[color:var(--color-text-primary)] [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[color:var(--color-text-primary)] [&_h3]:mt-8 [&_h3]:mb-3
            [&_h4]:font-display [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[color:var(--color-text-primary)] [&_h4]:mt-6 [&_h4]:mb-2
            [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed
            [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-[color:var(--color-text-primary)]
            [&_a]:font-semibold [&_a]:text-[color:var(--color-primary)] [&_a]:underline [&_a]:underline-offset-4"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

        {relatedPosts.length > 0 && (
          <section className="mt-14 rounded-2xl p-6" style={{ background: "rgba(246,239,230,0.48)", border: "1px solid rgba(45,41,38,0.08)" }}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-primary)]">
              powiązane artykuły
            </p>
            <div className="grid gap-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-[color:var(--color-text-primary)] transition-colors hover:text-[color:var(--color-primary)]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-primary-light)] flex items-center justify-center text-white font-bold font-display">
              MS
            </div>
            <div>
              <p className="font-display font-semibold text-[color:var(--color-text-primary)]">
                Mikołaj Szczebel
              </p>
              <p className="text-[color:var(--color-text-muted)] text-sm">
                Psycholog online
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: "rgba(31,49,77,0.05)", border: "1px solid rgba(31,49,77,0.14)" }}>
          <p className="font-display mb-2 text-lg font-semibold text-[color:var(--color-text-primary)]">
            Jeśli czujesz, że ten temat dotyczy Ciebie
          </p>
          <p className="mx-auto mb-5 max-w-xl text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
            Możesz wybrać termin konsultacji online. Po dokonaniu płatności otrzymasz
            potwierdzenie oraz informacje organizacyjne dotyczące spotkania.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <BookingCTA text="Wybierz termin konsultacji" className="btn-primary" />
            <Link href="/kontakt#formularz" className="btn-secondary">
              Mam pytanie organizacyjne
            </Link>
          </div>
        </div>

        <div className="mt-6 flex gap-3 rounded-2xl p-5" style={{ background: "rgba(31,49,77,0.04)", border: "1px solid rgba(31,49,77,0.08)" }}>
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-[color:var(--color-primary)]" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-[color:var(--color-text-muted)]">
            Artykuł ma charakter edukacyjny i nie zastępuje indywidualnej konsultacji.
            W sytuacji bezpośredniego zagrożenia życia lub zdrowia skontaktuj się z numerem
            alarmowym 112 albo najbliższą placówką pomocy kryzysowej.
          </p>
        </div>
      </div>
    </article>
  );
}

function markdownToHtml(markdown: string): string {
  const formatInline = (value: string) =>
    value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("#### ")) {
        return `<h4>${formatInline(trimmed.slice(5))}</h4>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3>${formatInline(trimmed.slice(4))}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2>${formatInline(trimmed.slice(3))}</h2>`;
      }
      if (trimmed.split("\n").every((line) => line.startsWith("- "))) {
        const items = trimmed
          .split("\n")
          .map((line) => `<li>${formatInline(line.slice(2))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${formatInline(trimmed.replace(/\n/g, " "))}</p>`;
    })
    .join("");
}
