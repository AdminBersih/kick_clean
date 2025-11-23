import React from 'react';

const AboutThree = () => {
    return (
        <>
            <section className="about-three">
                <div className="container">
                    <div className="row">
                        {/* Start About Three Img */}
                        <div className="col-xl-6">
                            <div className="about-three__img clearfix">
                                <div className="about-three__img1">
                                    <div className="about-three__img1-inner js-tilt">
                                        <img src="/assets/images/about/about-v3-img1.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End About Three Img */}

                        {/* Start About Three Content */}
                        <div className="col-xl-6">
                            <div className="about-three__content">
                                <div className="section-title">
                                    <span className="section-title__tagline">Kick Clean Gentan</span>
                                    <h2 className="section-title__title">Lebih dari 5 tahun membantu merawat koleksi favorit pelanggan.</h2>
                                </div>

                                <div className="about-three__content-inner">
                                    <div className="text">
                                        <p>Kami memadukan teknik manual, bahan pembersih ramah lingkungan, serta proses QC berlapis agar sepatu dan tas kembali nyaman dipakai.</p>
                                    </div>
                                    <div className="about-three__content-counter">
                                        <div className="row">
                                            {/* Start Counter One Single */}
                                            <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms">
                                                <div className="counter-one__single">
                                                    <div className="counter-one__single-inner">
                                                        <div className="icon-box">
                                                            <span className="icon-certificate-1"></span>
                                                        </div>
                                                        <div className="text-box">
                                                            <h3 className="odometer">500</h3>
                                                            <span className="counter-one__letter">K</span>
                                                            <span className="counter-one__plus">+</span>
                                                            <p className="counter-one__text">Testimoni Positif</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End Counter One Single */}

                                            {/* Start Counter One Single */}
                                            <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="100ms">
                                                <div className="counter-one__single">
                                                    <div className="counter-one__single-inner">
                                                        <div className="icon-box">
                                                            <span className="icon-rating"></span>
                                                        </div>
                                                        <div className="text-box">
                                                            <h3 className="odometer">1002</h3>
                                                            <span className="counter-one__letter">K</span>
                                                            <span className="counter-one__plus">+</span>
                                                            <p className="counter-one__text">Pasang Dirawat</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End Counter One Single */}

                                            {/* Start Counter One Single */}
                                            <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="0ms">
                                                <div className="counter-one__single">
                                                    <div className="counter-one__single-inner">
                                                        <div className="icon-box">
                                                            <span className="icon-certificate"></span>
                                                        </div>
                                                        <div className="text-box">
                                                            <h3 className="odometer">566</h3>
                                                            <span className="counter-one__letter">K</span>
                                                            <span className="counter-one__plus">+</span>
                                                            <p className="counter-one__text">Pelanggan Loyal</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End Counter One Single */}

                                            {/* Start Counter One Single */}
                                            <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="100ms">
                                                <div className="counter-one__single">
                                                    <div className="counter-one__single-inner">
                                                        <div className="icon-box">
                                                            <span className="icon-computer"></span>
                                                        </div>
                                                        <div className="text-box">
                                                            <h3 className="odometer">450</h3>
                                                            <span className="counter-one__letter">K</span>
                                                            <span className="counter-one__plus">+</span>
                                                            <p className="counter-one__text">Pesanan Selesai</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* End Counter One Single */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End About Three Content */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutThree;
