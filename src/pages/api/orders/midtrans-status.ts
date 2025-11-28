import type { NextApiRequest, NextApiResponse } from "next";
import midtransClient from "midtrans-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const { orderId, orderCode } = req.query;
  const id = orderId || orderCode;

  if (!id) return res.status(400).json({ message: "Missing orderId or orderCode" });

  const isProduction = true;

  console.log(`[Midtrans Status] Checking Order: ${id}`);
  console.log(`[Midtrans Status] Environment: ${isProduction ? 'PRODUCTION' : 'SANDBOX'}`);

  const core = new midtransClient.CoreApi({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  try {
    const status = await core.transaction.status(id.toString());
    return res.json(status);
  } catch (err: any) {
    console.error("Midtrans Error:", err.message);
    if (err.httpStatusCode === 404 || err.message.includes("404")) {
      return res.status(404).json({
        message: "Transaction not found in Midtrans",
        midtransError: err.message
      });
    }
    return res.status(500).json({
      message: "Failed to check Midtrans status",
      error: err.message
    });
  }
}
