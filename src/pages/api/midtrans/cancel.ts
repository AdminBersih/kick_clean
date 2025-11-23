import type { NextApiRequest, NextApiResponse } from "next";
import midtransClient from "midtrans-client";
import Order from "../../../models/Order";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ message: "Missing orderId" });

  await dbConnect();

  const core = new midtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_STATUS_PRODUCTION,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
  });

  try {
    const result = await core.transaction.cancel(orderId);

    await Order.updateOne(
      { orderCode: orderId },
      {
        status: "cancelled",
        midtrans: {
          paymentStatus: "cancel"
        }
      }
    );

    return res.json({ message: "Cancelled", result });
  } catch (err: any) {
    return res.status(400).json({ message: "Cancel failed", error: err.message });
  }
}
