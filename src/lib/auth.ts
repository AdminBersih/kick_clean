import { NextApiRequest } from "next";
import { verifyAccessToken, verifyRefreshToken } from "./jwt";
import cookie from "cookie";

export function getTokenFromHeader(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  if (!auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
}

export function getTokenFromCookie(req: NextApiRequest) {
  if (!req.headers.cookie) return null;

  const cookies = cookie.parse(req.headers.cookie);
  
  return cookies.refreshToken ?? null;
}

export function getUserFromRequest(req: NextApiRequest) {
  try {
    let token = getTokenFromHeader(req);

    if (!token) {
      token = getTokenFromCookie(req);
      if (!token) return null;

      return verifyRefreshToken(token);
    }

    return verifyAccessToken(token);
  } catch (err) {
    console.error("getUserFromRequest ERROR:", err);
    return null;
  }
}