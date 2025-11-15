import React, { useEffect } from 'react';

const WhyChooseUsOne = () => {
    useEffect(() => {

        if ($(".tabs-box").length) {
            $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
              e.preventDefault();
              var target = $($(this).attr("data-tab"));
        
              if ($(target).is(":visible")) {
                return false;
              } else {
                target
                  .parents(".tabs-box")
                  .find(".tab-buttons")
                  .find(".tab-btn")
                  .removeClass("active-btn");
                $(this).addClass("active-btn");
                target
                  .parents(".tabs-box")
                  .find(".tabs-content")
                  .find(".tab")
                  .fadeOut(0);
                target
                  .parents(".tabs-box")
                  .find(".tabs-content")
                  .find(".tab")
                  .removeClass("active-tab");
                $(target).fadeIn(300);
                $(target).addClass("active-tab");
              }
            });
        }

        if ($(".video-popup").length) {
            $(".video-popup").magnificPopup({
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: true,
        
              fixedContentPos: false
            });
        }
            
      }, []);
    return (
        <>
            <section className="tab-one pd-120-0-120 clearfix">
                <div className="container">
                    <div className="section-title text-center">
                        <span className="section-title__tagline">Kenapa Memilih Kick Clean</span>
                        <h2 className="section-title__title">Kami rawat koleksimu dengan standar profesional.</h2>
                    </div>
                    <div className="tab-one__tabs tabs-box">
                        <ul className="tab-buttons clearfix">
                            <li data-tab="#providing" className="tab-btn active-btn"><span>Layanan Lengkap</span></li>
                            <li data-tab="#emergency" className="tab-btn"><span>Express</span></li>
                            <li data-tab="#residential" className="tab-btn"><span>Treatment Premium</span></li>
                            <li data-tab="#furniture" className="tab-btn"><span>Antar Jemput</span></li>
                        </ul>
                        <div className="tabs-content">
                            {/* Start Tab */}
                            <div className="tab active-tab" id="providing">
                                <div className="row clearfix">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__content">
                                            <div className="title">
                                                <h2>Detail perawatan lengkap untuk sepatu, tas, dan topi.</h2>
                                            </div>
                                            <div className="text">
                                                <p>Tim Kick Clean memberikan layanan cuci, repaint, reglue, dan treatment dengan chemical aman dan SOP ketat.</p>
                                            </div>
                                            <ul className="tab-one__content-list">
                                                <li>Layanan lengkap: cuci sepatu, cuci tas & topi, repaint, reglue, hingga treatment.</li>
                                                <li>Update progres via WhatsApp sehingga pelanggan selalu tahu kondisi terbaru.</li>
                                                <li>Garansi retouch 3 hari setelah pengerjaan selesai.</li>
                                                <li>Pengalaman menangani sneakers harian sampai koleksi premium.</li>
                                                <li>Gratis konsultasi perawatan sesuai jenis bahan.</li>
                                                <li>Workshop strategis di Jl. Raya Songgo Langit No.2 Gentan.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__img">
                                            <img src="/assets/images/resources/tab-v1-img.jpg" alt="" />
                                            <div className="icon">
                                                <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" className="video-popup">
                                                    <div className="tab-one__video-icon">
                                                        <span className="icon-play-button"></span>
                                                        <i className="ripple"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Tab */}

                            {/* Start Tab */}
                            <div className="tab" id="emergency">
                                <div className="row clearfix">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__content">
                                            <div className="title">
                                                <h2>Layanan ekspres untuk kebutuhan mendesak.</h2>
                                            </div>
                                            <div className="text">
                                                <p>Butuh sepatu bersih esok hari? Pilih layanan express kami yang dikerjakan maksimal 24 jam dengan tim khusus.</p>
                                            </div>
                                            <ul className="tab-one__content-list">
                                                <li>Slot terbatas setiap hari agar kualitas tetap terjaga.</li>
                                                <li>Prioritas inspeksi dan antrian pengeringan.</li>
                                                <li>Kurir siap antar jemput sesuai jadwal pelanggan.</li>
                                                <li>Update progres real time dengan foto sebelum-sesudah.</li>
                                                <li>Cocok untuk kebutuhan event atau perjalanan mendadak.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__img">
                                            <img src="/assets/images/resources/tab-v1-img.jpg" alt="" />
                                            <div className="icon">
                                                <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" className="video-popup">
                                                    <div className="tab-one__video-icon">
                                                        <span className="icon-play-button"></span>
                                                        <i className="ripple"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Tab */}

                            {/* Start Tab */}
                            <div className="tab" id="residential">
                                <div className="row clearfix">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__content">
                                            <div className="title">
                                                <h2>Treatment premium & proteksi ekstra.</h2>
                                            </div>
                                            <div className="text">
                                                <p>Paket ini cocok untuk koleksi limited edition atau barang favorit yang membutuhkan perhatian khusus.</p>
                                            </div>
                                            <ul className="tab-one__content-list">
                                                <li>Deep clean menyeluruh termasuk insole & lace spa.</li>
                                                <li>Repaint panel tertentu sesuai referensi warna.</li>
                                                <li>Coating waterproof & anti noda.</li>
                                                <li>Quality control ganda sebelum dikemas.</li>
                                                <li>Garansi 7 hari untuk keluhan layanan.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__img">
                                            <img src="/assets/images/resources/tab-v1-img.jpg" alt="" />
                                            <div className="icon">
                                                <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" className="video-popup">
                                                    <div className="tab-one__video-icon">
                                                        <span className="icon-play-button"></span>
                                                        <i className="ripple"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Tab */}

                            {/* Start Tab */}
                            <div className="tab" id="furniture">
                                <div className="row clearfix">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__content">
                                            <div className="title">
                                                <h2>Antar jemput & komunikasi transparan.</h2>
                                            </div>
                                            <div className="text">
                                                <p>Kami memahami kesibukanmu. Karena itu, seluruh proses bisa dilakukan tanpa harus datang ke workshop.</p>
                                            </div>
                                            <ul className="tab-one__content-list">
                                                <li>Kurir internal siap jemput area Gentan, Baki, Sukoharjo, Kartasura.</li>
                                                <li>Form digital memudahkan pencatatan jumlah barang & paket.</li>
                                                <li>Update status pengerjaan melalui WhatsApp & Instagram.</li>
                                                <li>Pengantaran dilakukan setelah pelanggan menyetujui hasil foto QC.</li>
                                                <li>Pembayaran fleksibel: transfer, QRIS, atau tunai saat pengantaran.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <div className="tab-one__img">
                                            <img src="/assets/images/resources/tab-v1-img.jpg" alt="" />
                                            <div className="icon">
                                                <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" className="video-popup">
                                                    <div className="tab-one__video-icon">
                                                        <span className="icon-play-button"></span>
                                                        <i className="ripple"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Tab */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyChooseUsOne;
