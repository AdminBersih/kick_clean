import React, { useEffect } from 'react';

const ProjectDetails = () => {
    useEffect(() => {

        if ($(".projects-detalis__content-carousel").length) {
            $(".projects-detalis__content-carousel").owlCarousel({
              loop: true,
              margin: 30,
              nav: true,
              smartSpeed: 500,
              autoHeight: false,
              autoplay: true,
              dots: true,
              autoplayTimeout: 10000,
              navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right right"></span>'],
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 1
                },
                800: {
                  items: 1
                },
                1024: {
                  items: 1
                },
                1200: {
                  items: 1
                }
              }
            });
        }
      
    }, []);
    return (
        <>
            <section className="projects-detalis">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="projects-detalis__content">
                                <div className="projects-detalis__content-carousel owl-carousel owl-theme">
                                    <div className="single-img">
                                        <img src="/assets/images/resources/projects-detalis-img1.jpg" alt="" />
                                    </div>

                                    <div className="single-img">
                                        <img src="/assets/images/resources/projects-detalis-img2.jpg" alt="" />
                                    </div>
                                </div>

                                <div className="projects-detalis__content-text1">
                                    <h2>Deskripsi Proyek</h2>
                                    <p>Pelanggan membawa Nike Air Force 1 putih yang terkena hujan deras serta noda kopi. Kami melakukan deep inspection, dokumentasi awal, kemudian menjalankan proses deep clean dan detailing menyeluruh sampai ke sela jahitan.</p>
                                </div>

                                <div className="projects-detalis__content-text2">
                                    <h2>Tantangan</h2>
                                    <p className="text1">Bahan kulit sintetis mudah berubah warna jika terkena panas dan cairan pekat. Selain itu, midsole mulai menguning dan lem outsole melemah karena sering terendam air.</p>
                                    <ul>
                                        <li><span className="icon-maps-and-flags"></span> Menghilangkan noda kopi tanpa merusak lapisan kulit.</li>
                                        <li><span className="icon-maps-and-flags"></span> Membersihkan jamur di bagian dalam setelah kehujanan.</li>
                                        <li><span className="icon-maps-and-flags"></span> Reglue outsole supaya kembali kuat.</li>
                                        <li><span className="icon-maps-and-flags"></span> Mengembalikan midsole agar putih lagi.</li>

                                    </ul>
                                    <p className="text2">Seluruh proses dikerjakan manual oleh dua teknisi agar detail jahitan tetap aman.</p>
                                </div>

                                <div className="projects-detalis__content-text3">
                                    <h2>Solusi Kick Clean</h2>
                                    <p>Kami memadukan sabun racikan sendiri, mesin quick dry, dan finishing coating sehingga sepatu kembali siap dipakai.</p>
                                    <ul>
                                        <li><span className="icon-maps-and-flags"></span> Pre-treatment noda dan deep clean hingga ke sela jahitan.</li>
                                        <li><span className="icon-maps-and-flags"></span> Reglue outsole menggunakan lem premium.</li>
                                        <li><span className="icon-maps-and-flags"></span> Midsole brightening agar warna kembali putih.</li>
                                        <li><span className="icon-maps-and-flags"></span> Penyemprotan deodorizing serta coating waterproof.</li>
                                        <li><span className="icon-maps-and-flags"></span> Quality control ganda sebelum pengantaran.</li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-5">
                            <div className="projects-detalis__sidebar">
                                <div className="projects-detalis__sidebar-single wow animated fadeInUp" data-wow-delay="0.1s">
                                    <div className="title">
                                        <h2>Informasi Proyek</h2>
                                    </div>
                                    <div className="projects-detalis__sidebar-project-info">
                                        <div className="text">
                                            <p>Detail pengerjaan untuk memastikan ekspektasi pelanggan tercapai.</p>
                                        </div>
                                        <ul>
                                            <li><span>Kategori</span>Cuci Sepatu Premium</li>
                                            <li><span>Client</span>Rifqi - Gentan</li>
                                            <li><span>Mulai</span>12.01.2025</li>
                                            <li><span>Selesai</span>15.01.2025</li>
                                            <li><span>Kontak</span>0856-5917-6079</li>
                                            <li><span>Rating</span>
                                                <ul className="item-rating">
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                    <li><i className="fas fa-star"></i></li>
                                                </ul>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                                <div className="projects-detalis__sidebar-single pd-b22 wow animated fadeInUp"
                                    data-wow-delay="0.3s">
                                    <div className="projects-detalis__sidebar-recent-post">
                                        <div className="title">
                                            <h2>Artikel Terbaru</h2>
                                        </div>
                                        <ul className="projects-detalis__sidebar-recent-post-list">
                                            <li>
                                                <div className="post-date"><i className="far fa-clock"></i> 05 Jan 2025 </div>
                                                <h4><a href="#">Cara merawat sneakers setelah kehujanan</a></h4>
                                            </li>
                                            <li>
                                                <div className="post-date"><i className="far fa-clock"></i> 12 Jan 2025</div>
                                                <h4><a href="#">Repaint topi favorit dengan warna baru</a></h4>
                                            </li>
                                            <li>
                                                <div className="post-date"><i className="far fa-clock"></i> 15 Jan 2025 </div>
                                                <h4><a href="#">Reglue sepatu basket biar kembali nyaman</a></h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="projects-detalis__sidebar-discount wow animated fadeInUp" data-wow-delay="0.5s">
                                    <div className="img-box">
                                        <img src="/assets/images/resources/projects-detalis-img3.jpg" alt="" />
                                        <div className="content-box">
                                            <h2>Gratis Antar Jemput</h2>
                                            <h4>Untuk area Gentan & Baki</h4>
                                            <div className="btn-box">
                                                <a href="https://wa.me/6285659176079" className="thm-btn" target="_blank" rel="noreferrer">
                                                    <span>Chat WhatsApp</span>
                                                    <div className="liquid"></div>
                                                </a>
                                            </div>
                                        </div>
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

export default ProjectDetails;
