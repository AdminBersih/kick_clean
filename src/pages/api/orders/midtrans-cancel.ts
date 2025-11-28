import type { NextApiRequest, NextApiResponse } from "next";
import midtransClient from "midtrans-client";
import Order from "../../../models/Order";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { orderId, orderCode } = req.body;
  const id = orderId || orderCode;

  if (!id) return res.status(400).json({ message: "Missing orderId or orderCode" });

  await dbConnect();

  const isProduction = true;

  console.log(`[Midtrans Cancel] Cancelling Order: ${id}`);
  console.log(`[Midtrans Cancel] Environment: ${isProduction ? 'PRODUCTION' : 'SANDBOX'}`);

  const core = new midtransClient.CoreApi({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
  });

  try {
    const result = await core.transaction.cancel(id);

    await Order.updateOne(
      { orderCode: id },
      {
        status: "cancelled",
        midtrans: {
          paymentStatus: "cancel"
        }
      }
    );

    return res.json({ message: "Cancelled", result });
  } catch (err: any) {
    console.error("Midtrans Cancel Error:", err.message);
    if (err.httpStatusCode === 404 || err.message.includes("404")) {
      return res.status(404).json({
        message: "Transaction not found in Midtrans",
        midtransError: err.message
      });
    }
    return res.status(500).json({
      message: "Cancel failed",
      error: err.message
    });
  }
}
