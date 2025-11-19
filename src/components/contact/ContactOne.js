import React, { useEffect } from 'react';

const ContactOne = () => {

    return (
        <>
        
        <section className="contact-one pd-120-0-120">
            <div className="contact-one__bg jarallax" data-jarallax data-speed="0.2" data-imgPosition="50% 0%">
            </div>
            <div className="contact-one__img wow slideInRight" data-wow-delay="500ms" data-wow-duration="2500ms"><img src="/assets/images/resources/contact-v1-img1.png" alt="" /></div>
            <div className="container">
                <div className="row">
                    {/* Start Contact One Form Box */}
                    <div className="col-xl-8">
                        <div className="contact-one__form-box">
                            <div className="section-title">
                                <span className="section-title__tagline">Hubungi Kami</span>
                                <h2 className="section-title__title">Kirim Pesan & Booking Layanan</h2>
                            </div>
                            <form id="contact-form" name="contact_form" className="default-form2" action="assets/inc/sendmail.php" method="post">
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
                                            <input type="text" name="form_subject" defaultValue="" placeholder="Alamat penjemputan" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 text-center">
                                        <div className="button-box">
                                            <input id="form_botcheck" name="form_botcheck" className="form-control" type="hidden" defaultValue="" />
                                            <button className="thm-btn" type="submit" data-loading-text="Mohon tunggu...">
                                                <span>Konfirmasi</span>
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

export default ContactOne;
