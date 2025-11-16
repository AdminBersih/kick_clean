import React from "react";
import Link from "next/link";
import { serviceSidebarLinks } from "@/data/service";

const ServiceDetailLayout = ({
    children,
    activeSlug,
    heroImage = "/assets/images/resources/service-details-img1.jpg",
    heroAlt = "Layanan Kick Clean",
}) => {
    return (
        <section className="service-details">
            <div className="container">
                <div className="service-details__top">
                    <div className="row">
                        <div className="col-xl-4 col-lg-8 order-2">
                            <div className="service-details__sidebar">
                                <h2 className="service-details__sidebar-title">Daftar Layanan</h2>
                                <ul className="service-details__sidebar-list">
                                    {serviceSidebarLinks.map((item) => (
                                        <li key={item.href} className="service-details__sidebar-list-item">
                                            <Link
                                                href={item.href}
                                                className={activeSlug === item.href ? "active" : undefined}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-8 order-1">
                            <div className="service-details__top-img">
                                <img src={heroImage} alt={heroAlt} />
                            </div>
                        </div>
                    </div>
                </div>

                {children}
            </div>
        </section>
    );
};

export default ServiceDetailLayout;
