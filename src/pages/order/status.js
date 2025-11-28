import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderOne from "../../common/header/HeaderOne";
import FooterOne from "../../common/footer/FooterOne";
import SEO from "../../common/seo/Seo";
import Link from "next/link";
import { getMidtransStatus } from "@/lib/ordersClient";
import { useAuth } from "@/common/auth/AuthContext";

export default function OrderStatusPage() {
  const router = useRouter();
  const { orderCode, status_code, transaction_status } = router.query;
  const { accessToken } = useAuth();
  const [status, setStatus] = useState(transaction_status || "pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderCode) return;

    const checkStatus = async () => {
      try {
        const res = await getMidtransStatus({ orderCode, token: accessToken });
        if (res && res.transaction_status) {
          setStatus(res.transaction_status);
        }
      } catch (err) {
        console.error("Failed to check status", err);
      } finally {
        setLoading(false);
      }
    };

    if (!transaction_status) {
      checkStatus();
    } else {
      setLoading(false);
    }
  }, [orderCode, transaction_status, accessToken]);

  const renderContent = () => {
    if (loading) return <p>Memuat status pembayaran...</p>;

    if (status === "settlement" || status === "capture" || status === "success") {
      return (
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="icon-box" style={{ fontSize: "4rem", color: "#1e9e52", marginBottom: "20px" }}>
            <i className="fa fa-check-circle"></i>
          </div>
          <h3>Pembayaran Berhasil!</h3>
          <p>Terima kasih, pesanan Anda sedang diproses.</p>
          <div className="mt-4">
            <Link href={`/track?orderCode=${orderCode}`} className="thm-btn">
              <span>Lacak Pesanan</span>
              <i className="liquid"></i>
            </Link>
          </div>
        </div>
      );
    }

    if (status === "pending") {
      return (
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="icon-box" style={{ fontSize: "4rem", color: "#ffc107", marginBottom: "20px" }}>
            <i className="fa fa-clock"></i>
          </div>
          <h3>Menunggu Pembayaran</h3>
          <p>Silakan selesaikan pembayaran Anda.</p>
          <div className="mt-4">
            <Link href={`/track?orderCode=${orderCode}`} className="thm-btn">
              <span>Lihat Instruksi Bayar</span>
              <i className="liquid"></i>
            </Link>
          </div>
        </div>
      );
    }

    if (status === "expire") {
      return (
        <div className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="icon-box" style={{ fontSize: "4rem", color: "#d0352f", marginBottom: "20px" }}>
            <i className="fa fa-times-circle"></i>
          </div>
          <h3>Pembayaran Kedaluwarsa</h3>
          <p>Waktu pembayaran telah habis. Silakan buat pesanan ulang.</p>
          <div className="mt-4">
            <Link href="/service-pick" className="thm-btn">
              <span>Pesan Ulang</span>
              <i className="liquid"></i>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="icon-box" style={{ fontSize: "4rem", color: "#d0352f", marginBottom: "20px" }}>
          <i className="fa fa-exclamation-circle"></i>
        </div>
        <h3>Pembayaran Gagal</h3>
        <p>Terjadi kesalahan atau pembayaran dibatalkan.</p>
        <div className="mt-4">
          <Link href="/service-pick" className="thm-btn">
            <span>Coba Lagi</span>
            <i className="liquid"></i>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO pageTitle="Status Pembayaran" />
      <HeaderOne />
      <section className="pd-120-0-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card" style={{ padding: "40px", borderRadius: "15px", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterOne />
    </>
  );
}
