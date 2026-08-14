"use client";

import type { AnchorHTMLAttributes } from "react";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsEventParams,
} from "@/lib/analytics";

type TrackedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: AnalyticsEventName;
  eventParams?: AnalyticsEventParams;
};

export default function TrackedAnchor({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}
