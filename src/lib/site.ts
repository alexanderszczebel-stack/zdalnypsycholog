export const SITE_URL = "https://zdalnypsycholog.pl";

export function canonicalUrl(path = "/") {
  if (path === "/") return `${SITE_URL}/`;

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  return `${SITE_URL}${withoutTrailingSlash}/`;
}
