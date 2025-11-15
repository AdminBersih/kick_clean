import React from 'react';
import Link from 'next/link';

const OfficeCleaning = () => {
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
                                        <li class="service-details__sidebar-list-item"><Link href="/office-cleaning" class="active">Repaint Sepatu & Topi</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/commercial-cleaning">Reglue Sepatu</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/house-cleaning">Treatment Sepatu & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/car-cleaning">Antar Jemput & Pickup</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-8 order-1">
                                <div class="service-details__top-img">
                                    <img src="/assets/images/resources/service-details-img1.jpg" alt="Repaint sepatu" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service-details__bottom">
                        <h2 class="service-details__bottom-title">Jasa Repaint Sepatu & Topi</h2>
                        <div class="service-details__bottom-text1">
                            <p>Repaint dilakukan oleh artist internal yang terbiasa mengerjakan custom maupun restorasi warna. Kami menggunakan cat berbahan dasar acrylic premium yang fleksibel dan tahan retak.</p>
                        </div>
                        <div class="service-details__bottom-text2">
                            <p>Proses dimulai dari cleaning, sanding ringan, masking detail, hingga finishing menggunakan clear coat untuk mengunci warna.</p>
                        </div>
                        <div class="service-details__bottom-text3">
                            <div class="row">
                                <div class="col-xl-4 col-lg-5">
                                    <div class="img-box">
                                        <img src="/assets/images/resources/service-details-img2.jpg" alt="Custom repaint" />
                                    </div>
                                </div>
                                <div class="col-xl-8 col-lg-7">
                                    <div class="content-box">
                                        <p>Kami menerima repaint full, accent, maupun touch up kecil. Konsultasikan referensi warna atau motif yang kamu inginkan melalui WhatsApp.</p>

                                        <ul>
                                            <li><span class="icon-plus"></span> Cat khusus sneaker tahan air dan gesekan.</li>
                                            <li><span class="icon-plus"></span> Bisa request warna custom atau palet siap pakai.</li>
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

export default OfficeCleaning;
