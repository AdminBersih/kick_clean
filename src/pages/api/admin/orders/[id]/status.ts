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

  const { id } = req.query;

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
