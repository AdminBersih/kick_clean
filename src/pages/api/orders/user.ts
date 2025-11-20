// pages/api/orders/user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") return res.status(405).end();

  const user = getUserFromRequest(req);
  if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });

  const orders = await Order.find({ user_id: user.id }).sort({ createdAt: -1 });
  return res.json({ orders });
}
