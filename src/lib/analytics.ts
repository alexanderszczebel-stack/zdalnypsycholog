export type AnalyticsEventName =
  | "klik_glowne_cta"
  | "przejscie_do_wyboru_terminu"
  | "rozpoczecie_rezerwacji"
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
    console.log("[GA4 event sent]", eventName, eventParams);
    return;
  }

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", eventName, eventParams]);
    console.warn("[GA4 event NOT sent] gtag unavailable", eventName, eventParams);
  }
}
