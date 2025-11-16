import React from "react";
import ServiceDetailLayout from "./ServiceDetailLayout";
import ServiceAccordion from "./ServiceAccordion";

const TasDompetKoper = () => {
    return (
        <ServiceDetailLayout
            activeSlug="/cuci-tas-dompet-koper"
            heroAlt="Cuci tas dompet koper Kick Clean"
        >
            <div className="service-details__bottom">
                <h2 className="service-details__bottom-title">
                    Cuci Tas, Dompet &amp; Koper – Biar Barang Bawaanmu Tetap Terlihat Pantas &amp; Terawat
                </h2>

                <div className="service-details__bottom-text1">
                    <p>
                        Bukan cuma sepatu yang perlu dirawat. Tas kerja, sling bag kesayangan, dompet, hingga
                        koper traveling juga sering jadi korban noda, debu, dan bau apek. Di Kick Clean
                        Gentan, kami hadir dengan layanan khusus untuk membersihkan dan merapikan tas,
                        dompet, hingga koper kamu, supaya selalu siap diajak beraktivitas kapan saja.
                    </p>
                </div>

                <div className="service-details__bottom-text2">
                    <p>
                        Kami menyesuaikan metode pembersihan dengan jenis bahan dan ukuran barang. Setiap tas
                        dan koper dibersihkan secara manual, memperhatikan bagian yang sering terlewat
                        seperti sudut, pegangan, tali, dan lining bagian dalam. Untuk dompet dan tas kecil,
                        kami mengutamakan keamanan material agar permukaan tidak mengelupas atau berubah
                        warna.
                    </p>
                </div>

                <div className="service-details__bottom-text3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="img-box">
                                <img
                                    src="/assets/images/resources/service-details-img2.jpg"
                                    alt="Cuci tas dan koper di Kick Clean Gentan"
                                />
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="content-box">
                                <p>
                                    Estimasi pengerjaan untuk tas dan dompet adalah 2–3 hari, sementara koper
                                    dan tas gunung memerlukan waktu hingga maksimal 7 hari karena ukuran dan
                                    tingkat kesulitannya lebih tinggi. Semua dikerjakan dengan tujuan yang
                                    sama: bersih, rapi, dan tetap aman untuk dibawa bepergian.
                                </p>

                                <ul>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Pembersihan luar–dalam untuk tas dan koper sesuai kondisi.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Chemical disesuaikan agar aman untuk bahan sintetis maupun kain.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Bisa request fokus area tertentu (misalnya noda tinta, kopi, atau
                                        kotoran tertentu).
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service-details__bottom-text4">
                    <h3 className="service-details__bottom-subtitle">
                        Bag &amp; Wallet (2–3 hari, maksimal 7 hari)
                    </h3>

                    <ServiceAccordion
                        items={[
                            {
                                title: "Small – Rp30.000",
                                content: (
                                    <p>
                                        Untuk dompet, pouch kecil, atau tas mini dengan ukuran ringkas. Cocok untuk
                                        membersihkan noda ringan, debu, dan kotoran harian.
                                    </p>
                                ),
                            },
                            {
                                title: "Medium – Rp40.000",
                                content: (
                                    <p>
                                        Untuk sling bag, tas selempang, atau handbag dengan ukuran sedang. Fokus pada
                                        pembersihan bodi utama, tali, dan bagian dalam.
                                    </p>
                                ),
                            },
                            {
                                title: "Large – Rp50.000",
                                content: (
                                    <p>
                                        Untuk tote bag besar, tas kerja, atau backpack standar. Direkomendasikan untuk
                                        tas yang sering dibawa ke kantor, kampus, atau sekolah.
                                    </p>
                                ),
                            },
                            {
                                title: "Tas Gunung – Rp55.000",
                                content: (
                                    <p>
                                        Khusus untuk carrier dan tas gunung yang sering terkena lumpur, debu, dan bau
                                        keringat. Pembersihan menyeluruh agar lebih layak dipakai kembali untuk
                                        pendakian berikutnya.
                                    </p>
                                ),
                            },
                        ]}
                    />

                    <h3 className="service-details__bottom-subtitle">Koper &amp; Kabin (maksimal 7 hari)</h3>

                    <ServiceAccordion
                        defaultOpenIndex={0}
                        items={[
                            {
                                title: "Small – Rp60.000",
                                content: (
                                    <p>
                                        Koper kabin berukuran kecil, cocok untuk kamu yang sering bepergian singkat.
                                        Kami membersihkan bagian luar, pegangan, roda, serta area dalam koper.
                                    </p>
                                ),
                            },
                            {
                                title: "Medium – Rp70.000",
                                content: (
                                    <p>
                                        Untuk koper ukuran sedang, baik untuk perjalanan bisnis maupun liburan
                                        keluarga. Pembersihan lebih detail dengan perhatian ekstra pada bagian dalam
                                        yang sering kotor.
                                    </p>
                                ),
                            },
                            {
                                title: "Large – Rp80.000",
                                content: (
                                    <p>
                                        Koper besar untuk perjalanan jauh. Kami pastikan koper kembali bersih, tidak
                                        bau, dan lebih enak disimpan di rumah tanpa rasa risih.
                                    </p>
                                ),
                            },
                        ]}
                    />

                    <p>
                        Untuk tas atau koper dengan noda khusus (misalnya jamur berat atau karat), tim kami akan
                        menginformasikan kemungkinan hasil sebelum pengerjaan dimulai.
                    </p>
                </div>
            </div>
        </ServiceDetailLayout>
    );
};

export default TasDompetKoper;
