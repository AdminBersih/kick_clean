import React from 'react';

const ContactTwo = () => {
    return (
        <>
            <section className="contact-page-form">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="contact-page-form__inner">
                                <div className="section-title text-center">
                                    <span className="section-title__tagline">Kontak Kick Clean Gentan</span>
                                    <h2 className="section-title__title">Silakan tinggalkan pesan untuk tim kami.</h2>
                                </div>
                                <form action="#" className="contact-page-form__form contact-form-validated">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="contact-page-form__input-box">
                                                <input type="text" placeholder="Nama lengkap" name="name" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="contact-page-form__input-box">
                                                <input type="text" placeholder="Nomor WhatsApp" name="phone" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="contact-page-form__input-box">
                                                <input type="email" placeholder="Alamat email (opsional)" name="email" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="contact-page-form__input-box">
                                                <input type="text" placeholder="Subjek" name="Subject" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="contact-page-form__input-box">
                                                <textarea name="message" placeholder="Tulis pesan atau detail kebutuhanmu"></textarea>
                                            </div>
                                            <div className="contact-page-form__btn">
                                                <button className="thm-btn" type="submit" data-loading-text="Mohon tunggu...">
                                                    <span>Kirim Pesan</span>
                                                    <i className="liquid"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactTwo;
