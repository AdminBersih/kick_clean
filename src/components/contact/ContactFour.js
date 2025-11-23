import React, { useEffect } from 'react';

const ContactFour = () => {

    return (
        <>
            <section className="contact-one contact-one--team-details pd-120-0-120">
                <div className="container">
                    <div className="row">
                        {/* Start Contact One Form Box */}
                        <div className="col-xl-12">
                            <div className="contact-one__form-box">
                                <div className="section-title text-center">
                                    <span className="section-title__tagline">Hubungi Kick Clean</span>
                                    <h2 className="section-title__title">Tinggalkan pesan & jadwal</h2>
                                </div>
                                <form id="contact-form" name="contact_form" className="default-form2" action="#" method="post">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="input-box">
                                                <input type="text" name="form_name" defaultValue="" placeholder="Nama lengkap" required="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="input-box">
                                                <input type="email" name="form_email" defaultValue="" placeholder="Email (opsional)" required="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="input-box">
                                                <input type="text" name="form_phone" defaultValue="" placeholder="Nomor WhatsApp" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="input-box">
                                                <div className="select-box">
                                                    <select className="selectmenu wide">
                                                        <option selected="selected">Pilih layanan</option>
                                                        <option>Cuci Sepatu Premium</option>
                                                        <option>Cuci Topi & Tas</option>
                                                        <option>Repaint Sepatu & Topi</option>
                                                        <option>Reglue Sepatu</option>
                                                        <option>Treatment Waterproof</option>
                                                        <option>Antar Jemput</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="input-box">
                                                <input type="text" name="form_subject" defaultValue="" placeholder="Alamat penjemputan / drop off" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="input-box">
                                                <input type="text" name="form_subject" defaultValue="" placeholder="Tanggal yang diinginkan" id="datepicker" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12 text-center">
                                            <div className="button-box">
                                                <input id="form_botcheck" name="form_botcheck" className="form-control" type="hidden" defaultValue="" />
                                                <button className="thm-btn" type="submit" data-loading-text="Mohon tunggu...">
                                                    <span>Konfirmasi Jadwal</span>
                                                    <i className="liquid"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        {/* End Contact One Form Box */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactFour;
