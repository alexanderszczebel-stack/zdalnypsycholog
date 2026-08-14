import type { CloudflareEnv } from "./types";

export class HttpError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function jsonResponse(data: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

export function errorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return jsonResponse({ error: error.code, message: error.message }, error.status);
  }

  console.error(error);
  return jsonResponse(
    {
      error: "internal_error",
      message: "Nie udało się obsłużyć żądania. Spróbuj ponownie za chwilę.",
    },
    500,
  );
}

export async function readJsonBody<T>(request: Request): Promise<T> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new HttpError(415, "unsupported_media_type", "Wyślij dane w formacie JSON.");
  }

  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, "invalid_json", "Nie udało się odczytać danych formularza.");
  }
}

export function getSiteUrl(request: Request, env: CloudflareEnv) {
  const configuredUrl = env.BOOKING_SITE_URL?.trim();
  if (configuredUrl) return configuredUrl.replace(/\/+$/, "");

  return new URL(request.url).origin;
}

export function assertAllowedOrigin(request: Request, env: CloudflareEnv) {
  const origin = request.headers.get("origin");
  if (!origin) return;

  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = new URL(getSiteUrl(request, env)).origin;
  const allowedOrigins = new Set([requestOrigin, configuredOrigin]);

  if (!allowedOrigins.has(origin)) {
    throw new HttpError(403, "origin_not_allowed", "Żądanie pochodzi z niedozwolonej domeny.");
  }
}

export function getClientIp(request: Request) {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null;

  return null;
}

export function requireEnv(value: string | undefined, name: string) {
  const normalized = value?.trim();
  if (!normalized) {
    throw new HttpError(
      503,
      "configuration_missing",
      `Brakuje konfiguracji serwera: ${name}.`,
    );
  }

  return normalized;
}

export function buildAbsoluteUrl(siteUrl: string, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/+$/, "")}${normalizedPath}`;
}
