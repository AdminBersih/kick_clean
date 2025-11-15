import Link from 'next/link';
import React from 'react';
import { FeaturesOneData } from '@/data/features';
import BackgroundOne from '../../../public/assets/images/features/features-v1-img1.jpg';

const FeaturesOne = () => {
    return (
        <>
            <section className="features-one">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title__style2">
                                <div className="section-title">
                                    <span className="section-title__tagline">Keunggulan Kami</span>
                                    <h2 className="section-title__title">Fitur layanan Kick Clean Gentan untuk koleksimu.</h2>
                                </div>
                                <div className="text-box">
                                    <p>Mulai dari sabun racikan sendiri, QC berlapis, hingga layanan antar jemput membuat proses perawatan sepatu dan tas jadi lebih mudah.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {FeaturesOneData.map((item, i) => (
                            <div key={i} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp animated animated" data-wow-delay={item.delay} data-wow-duration={item.duration}>
                                <div className="features-one__single">
                                    <div className="layer-outer" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                                    <div className="features-one__single-inner">
                                        <div className="icon-box">
                                            <span className={item.icon}></span>
                                        </div>
                                        <div className="content-box">
                                            <h2><Link href={item.link}>{item.heading}</Link></h2>
                                            <p>{item.description}</p>
                                            <div className="btn-box">
                                                <Link href={item.link}>Pelajari <span className="icon-plus"></span></Link>
                                            </div>
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

export default FeaturesOne;

