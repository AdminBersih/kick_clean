import { NextApiRequest } from "next";
import { verifyAccessToken, verifyRefreshToken } from "./jwt";
import { parse as parseCookie } from "cookie";

export function getTokenFromHeader(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  if (!auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
}

export function getTokenFromCookie(req: NextApiRequest) {
  if (!req?.headers?.cookie) return null;
  const cookies = parseCookie(req.headers.cookie);
  return cookies.refreshToken ?? null;
}

function tryVerifyRefresh(req: NextApiRequest) {
  const token = getTokenFromCookie(req);
  if (!token) return null;
  try {
    return verifyRefreshToken(token);
  } catch {
    return null;
  }
}

export function getUserFromRequest(req: NextApiRequest) {
  try {
    const accessToken = getTokenFromHeader(req);
    if (!accessToken) {
      return tryVerifyRefresh(req);
    }

    try {
      return verifyAccessToken(accessToken);
    } catch (err: any) {
      // If access token expired, fall back to refresh token so user does not need manual reload.
      if (err?.name === "TokenExpiredError") {
        return tryVerifyRefresh(req);
      }
      throw err;
    }
  } catch (err) {
    console.error("getUserFromRequest ERROR:", err);
    return null;
  }
}
