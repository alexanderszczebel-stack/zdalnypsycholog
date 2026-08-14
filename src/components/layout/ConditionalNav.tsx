"use client";
import { usePathname } from "next/navigation";

const STANDALONE_NAV = ["/umow", "/polacy-za-granica"];
const STANDALONE_FOOTER = ["/umow"];

export function ConditionalNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (STANDALONE_NAV.includes(pathname)) return null;
  return <>{children}</>;
}

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (STANDALONE_FOOTER.includes(pathname)) return null;
  return <>{children}</>;
}
