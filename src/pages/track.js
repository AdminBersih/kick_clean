import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import FooterOne from "../common/footer/FooterOne";
import { useAuth } from "@/common/auth/AuthContext";
import {
    cancelMidtransPayment,
    fetchUserOrders,
    getMidtransStatus,
    getPaymentLink,
    recreatePaymentLink,
    trackOrder,
} from "@/lib/ordersClient";
import BackgroundOne from '../../public/assets/images/pattern/services-v1-pattern.png';

const formatIDR = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const pickPaymentUrl = (payload = {}) => {
    if (!payload || typeof payload !== "object") return null;
    const candidates = [
        payload.paymentUrl,
        payload.paymentURL,
        payload.payment_url,
        payload.payment_link,
        payload.redirectUrl,
        payload.redirectURL,
        payload.redirect_url,
        payload.midtransRedirectUrl,
        payload.snapRedirectUrl,
        payload.payment_redirect_url,
    ].filter(Boolean);
    if (candidates.length) return candidates[0];

    if (Array.isArray(payload.actions)) {
        const found = payload.actions.find((a) => a?.url) || payload.actions[0];
        if (found?.url) return found.url;
    }

    if (payload.data && payload.data !== payload) {
        return pickPaymentUrl(payload.data);
    }

    return null;
};

const statusCopy = {
    pending: "Menunggu pembayaran",
    processing: "Sedang dikerjakan",
    finished: "Selesai",
    cancelled: "Dibatalkan",
};

const statusTone = {
    pending: "#f6c344",
    processing: "#5aa0ff",
    finished: "#30c48d",
    cancelled: "#ff6b6b",
};

const formatDate = (val) => {
    if (!val) return "-";
    const dt = new Date(val);
    return dt.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
};

