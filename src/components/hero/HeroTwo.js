import React, { useEffect } from "react";
import Link from "next/link";
import BackgroundOne from '../../../public/assets/images/backgrounds/main-slider-v2-bg.png';
import BackgroundTwo from '../../../public/assets/images/backgrounds/main-slider-v2-bg.png';
import BackgroundThree from '../../../public/assets/images/backgrounds/main-slider-v2-bg.png';

const HeroTwo = () => {

    useEffect(() => {

        if ($('.main-slider-two__carousel').length) {
            $('.main-slider-two__carousel').owlCarousel({
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
            <section className="main-slider-one main-slider-one--two">
                <div className="shape1 zoominout-2"><img src="/assets/images/shapes/main-slider-v2-shape1.png" alt="" /></div>
                <div className="main-slider-two__carousel owl-carousel owl-theme">
                    {/* Start Main Slider Two Single */}
                    <div className="main-slider-one__single">
                        <div className="main-slider-one--two-img">
                            <img src="/assets/images/resources/main-slider-v2-img1.png" alt="" />
                        </div>
                        <div className="image-layer" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                        <div className="container">
                            <div className="main-slider-one__content">
                                <div className="tagline">
                                    <p>Kick Clean Gentan</p>
                                </div>
                                <div className="title">
                                    <h2>Sneakers bersih total, siap tampil pede.</h2>
                                </div>
                                <div className="text">
                                    <p>Deep clean, deodorizing, dan quick dry menjaga bahan tetap aman tanpa mengubah bentuk asli.</p>
                                </div>
                                <div className="btn-box">
                                    <Link href="/service-one" className="thm-btn">
                                        <span>Lihat Paket</span>
                                        <div className="liquid"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Main Slider Two Single */}

                    {/* Start Main Slider Two Single */}
                    <div className="main-slider-one__single">
                        <div className="main-slider-one--two-img">
                            <img src="/assets/images/resources/main-slider-v2-img2.png" alt="" />
                        </div>
                        <div className="image-layer" style={{backgroundImage: `url(${BackgroundTwo.src})`}}></div>
                        <div className="container">
                            <div className="main-slider-one__content">
                                <div className="tagline">
                                    <p>Layanan repaint & reglue</p>
                                </div>
                                <div className="title">
                                    <h2>Restore warna dan lem sepatu favoritmu.</h2>
                                </div>
                                <div className="text">
                                    <p>Kombinasi cat premium dan lem berkualitas membuat sepatu tampil baru kembali.</p>
                                </div>
                                <div className="btn-box">
                                    <Link href="/commercial-cleaning" className="thm-btn">
                                        <span>Konsultasi Gratis</span>
                                        <div className="liquid"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Main Slider Two Single */}

                    {/* Start Main Slider Two Single */}
                    <div className="main-slider-one__single">
                        <div className="main-slider-one--two-img">
                            <img src="/assets/images/resources/main-slider-v2-img3.png" alt="" />
                        </div>
                        <div className="image-layer" style={{backgroundImage: `url(${BackgroundThree.src})`}}></div>
                        <div className="container">
                            <div className="main-slider-one__content">
                                <div className="tagline">
                                    <p>Antar jemput Gentan & sekitarnya</p>
                                </div>
                                <div className="title">
                                    <h2>Tinggal atur jadwal, kurir kami siap jemput.</h2>
                                </div>
                                <div className="text">
                                    <p>Semua pesanan dipantau melalui WhatsApp sehingga kamu tahu progres pengerjaan setiap harinya.</p>
                                </div>
                                <div className="btn-box">
                                    <Link href="https://wa.me/6285659176079" className="thm-btn" target="_blank">
                                        <span>Chat Kurir</span>
                                        <div className="liquid"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Main Slider Two Single */}
                </div>
            </section>
        </>
    )
}

export default HeroTwo;
