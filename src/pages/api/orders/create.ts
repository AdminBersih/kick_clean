import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Cart from "../../../models/Cart";
import Order from "../../../models/Order";
import { getUserFromRequest } from "../../../lib/auth";
import { sendEmail, sendWhatsApp} from "../utils/notify";
import midtransClient from "midtrans-client";
import { buildOrderEmailTemplate } from "../utils/emailTemplate";
import { buildWhatsAppTemplate } from "../utils/waTemplate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).end();

  const user = getUserFromRequest(req);
  const {
    sessionId,
    customerName,
    phone,
    email,
    address,
    pickupMethod,
    deliveryFee,
    notes,
  } = req.body;

  // Find cart by user or session
  let cart = null;
  if (user && user.id) cart = await Cart.findOne({ user_id: user.id });
  else if (sessionId) cart = await Cart.findOne({ sessionId });

  if (!cart || !cart.items || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // compute total and build order items snapshot
  const items = cart.items.map((it) => ({
    service_id: it.service_id,
    name: it.name,
    price: it.price,
    quantity: it.quantity,
  }));
  const totalPriceItems = items.reduce(
    (s, it) => s + it.price * (it.quantity || 1),
    0
  );

  let finalTotalPrice = totalPriceItems;

  // Add delivery fee if applicable
  if (deliveryFee && Number(deliveryFee) > 0) {
    const fee = Number(deliveryFee);
    finalTotalPrice += fee;
    items.push({
      service_id: "DELIVERY-FEE",
      name: "Biaya Antar Jemput",
      price: fee,
      quantity: 1,
    });
  }

  // generate orderCode (readable)
  const orderCode = `KC-${Date.now().toString().slice(-6)}-${Math.floor(
    Math.random() * 900 + 100
  )}`;

  const orderDoc = await Order.create({
    orderCode,
    user_id: user && user.id ? user.id : null,
    customerName,
    phone,
    email,
    address,
    pickupMethod,
    notes,
    items,
    totalPrice: finalTotalPrice,
    status: "pending",
  });

  const snap = new midtransClient.Snap({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  const parameter = {
    transaction_details: {
      order_id: orderCode,
      gross_amount: finalTotalPrice,
    },
    item_details: items.map((i) => ({
      id: i.service_id.toString(),
      price: i.price,
      quantity: i.quantity,
      name: i.name.substring(0, 50),
    })),
    customer_details: {
      first_name: customerName,
      email,
      phone,
      billing_address: {
        first_name: customerName,
        email,
        phone,
        address,
        city: "Indonesia",
        postal_code: "00000",
        country_code: "IDN",
      },
    },
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/order/status?orderCode=${orderCode}`
    }
  };

  console.log(`[Create Order] Creating Midtrans Snap transaction for ${orderCode}`);

  let transaction;
  try {
    transaction = await snap.createTransaction(parameter);
    console.log("[Create Order] Success:", transaction);
  } catch (err: any) {
    console.error("[Create Order] Midtrans Error:", err.message);
    const statusCode = err.httpStatusCode || 500;
    return res.status(statusCode).json({
      message: "Gagal memproses pembayaran.",
      error: err.message,
      midtransResponse: err.ApiResponse
    });
  }

  // Clear cart ONLY after successful payment creation
  if (cart._id) await Cart.deleteOne({ _id: cart._id });

  // Update order with Midtrans info (initial status pending)
  await orderDoc.updateOne({
    midtrans: {
      orderId: orderCode,
      paymentStatus: "pending", // Snap transaction created
      token: transaction.token,
      redirectUrl: transaction.redirect_url
    },
  });

  // Send notification: email & phone (if provided)
  const statusUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/order/status?orderCode=${orderCode}`;
  const trackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/track?orderCode=${orderCode}`;

  const html = buildOrderEmailTemplate({
    customerName,
    orderCode,
    statusUrl,
    trackUrl,
  });

  sendEmail(email, `Order ${orderCode} - CleanKick`, html);

  const waMessage = buildWhatsAppTemplate({
    customerName,
    orderCode,
    statusUrl,
    trackUrl,
  });

  sendWhatsApp(phone, waMessage);

  return res
    .status(201)
    .json({
      message: "Order created",
      orderId: orderDoc._id,
      orderCode,
      token: transaction.token,
      redirectUrl: transaction.redirect_url
    });
}
