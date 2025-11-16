import React from "react";
import ServiceDetailLayout from "./ServiceDetailLayout";
import ServiceAccordion from "./ServiceAccordion";

const SpecialTreatment = () => {
    return (
        <ServiceDetailLayout
            activeSlug="/special-treatment"
            heroAlt="Special treatment sepatu Kick Clean Gentan"
        >
            <div className="service-details__bottom">
                <h2 className="service-details__bottom-title">
                    Special Treatment Sepatu – Solusi Khusus untuk Sepatu Favoritmu
                </h2>

                <div className="service-details__bottom-text1">
                    <p>
                        Ada sepatu yang nggak bisa “sekadar dicuci” saja: perlu dikebut karena mau dipakai
                        besok, perlu di-reglue karena lem mulai mengelupas, atau perlu di-repaint karena
                        warna sudah pudar. Di Kick Clean Gentan, semua kebutuhan spesial itu kami rangkum
                        dalam kategori <strong> Special Treatment</strong>.
                    </p>
                </div>

                <div className="service-details__bottom-text2">
                    <p>
                        Setiap Special Treatment dikerjakan dengan alat dan bahan yang berbeda dari cucian
                        biasa. Kami menggunakan cleaner dan cat khusus sepatu, lem berkualitas, hingga teknik
                        <em>un-yellowing</em> untuk mengurangi warna kuning pada midsole. Semua pengerjaan
                        dilakukan secara hati-hati agar hasilnya rapi, awet, dan tetap nyaman dipakai.
                    </p>
                </div>

                <div className="service-details__bottom-text3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="img-box">
                                <img
                                    src="/assets/images/resources/service-details-img2.jpg"
                                    alt="Special treatment sepatu Kick Clean Gentan"
                                />
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="content-box">
                                <p>
                                    Cocok untuk kamu yang punya sepatu favorit dengan nilai sentimental atau
                                    sepatu branded yang ingin dirawat lebih maksimal. Kami akan memberikan
                                    konsultasi singkat terlebih dahulu sebelum mulai pengerjaan, agar kamu
                                    paham apa saja yang akan dilakukan dan bagaimana prediksi hasilnya.
                                </p>

                                <ul>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Prioritas pengerjaan untuk layanan Express dan OneDay Service.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Dokumentasi detail sebelum &amp; sesudah untuk layanan repaint,
                                        reglue, dan un-yellowing.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Bisa digabung dengan layanan antar jemput gratis area Gentan &amp;
                                        sekitarnya.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service-details__bottom-text4">
                    <h3 className="service-details__bottom-subtitle">Pilihan Special Treatment</h3>

                    <ServiceAccordion
                        items={[
                            {
                                title: "OneDay Service – Rp45.000 (jadi dalam 24 jam)",
                                content: (
                                    <p>
                                        Cuci bersih seluruh bagian sepatu dengan prioritas pengerjaan khusus. Cocok
                                        untuk kamu yang butuh sepatu bersih besok hari – misalnya untuk kerja, event,
                                        atau jalan-jalan.
                                    </p>
                                ),
                            },
                            {
                                title: "Express Service – Rp50.000 (jadi dalam 6 jam)",
                                content: (
                                    <p>
                                        Pilihan terbaik kalau kamu benar-benar dikejar waktu. Sepatu dibersihkan
                                        menyeluruh dan dikerjakan ekstra cepat tanpa mengorbankan kebersihan.
                                    </p>
                                ),
                            },
                            {
                                title: "Premium Clean – Rp60.000",
                                content: (
                                    <p>
                                        Paket cuci premium menggunakan cleaner dengan brand ternama seperti Jason Mark
                                        / Crep*. Direkomendasikan untuk sepatu dengan material sensitif atau sepatu
                                        branded yang ingin diperlakukan lebih eksklusif. (*Brand dapat disesuaikan stok
                                        di outlet.)
                                    </p>
                                ),
                            },
                            {
                                title: "Un-Yellowing Midsole – mulai dari Rp65.000",
                                content: (
                                    <p>
                                        Treatment khusus untuk mengurangi warna kuning yang muncul pada bagian midsole
                                        sepatu. Sudah termasuk Fast Clean sepatu, sehingga kamu mendapatkan midsole yang
                                        lebih cerah sekaligus sepatu yang lebih bersih. Hasil akhir sangat dipengaruhi
                                        oleh usia dan kondisi awal sepatu.
                                    </p>
                                ),
                            },
                            {
                                title: "Reglue – mulai dari Rp35.000",
                                content: (
                                    <p>
                                        Lem ulang pada bagian midsole atau outsole yang mulai terlepas. Sudah termasuk
                                        <em> Lite Clean Shoe</em>, sehingga sepatu tidak hanya kuat kembali tapi juga
                                        lebih rapi saat dipakai.
                                    </p>
                                ),
                            },
                            {
                                title: "Repaint Suede – Rp100.000",
                                content: (
                                    <p>
                                        Repaint khusus bahan suede, termasuk <em>Deep Clean Shoe</em>. Warna yang pudar
                                        akan dikembalikan sedekat mungkin ke warna aslinya, dengan teknik aplikasi yang
                                        menyesuaikan karakter suede agar tidak menggumpal.
                                    </p>
                                ),
                            },
                            {
                                title: "Repaint Canvas, Mesh, Leather – mulai dari Rp80.000",
                                content: (
                                    <p>
                                        Repaint untuk semua jenis canvas, mesh, dan leather, sudah termasuk
                                        <em> Deep Clean Shoe</em>. Cocok untuk sepatu yang warnanya pudar, tergores,
                                        atau ingin diberi sentuhan baru namun tetap terlihat rapi dan natural.
                                    </p>
                                ),
                            },
                        ]}
                    />

                    <p>
                        Sebelum repaint atau un-yellowing, kami akan menginformasikan estimasi hasil dan
                        kemungkinan batas maksimal perbaikan sesuai kondisi sepatu. Kamu bisa setuju atau tidak
                        sebelum kami mulai pengerjaan.
                    </p>
                </div>
            </div>
        </ServiceDetailLayout>
    );
};

export default SpecialTreatment;
