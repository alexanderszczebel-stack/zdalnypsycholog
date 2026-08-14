"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("cookie-consent") === "accepted";
}

export default function MetaPixel() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handleConsentUpdate = () => {
      setEnabled(Boolean(META_PIXEL_ID) && hasAnalyticsConsent());
    };
    const timeout = window.setTimeout(handleConsentUpdate, 0);

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
    };
  }, []);

  if (!enabled || !META_PIXEL_ID) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
