import React from "react";
import ServiceDetailLayout from "./ServiceDetailLayout";
import ServiceAccordion from "./ServiceAccordion";

const BabyGearCleaning = () => {
    return (
        <ServiceDetailLayout
            activeSlug="/baby-gear-cleaning"
            heroAlt="Baby gear cleaning Kick Clean Gentan"
        >
            <div className="service-details__bottom">
                <h2 className="service-details__bottom-title">
                    Baby Gear Cleaning – Stroller, Bouncer &amp; Car Seat Lebih Bersih &amp; Higienis
                </h2>

                <div className="service-details__bottom-text1">
                    <p>
                        Perlengkapan bayi seperti stroller, bouncer, dan car seat sering terkena tumpahan
                        susu, makanan, keringat, hingga debu jalanan. Kalau dibiarkan, noda dan kuman bisa
                        menumpuk dan membuat anak tidak nyaman. Karena itu, Kick Clean Gentan menghadirkan
                        layanan <strong> Baby Gear Cleaning</strong> yang fokus pada kebersihan dan kenyamanan
                        si kecil.
                    </p>
                </div>

                <div className="service-details__bottom-text2">
                    <p>
                        Kami menggunakan chemical yang lembut dan disesuaikan, serta teknik pembersihan yang
                        mengutamakan keamanan bahan. Bagian yang sering luput seperti sela-sela jahitan, area
                        duduk, sabuk pengaman, hingga rangka akan dibersihkan sesuai kebutuhannya. Estimasi
                        pengerjaan berkisar 4–6 hari untuk memastikan hasil maksimal dan kering sempurna.
                    </p>
                </div>

                <div className="service-details__bottom-text3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="img-box">
                                <img
                                    src="/assets/images/resources/service-details-img1.png"
                                    alt="Baby gear cleaning Kick Clean Gentan"
                                />
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="content-box">
                                <p>
                                    Setelah selesai, perlengkapan bayi akan dikeringkan dengan baik, dicek
                                    kembali untuk memastikan tidak lembap, dan dikemas rapi sebelum
                                    dikembalikan. Dengan begitu, kamu bisa lebih tenang saat si kecil
                                    menggunakan stroller, bouncer, atau car seat favoritnya.
                                </p>

                                <ul>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Fokus pada kebersihan dan kenyamanan anak.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Cocok untuk perlengkapan bayi yang sering dipakai keluar rumah.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Bisa digabung dengan layanan antar jemput untuk memudahkan orang tua.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="service-details__bottom-text4">
                <h3 className="service-details__bottom-subtitle">Pilihan Layanan Baby Gear</h3>

                <ServiceAccordion
                    items={[
                        {
                            title: "Stroller – Rp100.000 (4–6 hari pengerjaan)",
                            content: (
                                <p>
                                    Pembersihan menyeluruh bagian dudukan, sandaran, sabuk pengaman, dan rangka
                                    luar. Direkomendasikan untuk stroller yang sering dipakai jalan-jalan di luar
                                    rumah.
                                </p>
                            ),
                        },
                        {
                            title: "Bouncer – Rp80.000 (4–6 hari pengerjaan)",
                            content: (
                                <p>
                                    Membersihkan area duduk dan kain penopang, mengangkat noda makanan dan susu
                                    yang sering menempel, serta mengurangi bau tidak sedap.
                                </p>
                            ),
                        },
                        {
                            title: "Car Seat – Rp70.000 (4–6 hari pengerjaan)",
                            content: (
                                <p>
                                    Cocok untuk car seat yang lama dipakai di dalam mobil. Kami bersihkan bagian
                                    jok, strap, dan area sekitar kepala anak agar kembali nyaman digunakan.
                                </p>
                            ),
                        },
                    ]}
                />
            </div>
        </ServiceDetailLayout>
    );
};

export default BabyGearCleaning;
