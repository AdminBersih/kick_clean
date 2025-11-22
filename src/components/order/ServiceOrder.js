import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ServiceOneData, ServicePricingOptions, OtherTreatmentGroups } from "@/data/service";

const formatIDR = (value) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const getServiceBySlug = (slug) => ServiceOneData.find((item) => item.slug === slug);

const ServiceOrder = ({ serviceSlug }) => {
    const router = useRouter();
    const service = useMemo(() => getServiceBySlug(serviceSlug), [serviceSlug]);
    const pricing = ServicePricingOptions[serviceSlug] || [];
    const [otherGroup, setOtherGroup] = useState("bag-wallet");
    const [selectedPriceId, setSelectedPriceId] = useState(pricing[0]?.id || "");
    const [address, setAddress] = useState("");
    const [shippingMethod, setShippingMethod] = useState("toko");
    const [notes, setNotes] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [contactLoaded, setContactLoaded] = useState(false);

    const filteredPricing =
        serviceSlug === "cuci-tas-dompet-koper"
            ? pricing.filter((item) =>
                  (OtherTreatmentGroups.find((g) => g.id === otherGroup) || OtherTreatmentGroups[0])?.names.includes(item.name)
              )
            : pricing;
    const selectedPackage = filteredPricing.find((item) => item.id === selectedPriceId) || filteredPricing[0];
    const shippingCost = 0;
    const subtotal = selectedPackage ? (Number(quantity) || 1) * selectedPackage.price : 0;
    const total = subtotal + shippingCost;
    const pickupNote =
        shippingMethod === "jemput"
            ? "Gratis jemput antar untuk jarak 5-7 km. Di atas itu akan dikonfirmasi admin."
            : "Datang langsung ke toko tanpa biaya tambahan.";

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = localStorage.getItem("kickclean-contact");
            if (!stored) {
                router.replace("/service-pick");
                return;
            }
            const parsed = JSON.parse(stored);
            if (!parsed.name || !parsed.phone) {
                router.replace("/service-pick");
                return;
            }
            if (!address && parsed.address) {
                setAddress(parsed.address);
            }
            setContactLoaded(true);
        } catch (err) {
            router.replace("/service-pick");
        }
    }, [address, router]);

    useEffect(() => {
        if (serviceSlug !== "cuci-tas-dompet-koper") return;
        const group = OtherTreatmentGroups.find((g) => g.id === otherGroup) || OtherTreatmentGroups[0];
        const first = filteredPricing.find((item) => group.names.includes(item.name));
        if (first) setSelectedPriceId(first.id);
    }, [otherGroup, serviceSlug, filteredPricing]);

    useEffect(() => {
        if (!filteredPricing.length) return;
        if (!filteredPricing.find((item) => item.id === selectedPriceId)) {
            setSelectedPriceId(filteredPricing[0].id);
        }
    }, [filteredPricing, selectedPriceId]);

    if (!contactLoaded) {
        return null;
    }

    if (!service) {
        return (
            <div className="container pd-120-0-90">
                <div className="section-title text-center">
                    <span className="section-title__tagline">Layanan tidak ditemukan</span>
                    <h2 className="section-title__title">Silakan kembali ke daftar layanan</h2>
                </div>
                <div className="text-center">
                    <Link href="/service-pick" className="thm-btn">
                        <span>Pilih Layanan</span>
                        <i className="liquid"></i>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="service-details pd-120-0-90">
            <div className="container">
                <div className="section-title">
                    <span className="section-title__tagline">Order Layanan</span>
                    <h2 className="section-title__title">Pilih paket &amp; detail pengiriman</h2>
                </div>

                <div className="row gutter-y-30">
                    <div className="col-xl-7 col-lg-7">
                        <div className="service-details__bottom">
                            <div className="service-details__bottom-text1">
                                <p className="service-details__bottom-subtitle">Layanan dipilih</p>
                                <h3 className="service-details__bottom-title">{service.heading}</h3>
                                <p>{service.description}</p>
                                <Link href="/service-pick" className="thm-btn">
                                    <span>Ubah layanan</span>
                                    <i className="liquid"></i>
                                </Link>
                            </div>

                            <div className="sidebar__category">
                                <h4 className="sidebar__title">Pilih paket &amp; harga</h4>
                                {serviceSlug === "cuci-tas-dompet-koper" && (
                                    <div className="comment-form__input-box">
                                        <p className="service-details__bottom-subtitle">Pilih jenis Other Treatment</p>
                                        <ul className="sidebar__category-list">
                                            {OtherTreatmentGroups.map((group) => (
                                                <li key={group.id}>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="other-group"
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
                                <p className="service-details__bottom-subtitle">Pricelist {service.heading}</p>
                                <ul className="sidebar__category-list">
                                    {filteredPricing.map((option) => (
                                        <li key={option.id}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="pricing"
                                                    value={option.id}
                                                    checked={selectedPriceId === option.id}
                                                    onChange={(e) => setSelectedPriceId(e.target.value)}
                                                />{" "}
                                                {option.label}
                                            </label>
                                            {selectedPriceId === option.id && option.note && (
                                                <p className="service-details__bottom-text1">{option.note}</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="sidebar__category">
                                <h4 className="sidebar__title">Detail pengiriman</h4>
                                <div className="comment-form__input-box">
                                    <label className="service-details__bottom-subtitle" htmlFor="address">
                                        Alamat lengkap
                                    </label>
                                    <textarea
                                        id="address"
                                        className="comment-form__textarea"
                                        placeholder="Contoh: Jl. Raya Songgolangit No. 12, Gentan, Sukoharjo"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="comment-form__input-box">
                                    <p className="service-details__bottom-subtitle">Metode pengiriman</p>
                                    <ul className="sidebar__category-list">
                                        <li>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="shipping"
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
                                                    name="shipping"
                                                    value="jemput"
                                                    checked={shippingMethod === "jemput"}
                                                    onChange={(e) => setShippingMethod(e.target.value)}
                                                />{" "}
                                                Jemput di rumah
                                            </label>
                                        </li>
                                    </ul>
                                    <p className="service-details__bottom-text1">{pickupNote}</p>
                                </div>

                                <div className="comment-form__input-box">
                                    <label className="service-details__bottom-subtitle">Catatan tambahan (opsional)</label>
                                    <textarea
                                        className="comment-form__textarea"
                                        placeholder="Tulis permintaan khusus, kondisi barang, atau jadwal penjemputan."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-5 col-lg-5">
                        <div className="sidebar__category">
                            <h4 className="sidebar__title">Ringkasan Order</h4>
                            <ul className="service-details__sidebar-list">
                                <li className="service-details__sidebar-list-item">
                                    <div>
                                        <p className="service-details__bottom-subtitle">Items</p>
                                        <p className="service-details__bottom-text1">
                                            {service.heading} - {selectedPackage?.label}
                                        </p>
                                    </div>
                                    <span className="service-details__sidebar-title">{formatIDR(subtotal || 0)}</span>
                                </li>
                                <li className="service-details__sidebar-list-item">
                                    <div>
                                        <p className="service-details__bottom-subtitle">Jumlah Items</p>
                                        <div className="comment-form__input-box">
                                            <input
                                                type="number"
                                                min="1"
                                                className="comment-form__textarea"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li className="service-details__sidebar-list-item">
                                    <div className="service-details__sidebar-1">
                                        <p className="service-details__bottom-subtitle">Metode Pengiriman : </p>
                                        <p className="service-details__bottom-text1-p">
                                            {shippingMethod === "jemput" ? "Jemput di rumah" : "Datang ke toko"}
                                        </p>
                                    </div>
                                    <span className="service-details__sidebar-title">
                                        {shippingCost === 0 ? "Gratis" : formatIDR(shippingCost)}
                                    </span>
                                </li>
                                <li className="service-details__sidebar-list-item">
                                    <div>
                                        <p className="service-details__bottom-subtitle">Total</p>
                                    </div>
                                    <span className="service-details__sidebar-title">{formatIDR(total || 0)}</span>
                                </li>
                            </ul>

                            <button
                                type="button"
                                className="thm-btn"
                                onClick={() =>
                                    router.push({
                                        pathname: "/order/confirm",
                                        query: {
                                            service: serviceSlug,
                                            packageId: selectedPriceId,
                                            shipping: shippingMethod,
                                            address,
                                            notes,
                                            qty: quantity,
                                            otherGroup: serviceSlug === "cuci-tas-dompet-koper" ? otherGroup : undefined,
                                        },
                                    })
                                }
                            >
                                <span>Lanjutkan Pembayaran</span>
                                <i className="liquid"></i>
                            </button>

                            <p className="service-details__bottom-text1">
                                Harga dapat berubah sesuai kondisi barang saat diterima tim Kick Clean. Kami akan
                                mengonfirmasi detail via WhatsApp sebelum memulai pengerjaan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceOrder;
