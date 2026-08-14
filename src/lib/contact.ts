export const CONTACT_EMAIL = "kontakt@zdalnypsycholog.pl";
export const PHONE_NUMBER = "+48 695 163 484";
export const PHONE_HREF = "tel:+48695163484";
export const PHONE_EVENT_LABEL = "tel:+48695163484";
export const WHATSAPP_LABEL = "WhatsApp dostępny";
export const WHATSAPP_URL = "https://wa.me/48695163484";
export const BOOKING_LABEL = "Wybierz termin konsultacji";
export const BOOKING_LANDING_URL = "/rezerwacja";
export const THANK_YOU_BOOKING_PATH = "/dziekujemy-za-rezerwacje/";

// Wklej tutaj publiczny adres strony rezerwacji Calendly, jeśli nie ustawiasz go w zmiennej NEXT_PUBLIC_CALENDLY_URL.
const CALENDLY_URL_PLACEHOLDER = "https://calendly.com/szczebelm/konsultacja-psychologiczna";

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
  CALENDLY_URL_PLACEHOLDER;
export const CALENDLY_EMBED_URL = process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL?.trim() || CALENDLY_URL;
export const BOOKING_ENABLED = Boolean(CALENDLY_URL || CALENDLY_EMBED_URL);
