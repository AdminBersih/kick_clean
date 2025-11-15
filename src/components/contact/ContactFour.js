import React, { useEffect } from 'react';

const ContactFour = () => {

    return (
        <>
            <section class="contact-one contact-one--team-details pd-120-0-120">
                <div class="container">
                    <div class="row">
                        {/* Start Contact One Form Box */}
                        <div class="col-xl-12">
                            <div class="contact-one__form-box">
                                <div class="section-title text-center">
                                    <span class="section-title__tagline">Hubungi Kick Clean</span>
                                    <h2 class="section-title__title">Tinggalkan pesan & jadwal</h2>
                                </div>
                                <form id="contact-form" name="contact_form" class="default-form2" action="#" method="post">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-6">
                                            <div class="input-box">
                                                <input type="text" name="form_name" defaultValue="" placeholder="Nama lengkap" required="" />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6">
                                            <div class="input-box">
                                                <input type="email" name="form_email" defaultValue="" placeholder="Email (opsional)" required="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-6">
                                            <div class="input-box">
                                                <input type="text" name="form_phone" defaultValue="" placeholder="Nomor WhatsApp" />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6">
                                            <div class="input-box">
                                                <div class="select-box">
                                                    <select class="selectmenu wide">
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

                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-6">
                                            <div class="input-box">
                                                <input type="text" name="form_subject" defaultValue="" placeholder="Alamat penjemputan / drop off" />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6">
                                            <div class="input-box">
                                                <input type="text" name="form_subject" defaultValue="" placeholder="Tanggal yang diinginkan" id="datepicker" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 text-center">
                                            <div class="button-box">
                                                <input id="form_botcheck" name="form_botcheck" class="form-control" type="hidden" defaultValue="" />
                                                <button class="thm-btn" type="submit" data-loading-text="Mohon tunggu...">
                                                    <span>Konfirmasi Jadwal</span>
                                                    <i class="liquid"></i>
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
