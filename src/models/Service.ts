import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  name: string;
  category: string;
  price: number;
  duration: string;
  description?: string;
  isActive?: boolean;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    description: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service =
  (mongoose.models.Service as Model<IService>) ||
  mongoose.model<IService>("Service", ServiceSchema);

export default Service;
