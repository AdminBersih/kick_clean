import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const user = getUserFromRequest(req);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }

  if (req.method === "GET") {
    const orders = await Order.find()
      .populate("user_id", "name email")
      .sort({ createdAt: -1 });

    return res.json({ orders });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
