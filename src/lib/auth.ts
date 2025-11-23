import { NextApiRequest } from "next";
import { verifyAccessToken } from "./jwt";

export function getTokenFromHeader(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  if (!auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
}

export function getUserFromRequest(req: NextApiRequest) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return null;
    const decoded = verifyAccessToken(token);
    return decoded as any;
  } catch (err) {
    return null;
  }
}
