import React from 'react';
import Link from 'next/link';

const ContactInfo = () => {
    return (
        <>
            <section className="contact-box">
                <div className="container">
                    <div className="row">
                        {/* Start Step 1 - Isi Form */}
                        <div
                            className="col-xl-4 col-lg-4 wow fadeInUp"
                            data-wow-delay="0.1s"
                            data-wow-duration="1500ms"
                        >
                            <div className="contact-box__single text-center">
                                <div className="contact-box__single-icon">
                                    {/* ganti ikon di sini */}
                                    <span className="fa fa-edit"></span>
                                </div>
                                <div className="contact-box__single-text">
                                    <h2><Link href="#">Isi Form</Link></h2>
                                    <p>Lengkapi form order online dengan nama, nomor WhatsApp,</p>
                                    <p>alamat lengkap, serta jadwal pickup / drop-off barangmu.</p>
                                </div>
                            </div>
                        </div>
                        {/* End Step 1 */}

                        {/* Start Step 2 - Pilih Layanan Jasa */}
                        <div
                            className="col-xl-4 col-lg-4 wow fadeInUp"
                            data-wow-delay="0.3s"
                            data-wow-duration="1500ms"
                        >
                            <div className="contact-box__single text-center">
                                <div className="contact-box__single-icon">
                                    <span className="fa fa-th-list"></span>
                                </div>
                                <div className="contact-box__single-text">
                                    <h2><Link href="#">Pilih Layanan Jasa</Link></h2>
                                    <p>Pilih jenis treatment: Cuci Sepatu, Special Treatment,</p>
                                    <p>Tas &amp; Koper, Baby Gear, atau Helm &amp; Cap. Tim kami akan
                                        bantu rekomendasikan paket yang paling pas.</p>
                                </div>
                            </div>
                        </div>
                        {/* End Step 2 */}

                        {/* Start Step 3 - Pembayaran */}
                        <div
                            className="col-xl-4 col-lg-4 wow fadeInUp"
                            data-wow-delay="0.5s"
                            data-wow-duration="1500ms"
                        >
                            <div className="contact-box__single text-center">
                                <div className="contact-box__single-icon">
                                    <span className="fa fa-credit-card"></span>
                                </div>
                                <div className="contact-box__single-text">
                                    <h2><Link href="#">Pembayaran</Link></h2>
                                    <p>Lakukan pembayaran via transfer bank, QRIS,</p>
                                    <p>atau tunai saat pengambilan. Detail biaya &amp; status order
                                        akan dikirim lewat WhatsApp.</p>
                                </div>
                            </div>
                        </div>
                        {/* End Step 3 */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactInfo;
