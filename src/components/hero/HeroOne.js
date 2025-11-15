import React, { useEffect } from "react";
import Link from "next/link";
import BackgroundOne from '../../../public/assets/images/backgrounds/main-slider-v1-img1.jpg';
import BackgroundTwo from '../../../public/assets/images/backgrounds/main-slider-v1-img2.jpg';
import BackgroundThree from '../../../public/assets/images/backgrounds/main-slider-v1-img3.jpg';

const HeroOne = () => {

    useEffect(() => {

        if ($('.main-slider-one__carousel').length) {
            $('.main-slider-one__carousel').owlCarousel({
              animateOut: 'fadeOut',
              animateIn: 'fadeIn',
              loop: true,
              margin: 0,
              dots: false,
              nav: true,
              singleItem: true,
              smartSpeed: 500,
              autoplay: true,
              autoplayTimeout: 9000,
              navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right right"></span>'],
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 1
                },
                1024: {
                  items: 1
                }
              }
            });
        }
            
    }, []);

    return (
        <>
            <section className="main-slider-one">
                <div className="main-slider-one__carousel owl-carousel owl-theme">
                    {/* Start Main Slider One Single */}
                    <div className="main-slider-one__single">
                        <div className="top-shape"></div>
                        <div className="bottom-shape"></div>
                        <div className="image-layer" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                        <div className="container">
                            <div className="main-slider-one__content">
                                <div className="tagline">
                                    <p>Selamat datang di Kick Clean Gentan.</p>
                                </div>
                                <div className="title">
                                    <h2>Cuci, repaint, dan treatment sepatu & tas profesional.</h2>
                                </div>
                                <div className="text">
                                    <p>Kami rawat sneakers, tas, hingga topi favoritmu dengan standar workshop terbaik di Gentan, Sukoharjo.</p>
                                </div>
                                <div className="btn-box">
                                    <Link href="https://wa.me/6285659176079" className="thm-btn" target="_blank">
                                        <span>Chat WhatsApp</span>
                                        <div className="liquid"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Main Slider One Single */}

                    {/* Start Main Slider One Single */}
                    <div className="main-slider-one__single">
                        <div className="top-shape"></div>
                        <div className="bottom-shape"></div>
                        <div className="image-layer" style={{backgroundImage: `url(${BackgroundTwo.src})`}}>
                        </div>
                        <div className="container">
                            <div className="main-slider-one__content">
                                <div className="tagline">
                                    <p>Layanan antar jemput area Gentan.</p>
                                </div>
                                <div className="title">
                                    <h2>Siap jemput sepatu & tasmu tanpa ribet.</h2>
                                </div>
                                <div className="text">
                                    <p>Booking jadwal penjemputan langsung lewat WhatsApp, kami update progressnya sampai selesai.</p>
                                </div>
                                <div className="btn-box">
                                    <Link href="https://wa.me/6285659176079" className="thm-btn" target="_blank">
                                        <span>Booking Antar Jemput</span>
                                        <div className="liquid"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Main Slider One Single */}

                    {/* Start Main Slider One Single */}
                    <div className="main-slider-one__single">
                        <div className="top-shape"></div>
                        <div className="bottom-shape"></div>
                        <div className="image-layer" style={{backgroundImage: `url(${BackgroundThree.src})`}}>
                        </div>
                        <div className="container">
                            <div className="main-slider-one__content">
                                <div className="tagline">
                                    <p>Workshop sepatu terbaik di Gentan.</p>
                                </div>
                                <div className="title">
                                    <h2>Detailing menyeluruh untuk setiap pasangan.</h2>
                                </div>
                                <div className="text">
                                    <p>Dari quick clean, deep clean, repaint, hingga reglue kami kerjakan dengan standar profesional.</p>
                                </div>
                                <div className="btn-box">
                                    <Link href="/contact" className="thm-btn">
                                        <span>Lihat Layanan</span>
                                        <div className="liquid"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Main Slider One Single */}
                </div>
            </section>
        </>
    )
}

export default HeroOne;
