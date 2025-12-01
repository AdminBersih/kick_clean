export function buildWhatsAppTemplate({
  customerName,
  orderCode,
  statusUrl,
  trackUrl,
}: {
  customerName: string;
  orderCode: string;
  statusUrl: string;
  trackUrl: string;
}) {
  return `
Halo *${customerName}* 👋

Terima kasih telah memesan layanan di *CleanKick*.
Kami telah menerima pesanan Anda dengan detail berikut:

• *Kode Pesanan:* ${orderCode}
• *Status Pembayaran:* Pending

Harap segera menyelesaikan pembayaran Anda.

🔍 *Cek Status Pembayaran:*  
${statusUrl}

📦 *Lacak Pesanan Anda:*  
${trackUrl}

Jika Anda membutuhkan bantuan tambahan, silakan hubungi customer support kami.
Terima kasih telah mempercayakan perawatan sepatu Anda kepada CleanKick!
  `.trim();
}
