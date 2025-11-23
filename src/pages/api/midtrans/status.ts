import type { NextApiRequest, NextApiResponse } from "next";
import midtransClient from "midtrans-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const { orderId } = req.query;
  if (!orderId) return res.status(400).json({ message: "Missing orderId" });

  const core = new midtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_STATUS_PRODUCTION,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  const status = await core.transaction.status(orderId.toString());

  return res.json(status);
}
