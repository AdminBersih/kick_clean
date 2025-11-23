import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  // Optional: configure via env (SMTP) or use nodemailer ethereal for dev
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.log("[notify] SMTP not configured. Email not sent. to:", to, "subject:", subject);
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
}

export async function sendSmsPlaceholder(phone: string, message: string) {
  // Placeholder for WhatsApp/SMS integration
  // You can implement integration with Twilio / WA API here.
  console.log("[notify] sendSmsPlaceholder to:", phone, "message:", message);
}
