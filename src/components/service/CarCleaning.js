import React from 'react';
import Link from 'next/link';

const CarCleaning = () => {
    return (
        <>
            <section class="service-details">
                <div class="container">
                    <div class="service-details__top">
                        <div class="row">
                            <div class="col-xl-4 col-lg-8 order-2">
                                <div class="service-details__sidebar">
                                    <h2 class="service-details__sidebar-title">Daftar Layanan</h2>
                                    <ul class="service-details__sidebar-list">
                                        <li class="service-details__sidebar-list-item"><Link href="/bedroom-cleaning">Cuci Sepatu</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/window-cleaning">Cuci Topi & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/office-cleaning">Repaint Sepatu & Topi</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/commercial-cleaning">Reglue Sepatu</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/house-cleaning">Treatment Sepatu & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/car-cleaning" class="active">Antar Jemput & Pickup</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-8 order-1">
                                <div class="service-details__top-img">
                                    <img src="/assets/images/resources/service-details-img1.jpg" alt="Antar jemput" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service-details__bottom">
                        <h2 class="service-details__bottom-title">Antar Jemput & Pickup</h2>
                        <div class="service-details__bottom-text1">
                            <p>Tidak sempat datang ke workshop? Manfaatkan layanan antar jemput gratis khusus area Gentan, Songgolangit, dan Baki.</p>
                        </div>
                        <div class="service-details__bottom-text2">
                            <p>Cukup hubungi WhatsApp, tentukan jadwal, dan kurir kami akan mengambil lalu mengantar kembali setelah selesai.</p>
                        </div>
                        <div class="service-details__bottom-text3">
                            <div class="row">
                                <div class="col-xl-4 col-lg-5">
                                    <div class="img-box">
                                        <img src="/assets/images/resources/service-details-img2.jpg" alt="Pickup Kick Clean" />
                                    </div>
                                </div>
                                <div class="col-xl-8 col-lg-7">
                                    <div class="content-box">
                                        <p>Layanan ini cocok untuk pelanggan sibuk atau yang ingin mengirim banyak pasangan sekaligus.</p>

                                        <ul>
                                            <li><span class="icon-plus"></span> Gratis biaya antar jemput minimal 2 pasang.</li>
                                            <li><span class="icon-plus"></span> Tracking order melalui WhatsApp.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CarCleaning;
