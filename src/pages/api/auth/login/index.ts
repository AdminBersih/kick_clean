import bcrypt from "bcryptjs";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import { signAccessToken, signRefreshToken } from "../../../../lib/jwt";
import { mergeGuestCartIntoUser } from "../../../../lib/cart";
import * as cookie from "cookie";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await mergeGuestCartIntoUser(sessionId, user._id.toString());
  }

  const accessToken = signAccessToken({ id: user._id, role: user.role });
  const refreshToken = signRefreshToken({ id: user._id });

  res.setHeader("Set-Cookie",
    cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
    })
  );

  res.json({
    message: "Logged in",
    accessToken,
    refreshToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}
