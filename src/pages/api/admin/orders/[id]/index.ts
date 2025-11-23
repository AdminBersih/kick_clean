// src/pages/api/admin/orders/[id]/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const user = getUserFromRequest(req);

  // Cek Admin
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }

  const { id } = req.query;

  // GET: Ambil Detail Satu Order
  if (req.method === "GET") {
    try {
      const order = await Order.findById(id).populate("user_id", "name email phone");
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.json({ order });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}