export default function TrackPage() {
    const router = useRouter();
    const { query } = router;
    const { accessToken, user } = useAuth();
    const [orderCodeInput, setOrderCodeInput] = useState(query.orderCode || "");
    const [contactInput, setContactInput] = useState(query.phone || query.email || "");
    const [order, setOrder] = useState(null);
    const [midtransStatus, setMidtransStatus] = useState(null);
    const [paymentLink, setPaymentLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [linkLoading, setLinkLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [error, setError] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [userOrders, setUserOrders] = useState([]);
    const [listLoading, setListLoading] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        if (query.orderCode) {
            handleTrack(query.orderCode, contactInput, true);
        }
    }, [contactInput, query.orderCode, router.isReady]);

    useEffect(() => {
        if (!accessToken) return;
        let mounted = true;
        const loadOrders = async () => {
            try {
                setListLoading(true);
                const orders = await fetchUserOrders(accessToken);
                if (mounted) setUserOrders(orders || []);
            } catch (err) {
                if (mounted) setActionMessage(err?.message || "Gagal mengambil daftar order.");
            } finally {
                if (mounted) setListLoading(false);
            }
        };
        loadOrders();
        return () => {
            mounted = false;
        };
    }, [accessToken]);

    const handleTrack = async (codeParam, contactParam, silent = false) => {
        const code = (codeParam || orderCodeInput || "").trim();
        const contact = (contactParam || contactInput || "").trim();
        if (!code) {
            setError("Masukkan kode order (contoh: KC-123456).");
            return;
        }
        setError("");
        setActionMessage("");
        setPaymentLink("");
        setLoading(!silent);
        try {
            const contactPayload =
                contact && contact.includes("@")
                    ? { email: contact }
                    : contact
                    ? { phone: contact }
                    : {};
            const orderData = await trackOrder({
                orderCode: code,
                ...contactPayload,
                token: accessToken,
            });
            setOrder(orderData);
            await refreshMidtransStatus(code, true);
        } catch (err) {
            setOrder(null);
            setMidtransStatus(null);
            setError(err?.message || "Gagal melacak order, coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    const refreshMidtransStatus = async (code = order?.orderCode, silent = false) => {
        if (!code) return;
        setStatusLoading(!silent);
        setActionMessage("");
        try {
            const payload = await getMidtransStatus({ orderCode: code, token: accessToken });
            setMidtransStatus(payload);
            if (payload?.transaction_status) {
                setActionMessage(`Status Midtrans: ${payload.transaction_status.toUpperCase()}`);
            }
        } catch (err) {
            setActionMessage(err?.message || "Tidak dapat mengambil status Midtrans.");
        } finally {
            setStatusLoading(false);
        }
    };

    const handlePaymentLink = async (recreate = false) => {
        if (!order?.orderCode) {
            setActionMessage("Order belum ditemukan.");
            return;
        }
        setLinkLoading(true);
        setActionMessage("");
        try {
            const payload = recreate
                ? await recreatePaymentLink({ orderCode: order.orderCode, token: accessToken })
                : await getPaymentLink({ orderCode: order.orderCode, token: accessToken });
            const url = pickPaymentUrl(payload) || pickPaymentUrl(payload?.data || {});
            if (url) {
                setPaymentLink(url);
                window.open(url, "_blank");
                setActionMessage(recreate ? "Link pembayaran diperbarui." : "Link pembayaran ditemukan.");
            } else {
                setActionMessage("Link pembayaran tidak tersedia.");
            }
        } catch (err) {
            setActionMessage(err?.message || "Gagal memproses link pembayaran.");
        } finally {
            setLinkLoading(false);
        }
    };

    const handleCancelPayment = async () => {
        if (!order?.orderCode) {
            setActionMessage("Order belum ditemukan.");
            return;
        }
        setCancelLoading(true);
        setActionMessage("");
        try {
            await cancelMidtransPayment({ orderCode: order.orderCode, token: accessToken });
            setActionMessage("Pembayaran dibatalkan. Jika masih butuh, buat link baru.");
            await refreshMidtransStatus(order.orderCode, true);
        } catch (err) {
            setActionMessage(err?.message || "Gagal membatalkan pembayaran.");
        } finally {
            setCancelLoading(false);
        }
    };

    const activeTimeline = useMemo(() => {
        const current = order?.status || "pending";
        return [
            { key: "pending", label: "Pesanan dibuat", done: true },
            {
                key: "payment",
                label: "Pembayaran",
                done: Boolean(
                    midtransStatus?.transaction_status &&
                        ["settlement", "capture", "success"].includes(midtransStatus.transaction_status)
                ),
            },
            { key: "processing", label: "Sedang dikerjakan", done: current === "processing" || current === "finished" },
            { key: "finished", label: "Selesai", done: current === "finished" },
        ];
    }, [midtransStatus?.transaction_status, order?.status]);

    const badge = (val) => (
        <span
            style={{
                padding: "6px 12px",
                borderRadius: 999,
                background: `${statusTone[val] || "#eee"}22`,
                color: statusTone[val] || "#444",
                fontWeight: 600,
                fontSize: 13,
            }}
        >
            {statusCopy[val] || val || "Tidak diketahui"}
        </span>
    );

    return (
        <>
            <SEO pageTitle="Track Order" />
            <HeaderOne />
            <Breadcrumb heading="Track Order" currentPage="Lacak Pesanan" />
            <section className="service-details pd-120-0-90">
                <div className="services-one__pattern" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                <div className="container">
                    <div className="service-details__bottom" style={{ marginBottom: 30 }}>
                        <div className="order-track-hero">
                            <div>
                                <p className="label">Lacak order</p>
                                <h2>Masukkan kode order dan kontak</h2>
                                <p className="service-details__bottom-text1" style={{ maxWidth: 580 }}>
                                    Gunakan kode order dari email/WhatsApp. Untuk tamu, masukkan nomor WhatsApp atau email
                                    yang digunakan. User terdaftar bisa langsung cek tanpa kontak.
                                </p>
                            </div>
                            <div className="track-form">
                                <div className="form-group">
                                    <label>Kode Order</label>
                                    <input
                                        type="text"
                                        value={orderCodeInput}
                                        onChange={(e) => setOrderCodeInput(e.target.value)}
                                        placeholder="KC-123456"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>WhatsApp / Email (opsional)</label>
                                    <input
                                        type="text"
                                        value={contactInput}
                                        onChange={(e) => setContactInput(e.target.value)}
                                        placeholder="0812xxxxx atau email"
                                    />
                                </div>
                                {error && (
                                    <p className="service-details__bottom-text1" style={{ color: "red", margin: "8px 0" }}>
                                        {error}
                                    </p>
                                )}
                                {actionMessage && (
                                    <p className="service-details__bottom-text1" style={{ color: "#2d6cdf", margin: "6px 0" }}>
                                        {actionMessage}
                                    </p>
                                )}
                                <div className="d-flex" style={{ gap: 10 }}>
                                    <button className="thm-btn" type="button" onClick={() => handleTrack()} disabled={loading}>
                                        <span>{loading ? "Mencari..." : "Cek Status"}</span>
                                        <i className="liquid"></i>
                                    </button>
                                    {user && (
                                        <button
                                            className="thm-btn"
                                            type="button"
                                            onClick={() => handleTrack(orderCodeInput || userOrders[0]?.orderCode, user?.phone)}
                                            disabled={loading || listLoading}
                                            style={{ background: "#0f172a" }}
                                        >
                                            <span>Pakai akun</span>
                                            <i className="liquid"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid-cards">
                        <div className="recap-card">
                            <div className="card-header">
                                <div className="icon-bubble">
                                    <span className="fa fa-location-arrow"></span>
                                </div>
                                <div>
                                    <p className="label">Status order</p>
                                    <h4>{order?.orderCode || "Belum ada data order"}</h4>
                                </div>
                                {order && badge(order.status)}
                            </div>

                            {!order && (
                                <p className="service-details__bottom-text1" style={{ marginTop: 10 }}>
                                    Masukkan kode order untuk melihat detail. Jika belum punya, lakukan order terlebih dahulu.
                                </p>
                            )}

                            {order && (
                                <>
                                    <div className="timeline">
                                        {activeTimeline.map((item) => (
                                            <div key={item.key} className={`timeline-step ${item.done ? "done" : ""}`}>
                                                <div className="dot" />
                                                <div>
                                                    <p className="label">{item.label}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="info-grid">
                                        <div>
                                            <p className="label">Pemesan</p>
                                            <h4>{order.customerName}</h4>
                                            <p className="service-details__bottom-text1">
                                                {order.phone} {order.email ? `• ${order.email}` : ""}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="label">Metode</p>
                                            <h4 style={{ textTransform: "capitalize" }}>{order.pickupMethod || "-"}</h4>
                                            <p className="service-details__bottom-text1">{order.address || "Alamat tidak tercatat"}</p>
                                        </div>
                                        <div>
                                            <p className="label">Dibuat</p>
                                            <h4>{formatDate(order.createdAt)}</h4>
                                            <p className="service-details__bottom-text1">Update terakhir: {formatDate(order.updatedAt)}</p>
                                        </div>
                                    </div>

                                    <div className="order-items">
                                        <div className="order-items__head">
                                            <p className="label">Item layanan</p>
                                            <span className="pill">{order.items?.length || 0} item</span>
                                        </div>
                                        <ul className="info-list">
                                            {(order.items || []).map((it) => (
                                                <li key={it._id || it.service_id}>
                                                    <span>
                                                        {it.name}{" "}
                                                        <span className="value" style={{ fontWeight: 400 }}>
                                                            ({it.quantity}x)
                                                        </span>
                                                    </span>
                                                    <span className="value">
                                                        {formatIDR(it.price)}{" "}
                                                        <span className="muted" style={{ marginLeft: 6 }}>
                                                            {formatIDR((Number(it.quantity) || 0) * (Number(it.price) || 0))}
                                                        </span>
                                                    </span>
                                                </li>
                                            ))}
                                            <li>
                                                <span>Total</span>
                                                <span className="value">{formatIDR(order.totalPrice || 0)}</span>
                                            </li>
                                            {order.notes && (
                                                <li>
                                                    <span>Catatan</span>
                                                    <span className="value" style={{ maxWidth: 320, textAlign: "right" }}>
                                                        {order.notes}
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="recap-card">
                            <div className="card-header">
                                <div className="icon-bubble">
                                    <span className="fa fa-credit-card"></span>
                                </div>
                                <div>
                                    <p className="label">Pembayaran</p>
                                    <h4>Midtrans</h4>
                                </div>
                                {midtransStatus?.transaction_status && (
                                    <span className="badge-soft">{midtransStatus.transaction_status}</span>
                                )}
                            </div>

                            <ul className="info-list">
                                <li>
                                    <span>Kode Order</span>
                                    <span className="value">{order?.orderCode || "-"}</span>
                                </li>
                                <li>
                                    <span>Status Midtrans</span>
                                    <span className="value">{midtransStatus?.transaction_status || "Belum dicek"}</span>
                                </li>
                                <li>
                                    <span>Payment Type</span>
                                    <span className="value">{midtransStatus?.payment_type || "-"}</span>
                                </li>
                                <li>
                                    <span>VA / Payment</span>
                                    <span className="value">
                                        {midtransStatus?.va_numbers?.[0]?.va_number ||
                                            midtransStatus?.permata_va_number ||
                                            midtransStatus?.store ||
                                            "-"}
                                    </span>
                                </li>
                                <li>
                                    <span>Gross Amount</span>
                                    <span className="value">
                                        {midtransStatus?.gross_amount ? formatIDR(Number(midtransStatus.gross_amount)) : "-"}
                                    </span>
                                </li>
                                <li>
                                    <span>Link pembayaran</span>
                                    <span className="value">
                                        {paymentLink ? (
                                            <a href={paymentLink} target="_blank" rel="noreferrer">
                                                Buka link
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </span>
                                </li>
                            </ul>

                            <div className="action-bar" style={{ marginTop: 10 }}>
                                <div className="d-flex" style={{ gap: 10, flexWrap: "wrap" }}>
                                    <button
                                        className="thm-btn"
                                        type="button"
                                        onClick={() => refreshMidtransStatus(order?.orderCode)}
                                        disabled={statusLoading || !order}
                                    >
                                        <span>{statusLoading ? "Memuat..." : "Cek Status Midtrans"}</span>
                                        <i className="liquid"></i>
                                    </button>
                                    <button
                                        className="thm-btn"
                                        type="button"
                                        onClick={() => handlePaymentLink(false)}
                                        disabled={linkLoading || !order}
                                    >
                                        <span>{linkLoading ? "Memproses..." : "Link Pembayaran"}</span>
                                        <i className="liquid"></i>
                                    </button>
                                    <button
                                        className="thm-btn"
                                        type="button"
                                        onClick={() => handlePaymentLink(true)}
                                        disabled={linkLoading || !order}
                                        style={{ background: "#0f172a" }}
                                    >
                                        <span>Buat ulang link</span>
                                        <i className="liquid"></i>
                                    </button>
                                    <button
                                        className="thm-btn"
                                        type="button"
                                        onClick={handleCancelPayment}
                                        disabled={cancelLoading || !order}
                                        style={{ background: "#f87171" }}
                                    >
                                        <span>{cancelLoading ? "Membatalkan..." : "Batalkan pembayaran"}</span>
                                        <i className="liquid"></i>
                                    </button>
                                </div>
                                <p className="service-details__bottom-text1" style={{ marginTop: 8 }}>
                                    Jika pembayaran sudah sukses, tombol akan otomatis membawa Anda ke status selesai setelah
                                    refresh.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="service-details__bottom" style={{ marginTop: 30 }}>
                        <div className="card-header" style={{ padding: 0, marginBottom: 16 }}>
                            <div className="icon-bubble">
                                <span className="fa fa-history"></span>
                            </div>
                            <div>
                                <p className="label">Riwayat order</p>
                                <h4>Order terbaru Anda</h4>
                            </div>
                            {listLoading && <span className="badge-soft">Memuat...</span>}
                        </div>
                        {user && userOrders.length === 0 && !listLoading && (
                            <p className="service-details__bottom-text1">Belum ada order di akun ini.</p>
                        )}
                        {!user && (
                            <p className="service-details__bottom-text1">
                                Login untuk melihat order milik akun Anda. Tamu bisa melacak dengan kode & kontak.
                            </p>
                        )}
                        <div className="row">
                            {userOrders.slice(0, 3).map((ord) => (
                                <div className="col-xl-4 col-lg-4 col-md-6" key={ord._id || ord.orderCode}>
                                    <div className="services-one__single" style={{ minHeight: 220 }}>
                                        <div className="services-one__single-content text-center">
                                            <h2>{ord.orderCode}</h2>
                                            <p style={{ minHeight: 60 }}>{statusCopy[ord.status] || ord.status}</p>
                                            <p className="service-details__bottom-text1">
                                                Dibuat: {formatDate(ord.createdAt)}
                                            </p>
                                            <button
                                                type="button"
                                                className="thm-btn"
                                                onClick={() => handleTrack(ord.orderCode, ord.phone)}
                                            >
                                                <span>Lacak order ini</span>
                                                <i className="liquid"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <FooterOne />
            <style jsx>{`
                .order-track-hero {
                    background: linear-gradient(135deg, #f8fbff, #eef4ff);
                    padding: 20px;
                    border-radius: 16px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 16px;
                    align-items: center;
                    border: 1px solid #e2e8f0;
                }
                .track-form .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    margin-bottom: 10px;
                }
                .track-form input {
                    border: 1px solid #d7def0;
                    border-radius: 10px;
                    padding: 12px;
                    outline: none;
                    font-size: 16px;
                }
                .timeline {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 12px;
                    margin: 10px 0 18px;
                }
                .timeline-step {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    padding: 10px;
                    border-radius: 12px;
                    background: #f8fafc;
                    border: 1px dashed #e5e7eb;
                    opacity: 0.6;
                }
                .timeline-step.done {
                    border-color: #30c48d;
                    background: #f1fff7;
                    opacity: 1;
                }
                .timeline-step .dot {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #e5e7eb;
                }
                .timeline-step.done .dot {
                    background: #30c48d;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 14px;
                    padding: 12px;
                    background: #f8fbff;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }
                .order-items {
                    margin-top: 12px;
                }
                .order-items__head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }
                .pill {
                    border-radius: 999px;
                    padding: 6px 12px;
                    background: #f1f5f9;
                    color: #0f172a;
                    font-weight: 600;
                    font-size: 13px;
                }
                @media (max-width: 767px) {
                    .order-track-hero {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </>
    );
}
