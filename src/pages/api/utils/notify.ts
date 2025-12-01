import nodemailer from "nodemailer";
import fetch from "node-fetch";

// Settings for Email via SMTP
export async function sendEmail(to: string, subject: string, html: string) {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.log("[notify] SMTP not configured. Email skipped:", to, subject);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject,
    html,
  });

  console.log("[notify] Email sent:", to);
}

// Settings for WhatsApp via Fonnte
const WA_API = process.env.FONNTE_API_URL || "https://api.fonnte.com/send";
const WA_TOKEN = process.env.FONNTE_TOKEN;

export async function sendWhatsApp(phone: string, message: string) {
  if (!WA_API || !WA_TOKEN) {
    console.log("[notify] Fonnte not configured. WA skipped:", phone);
    return;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("target", phone);
    formData.append("message", message);
    formData.append("countryCode", "62");

    const res = await fetch(WA_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": WA_TOKEN, // Fonnte TIDAK pakai Bearer
      },
      body: formData,
    });

    const text = await res.text();
    console.log("[notify] Fonnte Response:", text);

    if (!res.ok) console.error("[notify] WA send error:", text);
  } catch (err) {
    console.error("[notify] WA send failed:", err);
  }
}
