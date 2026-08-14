"use client";

import type { MouseEvent } from "react";
import { CalendarDays } from "lucide-react";
import { trackEvent, type AnalyticsEventName, type AnalyticsEventParams } from "@/lib/analytics";
import { BOOKING_LABEL, BOOKING_LANDING_URL } from "@/lib/contact";
import { appendAllowedUtmParams } from "@/lib/utm";

type BookingCTAProps = {
  href?: string;
  text?: string;
  className?: string;
  eventName?: AnalyticsEventName;
  eventParams?: AnalyticsEventParams;
  iconSize?: number;
  target?: string;
  rel?: string;
  disabled?: boolean;
};

export default function BookingCTA({
  href = BOOKING_LANDING_URL,
  text = BOOKING_LABEL,
  className = "btn-primary",
  eventName = "booking_cta_click",
  eventParams = {},
  iconSize = 17,
  target,
  rel,
  disabled = false,
}: BookingCTAProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    const trackedHref = appendAllowedUtmParams(href, window.location.href);

    trackEvent(eventName, {
      event_category: "booking",
      event_label: href,
      ...eventParams,
    });

    if (trackedHref !== href && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();

      if (target === "_blank") {
        window.open(trackedHref, "_blank", "noopener,noreferrer");
        return;
      }

      window.location.href = trackedHref;
    }
  };

  return (
    <a
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      className={`${className}${disabled ? " pointer-events-none opacity-60" : ""}`}
      onClick={handleClick}
      target={target}
      rel={rel}
    >
      <CalendarDays size={iconSize} strokeWidth={1.9} aria-hidden="true" />
      <span className="min-w-0">{text}</span>
    </a>
  );
}
