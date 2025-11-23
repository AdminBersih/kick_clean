import * as cookie from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  res.setHeader("Set-Cookie", [
    cookie.serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      // Use root path to ensure the refresh cookie set during login is cleared
      path: "/",
    }),
    cookie.serialize("sessionId", "", {
      path: "/",
      maxAge: 0,
    }),
  ]);

  res.json({ message: "Logged out" });
}
