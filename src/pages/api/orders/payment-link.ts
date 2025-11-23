import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") return res.status(405).end();

  const { orderCode } = req.query;
  if (!orderCode) return res.status(400).json({ message: "Missing orderCode" });

  const order = await Order.findOne({ orderCode });
  if (!order) return res.status(404).json({ message: "Order not found" });

  return res.json({
    orderCode,
    paymentStatus: order.midtrans?.paymentStatus || "unknown",
    redirectUrl: order.midtrans?.redirectUrl || null
  });
}
