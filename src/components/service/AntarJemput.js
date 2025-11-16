import React from "react";
import ServiceDetailLayout from "./ServiceDetailLayout";
import ServiceAccordion from "./ServiceAccordion";

const AntarJemput = () => {
    return (
        <ServiceDetailLayout
            activeSlug="/antar-jemput"
            heroAlt="Layanan antar jemput Kick Clean Gentan"
        >
            <div className="service-details__bottom">
                <h2 className="service-details__bottom-title">
                    Layanan Antar Jemput – Gratis Delivery Area Gentan &amp; Sekitarnya
                </h2>

                <div className="service-details__bottom-text1">
                    <p>
                        Mau cuci sepatu, tas, atau helm tapi nggak sempat datang ke outlet? Tenang, Kick
                        Clean Gentan punya layanan <strong>antar jemput (pickup &amp; delivery)</strong>
                        yang memudahkan kamu merawat barang-barang kesayangan tanpa harus keluar rumah.
                    </p>
                </div>

                <div className="service-details__bottom-text2">
                    <p>
                        Cukup hubungi kami via WhatsApp, kirim foto barang yang ingin dicuci, pilih jenis
                        layanan, dan share lokasi kamu. Driver kami akan menjemput barang di alamatmu,
                        kemudian mengantarkan kembali setelah proses pengerjaan selesai. Praktis, aman, dan
                        kamu bisa tetap fokus dengan aktivitas harianmu.
                    </p>
                </div>

                <div className="service-details__bottom-text3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="img-box">
                                <img
                                    src="/assets/images/resources/service-details-img2.jpg"
                                    alt="Layanan antar jemput Kick Clean Gentan"
                                />
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="content-box">
                                <p>
                                    Layanan ini sangat cocok untuk kamu yang tinggal di sekitar Gentan, Baki,
                                    dan area sekitar Sukoharjo yang ingin merawat sepatu, tas, koper, baby
                                    gear, maupun helm &amp; cap tanpa ribet. Barang akan dicek dan didata saat
                                    pickup, lalu kami update progresnya melalui WhatsApp hingga selesai.
                                </p>

                                <ul>
                                    <li>
                                        <span className="icon-plus"></span>
                                        <strong>FREE DELIVERY:</strong> Gratis antar jemput untuk area
                                        tertentu – tanyakan ke admin untuk detail jangkauan.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Dokumentasi barang saat dijemput dan sebelum dikirim kembali.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Bisa untuk semua jenis layanan: cuci sepatu, special treatment, tas,
                                        koper, baby gear, helm, dan cap.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service-details__bottom-text4">
                    <h3 className="service-details__bottom-subtitle">Cara Order Antar Jemput</h3>

                    <ServiceAccordion
                        items={[
                            {
                                title: "1. Hubungi WhatsApp Admin",
                                content: (
                                    <p>
                                        Kirim chat ke nomor WhatsApp Kick Clean Gentan, sertakan foto barang dan
                                        jumlahnya.
                                    </p>
                                ),
                            },
                            {
                                title: "2. Pilih Layanan",
                                content: (
                                    <p>
                                        Admin akan membantu merekomendasikan paket (Shoes Treatment, Special Treatment,
                                        Tas/Koper, Baby Gear, atau Helm &amp; Cap) sesuai kondisi barang.
                                    </p>
                                ),
                            },
                            {
                                title: "3. Konfirmasi Alamat & Jadwal Pickup",
                                content: (
                                    <p>
                                        Tentukan waktu penjemputan. Driver kami akan datang sesuai jadwal yang
                                        disepakati.
                                    </p>
                                ),
                            },
                            {
                                title: "4. Proses Pengerjaan & Update",
                                content: (
                                    <p>
                                        Barang dikerjakan sesuai antrian dan jenis layanan. Kamu akan menerima update
                                        progres melalui WhatsApp.
                                    </p>
                                ),
                            },
                            {
                                title: "5. Pengantaran Kembali",
                                content: (
                                    <p>
                                        Setelah selesai, barang dikirim kembali ke alamat kamu. Pembayaran bisa
                                        dilakukan sesuai kesepakatan (cash atau transfer).
                                    </p>
                                ),
                            },
                        ]}
                    />

                    <p>
                        Dengan layanan antar jemput ini, merawat sepatu, tas, dan perlengkapan lain jadi jauh lebih
                        mudah. Tinggal chat, pickup, bersih, lalu kembali ke tanganmu dalam kondisi yang lebih fresh.
                    </p>
                </div>
            </div>
        </ServiceDetailLayout>
    );
};

export default AntarJemput;
