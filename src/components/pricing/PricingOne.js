import React from 'react';
import Link from 'next/link';
import { PricingOneData } from '@/data/pricing';
import BackgroundOne from '../../../public/assets/images/backgrounds/priceing-plan-v1-bg.png';

const PricingOne = () => {
    return (
        <>
            <section className="pricing-plan-one">
                <div className="container">
                    <div className="section-title__style2">
                        <div className="section-title">
                            <span className="section-title__tagline">Paket Harga</span>
                            <h2 className="section-title__title">Pilih paket sesuai kebutuhan koleksimu</h2>
                        </div>
                        <div className="text-box">
                            <p>Semua harga sudah termasuk dokumentasi dan konsultasi purna layanan. Hubungi kami jika membutuhkan paket khusus.</p>
                        </div>
                    </div>
                    <div className="row">
                        {PricingOneData.map((item, i) => (
                            <div key={i} className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay={item.delay}>
                                <div className="pricing-plan-one__single">
                                    <div className="pricing-plan-one__single-inner">
                                        <div className="layer-outer" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                                        <div className="table-header text-center">
                                            <div className="category-wrapper">
                                                <h3>{item.heading}</h3>
                                            </div>
                                            <h2>{item.price}</h2>
                                            <p>{item.duration}</p>
                                        </div>

                                        <div className="table-content">
                                            <ul>
                                                <li>{item.feature_one}</li>
                                                <li>{item.feature_two}</li>
                                                <li>{item.feature_three}</li>
                                                <li>{item.feature_four}</li>
                                                <li>{item.feature_five}</li>
                                            </ul>
                                        </div>

                                        <div className="table-footer">
                                            <Link href={item.link} className="thm-btn">
                                                <span>{item.link_label}</span>
                                                <div className="liquid"></div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default PricingOne;
