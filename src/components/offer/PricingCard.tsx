import Link from "next/link";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  duration: string;
  forWho: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
}

export default function PricingCard({
  title,
  price,
  duration,
  forWho,
  features,
  ctaLabel,
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col ${
        highlighted
          ? "bg-[color:var(--color-primary)] text-white shadow-2xl scale-105"
          : "bg-white border border-gray-100 shadow-[var(--shadow-card)]"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[color:var(--color-accent)] text-[color:var(--color-text-primary)] text-xs font-bold px-4 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`font-display font-bold text-xl mb-2 ${
            highlighted ? "text-white" : "text-[color:var(--color-text-primary)]"
          }`}
        >
          {title}
        </h3>
        <div className="flex items-end gap-2 mb-1">
          <span
            className={`font-display font-bold text-4xl ${
              highlighted ? "text-white" : "text-[color:var(--color-primary)]"
            }`}
          >
            {price}
          </span>
        </div>
        <p className={`text-sm ${highlighted ? "text-white/70" : "text-[color:var(--color-text-muted)]"}`}>
          {duration}
        </p>
      </div>

      <p
        className={`text-sm mb-6 ${
          highlighted ? "text-white/80" : "text-[color:var(--color-text-secondary)]"
        }`}
      >
        {forWho}
      </p>

      <ul className="space-y-2.5 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex gap-2.5 items-start">
            <Check
              size={16}
              className={`mt-0.5 flex-shrink-0 ${highlighted ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-primary)]"}`}
            />
            <span
              className={`text-sm ${
                highlighted ? "text-white/85" : "text-[color:var(--color-text-secondary)]"
              }`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/kontakt"
        className={`text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
          highlighted
            ? "bg-[color:var(--color-accent)] text-[color:var(--color-text-primary)] hover:bg-yellow-400"
            : "border-2 border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white"
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
