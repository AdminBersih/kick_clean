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
  await Order.updateOne(
    { orderCode: order_id },
    {
      $set: {
        "midtrans.orderId": order_id,
        "midtrans.transactionId": transaction_id,
        "midtrans.paymentStatus": transaction_status,
        "midtrans.paymentType": payment_type,
        "midtrans.fraudStatus": fraud_status
      }
    }
  );

  // Mapping status Midtrans -> status order internal
  if (
    transaction_status === "settlement" ||
    (transaction_status === "capture" && fraud_status === "accept")
  ) {
    await Order.updateOne(
      { orderCode: order_id },
      { $set: { status: "processing" } }
    );
  }

  // Status gagal / deny / expire / cancel → cancelled
  if (
    transaction_status === "expire" ||
    transaction_status === "cancel" ||
    transaction_status === "deny"
  ) {
    await Order.updateOne(
      { orderCode: order_id },
      { $set: { status: "cancelled" } }
    );
  }

  return res.json({ message: "OK" });
}