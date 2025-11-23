import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  image?: string;
  role: "admin" | "user";
  joinedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    phone: String,
    image: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = (mongoose.models.User as Model<IUser>) || 
              mongoose.model<IUser>("User", UserSchema);

export default User;
