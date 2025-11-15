import React from 'react';
import Link from 'next/link';

const CommercialCleaning = () => {
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
                                        <li class="service-details__sidebar-list-item"><Link href="/commercial-cleaning" class="active">Reglue Sepatu</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/house-cleaning">Treatment Sepatu & Tas</Link></li>
                                        <li class="service-details__sidebar-list-item"><Link href="/car-cleaning">Antar Jemput & Pickup</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-8 order-1">
                                <div class="service-details__top-img">
                                    <img src="/assets/images/resources/service-details-img1.jpg" alt="Reglue sepatu" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service-details__bottom">
                        <h2 class="service-details__bottom-title">Jasa Reglue Sepatu</h2>
                        <div class="service-details__bottom-text1">
                            <p>Sol sepatu yang mulai renggang dapat diperbaiki dengan teknik reglue menggunakan lem khusus yang kuat namun fleksibel.</p>
                        </div>
                        <div class="service-details__bottom-text2">
                            <p>Kami membersihkan area lem, melakukan roughing, kemudian menempel ulang dengan tekanan presisi.</p>
                        </div>
                        <div class="service-details__bottom-text3">
                            <div class="row">
                                <div class="col-xl-4 col-lg-5">
                                    <div class="img-box">
                                        <img src="/assets/images/resources/service-details-img2.jpg" alt="Reglue" />
                                    </div>
                                </div>
                                <div class="col-xl-8 col-lg-7">
                                    <div class="content-box">
                                        <p>Layanan ini cocok untuk sepatu basket, running, maupun casual yang outsole-nya mulai terbuka.</p>

                                        <ul>
                                            <li><span class="icon-plus"></span> Lem khusus tahan panas dan air.</li>
                                            <li><span class="icon-plus"></span> Garansi 7 hari jika kembali terbuka.</li>
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

export default CommercialCleaning;
