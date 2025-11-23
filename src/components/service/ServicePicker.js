import React, { useMemo } from "react";
import Link from "next/link";
import { ServiceCategoryCards, categoryToSlug } from "@/data/service";
import { useServicesData } from "@/hooks/useServicesData";
import BackgroundOne from "../../../public/assets/images/pattern/services-v1-pattern.png";

const ServicePicker = () => {
    const { services, loading, error } = useServicesData();

    const categoriesFromApi = useMemo(() => {
        const unique = new Set((services || []).map((svc) => svc.category).filter(Boolean));
        return Array.from(unique);
    }, [services]);

    const categoryCards = useMemo(() => {
        if (!categoriesFromApi.length) return ServiceCategoryCards;
        return ServiceCategoryCards.filter((card) => categoriesFromApi.some((cat) => categoryToSlug[cat] === card.slug));
    }, [categoriesFromApi]);

    return (
        <section className="services-one pd-120-0-90">
            <div className="services-one__pattern" style={{ backgroundImage: `url(${BackgroundOne.src})` }}></div>
            <div className="container">
                <div className="section-title text-center">
                    <span className="section-title__tagline">Pilih Layanan</span>
                    <h2 className="section-title__title">Lanjutkan pemesanan sesuai kebutuhanmu</h2>
                    {loading && <p className="service-details__bottom-text1">Mengambil data layanan...</p>}
                    {error && <p className="service-details__bottom-text1" style={{ color: "red" }}>{error}</p>}
                </div>
                <div className="row">
                    {categoryCards.map((item) => (
                        <div
                            key={item.id}
                            className="col-xl-4 col-lg-4 col-md-6 wow fadeInLeft"
                            data-wow-delay={item.delay}
                            data-wow-duration={item.duration}
                        >
                            <Link
                                href={{
                                    pathname: `/order/${item.slug}`,
                                    query: buildFirstPackageQuery(item.slug, services),
                                }}
                                className="services-one__single services-one__single--actionable"
                            >
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
                                    <span className="thm-btn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginRight: "auto", marginLeft: "auto"  }}>
                                        <span>Pilih layanan ini</span>
                                        <i className="liquid"></i>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const buildFirstPackageQuery = (slug, services) => {
    const categoryName = Object.entries(categoryToSlug).find(([, s]) => s === slug)?.[0];
    if (!categoryName) return undefined;
    const firstService = (services || []).find((svc) => svc.category === categoryName && svc._id);
    return firstService ? { packageId: firstService._id } : undefined;
};

export default ServicePicker;
