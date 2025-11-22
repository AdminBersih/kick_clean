import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../../common/seo/Seo";
import HeaderOne from "../../common/header/HeaderOne";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import FooterOne from "../../common/footer/FooterOne";
import { ServiceCategoryCards, ServicePricingOptions, OtherTreatmentGroups } from "@/data/service";
import BackgroundOne from '../../../public/assets/images/pattern/services-v1-pattern.png';

const defaultLocation = { lat: -7.606649, lng: 110.81686 };

const formatIDR = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const getServiceBySlug = (slug) => ServiceCategoryCards.find((item) => item.slug === slug);

export default function OrderConfirmPage() {
    const router = useRouter();
    const { query } = router;
    const [step, setStep] = useState(1);
    const [serviceSlug, setServiceSlug] = useState(query.service || ServiceCategoryCards[0].slug);
    const [packageId, setPackageId] = useState(query.packageId || "");
    const [shippingMethod, setShippingMethod] = useState(query.shipping || "toko");
    const [address, setAddress] = useState(query.address || "");
    const [notes, setNotes] = useState(query.notes || "");
    const [quantity, setQuantity] = useState(query.qty || 1);
    const [otherGroup, setOtherGroup] = useState(query.otherGroup || "bag-wallet");
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
        if (query.otherGroup) setOtherGroup(query.otherGroup);
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
    const filteredPricing =
        serviceSlug === "cuci-tas-dompet-koper"
            ? pricing.filter((item) =>
                  (OtherTreatmentGroups.find((g) => g.id === otherGroup) || OtherTreatmentGroups[0])?.names.includes(item.name)
              )
            : pricing;

    useEffect(() => {
        if (filteredPricing.length && !filteredPricing.find((item) => item.id === packageId)) {
            setPackageId(filteredPricing[0].id);
        }
    }, [filteredPricing, packageId]);

    const service = getServiceBySlug(serviceSlug);
    const selectedPackage = filteredPricing.find((item) => item.id === packageId) || filteredPricing[0];
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
            <div className="sidebar__category" style={{ marginTop: 0 }}>
                <div className="sidebar__title">Titik lokasi</div>
                <div className="contact-page-google-map" style={{ marginBottom: 15 }}>
                    <iframe
                        className="contact-page-google-map__one"
                        src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
                        allowFullScreen
                    ></iframe>
                </div>
                <p className="service-details__bottom-text1">
                    Latitude: {location.lat.toFixed(5)} | Longitude: {location.lng.toFixed(5)}
                </p>
                <button className="thm-btn" type="button" onClick={handleGeoLocate}>
                    <span>Gunakan lokasi saya</span>
                    <i className="liquid"></i>
                </button>
                {locationStatus && (
                    <p className="service-details__bottom-text1" style={{ color: "var(--thm-base)", marginTop: 8 }}>
                        {locationStatus}
                    </p>
                )}
            </div>

            <div className="sidebar__category">
                <h4 className="sidebar__title">Order Recap</h4>
                {serviceSlug === "cuci-tas-dompet-koper" && (
                    <div className="comment-form__input-box">
                        <label className="service-details__bottom-subtitle">Jenis Other Treatment</label>
                        <ul className="sidebar__category-list">
                            {OtherTreatmentGroups.map((group) => (
                                <li key={group.id}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="other-group-step1"
                                            value={group.id}
                                            checked={otherGroup === group.id}
                                            onChange={(e) => setOtherGroup(e.target.value)}
                                        />{" "}
                                        {group.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="comment-form__input-box">
                    <label className="service-details__bottom-subtitle">Paket layanan</label>
                    <ul className="sidebar__category-list">
                        {filteredPricing.map((item) => (
                            <li key={item.id}>
                                <label>
                                    <input
                                        type="radio"
                                        name="package-step1"
                                        value={item.id}
                                        checked={packageId === item.id}
                                        onChange={(e) => setPackageId(e.target.value)}
                                    />{" "}
                                    <div className="package-option-body">
                                        <span className="package-option-title">{item.label}</span>
                                        <p className="service-details__bottom-text1" style={{ marginTop: 4 }}>
                                            {item.note}
                                        </p>
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
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
                    <label className="service-details__bottom-subtitle">Jumlah items : {' '}</label>
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
            <div className="row order-addons-grid">
                {ServiceCategoryCards.map((item) => (
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
        <div className="service-details__bottom step-three">
            <div className="summary-banner">
                <div className="summary-banner__left">
                    <p className="eyebrow">Ringkasan & pembayaran</p>
                    <h3 className="summary-title">{service?.heading || "Pilih layanan"}</h3>
                    <div className="total-row">
                        <span>Total pembayaran</span>
                        <div className="total-amount">{formatIDR(subtotal || 0)}</div>
                    </div>
                    <p className="muted">
                        Estimasi harga untuk {quantity} item, gratis antar-jemput 5-7 km & metode pembayaran fleksibel.
                    </p>
                </div>
                <div className="pill-wrap">
                    <span className="pill">
                        <i className="fa fa-gem"></i>
                        {selectedPackage?.label || "Paket belum dipilih"}
                    </span>
                    {serviceSlug === "cuci-tas-dompet-koper" && (
                        <span className="pill">
                            <i className="fa fa-layer-group"></i>
                            {OtherTreatmentGroups.find((g) => g.id === otherGroup)?.label || "Bag & Wallet"}
                        </span>
                    )}
                    <span className="pill">
                        <i className="fa fa-map-marker-alt"></i>
                        {shippingMethod === "jemput" ? "Jemput di rumah" : "Antar ke toko"}
                    </span>
                    <span className="pill">
                        <i className="fa fa-cube"></i>
                        {quantity} item
                    </span>
                </div>
            </div>

            <div className="grid-cards">
                <div className="recap-card">
                    <div className="card-header">
                        <div className="icon-bubble">
                            <span className="fa fa-user"></span>
                        </div>
                        <div>
                            <p className="label">Detail pemesan</p>
                            <h4>{contact.name || "Nama belum diisi"}</h4>
                        </div>
                        <span className="badge-soft">Kontak</span>
                    </div>
                    <ul className="info-list">
                        <li>
                            <span>Email</span>
                            <span className="value">{contact.email || "-"}</span>
                        </li>
                        <li>
                            <span>WhatsApp</span>
                            <span className="value">{contact.phone || "-"}</span>
                        </li>
                        <li>
                            <span>Alamat lengkap</span>
                            <span className="value">{address || "-"}</span>
                        </li>
                    </ul>
                </div>

                <div className="recap-card">
                    <div className="card-header">
                        <div className="icon-bubble">
                            <span className="fa fa-receipt"></span>
                        </div>
                        <div>
                            <p className="label">Detail order</p>
                            <h4>
                                {service?.heading || "Layanan belum dipilih"} • {selectedPackage?.label || "Paket belum dipilih"}
                            </h4>
                        </div>
                        <span className="badge-soft">Ringkasan</span>
                    </div>
                    <ul className="info-list">
                        <li>
                            <span>Paket</span>
                            <span className="value">{selectedPackage?.label || "-"}</span>
                        </li>
                        {serviceSlug === "cuci-tas-dompet-koper" && (
                            <li>
                                <span>Other treatment</span>
                                <span className="value">
                                    {OtherTreatmentGroups.find((g) => g.id === otherGroup)?.label || "-"}
                                </span>
                            </li>
                        )}
                        <li>
                            <span>Jumlah</span>
                            <span className="value">{quantity} item</span>
                        </li>
                        <li>
                            <span>Subtotal</span>
                            <span className="value">{formatIDR(subtotal || 0)}</span>
                        </li>
                        <li>
                            <span>Pengiriman</span>
                            <span className="value">
                                {shippingMethod === "jemput" ? "Jemput di rumah (gratis 5-7 km)" : "Antar ke toko"}
                            </span>
                        </li>
                        <li>
                            <span>Lokasi koordinat</span>
                            <span className="value">
                                {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="note-box">
                <div className="icon-bubble small">
                    <span className="fa fa-sticky-note"></span>
                </div>
                <div>
                    <div className="note-label">Catatan khusus</div>
                    <p className="service-details__bottom-text1" style={{ margin: 0 }}>
                        {notes || "Tidak ada catatan tambahan."}
                    </p>
                </div>
            </div>

            <div className="action-bar">
                <div className="action-hint">
                    Cek lagi detail pesanan sebelum bayar. Anda bisa kembali untuk koreksi pada step sebelumnya.
                </div>
                <div className="d-flex" style={{ gap: 10, justifyContent: "flex-end" }}>
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
        </div>
    );

    return (
        <>
            <SEO pageTitle="Konfirmasi Order" />
            <HeaderOne />
            <Breadcrumb heading="Konfirmasi Order" currentPage="Step Order" />
            <section className="service-details pd-120-0-90">
                <div className="services-one__pattern" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
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
