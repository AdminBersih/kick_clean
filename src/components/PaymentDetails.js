const formatIDR = (value) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const PaymentDetails = ({ data, onDone }) => {
  const type = data.payment_type;

  // Extract VA Number
  let vaNumber = "";
  let bank = "";
  if (data.va_numbers && data.va_numbers.length > 0) {
    vaNumber = data.va_numbers[0].va_number;
    bank = data.va_numbers[0].bank;
  } else if (data.permata_va_number) {
    vaNumber = data.permata_va_number;
    bank = "permata";
  } else if (type === "permata" && data.permata_va_number) {
    vaNumber = data.permata_va_number;
    bank = "permata";
  } else if (data.bill_key && data.biller_code) {
    // Mandiri Bill
    vaNumber = `${data.biller_code} - ${data.bill_key}`;
    bank = "mandiri";
  }

  // Extract QR / Deep Link
  const qrUrl = data.actions?.find((a) => a.name === "generate-qr-code")?.url;
  const deepLink = data.actions?.find((a) => a.name === "deeplink-redirect")?.url;

  return (
    <div className="payment-details-wrapper">
      <div className="text-center mb-4">
        <p className="muted mb-2">Total Tagihan</p>
        <h3 style={{ color: "var(--thm-base)" }}>{formatIDR(data.gross_amount)}</h3>
      </div>

      {type === "bank_transfer" || type === "permata" || type === "permata_va" || type === "echannel" ? (
        <div className="va-box text-center">
          <p className="mb-2">Virtual Account {bank.toUpperCase()}</p>
          <div
            className="va-number-display"
            style={{
              background: "#f0f6ff",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "2px",
              marginBottom: "15px",
              border: "1px dashed var(--thm-base)",
            }}
          >
            {vaNumber}
          </div>
          <p className="small text-muted">Salin nomor ini dan bayar melalui ATM atau Mobile Banking.</p>
        </div>
      ) : null}

      {type === "qris" || type === "gopay" ? (
        <div className="qr-box text-center">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" style={{ maxWidth: "200px", margin: "0 auto 15px" }} />
          ) : (
            <p>Scan QR Code pada aplikasi pembayaran Anda.</p>
          )}
          {deepLink && (
            <a
              href={deepLink}
              target="_blank"
              rel="noreferrer"
              className="thm-btn"
              style={{ width: "100%", marginTop: 10 }}
            >
              <span>Buka Aplikasi</span>
              <i className="liquid"></i>
            </a>
          )}
        </div>
      ) : null}

      <div className="mt-4 pt-3 border-top">
        <button className="thm-btn" style={{ width: "100%" }} onClick={onDone}>
          <span>Cek Status Pembayaran</span>
          <i className="liquid"></i>
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
