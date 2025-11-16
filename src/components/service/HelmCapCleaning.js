import React from "react";
import ServiceDetailLayout from "./ServiceDetailLayout";
import ServiceAccordion from "./ServiceAccordion";

const HelmCapCleaning = () => {
    return (
        <ServiceDetailLayout
            activeSlug="/helm-cap-cleaning"
            heroAlt="Cuci helm dan cap Kick Clean Gentan"
        >
            <div className="service-details__bottom">
                <h2 className="service-details__bottom-title">
                    Cuci Helm &amp; Cap – Bebas Bau Apek &amp; Lebih Percaya Diri
                </h2>

                <div className="service-details__bottom-text1">
                    <p>
                        Helm dan topi (cap) adalah dua hal yang paling sering menempel di kepala, tapi paling
                        jarang dibersihkan. Keringat, debu, dan udara jalanan bisa membuat bagian dalam helm
                        lembap dan berbau, sementara topi jadi kusam dan tidak sedap dipakai. Di Kick Clean
                        Gentan, kami menyediakan layanan khusus untuk membersihkan helm dan cap agar kembali
                        fresh dan nyaman.
                    </p>
                </div>

                <div className="service-details__bottom-text2">
                    <p>
                        Untuk helm, kami fokus pada bagian dalam (busa dan kain) serta area luar yang sering
                        terkena debu jalanan. Untuk cap, kami menyesuaikan metode cuci dengan bahan topi agar
                        bentuk tetap terjaga dan tidak melengkung berlebihan. Semua pengerjaan dilakukan
                        manual dengan pengeringan yang cukup hingga benar-benar siap pakai.
                    </p>
                </div>

                <div className="service-details__bottom-text3">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="img-box">
                                <img
                                    src="/assets/images/resources/service-details-img2.jpg"
                                    alt="Cuci helm dan cap Kick Clean Gentan"
                                />
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="content-box">
                                <p>
                                    Estimasi pengerjaan helm berkisar 3–5 hari agar proses pencucian,
                                    pengeringan, dan pengecekan benar-benar tuntas. Untuk cap, prosesnya lebih
                                    singkat sekitar 1 hari, cocok buat kamu yang ingin topi bersih dan siap
                                    dipakai lagi dengan cepat.
                                </p>

                                <ul>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Mengurangi bau apek dan lembap pada bagian dalam helm.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Aman untuk berbagai jenis bahan topi, dari kain biasa hingga bahan
                                        lebih premium.
                                    </li>
                                    <li>
                                        <span className="icon-plus"></span>
                                        Bisa dikombinasikan dengan cuci sepatu untuk satu kali antar jemput.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="service-details__bottom-text4">
                    <h3 className="service-details__bottom-subtitle">Harga Layanan Helm &amp; Cap</h3>

                    <ServiceAccordion
                        items={[
                            {
                                title: "Helm – Rp40.000 (3–5 hari pengerjaan)",
                                content: (
                                    <p>
                                        Pembersihan bagian dalam dan luar helm, membantu mengurangi bau tidak sedap dan
                                        rasa lengket akibat keringat. Direkomendasikan untuk helm harian maupun helm
                                        yang jarang dicuci.
                                    </p>
                                ),
                            },
                            {
                                title: "Cap – Rp25.000 (1 hari pengerjaan)",
                                content: (
                                    <p>
                                        Cuci bersih untuk topi/cap dengan tetap menjaga bentuk. Cocok untuk topi
                                        favorit yang sering dipakai hangout, olahraga, atau aktivitas harian.
                                    </p>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </ServiceDetailLayout>
    );
};

export default HelmCapCleaning;
