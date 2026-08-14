import type { Metadata } from "next";
import BookingAdminPanel from "@/components/admin/BookingAdminPanel";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Panel rezerwacji",
  description: "Panel zarządzania rezerwacjami zdalnypsycholog.pl.",
  robots: { index: false, follow: false },
  alternates: { canonical: canonicalUrl("/admin-rezerwacje") },
};

export default function AdminRezerwacjePage() {
  return <BookingAdminPanel />;
}
