import crypto from "node:crypto";

export const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

export const generateRefreshToken = (): string => crypto.randomBytes(40).toString("hex");

export const hashRefreshToken = (token: string): string =>
  crypto.createHash("sha256").update(token).digest("hex");
