import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { getUserFromRequest } from "@/lib/auth";
import Order from "@/models/Order";
import "@/models/Service";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const user = getUserFromRequest(req);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const order = await Order.findById(id)
        .populate("items.service_id")
        .lean();

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({ order });
    } catch (error) {
      console.error("GET Order Error:", error);
      return res.status(500).json({ message: "Failed to fetch order" });
    }
  }

  if (req.method === "PATCH") {
    const { status } = req.body;

    if (!["pending", "processing", "finished", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Order not found" });

    return res.json({ message: "Order updated", order: updated });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
