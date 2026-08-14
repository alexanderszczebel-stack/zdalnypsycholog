const ALLOWED_UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function appendAllowedUtmParams(targetHref: string, currentHref: string) {
  try {
    const currentUrl = new URL(currentHref, "https://zdalnypsycholog.pl");
    const targetUrl = new URL(targetHref, currentUrl.origin);

    ALLOWED_UTM_PARAMS.forEach((param) => {
      const value = currentUrl.searchParams.get(param);
      if (value && !targetUrl.searchParams.has(param)) {
        targetUrl.searchParams.set(param, value);
      }
    });

    if (targetUrl.origin === currentUrl.origin) {
      return `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
    }

    return targetUrl.toString();
  } catch {
    return targetHref;
  }
}
