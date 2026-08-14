import type { Metadata } from "next";
import { Suspense } from "react";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rezerwacja potwierdzona",
  description: "Status opłaconej rezerwacji konsultacji psychologicznej online.",
  robots: { index: false, follow: false },
  alternates: { canonical: canonicalUrl("/rezerwacja-potwierdzona") },
};

export default function RezerwacjaPotwierdzonaPage() {
  return (
    <Suspense fallback={null}>
      <BookingConfirmation />
    </Suspense>
  );
}
