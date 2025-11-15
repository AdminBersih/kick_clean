import React from 'react';
import Link from 'next/link';

const BedroomCleaning = () => {
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
                                        <li class="service-details__sidebar-list-item"><Link href="/bedroom-cleaning" class="active">Cuci Sepatu</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/window-cleaning">Cuci Topi & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/office-cleaning">Repaint Sepatu & Topi</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/commercial-cleaning">Reglue Sepatu</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/house-cleaning">Treatment Sepatu & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/car-cleaning">Antar Jemput & Pickup</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-8 order-1">
                                <div class="service-details__top-img">
                                    <img src="/assets/images/resources/service-details-img1.jpg" alt="Jasa cuci sepatu" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service-details__bottom">
                        <h2 class="service-details__bottom-title">Jasa Cuci Sepatu</h2>
                        <div class="service-details__bottom-text1">
                            <p>Layanan cuci sepatu Kick Clean Gentan mencakup quick clean hingga deep clean lengkap. Upper, midsole, outsole, insole, dan tali akan dibersihkan menggunakan chemical premium yang aman untuk bahan canvas, knit, leather, maupun suede.</p>
                        </div>
                        <div class="service-details__bottom-text2">
                            <p>Setiap order kami dokumentasikan sebelum dan sesudah pengerjaan. Pelanggan juga menerima update progres via WhatsApp sehingga bisa memantau kapan sepatu siap diambil atau dikirim kembali.</p>
                        </div>
                        <div class="service-details__bottom-text3">
                            <div class="row">
                                <div class="col-xl-4 col-lg-5">
                                    <div class="img-box">
                                        <img src="/assets/images/resources/service-details-img2.jpg" alt="Deep clean Kick Clean" />
                                    </div>
                                </div>
                                <div class="col-xl-8 col-lg-7">
                                    <div class="content-box">
                                        <p>Kami mengeringkan sepatu secara alami sehingga bentuk tetap terjaga. Finish berupa deodorizing serta pengaplikasian shoe tree ringan untuk mempertahankan struktur.</p>

                                        <ul>
                                            <li><span class="icon-plus"></span> Gratis pick up & delivery area Gentan dan Baki.</li>
                                            <li><span class="icon-plus"></span> Garansi retouch 3 hari setelah pengerjaan.</li>
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

export default BedroomCleaning;
