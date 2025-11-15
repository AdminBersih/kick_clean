import React from 'react';
import Link from 'next/link';

const GalleryDetails = () => {
    return (
        <>
            <section class="gallery-details">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="gallery-details__wrapper">
                                <div class="gallery-details__img">
                                    <img src="/assets/images/gallery/gallery-details-img.jpg" alt="" />
                                </div>

                                {/* Projects Details Information Start */}
                                <div class="gallery-details__information">
                                    <ul>
                                        <li>
                                            <h5>Tanggal</h5>
                                            <p>15 Januari 2025</p>
                                        </li>

                                        <li>
                                            <h5>Pelanggan</h5>
                                            <p>Rifqi - Gentan</p>
                                        </li>

                                        <li>
                                            <h5>Kontak</h5>
                                            <p><a href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer">@kickclean.gentan</a></p>
                                        </li>

                                        <li>
                                            <h5>Lokasi</h5>
                                            <p>Jl. Raya Songgo Langit No.2, Gentan</p>
                                        </li>

                                        <li>
                                            <h5>Layanan</h5>
                                            <p>Deep Clean + Repaint Premium</p>
                                        </li>
                                    </ul>
                                </div>
                                {/* Projects Details Information End */}

                                <div class="gallery-details__text-box1">
                                    <h2>Cuci Sepatu Premium</h2>
                                    <p class="text1">Sepatu kulit putih pelanggan datang dalam kondisi kusam dan midsole mulai menguning. Kami memulai dengan pre-treatment untuk meluruhkan noda, lalu dilanjutkan proses deep clean menggunakan sabun racikan Kick Clean Gentan yang aman untuk kulit.</p>

                                    <p class="text2">Setelah dibersihkan, sepatu dikeringkan menggunakan mesin quick dry bersuhu rendah agar tekstur kulit tetap lembut. Finishing dilanjutkan dengan deodorizing dan coating agar tidak mudah kotor kembali.</p>
                                </div>


                                <div class="gallery-details__text-box2">
                                    <h2>Repaint & Detail Finishing</h2>
                                    <p class="text1">Setelah proses deep clean, pelanggan meminta sentuhan repaint pada beberapa panel yang memudar.</p>

                                    <div class="gallery-details__text-box2-list">
                                        <ul>
                                            <li>
                                                <div class="icon">
                                                    <i class="icon-maps-and-flags"></i>
                                                </div>
                                                <div class="text">
                                                    <p>Masking area dan matching warna sesuai referensi pelanggan.</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icon">
                                                    <i class="icon-maps-and-flags"></i>
                                                </div>
                                                <div class="text">
                                                    <p>Pengaplikasian cat premium dengan airbrush & kuas detail.</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="icon">
                                                    <i class="icon-maps-and-flags"></i>
                                                </div>
                                                <div class="text">
                                                    <p>Finishing menggunakan top coat tahan gores dan waterproofing.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <p class="text2">Hasil akhir membuat sepatu terlihat fresh kembali dan siap digunakan untuk acara formal pelanggan pada akhir pekan.</p>
                                </div>

                                <div class="gallery-details__pagination clearfix">
                                    <ul>
                                        <li>
                                            <div class="previous">
                                                <p><Link href="/"><span class="fa fa-arrow-left"></span> Sebelumnya</Link></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="next">
                                                <p><Link href="/">Selanjutnya <span class="fa fa-arrow-right"></span></Link>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GalleryDetails;
