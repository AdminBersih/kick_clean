import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../../common/seo/Seo";
import HeaderOne from "../../common/header/HeaderOne";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import FooterOne from "../../common/footer/FooterOne";
import { ServiceCategoryCards, OtherTreatmentGroups, slugToCategory } from "@/data/service";
import { useServicesData } from "@/hooks/useServicesData";
import { useAuth } from "@/common/auth/AuthContext";
import { addToCart, fetchCart, getOrCreateSessionId } from "@/lib/cartClient";
import { createOrder } from "@/lib/ordersClient";
import BackgroundOne from '../../../public/assets/images/pattern/services-v1-pattern.png';

const gentanCenter = { lat: -7.606649, lng: 110.81686 };
const defaultLocation = { lat: gentanCenter.lat, lng: gentanCenter.lng };

const formatIDR = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const getServiceBySlug = (slug) => ServiceCategoryCards.find((item) => item.slug === slug);

export default function OrderConfirmPage() {
    const router = useRouter();
    const { query } = router;
    const { accessToken } = useAuth();
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
    const [mapReady, setMapReady] = useState(false);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const { services, pricingOptions, loading: servicesLoading, error: servicesError, ensureServiceById } = useServicesData();
    const [cartItems, setCartItems] = useState([]);
    const [cartError, setCartError] = useState("");
    const [cartLoading, setCartLoading] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [payLoading, setPayLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");

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
        if (typeof window === "undefined") return;
        const sid = getOrCreateSessionId();
        if (sid) setSessionId(sid);
    }, []);

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

    const categoryName = slugToCategory[serviceSlug];
    const pricingFromCategory = useMemo(
        () =>
            (services || [])
                .filter((svc) => svc.category === categoryName)
                .map((svc) => ({
                    id: svc._id || svc.name,
                    name: svc.name,
                    label: `${svc.name} - ${formatIDR(svc.price)}`,
                    price: Number(svc.price) || 0,
                    note: [svc.duration, svc.description].filter(Boolean).join(" - "),
                })),
        [categoryName, services]
    );

    const pricing = useMemo(() => {
        if (pricingFromCategory.length) return pricingFromCategory;
        return pricingOptions[serviceSlug] || [];
    }, [pricingFromCategory, pricingOptions, serviceSlug]);
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

    useEffect(() => {
        if (!packageId || servicesLoading) return;
        if (filteredPricing.find((item) => item.id === packageId)) return;
        ensureServiceById(packageId);
    }, [packageId, filteredPricing, ensureServiceById, servicesLoading]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (document.getElementById("leaflet-style")) return;
        const link = document.createElement("link");
        link.id = "leaflet-style";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (step !== 1) {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
                setMapReady(false);
            }
            return;
        }
        if (!mapContainerRef.current || mapRef.current) return;
        const initMap = async () => {
            const leaflet = await import("leaflet");
            if (!isMounted || !mapContainerRef.current) return;
            const L = leaflet.default;

            const markerIcon = L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconAnchor: [12, 41],
            });

            const map = L.map(mapContainerRef.current).setView([location.lat, location.lng], 16);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "(c) OpenStreetMap",
                maxZoom: 19,
            }).addTo(map);

            const marker = L.marker([location.lat, location.lng], { draggable: true, icon: markerIcon }).addTo(map);
            marker.on("dragend", (e) => {
                const latlng = e.target.getLatLng();
                setLocation({ lat: latlng.lat, lng: latlng.lng });
                setLocationStatus("Pin digeser manual untuk akurasi lokasi.");
            });
            map.on("click", (e) => {
                marker.setLatLng(e.latlng);
                setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
                setLocationStatus("Pin di-set melalui klik peta.");
            });

            mapRef.current = map;
            markerRef.current = marker;
            setMapReady(true);
        };
        initMap();
        return () => {
            isMounted = false;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
            }
        };
    }, [location.lat, location.lng, step]);

    useEffect(() => {
        if (!mapReady || !mapRef.current || !markerRef.current) return;
        markerRef.current.setLatLng([location.lat, location.lng]);
        mapRef.current.setView([location.lat, location.lng], mapRef.current.getZoom());
    }, [location, mapReady]);

    const service = getServiceBySlug(serviceSlug);
    const selectedPackage = filteredPricing.find((item) => item.id === packageId) || filteredPricing[0];
    const summaryItems = cartItems.length
        ? cartItems
        : selectedPackage
        ? [
              {
                  service_id: selectedPackage.id,
                  name: selectedPackage.label || selectedPackage.name,
                  price: selectedPackage.price,
                  quantity: Number(quantity) || 1,
              },
          ]
        : [];
    const totalQuantity = summaryItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
    const cartSubtotal = summaryItems.reduce(
        (acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.price) || 0),
        0
    );
    const summaryTitle =
        summaryItems.length > 0
            ? summaryItems
                  .map((item) => item.name)
                  .filter(Boolean)
                  .join(" • ")
            : service?.heading || "Pilih layanan";

    const handleGeoLocate = async () => {
        if (typeof window === "undefined" || !navigator.geolocation) {
            setLocationStatus("Perangkat tidak mendukung geolokasi.");
            return;
        }

        if (!window.isSecureContext) {
            setLocationStatus("Izin lokasi diblokir karena koneksi belum HTTPS. Gunakan pin manual atau fokus ke Gentan.");
            return;
        }

        setLocationStatus("Mengambil lokasi akurat dari browser...");
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setLocationStatus("Lokasi berhasil diatur dari perangkat.");
            },
            async () => {
                try {
                    const res = await fetch("https://ipapi.co/json/");
                    if (res.ok) {
                        const data = await res.json();
                        if (data.latitude && data.longitude) {
                            setLocation({ lat: data.latitude, lng: data.longitude });
                            setLocationStatus("Lokasi diperkirakan dari jaringan. Geser pin untuk presisi.");
                            return;
                        }
                    }
                    setLocationStatus("Tidak dapat mengambil lokasi. Pastikan izin lokasi aktif atau isi manual.");
                } catch (err) {
                    setLocationStatus("Tidak dapat mengambil lokasi. Pastikan izin lokasi aktif atau isi manual.");
                }
            },
            { enableHighAccuracy: true, timeout: 7000 }
        );
    };

    const handleManualLatLngChange = (field, value) => {
        const parsed = parseFloat(value);
        if (Number.isNaN(parsed)) return;
        setLocation((prev) => ({ ...prev, [field]: parsed }));
        setLocationStatus("Koordinat diperbarui secara manual.");
    };

    const handleFocusGentan = () => {
        setLocation({ lat: gentanCenter.lat, lng: gentanCenter.lng });
        setLocationStatus("Pin dipusatkan ke area Gentan, Kabupaten Sukoharjo.");
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
        if (!selectedPackage) {
            setStepError("Pilih paket layanan terlebih dahulu.");
            return false;
        }
        setStepError("");
        return true;
    };

    const handleAddToCart = async () => {
        if (!selectedPackage?.id) {
            throw new Error("ID layanan tidak tersedia, coba pilih ulang.");
        }
        const sid = sessionId || getOrCreateSessionId();
        const res = await addToCart({
            serviceId: selectedPackage.id,
            quantity,
            sessionId: sid,
            token: accessToken,
        });
        if (res.sessionId) setSessionId(res.sessionId);
        const items = res.cart?.items || [];
        setCartItems(items);
        return items;
    };

    const loadCartSnapshot = useCallback(async () => {
        try {
            setCartLoading(true);
            const res = await fetchCart({ sessionId, token: accessToken });
            if (res.sessionId) setSessionId(res.sessionId);
            setCartItems(res.cart?.items || []);
            setCartError("");
        } catch (err) {
            setCartError(err?.message || "Gagal memuat keranjang");
        } finally {
            setCartLoading(false);
        }
    }, [accessToken, sessionId]);

    const handlePayNow = async () => {
        if (payLoading) return;
        setPaymentError("");
        const sid = sessionId || getOrCreateSessionId();
        if (!sid && !accessToken) {
            setPaymentError("Session tidak ditemukan, muat ulang halaman lalu coba lagi.");
            return;
        }
        if (!summaryItems.length) {
            setPaymentError("Keranjang masih kosong, kembali ke step sebelumnya.");
            return;
        }
        try {
            setPayLoading(true);
            if (sid) setSessionId(sid);
            const { data } = await createOrder({
                sessionId: sid,
                customerName: contact.name,
                phone: contact.phone,
                email: contact.email,
                address,
                pickupMethod: shippingMethod === "jemput" ? "pickup" : "dropoff",
                notes,
                token: accessToken,
            });
            const redirectUrl =
                data?.paymentUrl ||
                data?.redirectUrl ||
                data?.midtransRedirectUrl ||
                data?.snapRedirectUrl ||
                data?.payment_redirect_url ||
                data?.redirect_url ||
                data?.payment?.redirect_url;
            if (redirectUrl) {
                window.location.href = redirectUrl;
                return;
            }
            if (data?.orderCode) {
                router.push(`/track?orderCode=${data.orderCode}`);
                return;
            }
            router.push("/track");
        } catch (err) {
            setPaymentError(err?.message || "Gagal membuat order, coba lagi.");
        } finally {
            setPayLoading(false);
        }
    };

    useEffect(() => {
        if (step !== 3) return;
        loadCartSnapshot();
    }, [loadCartSnapshot, step]);

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
                <p className="service-details__bottom-text1" style={{ marginBottom: 10 }}>
                    Ambil lokasi akurat dengan geolokasi browser lalu rapikan pin manual di area Gentan, Sukoharjo.
                </p>
                <div className="map-loading-wrap" style={{ marginBottom: 15 }}>
                    {!mapReady && (
                        <div className="map-skeleton">
                            <div className="map-skeleton__shimmer" />
                            <div className="map-skeleton__text">Menyiapkan peta...</div>
                        </div>
                    )}
                    <div
                        className="contact-page-google-map__one"
                        ref={mapContainerRef}
                        style={{ height: 360, borderRadius: 12, overflow: "hidden" }}
                    ></div>
                </div>
                <div className="d-flex" style={{ gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                    <button className="thm-btn" type="button" onClick={handleGeoLocate}>
                        <span>Gunakan lokasi saya</span>
                        <i className="liquid"></i>
                    </button>
                    <button className="thm-btn" type="button" onClick={handleFocusGentan} style={{ background: "#eef5ff" }}>
                        <span>Fokus ke Gentan</span>
                        <i className="liquid"></i>
                    </button>
                </div>
                <div className="row gutter-y-10">
                    <div className="col-md-6">
                        <label className="service-details__bottom-subtitle">Latitude</label>
                        <input
                            type="number"
                            step="0.00001"
                            className="comment-form__textarea"
                            value={location.lat}
                            onChange={(e) => handleManualLatLngChange("lat", e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="service-details__bottom-subtitle">Longitude</label>
                        <input
                            type="number"
                            step="0.00001"
                            className="comment-form__textarea"
                            value={location.lng}
                            onChange={(e) => handleManualLatLngChange("lng", e.target.value)}
                        />
                    </div>
                </div>
                <p className="service-details__bottom-text1" style={{ marginTop: 8 }}>
                    Koordinat: {location.lat.toFixed(5)}, {location.lng.toFixed(5)} - geser atau klik pin di peta untuk titik
                    jemput/antar yang presisi.
                </p>
                {locationStatus && (
                    <p className="service-details__bottom-text1" style={{ color: "var(--thm-base)", marginTop: 4 }}>
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
                    {servicesLoading && (
                        <p className="service-details__bottom-text1">Memuat paket layanan...</p>
                    )}
                    {servicesError && (
                        <p className="service-details__bottom-text1" style={{ color: "red" }}>
                            {servicesError}
                        </p>
                    )}
                    {!servicesLoading && !filteredPricing.length ? (
                        <p className="service-details__bottom-text1">Paket layanan belum tersedia.</p>
                    ) : (
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
                    )}
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
                    onClick={async () => {
                        if (!validateStepOne()) return;
                        try {
                            setSubmitLoading(true);
                            await handleAddToCart();
                            await loadCartSnapshot();
                            setStep(2);
                        } catch (err) {
                            setStepError(err?.message || "Gagal menambah ke keranjang");
                        } finally {
                            setSubmitLoading(false);
                        }
                    }}
                    disabled={submitLoading}
                >
                    <span>{submitLoading ? "Memproses..." : "Lanjutkan"}</span>
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
                                        const newPricing = pricingOptions[item.slug] || [];
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
                <button
                    className="thm-btn"
                    type="button"
                    onClick={async () => {
                        if (!cartItems.length) await loadCartSnapshot();
                        setStep(3);
                    }}
                >
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
                    <h3 className="summary-title">{summaryTitle}</h3>
                    <div className="total-row">
                        <span>Total pembayaran</span>
                        <div className="total-amount">{formatIDR(cartSubtotal || 0)}</div>
                    </div>
                    <p className="muted">
                        Estimasi harga untuk {totalQuantity || quantity} item, gratis antar-jemput 5-7 km & metode
                        pembayaran fleksibel.
                    </p>
                </div>
                <div className="pill-wrap">
                    {/* <span className="pill">
                        <i className="fa fa-gem"></i>
                        {selectedPackage?.label || "Paket belum dipilih"}
                    </span> */}
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
                        {totalQuantity || quantity} item
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
                            {/* <p className="label"></p> */}
                            <h4>
                                Detail order
                            </h4>
                        </div>
                        <span className="badge-soft">Ringkasan</span>
                    </div>
                    <ul className="info-list">
                        {cartLoading && (
                            <li>
                                <span>Keranjang</span>
                                <span className="value">Memuat...</span>
                            </li>
                        )}
                        {cartError && (
                            <li>
                                <span>Keranjang</span>
                                <span className="value" style={{ color: "red" }}>{cartError}</span>
                            </li>
                        )}
                        {summaryItems.map((item) => {
                            const qty = Number(item.quantity) || 0;
                            const unit = Number(item.price) || 0;
                            const lineTotal = qty * unit;
                            return (
                                <li key={item.service_id || item.name}>
                                    <span>
                                        {item.name || "Layanan"}{" "}
                                        <span className="value" style={{ fontWeight: 400 }}>
                                            ({qty}x)
                                        </span>
                                    </span>
                                    <span className="value">
                                        {formatIDR(unit)}{" "}
                                        <span className="muted" style={{ marginLeft: 6 }}>
                                            {formatIDR(lineTotal)}
                                        </span>
                                    </span>
                                </li>
                            );
                        })}
                        {!summaryItems.length && (
                            <li>
                                <span>Keranjang</span>
                                <span className="value">Belum ada item.</span>
                            </li>
                        )}
                        {selectedPackage && (
                            <li>
                                <span>Paket utama</span>
                                <span className="value">
                                    {selectedPackage?.label || selectedPackage?.name || "-"}
                                </span>
                            </li>
                        )}
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
                            <span className="value">{totalQuantity || quantity} item</span>
                        </li>
                        <li>
                            <span>Subtotal</span>
                            <span className="value">{formatIDR(cartSubtotal || 0)}</span>
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
                {paymentError && (
                    <p className="service-details__bottom-text1" style={{ color: "red", margin: "6px 0" }}>
                        {paymentError}
                    </p>
                )}
                <div className="d-flex" style={{ gap: 10, justifyContent: "flex-end" }}>
                    <button className="thm-btn" type="button" onClick={() => setStep(2)}>
                        <span>Kembali</span>
                        <i className="liquid"></i>
                    </button>
                    <button className="thm-btn" type="button" onClick={handlePayNow} disabled={payLoading}>
                        <span>{payLoading ? "Memproses..." : "Bayar Sekarang"}</span>
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

