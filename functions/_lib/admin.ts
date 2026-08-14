import { HttpError, requireEnv } from "./http";
import type { CloudflareEnv } from "./types";

function constantTimeEqual(left: string, right: string) {
  const maxLength = Math.max(left.length, right.length);
  let diff = left.length ^ right.length;

  for (let index = 0; index < maxLength; index += 1) {
    diff |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return diff === 0;
}

function getPresentedToken(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  if (authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  const headerToken = request.headers.get("x-admin-token")?.trim();
  if (headerToken) return headerToken;

  return "";
}

export function requireAdmin(request: Request, env: CloudflareEnv) {
  const expectedToken = requireEnv(env.BOOKING_ADMIN_TOKEN, "BOOKING_ADMIN_TOKEN");
  const presentedToken = getPresentedToken(request);

  if (!presentedToken || !constantTimeEqual(presentedToken, expectedToken)) {
    throw new HttpError(401, "admin_unauthorized", "Brak dostępu do panelu rezerwacji.");
  }
}
