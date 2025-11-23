import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Cart from "../../../models/Cart";
import Service from "../../../models/Service";
import { getUserFromRequest } from "../../../lib/auth";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).end();

  const user = getUserFromRequest(req);
  const { sessionId, service_id, quantity } = req.body;
  if (!service_id) return res.status(400).json({ message: "service_id required" });

  if (!mongoose.Types.ObjectId.isValid(service_id)) return res.status(400).json({ message: "Invalid service_id" });

  const svc = await Service.findById(service_id);
  if (!svc) return res.status(404).json({ message: "Service not found" });

  // find cart
  let cart = null;
  if (user && user.id) {
    cart = await Cart.findOne({ user_id: user.id });
  } else if (sessionId) {
    cart = await Cart.findOne({ sessionId });
  }

  if (!cart) {
    cart = await Cart.create({
      sessionId: user && user.id ? undefined : sessionId,
      user_id: user && user.id ? user.id : null,
      items: [{ service_id: svc._id, name: svc.name, price: svc.price, quantity: Math.max(1, parseInt(quantity || "1")) }],
    });
    return res.status(201).json({ cart });
  }

  const qty = Math.max(1, parseInt(quantity || "1"));
  const existing = cart.items.find(it => String(it.service_id) === String(service_id));
  if (existing) {
    existing.quantity = (existing.quantity || 0) + qty;
  } else {
    cart.items.push({ service_id: svc._id, name: svc.name, price: svc.price, quantity: qty });
  }

  cart.updatedAt = new Date();
  await cart.save();
  return res.json({ cart });
}
