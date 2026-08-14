"use client";

import { MessageCircle, Phone } from "lucide-react";
import TrackedAnchor from "@/components/analytics/TrackedAnchor";
import {
  PHONE_EVENT_LABEL,
  PHONE_HREF,
  PHONE_NUMBER,
  WHATSAPP_LABEL,
  WHATSAPP_URL,
} from "@/lib/contact";

type PhoneCTAProps = {
  text?: string;
  className?: string;
  iconSize?: number;
  eventCategory?: string;
};

export default function PhoneCTA({
  text = "Zadzwoń w sprawie organizacyjnej",
  className = "btn-primary",
  iconSize = 17,
  eventCategory = "kontakt",
}: PhoneCTAProps) {
  return (
    <TrackedAnchor
      href={PHONE_HREF}
      eventName="klik_telefon"
      eventParams={{
        event_category: eventCategory,
        event_label: PHONE_EVENT_LABEL,
      }}
      className={className}
    >
      <Phone size={iconSize} strokeWidth={1.9} aria-hidden="true" />
      <span>{text}</span>
    </TrackedAnchor>
  );
}

export function WhatsAppCTA({
  className = "btn-secondary",
  text = WHATSAPP_LABEL,
}: {
  className?: string;
  text?: string;
}) {
  return (
    <TrackedAnchor
      href={WHATSAPP_URL}
      eventName="klik_whatsapp"
      eventParams={{
        event_category: "whatsapp",
        event_label: WHATSAPP_URL,
      }}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={17} strokeWidth={1.9} aria-hidden="true" />
      <span>{text}</span>
    </TrackedAnchor>
  );
}

export function PhoneTextLink({ className = "" }: { className?: string }) {
  return (
    <TrackedAnchor
      href={PHONE_HREF}
      eventName="klik_telefon"
      eventParams={{
        event_category: "kontakt",
        event_label: PHONE_EVENT_LABEL,
      }}
      className={className}
    >
      {PHONE_NUMBER}
    </TrackedAnchor>
  );
}
