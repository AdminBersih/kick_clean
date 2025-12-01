// src/pages/api/admin/dashboard.ts (Versi Upgrade dengan Chart Data)
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
      // --- TAMBAHAN BARU: Hitung tanggal 7 hari yang lalu ---
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      // -----------------------------------------------------

      // 2. Jalankan beberapa Query sekaligus (Parallel) agar cepat
      const [
        revenueAgg, 
        totalOrders, 
        activeOrders, 
        finishedOrders, 
        cancelledOrders, 
        recentOrders,
        dailySales // <--- VARIABEL BARU UNTUK CHART
      ] = await Promise.all([
        // A. Hitung Total Pendapatan
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
             .sort({ createdAt: -1 })
             .limit(5)
             .lean(),

        // --- D. QUERY BARU: Ambil Data Grafik (7 Hari Terakhir) ---
        Order.aggregate([
          { 
            $match: { 
              // Ambil order yang sukses/proses DAN dibuat dalam 7 hari terakhir
              status: { $in: ["finished", "processing"] }, 
              createdAt: { $gte: sevenDaysAgo } 
            } 
          },
          {
            $group: {
              // Group berdasarkan Tanggal (Format: YYYY-MM-DD)
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              total: { $sum: "$totalPrice" }, // Total uang hari itu
              count: { $sum: 1 } // Jumlah order hari itu
            }
          },
          { $sort: { _id: 1 } } // Urutkan dari tanggal lama ke baru
        ])
        // ---------------------------------------------------------
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
        recentOrders,
        chartData: dailySales // <--- KIRIM DATA INI KE FRONTEND
      });

    } catch (error) {
      console.error("Dashboard Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  return res.status(405).end();
}