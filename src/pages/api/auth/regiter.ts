import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { signAccessToken, signRefreshToken } from "../../../lib/jwt";
import cookie from "cookie";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { name, email, password, phone } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    passwordHash,
  });

  const accessToken = signAccessToken({ id: user._id, role: user.role });
  const refreshToken = signRefreshToken({ id: user._id });

  res.setHeader("Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 60 * 60 * 24 * 1, 
    })
  );

  res.status(201).json({
    message: "Registered successfully",
    accessToken,
    user: { id: user._id, name: user.name, email: user.email },
  });
}
