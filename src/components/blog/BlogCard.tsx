import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "Terapia Online": "bg-blue-50 text-blue-700",
  "Zrozumieć Emocje": "bg-purple-50 text-purple-700",
  "Zdrowie Psychiczne": "bg-green-50 text-green-700",
  "Relacje": "bg-pink-50 text-pink-700",
};

const gradients = [
  "from-[color:var(--color-primary)] to-[color:var(--color-primary-light)]",
  "from-[color:var(--color-primary-light)] to-[color:var(--color-secondary)]",
  "from-[color:var(--color-secondary)] to-[color:var(--color-primary)]",
];

interface Props {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: Props) {
  const categoryClass = categoryColors[post.category] ?? "bg-gray-100 text-gray-700";
  const gradient = gradients[index % gradients.length];

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300">
        <div className={`bg-gradient-to-br ${gradient} aspect-[16/9] flex items-center justify-center`}>
          <span className="text-white/30 font-display font-bold text-5xl">Ψ</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass}`}>
              {post.category}
            </span>
          </div>
          <h2 className="font-display font-bold text-lg text-[color:var(--color-text-primary)] leading-snug mb-2 group-hover:text-[color:var(--color-primary)] transition-colors">
            {post.title}
          </h2>
          <p className="text-[color:var(--color-text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-4 text-[color:var(--color-text-muted)] text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime} min czytania
            </span>
          </div>
          <p className="mt-4 text-[color:var(--color-primary)] text-sm font-medium group-hover:underline underline-offset-4">
            Czytaj więcej →
          </p>
        </div>
      </article>
    </Link>
  );
}
