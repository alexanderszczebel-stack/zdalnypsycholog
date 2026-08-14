export type AnalyticsEventName =
  | "booking_cta_click"
  | "klik_glowne_cta"
  | "przejscie_do_wyboru_terminu"
  | "wybor_dnia_rezerwacji"
  | "wybor_terminu_rezerwacji"
  | "rozpoczecie_rezerwacji"
  | "rozpoczecie_checkoutu"
  | "udana_rezerwacja"
  | "udana_platnosc"
  | "klik_email"
  | "klik_telefon"
  | "klik_whatsapp"
  | "formularz_wyslany";

export type AnalyticsEventParams = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
    fbq?: (command: string, eventName: string, params?: Record<string, unknown>, options?: Record<string, unknown>) => void;
  }
}

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("cookie-consent") === "accepted";
}

function trackMetaFunnelEvent(eventName: AnalyticsEventName, params: AnalyticsEventParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function" || !hasAnalyticsConsent()) {
    return;
  }

  const metaParams = {
    ...params,
    value: typeof params.value === "number" ? params.value : undefined,
    currency: typeof params.currency === "string" ? params.currency : undefined,
  };

  if (eventName === "rozpoczecie_checkoutu") {
    window.fbq("track", "InitiateCheckout", metaParams);
    return;
  }

  const customEventMap: Partial<Record<AnalyticsEventName, string>> = {
    booking_cta_click: "BookingCtaClick",
    wybor_dnia_rezerwacji: "BookingDateSelected",
    wybor_terminu_rezerwacji: "BookingSlotSelected",
    rozpoczecie_rezerwacji: "BookingStarted",
  };

  const metaEventName = customEventMap[eventName];
  if (metaEventName) {
    window.fbq("trackCustom", metaEventName, metaParams);
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  const eventParams = {
    debug_mode: true,
    ...params,
  };

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
    trackMetaFunnelEvent(eventName, eventParams);
    console.log("[GA4 event sent]", eventName, eventParams);
    return;
  }

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", eventName, eventParams]);
    trackMetaFunnelEvent(eventName, eventParams);
    console.warn("[GA4 event NOT sent] gtag unavailable", eventName, eventParams);
  }
}

export function trackMetaPurchase(eventId: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function" || !hasAnalyticsConsent()) {
    return;
  }

  window.fbq(
    "track",
    "Purchase",
    { value: 250, currency: "PLN" },
    { eventID: eventId },
  );
}
