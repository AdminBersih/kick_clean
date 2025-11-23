import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") return res.status(405).end();

  const { orderCode, phone, email } = req.query;
  if (!orderCode) return res.status(400).json({ message: "orderCode required" });

  const order = await Order.findOne({ orderCode: String(orderCode) }).lean();
  if (!order) return res.status(404).json({ message: "Order not found" });

  // If order.user_id exists (registered order), we allow public view only if phone/email matches
  if (order.user_id) {
    if (phone && String(order.phone) === String(phone)) return res.json({ order });
    if (email && String(order.email) === String(email)) return res.json({ order });
    // else block
    return res.status(403).json({ message: "Provide matching phone or email to view this order" });
  }

  // Guest order: allow if phone or email match
  if (phone && String(order.phone) === String(phone)) return res.json({ order });
  if (email && order.email && String(order.email) === String(email)) return res.json({ order });

  return res.status(403).json({ message: "Provide phone or email to view this order" });
}
