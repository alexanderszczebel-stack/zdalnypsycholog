"use client";
import { usePathname } from "next/navigation";

const STANDALONE = ["/quiz", "/umow"];

export function ConditionalNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (STANDALONE.includes(pathname)) return null;
  return <>{children}</>;
}

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (STANDALONE.includes(pathname)) return null;
  return <>{children}</>;
}
