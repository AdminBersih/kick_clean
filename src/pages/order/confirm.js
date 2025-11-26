import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../../common/seo/Seo";
import HeaderOne from "../../common/header/HeaderOne";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import FooterOne from "../../common/footer/FooterOne";
import { ServiceCategoryCards, OtherTreatmentGroups, slugToCategory } from "@/data/service";
import { useServicesData } from "@/hooks/useServicesData";
import { useAuth } from "@/common/auth/AuthContext";
import { addToCart, fetchCart, getOrCreateSessionId, updateCartItem } from "@/lib/cartClient";
import {
    createOrder,
    getMidtransStatus,
    getPaymentLink,
    recreatePaymentLink,
} from "@/lib/ordersClient";
import BackgroundOne from '../../../public/assets/images/pattern/services-v1-pattern.png';

const storeLocation = { lat: -7.5803738, lng: 110.78332 };
const gentanCenter = { lat: storeLocation.lat, lng: storeLocation.lng };
const defaultLocation = { lat: gentanCenter.lat, lng: gentanCenter.lng };
const locationSectionId = "location-pin-section";

const formatIDR = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const getServiceBySlug = (slug) => ServiceCategoryCards.find((item) => item.slug === slug);
const normalizeId = (val) => (val === undefined || val === null ? "" : String(val));
const successStatuses = ["settlement", "capture", "success"];
const toRad = (deg) => (deg * Math.PI) / 180;
const haversineDistanceKm = (from, to) => {
    const hasFrom = Number.isFinite(from?.lat) && Number.isFinite(from?.lng);
    const hasTo = Number.isFinite(to?.lat) && Number.isFinite(to?.lng);
    if (!hasFrom || !hasTo) return null;
    const lat1 = toRad(from.lat);
    const lat2 = toRad(to.lat);
    const dLat = lat2 - lat1;
    const dLon = toRad(to.lng) - toRad(from.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const earthRadiusKm = 6371.0088; // mean Earth radius for more accurate km result
    return earthRadiusKm * c;
};

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
    const [locationTouched, setLocationTouched] = useState(false);
    const [stepError, setStepError] = useState("");
    const [shippingEditOpen, setShippingEditOpen] = useState(false);
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
        if (query.packageId) setPackageId(normalizeId(query.packageId));
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

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = localStorage.getItem("kickclean-location");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Number.isFinite(parsed?.lat) && Number.isFinite(parsed?.lng)) {
                    setLocation({ lat: parsed.lat, lng: parsed.lng });
                    setLocationTouched(true);
                    setLocationStatus("Lokasi otomatis diambil dari riwayat pin Anda.");
                }
            }
        } catch (err) {
            // ignore storage errors
        }
    }, []);

    const showLocationStep = shippingMethod === "jemput";

    const isDefaultLocation = useMemo(() => {
        const latDiff = Math.abs(location.lat - defaultLocation.lat);
        const lngDiff = Math.abs(location.lng - defaultLocation.lng);
        return latDiff < 0.00001 && lngDiff < 0.00001;
    }, [location.lat, location.lng]);

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
        if (
            filteredPricing.length &&
            !filteredPricing.find((item) => normalizeId(item.id) === normalizeId(packageId))
        ) {
            setPackageId(normalizeId(filteredPricing[0].id));
        }
    }, [filteredPricing, packageId]);

    useEffect(() => {
        if (!packageId || servicesLoading) return;
        if (filteredPricing.find((item) => normalizeId(item.id) === normalizeId(packageId))) return;
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

    const resetMapContainer = useCallback(() => {
        const el = mapContainerRef.current;
        if (!el) return;
        try {
            const newEl = el.cloneNode(false);
            newEl.id = el.id;
            newEl.className = el.className;
            newEl.style.cssText = el.style.cssText;
            el.replaceWith(newEl);
            mapContainerRef.current = newEl;
        } catch {
            // ignore cleanup errors
        }
    }, []);

    const setupMap = useCallback(async () => {
        if (!mapContainerRef.current) return;
        if (mapRef.current) {
            setTimeout(() => mapRef.current?.invalidateSize(), 150);
            return;
        }
        resetMapContainer();
        const leaflet = await import("leaflet");
        if (!mapContainerRef.current) return;
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
            setLocationTouched(true);
            setLocationStatus("Pin digeser manual untuk akurasi lokasi.");
        });
        map.on("click", (e) => {
            marker.setLatLng(e.latlng);
            setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
            setLocationTouched(true);
            setLocationStatus("Pin di-set melalui klik peta.");
        });

        mapRef.current = map;
        markerRef.current = marker;
        setMapReady(true);
        const resizeTimeout = setTimeout(() => {
            const activeMap = mapRef.current;
            if (
                !activeMap ||
                !mapContainerRef.current?.isConnected ||
                !activeMap._container ||
                !activeMap._container._leaflet_pos
            )
                return;
            try {
                activeMap.invalidateSize();
            } catch {
                // ignore resize errors when container is gone
            }
        }, 200);
        return () => clearTimeout(resizeTimeout);
    }, [location.lat, location.lng]);

    useEffect(() => {
        if (step !== 1 || !showLocationStep) {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
                setMapReady(false);
            }
            return;
        }
        const run = async () => {
            await setupMap();
        };
        run();
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
                resetMapContainer();
            }
        };
    }, [resetMapContainer, setupMap, showLocationStep, step]);

    useEffect(() => {
        if (!mapReady || !mapRef.current || !markerRef.current) return;
        markerRef.current.setLatLng([location.lat, location.lng]);
        mapRef.current.setView([location.lat, location.lng], mapRef.current.getZoom());
        const resizeTimeout = setTimeout(() => {
            const activeMap = mapRef.current;
            if (
                !activeMap ||
                !mapContainerRef.current?.isConnected ||
                !activeMap._container ||
                !activeMap._container._leaflet_pos
            )
                return;
            try {
                activeMap.invalidateSize();
            } catch {
                // ignore resize errors when container is gone
            }
        }, 50);
        return () => clearTimeout(resizeTimeout);
    }, [location, mapReady]);

    const service = getServiceBySlug(serviceSlug);
    const selectedPackage =
        filteredPricing.find((item) => normalizeId(item.id) === normalizeId(packageId)) || filteredPricing[0];
    const selectedOtherGroup = OtherTreatmentGroups.find((g) => g.id === otherGroup);
    const selectedPackagePrice = Number(selectedPackage?.price) || 0;
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
    const distanceFromStoreKm = useMemo(
        () => haversineDistanceKm(storeLocation, location),
        [location.lat, location.lng]
    );
    const isWithinFreeRange = distanceFromStoreKm !== null && distanceFromStoreKm <= 7;
    const shippingOptionLabel = shippingMethod === "jemput" ? "Jemput di rumah" : "Antar ke toko";
    const shippingFee = useMemo(() => {
        if (shippingMethod !== "jemput") return 0;
        if (distanceFromStoreKm === null) return 0;
        return isWithinFreeRange ? 0 : 10000;
    }, [distanceFromStoreKm, isWithinFreeRange, shippingMethod]);
    const orderTotal = cartSubtotal + shippingFee;
    const scrollToLocationSection = () => {
        if (typeof window === "undefined") return;
        const runScroll = () => {
            const el = document.getElementById(locationSectionId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };
        window.requestAnimationFrame?.(runScroll);
        setTimeout(runScroll, 300);
    };
    const alertLocationRequired = () => {
        const message = "Atur pin jemput/antar terlebih dahulu. Koordinat default tidak bisa dipakai.";
        setStepError(message);
        if (typeof window !== "undefined") {
            window.alert(message);
        }
        scrollToLocationSection();
    };

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
                setLocationTouched(true);
                setLocationStatus("Lokasi berhasil diatur dari perangkat.");
            },
            async () => {
                try {
                    const res = await fetch("https://ipapi.co/json/");
                    if (res.ok) {
                        const data = await res.json();
                        if (data.latitude && data.longitude) {
                            setLocation({ lat: data.latitude, lng: data.longitude });
                            setLocationTouched(true);
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

    const [autoLocateTriggered, setAutoLocateTriggered] = useState(false);

    useEffect(() => {
        if (!showLocationStep || step !== 1 || autoLocateTriggered) return;
        setAutoLocateTriggered(true);
        handleGeoLocate();
    }, [autoLocateTriggered, handleGeoLocate, showLocationStep, step]);

    const handleManualLatLngChange = (field, value) => {
        const parsed = parseFloat(value);
        if (Number.isNaN(parsed)) return;
        setLocation((prev) => ({ ...prev, [field]: parsed }));
        setLocationTouched(true);
        setLocationStatus("Koordinat diperbarui secara manual.");
    };

    const handleFocusGentan = () => {
        setLocation({ lat: gentanCenter.lat, lng: gentanCenter.lng });
        setLocationTouched(true);
        setLocationStatus("Pin dipusatkan ke toko Kick Clean Gentan.");
    };

    const handleShippingChange = (method) => {
        setShippingMethod(method);
        setStepError("");
        if (method !== "jemput") {
            setLocationStatus("");
        }
        setShippingEditOpen(false);
    };

    const validateStepOne = () => {
        if (showLocationStep) {
            const hasValidCoords = Number.isFinite(location.lat) && Number.isFinite(location.lng);
            if (!hasValidCoords || !locationTouched || isDefaultLocation) {
                alertLocationRequired();
                return false;
            }
        }
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

    const handleRemoveCartItem = async (serviceId) => {
        if (!serviceId) {
            setCartError("Data layanan tidak valid untuk dihapus.");
            return;
        }
        try {
            setCartLoading(true);
            const sid = sessionId || getOrCreateSessionId();
            const res = await updateCartItem({
                action: "remove",
                serviceId,
                sessionId: sid,
                token: accessToken,
            });
            if (res.sessionId) setSessionId(res.sessionId);
            setCartItems(res.cart?.items || []);
            setCartError("");
        } catch (err) {
            setCartError(err?.message || "Gagal menghapus layanan dari keranjang");
        } finally {
            setCartLoading(false);
        }
    };

    const persistLastOrderShortcut = (orderCodeValue) => {
        if (typeof window === "undefined" || !orderCodeValue) return;
        try {
            localStorage.setItem(
                "kickclean-last-order",
                JSON.stringify({
                    orderCode: orderCodeValue,
                    phone: contact.phone || "",
                    email: contact.email || "",
                    savedAt: Date.now(),
                })
            );
        } catch (err) {
            // ignore storage errors
        }
    };

    const openPaymentAndTrack = (orderCodeValue, paymentUrl) => {
        if (paymentUrl && typeof window !== "undefined") {
            window.open(paymentUrl, "_blank", "noopener,noreferrer");
        }
        const params = new URLSearchParams();
        if (orderCodeValue) params.set("orderCode", orderCodeValue);
        if (contact.phone) {
            params.set("phone", contact.phone);
        } else if (contact.email) {
            params.set("email", contact.email);
        }
        const qs = params.toString();
        router.push(qs ? `/track?${qs}` : "/track");
    };

    const handlePayNow = async () => {
        if (payLoading) return;
        if (!validateStepOne()) {
            setStep(1);
            return;
        }
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
            if (!cartItems.length) {
                await handleAddToCart();
                await loadCartSnapshot();
            }
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
            const orderCode =
                data?.orderCode || data?.order?.orderCode || data?.order_code || data?.order?.code || data?.code;
            let redirectUrl = pickPaymentUrl(data);
            persistLastOrderShortcut(orderCode);

            if (orderCode) {
                try {
                    const statusPayload = await getMidtransStatus({ orderCode, token: accessToken });
                    const trxStatus =
                        statusPayload?.transaction_status || statusPayload?.transactionStatus || statusPayload?.status;
                    if (trxStatus && successStatuses.includes(trxStatus)) {
                        openPaymentAndTrack(orderCode);
                        return;
                    }
                } catch (statusErr) {
                    if (process.env.NODE_ENV !== "production") {
                        console.warn("Midtrans status error", statusErr);
                    }
                }

                if (!redirectUrl) {
                    try {
                        const paymentPayload = await getPaymentLink({ orderCode, token: accessToken });
                        redirectUrl = pickPaymentUrl(paymentPayload) || pickPaymentUrl(paymentPayload?.data || {});
                    } catch (linkErr) {
                        setPaymentError(linkErr?.message || "Gagal mengambil link pembayaran.");
                    }
                }

                if (!redirectUrl) {
                    try {
                        const recreatePayload = await recreatePaymentLink({ orderCode, token: accessToken });
                        redirectUrl = pickPaymentUrl(recreatePayload) || pickPaymentUrl(recreatePayload?.data || {});
                    } catch (recreateErr) {
                        setPaymentError(recreateErr?.message || "Gagal membuat ulang link pembayaran.");
                    }
                }

                if (redirectUrl) {
                    openPaymentAndTrack(orderCode, redirectUrl);
                    return;
                }

                openPaymentAndTrack(orderCode);
                return;
            }

            if (redirectUrl) {
                openPaymentAndTrack(orderCode, redirectUrl);
                return;
            }

            openPaymentAndTrack(orderCode);
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
                                            {s === 1 && (showLocationStep ? "Lokasi & data pemesan" : "Order recap")}
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
            {showLocationStep && (
                <div className="sidebar__category location-card" id={locationSectionId} style={{ marginTop: 0 }}>
                <div className="location-card__header">
                    <div>
                        <p className="eyebrow">Titik lokasi</p>
                        <h3 className="location-card__title">Atur pin jemput / antar</h3>
                        <p className="service-details__bottom-text1" style={{ marginBottom: 10 }}>
                            Ambil lokasi akurat dengan geolokasi browser lalu rapikan pin manual di area Gentan, Sukoharjo.
                            Jarak dihitung langsung dari titik toko Kick Clean Gentan untuk estimasi biaya.
                        </p>
                        
                    </div>
                    <div className="location-card__stats">
                        <div className="stat-card">
                            <span className="label">Status pin</span>
                            <h4>{locationStatus || "Pin siap digerakkan"}</h4>
                            <p className="muted">Geser atau klik di peta untuk akurasi lokasi.</p>
                        </div>
                        <div className="stat-card">
                            <span className="label">Estimasi jemput</span>
                            <h4 style={{ color: isWithinFreeRange ? "#1e9e52" : "#d0352f" }}>
                                {isWithinFreeRange ? "Gratis 5-7 km" : "+Rp10.000"}
                            </h4>
                            <p className="muted">Biaya dihitung dari titik toko Kick Clean Gentan.</p>
                        </div>
                    </div>
                </div>

                <div className="location-card__body">
                    <div className="location-map-shell">
                        <div className="map-loading-wrap" style={{ marginBottom: 12 }}>
                            {!mapReady && (
                                <div className="map-skeleton">
                                    <div className="map-skeleton__shimmer" />
                                    <div className="map-skeleton__text">Menyiapkan peta...</div>
                                </div>
                            )}
                            <div
                                className="contact-page-google-map__one"
                                ref={mapContainerRef}
                                style={{ height: 360, borderRadius: 14, overflow: "hidden" }}
                            ></div>
                        </div>
                    </div>

                    <div className="location-controls">
                        <div className="cta-row">
                            <div className="d-flex" style={{ gap: 10, flexWrap: "wrap" }}>
                                <button className="thm-btn" type="button" onClick={handleGeoLocate}>
                                    <span>Gunakan lokasi saya</span>
                                    <i className="liquid"></i>
                                </button>
                                <button
                                    className="thm-btn ghost"
                                    type="button"
                                    onClick={handleFocusGentan}
                                >
                                    <span>Fokus ke Gentan</span>
                                    <i className="liquid"></i>
                                </button>
                            </div>
                            <p className="muted" style={{ margin: 0 }}>
                                Mulai dari perkiraan lokasi perangkat, lalu rapikan pin ke titik paling presisi.
                            </p>
                        </div>

                        <p className="service-details__bottom-text1" style={{ marginTop: 4, marginBottom: 4 }}>
                            Koordinat: {location.lat.toFixed(5)}, {location.lng.toFixed(5)} - geser atau klik pin di peta untuk titik
                            jemput/antar yang presisi.
                        </p>
                        <p
                            className="service-details__bottom-text1"
                            style={{ marginTop: 0, fontWeight: 600, color: isWithinFreeRange ? "#1e9e52" : "#d0352f" }}
                        >
                            Jarak ke toko: {distanceFromStoreKm !== null ? `${distanceFromStoreKm.toFixed(2)} km` : "Belum ada koordinat valid."}
                            {distanceFromStoreKm !== null && !isWithinFreeRange && " - Biaya jemput +Rp10.000"}
                        </p>
                        {locationStatus && (
                            <p className="service-details__bottom-text1" style={{ color: "var(--thm-base)", marginTop: 0 }}>
                                {locationStatus}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            )}
            <div className="sidebar__category">
                <div className="recap-shell">
                    <div className="recap-shell__heading">
                        <div>
                            <p className="recap-eyebrow">Ringkasan pilihan</p>
                            <h4 className="sidebar__title" style={{ marginBottom: 0 }}>Order Recap</h4>
                        </div>
                        <span className="recap-pill recap-pill--mono">
                            <i className="fa fa-bolt"></i> Pastikan data sudah tepat
                        </span>
                    </div>
                <div className="comment-form__input-box">
                    <div className="recap-tile recap-tile--service">
                        <div className="recap-tile__icon">
                            <span className={service?.icon || "fa fa-concierge-bell"}></span>
                        </div>
                        <div className="recap-tile__body">
                            <div className="recap-tile__title-row">
                                <div>
                                    <p className="recap-eyebrow">Dipilih</p>
                                    <h5 className="recap-title">{service?.heading || serviceSlug}</h5>
                                </div>
                                <span className="recap-pill recap-pill--success">Aktif</span>
                            </div>
                            <p className="recap-desc">
                                {service?.description ||
                                    "Detail layanan pilihanmu tampil lebih jelas agar kamu yakin sebelum lanjut."}
                            </p>
                            <div className="recap-tags">
                                <span className="recap-tag">
                                    <i className="fa fa-layer-group"></i>
                                    {categoryName || "Kategori layanan"}
                                </span>
                                <span className="recap-tag">
                                    <i className="fa fa-map-marker-alt"></i>
                                    {shippingMethod === "jemput" ? "Jemput & antar" : "Drop-off ke toko"}
                                </span>
                                <span className="recap-tag">
                                    <i className="fa fa-cube"></i>
                                    {totalQuantity || quantity} item
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-form__input-box">
                    {servicesLoading && (
                        <p className="service-details__bottom-text1">Memuat paket layanan...</p>
                    )}
                    {servicesError && (
                        <p className="service-details__bottom-text1" style={{ color: "red" }}>
                            {servicesError}
                        </p>
                    )}
                    {!servicesLoading && (!filteredPricing.length || !selectedPackage) ? (
                        <p className="service-details__bottom-text1">Paket layanan belum tersedia.</p>
                    ) : (
                        <div className="recap-tile recap-tile--package">
                            <div className="recap-tile__icon recap-tile__icon--warm">
                                <span className="fa fa-box-open"></span>
                            </div>
                            <div className="recap-tile__body">
                                <div className="recap-tile__title-row">
                                    <div>
                                        <p className="recap-eyebrow">Paket aktif</p>
                                        <h5 className="recap-title">
                                            {selectedPackage?.label || selectedPackage?.name || "-"}
                                        </h5>
                                    </div>
                                    <span className="recap-pill">Sesuai pilihan</span>
                                </div>
                                {selectedPackage?.note && (
                                    <p className="recap-desc" style={{ marginBottom: 10 }}>
                                        {selectedPackage.note}
                                    </p>
                                )}
                                <div className="recap-tags" style={{ marginTop: 10 }}>
                                    <span className="recap-tag recap-tag--strong">
                                        <i className="fa fa-coins"></i>
                                        {formatIDR(selectedPackagePrice)}
                                    </span>
                                    <span className="recap-tag">
                                        <i className="fa fa-cube"></i>
                                        {totalQuantity || quantity} item
                                    </span>
                                    {serviceSlug === "cuci-tas-dompet-koper" && (
                                        <span className="recap-tag">
                                            <i className="fa fa-layer-group"></i>
                                            {selectedOtherGroup?.label || "-"}
                                        </span>
                                    )}
                                </div>
                                <p className="recap-hint">Ubah paket dari halaman pemilihan layanan bila diperlukan.</p>
                            </div>
                        </div>
                    )}
                </div>
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
                    <div className="recap-tile recap-tile--package" style={{ alignItems: "flex-start" }}>
                        <div className="recap-tile__icon recap-tile__icon--warm">
                            <span className="fa fa-truck"></span>
                        </div>
                        <div className="recap-tile__body">
                            <div className="recap-tile__title-row">
                                <div>
                                    <p className="recap-eyebrow">Atur pengiriman di halaman ini</p>
                                    <h5 className="recap-title" style={{ marginBottom: 6 }}>{shippingOptionLabel}</h5>
                                </div>
                                <button
                                    type="button"
                                    className="shipping-edit-btn"
                                    onClick={() => setShippingEditOpen((prev) => !prev)}
                                >
                                    <i className="fa fa-edit" aria-hidden="true"></i>
                                    <span>{shippingEditOpen ? "Tutup edit" : "Edit pengiriman"}</span>
                                </button>
                            </div>
                            <p className="recap-desc" style={{ marginBottom: 8 }}>
                                {shippingMethod === "jemput"
                                    ? "Gratis 5-7 km, di atas itu biaya jemput +Rp10.000."
                                    : "Drop-off langsung ke toko tanpa ongkir."}
                            </p>
                            <div className="recap-tags" style={{ marginTop: 10 }}>
                                <span className="recap-tag recap-tag--strong">
                                    <i className="fa fa-coins"></i>
                                    {shippingFee === 0 ? "Gratis" : formatIDR(shippingFee)}
                                </span>
                            </div>
                            <div className="recap-tags" style={{ marginTop: 8, gap: 8, display: "flex", flexWrap: "wrap" }}>
                                {shippingEditOpen && (
                                    <div className="shipping-select-wrap">
                                        <label className="shipping-select-label">Pilih metode</label>
                                        <select
                                            className="shipping-select"
                                            value={shippingMethod}
                                            onChange={(e) => handleShippingChange(e.target.value)}
                                        >
                                            <option value="toko">Datang ke toko (gratis)</option>
                                            <option value="jemput">Jemput di rumah (gratis 5-7 km)</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
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
                            if (typeof window !== "undefined" && showLocationStep && locationTouched) {
                                localStorage.setItem(
                                    "kickclean-location",
                                    JSON.stringify({ lat: location.lat, lng: location.lng })
                                );
                            }
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
                                        router.push(`/order/${item.slug}`);
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
                        <div className="total-amount">{formatIDR(orderTotal || 0)}</div>
                    </div>
                    <p className="muted">
                        Estimasi untuk {totalQuantity || quantity} item,{" "}
                        {shippingMethod === "jemput"
                            ? "gratis jemput 5-7 km, di atas itu ada biaya jemput +Rp10.000."
                            : "drop-off langsung ke toko tanpa ongkir."}{" "}
                        Metode pembayaran fleksibel.
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
                                <li key={item.service_id || item.name} className="cart-line">
                                    <div className="cart-line__info">
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
                                    </div>
                                    {cartItems.length > 0 && (
                                        <button
                                            type="button"
                                            className="remove-cart-btn"
                                            onClick={() =>
                                                handleRemoveCartItem(
                                                    item.service_id || item.id || item._id || item.serviceId
                                                )
                                            }
                                            disabled={cartLoading}
                                            title="Hapus layanan"
                                            aria-label="Hapus layanan dari keranjang"
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    )}
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
                                    {selectedOtherGroup?.label || "-"}
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
                                {shippingOptionLabel}
                                <span className="muted" style={{ marginLeft: 6 }}>
                                    {shippingMethod === "jemput"
                                        ? shippingFee === 0
                                            ? "(Gratis <=7 km)"
                                            : `(Ongkir ${formatIDR(shippingFee)})`
                                        : "(Tanpa ongkir)"}
                                </span>
                            </span>
                        </li>
                        {shippingMethod === "jemput" && (
                            <>
                                <li>
                                    <span>Ongkir jemput</span>
                                    <span className="value" style={{ color: shippingFee ? "#d0352f" : "#1e9e52" }}>
                                        {shippingFee === 0 ? "Gratis (<=7 km)" : formatIDR(shippingFee)}
                                    </span>
                                </li>
                                <li>
                                    <span>Jarak dari toko</span>
                                    <span className="value" style={{ color: isWithinFreeRange ? "#1e9e52" : "#d0352f" }}>
                                        {distanceFromStoreKm !== null ? `${distanceFromStoreKm.toFixed(2)} km` : "Belum dihitung"}
                                        {distanceFromStoreKm !== null && !isWithinFreeRange && " (biaya jemput +Rp10.000)"}
                                    </span>
                                </li>
                                <li>
                                    <span>Lokasi koordinat</span>
                                    <span className="value">
                                        {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                                    </span>
                                </li>
                            </>
                        )}
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
            <style jsx>{`
                .location-card {
                    background: linear-gradient(135deg, #f8fbff, #eef2ff);
                    border: 1px solid #e5e7eb;
                    border-radius: 18px;
                    padding: 18px;
                    box-shadow: 0 22px 70px rgba(15, 23, 42, 0.1);
                }
                .location-card__header {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    gap: 16px;
                    align-items: flex-start;
                }
                .location-card__title {
                    margin: 4px 0 6px;
                    font-size: 24px;
                    color: #0f172a;
                }
                .chip-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 8px;
                }
                .chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.85);
                    border: 1px solid #e2e8f0;
                    font-weight: 600;
                    color: #0f172a;
                    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
                }
                .chip i {
                    color: var(--thm-base);
                }
                .chip.soft {
                    background: rgba(255, 255, 255, 0.95);
                }
                .chip-success {
                    background: #ecfdf3;
                    color: #166534;
                    border-color: #bbf7d0;
                }
                .chip-danger {
                    background: #fef2f2;
                    color: #b91c1c;
                    border-color: #fecdd3;
                }
                .location-card__stats {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .stat-card {
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 12px 14px;
                    min-width: 210px;
                    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
                }
                .stat-card .label {
                    font-size: 12px;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    color: #64748b;
                    margin-bottom: 2px;
                    display: block;
                }
                .stat-card h4 {
                    margin: 6px 0 4px;
                    font-size: 20px;
                }
                .stat-card .muted {
                    margin: 0;
                    color: #475569;
                }
                .location-card__body {
                    display: grid;
                    grid-template-columns: minmax(320px, 1.1fr) minmax(280px, 0.9fr);
                    gap: 16px;
                    margin-top: 16px;
                }
                .location-map-shell {
                    position: relative;
                    background: radial-gradient(circle at 20% 20%, #102a43, #0b1829);
                    border-radius: 16px;
                    padding: 12px;
                    border: 1px solid #d7def0;
                    box-shadow: 0 26px 90px rgba(15, 23, 42, 0.22);
                }
                .contact-page-google-map__one {
                    border-radius: 12px;
                    border: 1px solid #d7def0;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
                }
                .floating-meta {
                    position: absolute;
                    left: 16px;
                    bottom: 16px;
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                .pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.9);
                    color: #0f172a;
                    font-weight: 600;
                    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
                }
                .muted-pill {
                    background: rgba(255, 255, 255, 0.8);
                    border: 1px dashed #cbd5e1;
                }
                .location-controls {
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 14px;
                    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .cta-row {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .coord-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 10px;
                }
                .location-card .thm-btn {
                    box-shadow: 0 12px 30px rgba(17, 24, 39, 0.16);
                }
                .location-card .thm-btn.ghost {
                    background: #f7f9ff;
                    color: #0f172a;
                    border: 1px solid #d7def0;
                    box-shadow: none;
                }
                .location-card .comment-form__textarea {
                    background: #f8fbff;
                    border-color: #d7def0;
                }
                .location-card .comment-form__textarea:focus {
                    border-color: var(--thm-base);
                }
                .map-skeleton {
                    border-radius: 14px;
                    overflow: hidden;
                    background: linear-gradient(90deg, #e5e7eb, #f3f4f6, #e5e7eb);
                    min-height: 120px;
                    position: relative;
                }
                .map-skeleton__text {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #475569;
                    font-weight: 600;
                }
                .map-skeleton__shimmer {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
                    animation: shimmer 1.6s infinite;
                }
                .cart-line {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }
                .cart-line__info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .remove-cart-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    background: linear-gradient(135deg, #ffffff, #f8fafc);
                    color: #0f172a;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(0, 74, 148, 0.12);
                    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
                }
                .remove-cart-btn:hover {
                    background: linear-gradient(135deg, #fff1f2, #ffe4e6);
                    border-color: #fecdd3;
                    color: #b91c1c;
                    transform: translateY(-1px);
                    box-shadow: 0 14px 36px rgba(185, 28, 28, 0.2);
                }
                .remove-cart-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
                }
                .remove-cart-btn:focus-visible {
                    outline: 2px solid #fb7185;
                    outline-offset: 2px;
                }
                .remove-cart-btn i {
                    pointer-events: none;
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                @media (max-width: 991px) {
                    .location-card__body {
                        grid-template-columns: 1fr;
                    }
                    .location-card__stats {
                        width: 100%;
                    }
                }
                @media (max-width: 575px) {
                    .location-card__title {
                        font-size: 20px;
                    }
                    .chip {
                        font-size: 13px;
                        padding: 6px 10px;
                    }
                    .pill {
                        font-size: 13px;
                        padding: 6px 10px;
                    }
                }
            `}</style>
        </>
    );
}
