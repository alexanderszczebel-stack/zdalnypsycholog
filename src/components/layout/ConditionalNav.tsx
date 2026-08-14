"use client";
import { usePathname } from "next/navigation";

const STANDALONE_NAV = ["/umow", "/polacy-za-granica", "/admin-rezerwacje"];
const STANDALONE_FOOTER = ["/umow", "/admin-rezerwacje"];

function normalizePathname(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export function ConditionalNavbar({ children }: { children: React.ReactNode }) {
  const pathname = normalizePathname(usePathname());
  if (STANDALONE_NAV.includes(pathname)) return null;
  return <>{children}</>;
}

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = normalizePathname(usePathname());
  if (STANDALONE_FOOTER.includes(pathname)) return null;
  return <>{children}</>;
}
