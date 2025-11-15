import React from 'react';

const ContactTwo = () => {
    return (
        <>
            <section class="contact-page-form">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12">
                            <div class="contact-page-form__inner">
                                <div class="section-title text-center">
                                    <span class="section-title__tagline">Kontak Kick Clean Gentan</span>
                                    <h2 class="section-title__title">Silakan tinggalkan pesan untuk tim kami.</h2>
                                </div>
                                <form action="#" class="contact-page-form__form contact-form-validated">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div class="contact-page-form__input-box">
                                                <input type="text" placeholder="Nama lengkap" name="name" />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div class="contact-page-form__input-box">
                                                <input type="text" placeholder="Nomor WhatsApp" name="phone" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div class="contact-page-form__input-box">
                                                <input type="email" placeholder="Alamat email (opsional)" name="email" />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div class="contact-page-form__input-box">
                                                <input type="text" placeholder="Subjek" name="Subject" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div class="contact-page-form__input-box">
                                                <textarea name="message" placeholder="Tulis pesan atau detail kebutuhanmu"></textarea>
                                            </div>
                                            <div class="contact-page-form__btn">
                                                <button class="thm-btn" type="submit" data-loading-text="Mohon tunggu...">
                                                    <span>Kirim Pesan</span>
                                                    <i class="liquid"></i>
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
