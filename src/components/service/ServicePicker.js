import React from "react";
import Link from "next/link";
import { ServiceCategoryCards } from "@/data/service";
import BackgroundOne from "../../../public/assets/images/pattern/services-v1-pattern.png";

const ServicePicker = () => {
    return (
        <section className="services-one pd-120-0-90">
            <div className="services-one__pattern" style={{ backgroundImage: `url(${BackgroundOne.src})` }}></div>
            <div className="container">
                <div className="section-title text-center">
                    <span className="section-title__tagline">Pilih Layanan</span>
                    <h2 className="section-title__title">Lanjutkan pemesanan sesuai kebutuhanmu</h2>
                </div>
                <div className="row">
                    {ServiceCategoryCards.map((item) => (
                        <div
                            key={item.id}
                            className="col-xl-4 col-lg-4 col-md-6 wow fadeInLeft"
                            data-wow-delay={item.delay}
                            data-wow-duration={item.duration}
                        >
                            <Link href={`/order/${item.slug}`}>
                                <div className="services-one__single services-one__single--actionable">
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
                                        >
                                            <span>Pilih layanan ini</span>
                                            <i className="liquid"></i>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicePicker;
