import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../../common/seo/Seo";
import HeaderOne from "../../common/header/HeaderOne";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import FooterOne from "../../common/footer/FooterOne";
import { ServiceOneData, ServicePricingOptions } from "@/data/service";

const defaultLocation = { lat: -7.606649, lng: 110.81686 };

const formatIDR = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const getServiceBySlug = (slug) => ServiceOneData.find((item) => item.slug === slug);

export default function OrderConfirmPage() {
    const router = useRouter();
    const { query } = router;
    const [step, setStep] = useState(1);
    const [serviceSlug, setServiceSlug] = useState(query.service || ServiceOneData[0].slug);
    const [packageId, setPackageId] = useState(query.packageId || "");
    const [shippingMethod, setShippingMethod] = useState(query.shipping || "toko");
    const [address, setAddress] = useState(query.address || "");
    const [notes, setNotes] = useState(query.notes || "");
    const [quantity, setQuantity] = useState(query.qty || 1);
    const [contact, setContact] = useState({ name: "", email: "", phone: "" });
    const [location, setLocation] = useState({ lat: defaultLocation.lat, lng: defaultLocation.lng });
    const [locationStatus, setLocationStatus] = useState("");
    const [stepError, setStepError] = useState("");

    useEffect(() => {
        if (!router.isReady) return;
        if (query.service) setServiceSlug(query.service);
        if (query.packageId) setPackageId(query.packageId);
        if (query.shipping) setShippingMethod(query.shipping);
        if (query.address) setAddress(query.address);
        if (query.notes) setNotes(query.notes);
        if (query.qty) setQuantity(query.qty);
    }, [query, router.isReady]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("kickclean-contact");
            if (stored) {
                const parsed = JSON.parse(stored);
                setContact((prev) => ({
                    name: parsed.name || prev.name,
                    email: parsed.email || prev.email,
                    phone: parsed.phone || prev.phone,
                }));
                if (!address && parsed.address) {
                    setAddress(parsed.address);
                }
            }
        } catch (err) {
            // ignore storage errors
        }
    }, [address]);

    const pricing = useMemo(() => ServicePricingOptions[serviceSlug] || [], [serviceSlug]);
    useEffect(() => {
        if (pricing.length && !pricing.find((item) => item.id === packageId)) {
            setPackageId(pricing[0].id);
        }
    }, [pricing, packageId]);

    const service = getServiceBySlug(serviceSlug);
    const selectedPackage = pricing.find((item) => item.id === packageId) || pricing[0];
    const subtotal = selectedPackage ? (Number(quantity) || 1) * selectedPackage.price : 0;

    const handleGeoLocate = () => {
        if (typeof window === "undefined" || !navigator.geolocation) {
            setLocationStatus("Perangkat tidak mendukung geolokasi.");
            return;
        }
        setLocationStatus("Mengambil lokasi...");
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setLocationStatus("Lokasi berhasil diatur.");
            },
            () => {
                setLocationStatus("Tidak dapat mengambil lokasi. Pastikan izin lokasi aktif.");
            },
            { enableHighAccuracy: true, timeout: 7000 }
        );
    };

    const validateStepOne = () => {
        if (!contact.name.trim()) {
            setStepError("Nama wajib diisi.");
            return false;
        }
        if (!contact.phone.trim()) {
            setStepError("Nomor WhatsApp wajib diisi.");
            return false;
        }
        if (!address.trim()) {
            setStepError("Alamat wajib diisi.");
            return false;
        }
        if (!quantity || Number(quantity) < 1) {
            setStepError("Jumlah items minimal 1.");
            return false;
        }
        setStepError("");
        return true;
    };

    const renderSteps = () => (
        <div className="counter-one">
            <div className="container">
                <div className="row">
                    {[1, 2, 3].map((s) => (
                        <div className="col-xl-4 col-lg-4 col-md-4" key={s}>
                            <div className="counter-one__single" style={step === s ? { background: "#f0f6ff" } : {}}>
                                <div className="counter-one__single-inner">
                                    <div className="icon-box">
                                        <span
                                            className={
                                                s === 1
                                                    ? "fa fa-clipboard-list"
                                                    : s === 2
                                                    ? "fa fa-plus-circle"
                                                    : "fa fa-credit-card"
                                            }
                                        ></span>
                                    </div>
                                    <div className="text-box">
                                        <h3>Step {s}</h3>
                                        <p>
                                            {s === 1 && "Lokasi & data pemesan"}
                                            {s === 2 && "Tambah layanan (opsional)"}
                                            {s === 3 && "Ringkasan & pembayaran"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const StepOne = () => (
        <div className="service-details__bottom">
            <div className="service-details__bottom-text1">
                <p className="service-details__bottom-subtitle">Lokasi &amp; order recap</p>
            </div>

            <div className="contact-page-google-map">
                <iframe
                    className="contact-page-google-map__one"
                    src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
                    allowFullScreen
                ></iframe>
            </div>
            <div className="sidebar__category" style={{ marginTop: 20 }}>
                <div className="sidebar__title">Titik lokasi</div>
                <p className="service-details__bottom-text1">
                    Latitude: {location.lat.toFixed(5)} | Longitude: {location.lng.toFixed(5)}
                </p>
                <button className="thm-btn" type="button" onClick={handleGeoLocate}>
                    <span>Gunakan lokasi saya</span>
                    <i className="liquid"></i>
                </button>
                {locationStatus && (
                    <p className="service-details__bottom-text1" style={{ color: "var(--thm-base)" }}>
                        {locationStatus}
                    </p>
                )}
            </div>

            <div className="sidebar__category">
                <h4 className="sidebar__title">Order Recap</h4>
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">Nama</label>
                    <input
                        type="text"
                        className="comment-form__textarea"
                        value={contact.name}
                        onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">Email</label>
                    <input
                        type="email"
                        className="comment-form__textarea"
                        value={contact.email}
                        onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                    />
                </div>
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">No. WhatsApp</label>
                    <input
                        type="text"
                        className="comment-form__textarea"
                        value={contact.phone}
                        onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                </div>
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">Alamat lengkap</label>
                    <textarea
                        className="comment-form__textarea"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">Metode pengiriman</label>
                    <ul className="sidebar__category-list">
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="shipping-method"
                                    value="toko"
                                    checked={shippingMethod === "toko"}
                                    onChange={(e) => setShippingMethod(e.target.value)}
                                />{" "}
                                Datang ke toko (gratis)
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="shipping-method"
                                    value="jemput"
                                    checked={shippingMethod === "jemput"}
                                    onChange={(e) => setShippingMethod(e.target.value)}
                                />{" "}
                                Jemput di rumah (gratis 5-7 km)
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">Jumlah items</label>
                    <input
                        type="number"
                        min="1"
                        className="comment-form__textarea"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">Catatan</label>
                    <textarea
                        className="comment-form__textarea"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </div>

            {stepError && (
                <p className="service-details__bottom-text1" style={{ color: "red" }}>
                    {stepError}
                </p>
            )}

            <div className="d-flex" style={{ gap: 10, justifyContent: "space-between", marginTop: 20 }}>
                <button className="thm-btn" type="button" onClick={() => router.back()}>
                    <span>Kembali</span>
                    <i className="liquid"></i>
                </button>
                <button
                    className="thm-btn"
                    type="button"
                    onClick={() => {
                        if (validateStepOne()) setStep(2);
                    }}
                >
                    <span>Lanjutkan</span>
                    <i className="liquid"></i>
                </button>
            </div>
        </div>
    );

    const StepTwo = () => (
        <div className="service-details__bottom">
            <div className="service-details__bottom-text1">
                <p className="service-details__bottom-subtitle">Tambah layanan (opsional)</p>
                <p>Pilih layanan lain untuk digabung, atau lanjutkan jika tidak ada tambahan.</p>
            </div>
            <div className="row">
                {ServiceOneData.map((item) => (
                    <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
                        <div className="services-one__single">
                            <div className="services-one__single-img">
                                <div className="services-one__single-img-inner">
                                    <img className="parallax-img" src={item.image} alt={item.alt} />
                                </div>
                                <div className="icon">
                                    <span className={item.icon}></span>
                                </div>
                            </div>
                            <div className="services-one__single-content text-center">
                                <h2>{item.heading}</h2>
                                <p>{item.description}</p>
                                <button
                                    type="button"
                                    className="thm-btn"
                                    onClick={() => {
                                        setServiceSlug(item.slug);
                                        const newPricing = ServicePricingOptions[item.slug] || [];
                                        setPackageId(newPricing[0]?.id || "");
                                        setStep(1);
                                    }}
                                >
                                    <span>Pilih layanan ini</span>
                                    <i className="liquid"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex" style={{ gap: 10, marginTop: 20, justifyContent: "space-between" }}>
                <button className="thm-btn" type="button" onClick={() => setStep(1)}>
                    <span>Kembali</span>
                    <i className="liquid"></i>
                </button>
                <button className="thm-btn" type="button" onClick={() => setStep(3)}>
                    <span>Lanjutkan</span>
                    <i className="liquid"></i>
                </button>
            </div>
        </div>
    );

    const StepThree = () => (
        <div className="service-details__bottom">
            <div className="service-details__bottom-text1">
                <p className="service-details__bottom-subtitle">Ringkasan Order</p>
            </div>
            <div className="sidebar__category">
                <h4 className="sidebar__title">Detail Pemesan</h4>
                <p className="service-details__bottom-text1">Nama: {contact.name || "-"}</p>
                <p className="service-details__bottom-text1">Email: {contact.email || "-"}</p>
                <p className="service-details__bottom-text1">WhatsApp: {contact.phone || "-"}</p>
            </div>
            <div className="sidebar__category">
                <h4 className="sidebar__title">Order</h4>
                <p className="service-details__bottom-text1">
                    Layanan: {service?.heading} - {selectedPackage?.label}
                </p>
                <p className="service-details__bottom-text1">Jumlah: {quantity}</p>
                <p className="service-details__bottom-text1">Subtotal: {formatIDR(subtotal || 0)}</p>
                <p className="service-details__bottom-text1">Alamat: {address || "-"}</p>
                <p className="service-details__bottom-text1">
                    Lokasi: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                </p>
                <p className="service-details__bottom-text1">
                    Pengiriman: {shippingMethod === "jemput" ? "Jemput di rumah" : "Datang ke toko"} (gratis 5-7 km)
                </p>
                <p className="service-details__bottom-text1">Catatan: {notes || "-"}</p>
                <p className="service-details__bottom-title">Total: {formatIDR(subtotal || 0)}</p>
            </div>

            <div className="d-flex" style={{ gap: 10, justifyContent: "space-between", marginTop: 20 }}>
                <button className="thm-btn" type="button" onClick={() => setStep(2)}>
                    <span>Kembali</span>
                    <i className="liquid"></i>
                </button>
                <button className="thm-btn" type="button">
                    <span>Bayar Sekarang</span>
                    <i className="liquid"></i>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <SEO pageTitle="Konfirmasi Order" />
            <HeaderOne />
            <Breadcrumb heading="Konfirmasi Order" currentPage="Step Order" />
            <section className="service-details pd-120-0-90">
                <div className="container">
                    {renderSteps()}
                    {step === 1 && <StepOne />}
                    {step === 2 && <StepTwo />}
                    {step === 3 && <StepThree />}
                </div>
            </section>
            <FooterOne />
        </>
    );
}
