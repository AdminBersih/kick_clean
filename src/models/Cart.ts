import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  service_id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface ICart extends Document {
  sessionId?: string;
  user_id?: mongoose.Types.ObjectId | null;
  items: ICartItem[];
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  service_id: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const CartSchema = new Schema<ICart>(
  {
    sessionId: String,
    user_id: { type: Schema.Types.ObjectId, ref: "User", default: null },
    items: { type: [CartItemSchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Cart: Model<ICart> =
  (mongoose.models.Cart as Model<ICart>) || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
