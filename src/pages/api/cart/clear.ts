import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Cart from "../../../models/Cart";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).end();

  const user = getUserFromRequest(req);
  const { sessionId } = req.body;

  if (user && user.id) {
    await Cart.deleteOne({ user_id: user.id });
    return res.json({ ok: true });
  }

  if (sessionId) {
    await Cart.deleteOne({ sessionId });
    return res.json({ ok: true });
  }

  return res.status(400).json({ message: "sessionId or user required" });
}
