import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Cart from "../../../models/Cart";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "GET") return res.status(405).end();

  const user = getUserFromRequest(req);
  const { sessionId } = req.query;

  let cart = null;
  if (user && user.id) {
    cart = await Cart.findOne({ user_id: user.id });
  } else if (sessionId && typeof sessionId === "string") {
    cart = await Cart.findOne({ sessionId });
  }

  if (!cart) return res.json({ items: [] });
  return res.json({ cart });
}
