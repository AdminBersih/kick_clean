import Cart from "@/models/Cart";
import mongoose from "mongoose";

export async function mergeGuestCartIntoUser(sessionId: string, userId: string) {
  const guestCart = await Cart.findOne({ sessionId });
  if (!guestCart) return;

  let userCart = await Cart.findOne({ user_id: userId });
  if (!userCart) {
    userCart = await Cart.create({
      user_id: userId,
      items: []
    });
  }

  guestCart.items.forEach((guestItem) => {
    const existing = userCart!.items.find(
      (i) => i.service_id.toString() === guestItem.service_id.toString()
    );

    if (existing) {
      existing.quantity += guestItem.quantity;
    } else {
      userCart!.items.push(guestItem);
    }
  });

  await userCart.save();
  await guestCart.deleteOne();
}
