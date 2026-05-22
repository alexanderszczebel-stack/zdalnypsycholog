interface LogoProps {
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg";
  theme?: "dark" | "light";
}

const sizes = {
  sm: { mark: 28, text: "text-base" },
  md: { mark: 36, text: "text-lg" },
  lg: { mark: 44, text: "text-xl" },
};

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left figure — navy, tilted inward */}
      <ellipse
        cx="16"
        cy="14"
        rx="6.5"
        ry="6.5"
        fill="#1F314D"
        opacity="0.9"
      />
      <path
        d="M4 38 C4 28, 10 22, 18 22 C22 22, 25 24, 26 27"
        stroke="#1F314D"
        strokeWidth="0"
        fill="#1F314D"
        opacity="0.0"
      />
      <path
        d="M3 40 C3 28.5 9.5 21.5 18 21.5 L22 21.5 C22 21.5 18 25.5 17 32 C16.2 37 17.5 42 19 44 L6 44 C4.2 44 3 42.2 3 40Z"
        fill="#1F314D"
        opacity="0.88"
      />

      {/* Right figure — terra/sand, tilted inward */}
      <ellipse
        cx="32"
        cy="14"
        rx="6.5"
        ry="6.5"
        fill="#BC6C25"
        opacity="0.82"
      />
      <path
        d="M45 40 C45 28.5 38.5 21.5 30 21.5 L26 21.5 C26 21.5 30 25.5 31 32 C31.8 37 30.5 42 29 44 L42 44 C43.8 44 45 42.2 45 40Z"
        fill="#BC6C25"
        opacity="0.75"
      />

      {/* Shared center overlap — soft warm neutral */}
      <path
        d="M22 21.5 L26 21.5 C26 21.5 30 25.5 31 32 C31.8 37 30.5 42 29 44 L19 44 C17.5 42 16.2 37 17 32 C18 25.5 22 21.5 22 21.5Z"
        fill="#E8D8C4"
        opacity="0.9"
      />

      {/* Subtle connection arc at top */}
      <path
        d="M16 8 Q24 4 32 8"
        stroke="#E8D8C4"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function LogoMarkLight({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="16" cy="14" rx="6.5" ry="6.5" fill="white" opacity="0.9" />
      <path
        d="M3 40 C3 28.5 9.5 21.5 18 21.5 L22 21.5 C22 21.5 18 25.5 17 32 C16.2 37 17.5 42 19 44 L6 44 C4.2 44 3 42.2 3 40Z"
        fill="white"
        opacity="0.85"
      />
      <ellipse cx="32" cy="14" rx="6.5" ry="6.5" fill="white" opacity="0.65" />
      <path
        d="M45 40 C45 28.5 38.5 21.5 30 21.5 L26 21.5 C26 21.5 30 25.5 31 32 C31.8 37 30.5 42 29 44 L42 44 C43.8 44 45 42.2 45 40Z"
        fill="white"
        opacity="0.6"
      />
      <path
        d="M22 21.5 L26 21.5 C26 21.5 30 25.5 31 32 C31.8 37 30.5 42 29 44 L19 44 C17.5 42 16.2 37 17 32 C18 25.5 22 21.5 22 21.5Z"
        fill="white"
        opacity="0.35"
      />
      <path
        d="M16 8 Q24 4 32 8"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export default function Logo({ variant = "full", size = "md", theme = "dark" }: LogoProps) {
  const { mark, text } = sizes[size];
  const textColor = theme === "dark" ? "text-[#1F314D]" : "text-white";
  const MarkComponent = theme === "dark" ? LogoMark : LogoMarkLight;

  if (variant === "mark") {
    return <MarkComponent size={mark} />;
  }

  return (
    <div className="flex items-center gap-2.5">
      <MarkComponent size={mark} />
      <span
        className={`font-display font-semibold tracking-tight ${text} ${textColor}`}
        style={{ letterSpacing: "-0.02em" }}
      >
        zdalnypsycholog
      </span>
    </div>
  );
}
