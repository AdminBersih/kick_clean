import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";
import midtransClient from "midtrans-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).end();

  const { orderCode } = req.body;
  if (!orderCode) return res.status(400).json({ message: "Missing orderCode" });

  const order = await Order.findOne({ orderCode });
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.midtrans.paymentStatus === "settlement") {
    return res.status(400).json({ message: "Order is already paid" });
  }

  const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_STATUS_PRODUCTION,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  const payload = {
    transaction_details: {
      order_id: order.orderCode,
      gross_amount: order.totalPrice,
    },
    item_details: order.items.map((i) => ({
      id: i.service_id.toString(),
      name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
    customer_details: {
      first_name: order.customerName,
      phone: order.phone,
      email: order.email,
    },
  };

  const trx = await snap.createTransaction(payload);

  // Update stored redirect url
  await Order.updateOne(
    { orderCode },
    {
      $set: {
        "midtrans.redirectUrl": trx.redirect_url,
        "midtrans.paymentStatus": "pending"
      }
    }
  );


  return res.json({
    message: "Payment link regenerated",
    redirectUrl: trx.redirect_url,
  });
}
