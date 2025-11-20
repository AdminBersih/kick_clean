import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  service_id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  orderCode: string;
  user_id?: mongoose.Types.ObjectId | null;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  pickupMethod?: string;
  notes?: string;
  items: IOrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "finished" | "cancelled";
}

const OrderItemSchema = new Schema<IOrderItem>({
  service_id: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderCode: { type: String, required: true, unique: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", default: null },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: String,
    pickupMethod: String,
    notes: String,
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "finished", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
