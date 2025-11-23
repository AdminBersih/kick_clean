// src/pages/api/admin/dashboard.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { getUserFromRequest } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // 1. Cek Auth (Hanya Admin)
  const user = getUserFromRequest(req);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access only" });
  }

  if (req.method === "GET") {
    try {
      // 2. Jalankan beberapa Query sekaligus (Parallel) agar cepat
      const [
        revenueAgg, 
        totalOrders, 
        activeOrders, 
        finishedOrders, 
        cancelledOrders, 
        recentOrders
      ] = await Promise.all([
        // A. Hitung Total Pendapatan (Hanya status 'finished' atau 'processing')
        Order.aggregate([
          { $match: { status: { $in: ["finished", "processing"] } } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]),
        
        // B. Hitung Jumlah Order per Status
        Order.countDocuments({}), // Semua Order
        Order.countDocuments({ status: { $in: ["pending", "processing"] } }), // Active
        Order.countDocuments({ status: "finished" }), // Completed
        Order.countDocuments({ status: "cancelled" }), // Cancelled

        // C. Ambil 5 Order Terbaru
        Order.find({})
             .sort({ createdAt: -1 }) // Urutkan dari paling baru
             .limit(5)
             .lean()
      ]);

      const revenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

      // 3. Kirim hasil ke Frontend
      return res.status(200).json({
        stats: {
          revenue,
          totalOrders,
          activeOrders,
          finishedOrders,
          cancelledOrders
        },
        recentOrders
      });

    } catch (error) {
      console.error("Dashboard Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  return res.status(405).end();
}