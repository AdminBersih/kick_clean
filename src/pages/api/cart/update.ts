// pages/api/cart/update.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Cart from "../../../models/Cart";
import { getUserFromRequest } from "../../../lib/auth";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).end();

  const user = getUserFromRequest(req);
  const { sessionId, action, service_id, quantity } = req.body;
  // action: "set" | "remove"

  let cart = null;
  if (user && user.id) cart = await Cart.findOne({ user_id: user.id });
  else if (sessionId) cart = await Cart.findOne({ sessionId });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  if (!service_id || !mongoose.Types.ObjectId.isValid(service_id)) return res.status(400).json({ message: "Invalid service_id" });

  if (action === "remove") {
    cart.items = cart.items.filter(i => String(i.service_id) !== String(service_id));
  } else {
    // set quantity
    const item = cart.items.find(i => String(i.service_id) === String(service_id));
    if (!item) return res.status(404).json({ message: "Item not in cart" });
    const q = Math.max(0, parseInt(quantity || "0"));
    if (q <= 0) {
      cart.items = cart.items.filter(i => String(i.service_id) !== String(service_id));
    } else {
      item.quantity = q;
    }
  }

  cart.updatedAt = new Date();
  await cart.save();
  return res.json({ cart });
}
