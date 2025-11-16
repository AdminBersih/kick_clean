import React from 'react';
import Link from 'next/link';

const AboutOne = () => {
    return (
        <>
            <section className="about-one pd-120-0-120">
                <div className="about-one__img2 wow slideInRight" data-wow-delay="500ms">
                    <img className="float-bob-x" src="/assets/images/about/about-v1-img2.png" alt="Kick Clean Gentan" />
                </div>
                <div className="container">
                    <div className="row">
                        {/* Start About One Img */}
                        <div className="col-xl-6">
                            <div className="about-one__img clearfix">
                                <div className="about-one__img-inner">
                                    <img src="/assets/images/about/about-v1-img1.jpeg" alt="Kick Clean Gentan" />
                                </div>
                                <div className="experince-box">
                                    <h2>Your Kicks, Our Care.</h2>
                                </div>
                            </div>
                        </div>
                        {/* End About One Img */}

                        {/* Start About One Content */}
                        <div className="col-xl-6">
                            <div className="about-one__content">
                                <div className="section-title">
                                    <span className="section-title__tagline">Tentang Kick Clean Gentan</span>
                                    <h2 className="section-title__title">Workshop cuci sepatu & tas terpercaya di Baki - Sukoharjo</h2>
                                </div>
                                <div className="about-one__content-inner">
                                    <p className="about-one__content-text1">Kick Clean Gentan adalah mitra perawatan sepatu, tas, dan topi bagi komunitas sneaker di Gentan, Songgolangit, hingga wilayah Sukoharjo.</p>
                                    <p className="about-one__content-text2">Kami menggunakan chemical premium yang aman untuk bahan knit, suede, kulit, maupun canvas, serta memberikan update progres langsung lewat WhatsApp agar kamu merasa tenang.</p>
                                    <div className="about-one__content-list">
                                        <ul>
                                            <li>
                                                <p>Pick up & delivery gratis area Gentan, Songgolangit, dan Baki.</p>
                                            </li>
                                            <li>
                                                <p>Garansi retouch 3 hari jika hasil belum sesuai ekspektasi.</p>
                                            </li>
                                            <li>
                                                <p>Tim spesialis untuk cuci, repaint, reglue, hingga treatment.</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="about-one__content-btn">
                                        <Link href="/about" className="thm-btn">
                                            <span>Pelajari Kami</span>
                                            <div className="liquid"></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End About One Content */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutOne;
