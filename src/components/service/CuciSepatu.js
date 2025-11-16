import React from "react";
import ServiceDetailLayout from "./ServiceDetailLayout";
import ServiceAccordion from "./ServiceAccordion";

const CuciSepatu = () => {
    return (
        <ServiceDetailLayout
            activeSlug="/cuci-sepatu"
            heroAlt="Jasa cuci sepatu Kick Clean Gentan"
        >
            <div className="service-details__bottom">
                <h2 className="service-details__bottom-title">
                    Jasa Cuci Sepatu – Shoes Treatment Lengkap di Kick Clean Gentan
                </h2>

                <div className="service-details__bottom-text1">
                    <p>
                        Di Kick Clean Gentan, kami percaya setiap sepatu punya cerita: dari sepatu kerja
                        harian, sneakers kesayangan, sampai boots petualangan. Tugas kami adalah
                        mengembalikan sepatu-sepatu itu ke kondisi terbaiknya tanpa merusak bahan, warna,
                        maupun bentuk aslinya. Semua proses dikerjakan secara manual oleh tim yang
                        terlatih, menggunakan chemical premium yang aman untuk berbagai material seperti
                        canvas, knit, leather, mesh, hingga suede dan nubuck.
                    </p>
                </div>

                <div className="service-details__bottom-text2">
                    <p>
                        Setiap sepatu yang masuk akan kami cek terlebih dahulu: kondisi bahan, noda, tingkat
                        keausan, hingga keluhan khusus dari pelanggan. Setelah itu baru kami tentukan
                        treatment yang paling tepat. Kami juga selalu mendokumentasikan kondisi sebelum dan
                        sesudah pengerjaan, serta mengirimkan update progres via WhatsApp agar kamu bisa
                        memantau sampai sepatu benar-benar siap dipakai lagi.
                    </p>
                </div>

                <div className="service-details__bottom-text3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="img-box">
                                <img
                                    src="/assets/images/resources/service-details-img1.png"
                                    alt="Deep clean sepatu di Kick Clean Gentan"
                                />
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="content-box">
                                <p>
                                    Proses pengeringan dilakukan secara alami (bukan menggunakan panas
                                    berlebihan) agar bentuk sepatu tetap terjaga dan lem tidak cepat rusak.
                                    Setelah kering, sepatu diberi deodorizing ringan untuk mengurangi bau
                                    tidak sedap, serta penggunaan shoe tree ringan untuk membantu
                                    mempertahankan struktur. Hasil akhirnya: sepatu bersih, lebih fresh, dan
                                    siap menemani aktivitasmu lagi.
                                </p>

                                <ul>
                                    <li>
                                        <span className="icon-plus"></span>
                                        <strong> Lokasi Outlet:</strong> Jl. Raya Songgolangit, Gentan,
                                        Sukoharjo.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        <strong> Promo FREE DELIVERY:</strong> Gratis antar jemput area Gentan
                                        &amp; sekitarnya* – cek ketentuan di halaman Antar Jemput.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        <strong> Garansi retouch 3 hari:</strong> Jika masih ada noda ringan
                                        yang terlewat, kamu bisa klaim retouch tanpa biaya tambahan dalam 3
                                        hari setelah sepatu diterima.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service-details__bottom-text4">
                    <h3 className="service-details__bottom-subtitle">Pilihan Paket Shoes Treatment</h3>
                    <p>
                        Pilih paket yang paling sesuai dengan kebutuhan dan kondisi sepatu kamu. Semua harga
                        berlaku per pasang sepatu.
                    </p>

                    <ServiceAccordion
                        items={[
                            {
                                title: "Lite Clean – Rp30.000 (2 hari pengerjaan)",
                                content: (
                                    <p>
                                        Paket hemat untuk kamu yang butuh sepatu cepat rapi. Fokus pada pembersihan
                                        bagian <em>upper</em> dan <em>midsole</em>, cocok untuk sepatu yang tidak
                                        terlalu kotor namun ingin tampil lebih bersih dan layak pakai lagi.
                                    </p>
                                ),
                            },
                            {
                                title: "Deep Clean – Rp35.000 (3–4 hari pengerjaan)",
                                content: (
                                    <p>
                                        Pembersihan menyeluruh dari <em>outsole, midsole, upper, insole</em> hingga
                                        <em> tali sepatu</em>. Direkomendasikan untuk sepatu yang sering dipakai
                                        harian, terasa lembap, mulai berbau, atau sudah lama tidak dicuci.
                                    </p>
                                ),
                            },
                            {
                                title: "White Shoes – Rp40.000 (3–4 hari pengerjaan)",
                                content: (
                                    <p>
                                        Khusus untuk sepatu berwarna putih yang gampang kusam dan menguning. Kami
                                        gunakan teknik dan chemical yang diformulasikan untuk memaksimalkan kecerahan
                                        warna tanpa merusak material, sehingga sepatu putih kamu kembali pede dipakai.
                                    </p>
                                ),
                            },
                            {
                                title: "Women & Kids – Rp30.000 (2–3 hari pengerjaan)",
                                content: (
                                    <p>
                                        Paket untuk sepatu anak (size &lt; 35) dan sepatu wanita seperti heels, flat
                                        shoes, dan wedges. Dikerjakan dengan ekstra hati-hati karena banyak detail
                                        kecil dan bentuk yang berbeda dari sepatu biasa.
                                    </p>
                                ),
                            },
                            {
                                title: "Boots & Outdoors – Rp50.000 (4–6 hari pengerjaan)",
                                content: (
                                    <p>
                                        Khusus untuk boots dan sepatu outdoor yang sering terkena lumpur, tanah, atau
                                        air. Kami fokus mengangkat noda membandel di sela-sela dan tekstur kasar tanpa
                                        merusak struktur sepatu maupun jahitan.
                                    </p>
                                ),
                            },
                            {
                                title: "Suede Treatment – mulai dari Rp55.000 (3–4 hari pengerjaan)",
                                content: (
                                    <p>
                                        Treatment untuk sepatu berbahan suede leather dan nubuck yang membutuhkan
                                        penanganan khusus. Mengangkat noda tanpa membuat bulu suede menggumpal atau
                                        berubah tekstur, sehingga permukaan tetap halus dan enak dilihat.
                                    </p>
                                ),
                            },
                            {
                                title: "Sepatu Roda – Rp50.000 (3–4 hari pengerjaan)",
                                content: (
                                    <p>
                                        Paket cuci khusus sepatu roda, termasuk pembersihan bagian luar sepatu, roda,
                                        dan area yang sering menjadi tempat menumpuknya debu dan kotoran. Cocok untuk
                                        anak maupun dewasa yang aktif bermain.
                                    </p>
                                ),
                            },
                        ]}
                    />

                    <p>
                        Bingung mau pilih paket yang mana? Tenang, kamu bisa kirim foto sepatu via WhatsApp
                        dan tim kami akan bantu rekomendasikan treatment yang paling pas.
                    </p>
                </div>
            </div>
        </ServiceDetailLayout>
    );
};

export default CuciSepatu;
