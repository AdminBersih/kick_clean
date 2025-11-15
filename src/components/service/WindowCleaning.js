import React from 'react';
import Link from 'next/link';

const WindowCleaning = () => {
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
                                        <li class="service-details__sidebar-list-item"><Link href="/window-cleaning" class="active">Cuci Topi & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/office-cleaning">Repaint Sepatu & Topi</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/commercial-cleaning">Reglue Sepatu</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/house-cleaning">Treatment Sepatu & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/car-cleaning">Antar Jemput & Pickup</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-8 order-1">
                                <div class="service-details__top-img">
                                    <img src="/assets/images/resources/service-details-img1.jpg" alt="Cuci topi dan tas" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service-details__bottom">
                        <h2 class="service-details__bottom-title">Jasa Cuci Topi & Tas</h2>
                        <div class="service-details__bottom-text1">
                            <p>Topi dan tas memiliki karakter bahan yang berbeda sehingga butuh perlakuan khusus. Kami memakai teknik spot cleaning untuk kulit dan suede, serta handwash lembut untuk canvas atau nylon.</p>
                        </div>
                        <div class="service-details__bottom-text2">
                            <p>Setiap detail seperti logo bordir, strap kulit, hingga aksesoris metal dijaga agar tidak lecet. Kami juga menambahkan reshaping supaya bentuk kembali ideal setelah kering.</p>
                        </div>
                        <div class="service-details__bottom-text3">
                            <div class="row">
                                <div class="col-xl-4 col-lg-5">
                                    <div class="img-box">
                                        <img src="/assets/images/resources/service-details-img2.jpg" alt="Perawatan tas" />
                                    </div>
                                </div>
                                <div class="col-xl-8 col-lg-7">
                                    <div class="content-box">
                                        <p>Untuk tas dengan lining dalam, kami juga melakukan vacuum ringan untuk mengangkat debu. Finishing berupa deodorizing agar terhindar dari bau lembap.</p>

                                        <ul>
                                            <li><span class="icon-plus"></span> Chemical food grade aman untuk semua warna.</li>
                                            <li><span class="icon-plus"></span> Packing rapi dengan dust bag sebelum dikembalikan.</li>
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

export default WindowCleaning;
