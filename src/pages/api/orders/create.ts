// pages/api/orders/create.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Cart from "../../../models/Cart";
import Order from "../../../models/Order";
import { getUserFromRequest } from "../../../lib/auth";
import { sendEmail, sendSmsPlaceholder } from "../utils/notify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "POST") return res.status(405).end();

  const user = getUserFromRequest(req);
  const { sessionId, customerName, phone, email, address, pickupMethod, notes } = req.body;

  // Find cart by user or session
  let cart = null;
  if (user && user.id) cart = await Cart.findOne({ user_id: user.id });
  else if (sessionId) cart = await Cart.findOne({ sessionId });

  if (!cart || !cart.items || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // compute total and build order items snapshot
  const items = cart.items.map(it => ({
    service_id: it.service_id,
    name: it.name,
    price: it.price,
    quantity: it.quantity
  }));
  const totalPrice = items.reduce((s, it) => s + (it.price * (it.quantity || 1)), 0);

  // generate orderCode (readable)
  const orderCode = `KC-${Date.now().toString().slice(-6)}-${Math.floor(Math.random()*900+100)}`;

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
    totalPrice,
  });

  // clear cart
  if (cart._id) await Cart.deleteOne({ _id: cart._id });

  // Send notification: email & phone (if provided)
  const trackingUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/track?orderCode=${orderCode}`;

  if (email) {
    const html = `<p>Terima kasih ${customerName}. Pesanan kamu: <b>${orderCode}</b></p>
      <p>Tracking: <a href="${trackingUrl}">${trackingUrl}</a></p>`;
    sendEmail(email, `Order ${orderCode} - KickClean`, html).catch(err => console.error(err));
  }

  if (phone) {
    const sms = `Terima kasih ${customerName}. Order kamu ${orderCode}. Lihat status: ${trackingUrl}`;
    sendSmsPlaceholder(phone, sms);
  }

  return res.status(201).json({ message: "Order created", orderId: orderDoc._id, orderCode });
}
