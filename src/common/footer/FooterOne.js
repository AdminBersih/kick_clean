import React from 'react';
import Link from 'next/link';

const FooterOne = () => {
    return (
        <>

            <footer className="footer-one">
                <div className="footer-one__bg" style={{backgroundImage: `url(/assets/images/backgrounds/footer-v1-bg.jpg)`}}></div>
                <div className="footer-one__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="footer-one__top-wrapper">
                                    <div className="row">
                                        {/* Start Footer Widget Column */}
                                        <div className="col-xl-4 col-lg-4 col-md-6 wow animated fadeInUp" data-wow-delay="0.1s">
                                            <div className="footer-widget__column footer-widget__about">
                                                <div className="footer-widget__about-logo">
                                                    <Link href="/"><img src="/assets/images/resources/logo-1.png" alt="" /></Link>
                                                </div>
                                                <p className="footer-widget__about-text">Kick Clean Gentan adalah spesialis cuci sepatu, tas, dan topi dengan layanan repaint, reglue, hingga treatment premium untuk area Gentan, Baki, dan Sukoharjo.</p>

                                                <div className="social-link">
                                                    <ul>
                                                        <li><a href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><span className="icon-instagram"></span></a></li>
                                                        <li><a href="https://wa.me/6285659176079" target="_blank" rel="noreferrer"><span className="icon-chat"></span></a></li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                        {/* End Footer Widget Column */}

                                        {/* Start Footer Widget Column */}
                                        <div className="col-xl-2 col-lg-2 col-md-6 wow animated fadeInUp" data-wow-delay="0.3s">
                                            <div className="footer-widget__column footer-widget__links mar-l">
                                                <h2 className="footer-widget__title">Tautan Penting</h2>
                                                <ul className="footer-widget__links-list">
                                                    <li className="footer-widget__links-list-item"><Link href="/about">Tentang Kami</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/service-one">Jasa Kick Clean</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/testimonial">Testimoni</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/team">Tim</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/contact">Kontak</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Footer Widget Column */}

                                        {/* Start Footer Widget Column */}
                                        <div className="col-xl-3 col-lg-3 col-md-6 wow animated fadeInUp" data-wow-delay="0.5s">
                                            <div className="footer-widget__column footer-widget__links mrt-60">
                                                <h2 className="footer-widget__title">Layanan Populer</h2>
                                                <ul className="footer-widget__links-list">
                                                    <li className="footer-widget__links-list-item"><Link href="/cuci-sepatu">Cuci Sepatu (Shoes Treatment)</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/special-treatment">Special Treatment Sepatu</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/cuci-tas-dompet-koper">Cuci Tas, Dompet &amp; Koper</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/baby-gear-cleaning">Baby Gear Cleaning</Link></li>
                                                    <li className="footer-widget__links-list-item"><Link href="/helm-cap-cleaning">Cuci Helm &amp; Cap</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Footer Widget Column */}

                                        {/* Start Footer Widget Column */}
                                        <div className="col-xl-3 col-lg-3 col-md-6 wow animated fadeInUp" data-wow-delay="0.7s">
                                            <div className="footer-widget__column footer-widget__gallery mrt-60">
                                                <h2 className="footer-widget__title">Galeri Pengerjaan</h2>
                                                <ul>
                                                    <li className="footer-widget__gallery-single">
                                                        <div className="img-box">
                                                            <img src="/assets/images/footer/footer-v1-img1.png" alt="" />
                                                            <div className="overlay-icon">
                                                                <Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><span className="icon-link"></span></Link>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className="footer-widget__gallery-single">
                                                        <div className="img-box">
                                                            <img src="/assets/images/footer/footer-v1-img2.png" alt="" />
                                                            <div className="overlay-icon">
                                                                <Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><span className="icon-link"></span></Link>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className="footer-widget__gallery-single">
                                                        <div className="img-box">
                                                            <img src="/assets/images/footer/footer-v1-img3.png" alt="" />
                                                            <div className="overlay-icon">
                                                                <Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><span className="icon-link"></span></Link>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className="footer-widget__gallery-single">
                                                        <div className="img-box">
                                                            <img src="/assets/images/footer/footer-v1-img4.png" alt="" />
                                                            <div className="overlay-icon">
                                                                <Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><span className="icon-link"></span></Link>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className="footer-widget__gallery-single">
                                                        <div className="img-box">
                                                            <img src="/assets/images/footer/footer-v1-img5.png" alt="" />
                                                            <div className="overlay-icon">
                                                                <Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><span className="icon-link"></span></Link>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li className="footer-widget__gallery-single">
                                                        <div className="img-box">
                                                            <img src="/assets/images/footer/footer-v1-img6.png" alt="" />
                                                            <div className="overlay-icon">
                                                                <Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><span className="icon-link"></span></Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Footer Widget Column */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Start Footer One Bottom */}
                <div className="footer-one__bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="footer-one__bottom-inner">
                                    <div className="footer-one__bottom-text">
                                        <p>Copyright © 2025 <Link href="/">Kick Clean Gentan</Link>. All Rights Reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Footer One Bottom */}
            </footer>
            
        </>
    )
}

export default FooterOne;
