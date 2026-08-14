export const BOOKING_SETTINGS = {
  serviceName: "Konsultacja psychologiczna online",
  timezone: "Europe/Warsaw",
  durationMinutes: 50,
  bufferMinutes: 10,
  slotStepMinutes: 30,
  minLeadMinutes: 24 * 60,
  maxAdvanceDays: 30,
  // Stripe Checkout supports custom expiry from 30 minutes, so the hold follows that window.
  holdMinutes: 31,
  currency: "PLN",
  stripeCurrency: "pln",
  priceAmount: 25000,
  priceValue: 250,
  priceLabel: "250 zł",
  workingDays: [1, 2, 3, 4, 5],
  workingHours: {
    start: "10:00",
    end: "20:00",
  },
  bookingPath: "/rezerwacja",
  confirmationPath: "/rezerwacja-potwierdzona",
} as const;

export type BookingSettings = typeof BOOKING_SETTINGS;
