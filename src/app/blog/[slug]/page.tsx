import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

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
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

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
          className="prose prose-base max-w-none text-[color:var(--color-text-secondary)] leading-relaxed
            prose-h2:font-display prose-h2:font-bold prose-h2:text-[color:var(--color-text-primary)] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:font-display prose-h3:font-semibold prose-h3:text-[color:var(--color-text-primary)] prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:mb-4
            prose-ul:my-4 prose-li:mb-1
            prose-strong:text-[color:var(--color-text-primary)] prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />

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
                Psycholog online, CBT, 8 lat doświadczenia
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/20 rounded-2xl p-6 text-center">
          <p className="font-display font-semibold text-lg text-[color:var(--color-text-primary)] mb-2">
            Potrzebujesz wsparcia?
          </p>
          <p className="text-[color:var(--color-text-secondary)] text-sm mb-4">
            Umów bezpłatną konsultację z Mikołajem — bez zobowiązań.
          </p>
          <Link href="/kontakt" className="btn-primary">
            Zarezerwuj wizytę
          </Link>
        </div>
      </div>
    </article>
  );
}

function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|l])(.+)$/gm, (line) =>
      line.startsWith("<") ? line : `<p>${line}</p>`
    )
    .trim();
}
