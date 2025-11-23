import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "POST") return res.status(405).end();

  const {
    order_id,
    transaction_id,
    transaction_status,
    payment_type,
    fraud_status
  } = req.body;

  const order = await Order.findOne({ orderCode: order_id });
  if (!order) return res.status(404).json({ message: "Order not found" });

  // Simpan status Midtrans ke DB
  await order.updateOne({
    midtrans: {
      orderId: order_id,
      transactionId: transaction_id,
      paymentStatus: transaction_status,
      paymentType: payment_type,
      fraudStatus: fraud_status
    }
  });

  // Atur status order internal
  if (transaction_status === "settlement" || transaction_status === "capture") {
    await order.updateOne({ status: "processing" });
  }

  if (transaction_status === "expire" || transaction_status === "cancel" || transaction_status === "failure") {
    await order.updateOne({ status: "cancelled" });
  }

  return res.json({ message: "OK" });
}
