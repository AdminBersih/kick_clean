import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const ACCESS_EXPIRES = (process.env.ACCESS_TOKEN_EXPIRES_IN ?? "15m");
const REFRESH_EXPIRES = (process.env.REFRESH_TOKEN_EXPIRES_IN ?? "1d");

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT secrets not configured");
}

export function signAccessToken(payload: JwtPayload | string) {
  const options: SignOptions = { expiresIn: ACCESS_EXPIRES as any };
  return jwt.sign(payload, ACCESS_SECRET, options);
}

export function signRefreshToken(payload: JwtPayload | string) {
  const options: SignOptions = { expiresIn: REFRESH_EXPIRES as any};
  return jwt.sign(payload, REFRESH_SECRET, options);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}
