import Image from "next/image";

interface LogoProps {
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg";
  theme?: "dark" | "light";
}

const sizes = {
  sm: { mark: 32, full: 168 },
  md: { mark: 38, full: 220 },
  lg: { mark: 46, full: 270 },
};

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo-mark-primary.png"
      alt=""
      width={216}
      height={167}
      className={className}
      aria-hidden="true"
      style={{ width: size, height: "auto" }}
    />
  );
}

export function LogoMarkLight({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo-mark-light.png"
      alt=""
      width={216}
      height={167}
      className={className}
      aria-hidden="true"
      style={{ width: size, height: "auto" }}
    />
  );
}

export default function Logo({ variant = "full", size = "md", theme = "dark" }: LogoProps) {
  const dimensions = sizes[size];
  const markSrc = theme === "dark" ? "/brand/logo-mark-primary.png" : "/brand/logo-mark-light.png";
  const fullSrc = theme === "dark" ? "/brand/logo-primary.png" : "/brand/logo-primary-light.png";

  if (variant === "mark") {
    return (
      <Image
        src={markSrc}
        alt=""
        width={216}
        height={167}
        aria-hidden="true"
        style={{ width: dimensions.mark, height: "auto" }}
      />
    );
  }

  return (
    <Image
      src={fullSrc}
      alt="zdalnypsycholog.pl"
      width={1142}
      height={187}
      style={{
        width: dimensions.full,
        maxWidth: "calc(100vw - 96px)",
        height: "auto",
        display: "block",
      }}
    />
  );
}
