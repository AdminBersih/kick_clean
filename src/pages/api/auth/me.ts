import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  await dbConnect();

  const userData = getUserFromRequest(req);
  if (!userData) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(userData.id).select("-passwordHash");

  res.json({ user });
}
