export function buildOrderEmailTemplate({
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
  <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; padding:25px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

      <h2 style="color:#222; text-align:center; margin-bottom:10px;">
        Terima kasih telah memesan di <span style="color:#2b6cb0;">CleanKick</span>
      </h2>

      <p style="font-size:15px; color:#444; line-height:1.6;">
        Halo <b>${customerName}</b>,<br><br>
        Terima kasih telah melakukan pemesanan layanan di CleanKick.
        Silakan selesaikan pembayaran Anda untuk memulai proses pengerjaan.
      </p>

      <div style="margin:25px 0; padding:15px; background:#f1f5f9; border-left:4px solid #2b6cb0; border-radius:6px;">
        <p style="margin:0; font-size:15px;">
          <b>Kode Pesanan:</b> ${orderCode} <br>
          <b>Status Pembayaran:</b> Pending
        </p>
      </div>

      <p style="font-size:15px; color:#444;">
        Anda dapat melihat detail status pembayaran dan perkembangan pengerjaan melalui tombol berikut:
      </p>

      <div style="text-align:center; margin:25px 0;">
        <a href="${statusUrl}" style="display:inline-block; padding:12px 22px; background:#2b6cb0; color:white; text-decoration:none; border-radius:6px; font-size:15px;">
          Lihat Status Pembayaran
        </a>
      </div>

      <p style="font-size:15px; color:#444; margin-top:20px;">
        Atau pantau progres pengerjaan secara lengkap melalui link tracking di bawah:
      </p>

      <div style="text-align:center; margin-top:10px;">
        <a href="${trackUrl}" style="display:inline-block; padding:10px 20px; background:#374151; color:white; text-decoration:none; border-radius:6px; font-size:14px;">
          Lacak Pesanan Anda
        </a>
      </div>

      <hr style="margin:40px 0; border:none; border-top:1px solid #eee;">

      <p style="color:#666; font-size:13px; text-align:center;">
        CleanKick – Professional Sneaker Treatment<br>
        Email ini dikirim otomatis, mohon tidak membalas langsung pesan ini.
      </p>

    </div>
  </div>`;
}
