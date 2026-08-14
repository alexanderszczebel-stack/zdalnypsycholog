import { trackEvent, type AnalyticsEventParams } from "@/lib/analytics";

export function trackBookingConfirmed(params: AnalyticsEventParams = {}) {
  trackEvent("udana_rezerwacja", {
    event_category: "booking",
    event_label: "calendesk_booking_confirmed",
    ...params,
  });
}

export function trackPaymentConfirmed(params: AnalyticsEventParams = {}) {
  trackEvent("udana_platnosc", {
    currency: "PLN",
    event_category: "booking",
    event_label: "calendesk_payment_confirmed",
    value: 250,
    ...params,
  });
}
