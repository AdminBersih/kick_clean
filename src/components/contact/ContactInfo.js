import React from 'react';

const ContactInfo = () => {
    return (
        <>
            <section className="contact-box">
                <div className="container">
                    <div className="row">
                        {/* Start Contact Box Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1500ms">
                            <div className="contact-box__single text-center">
                                <div className="contact-box__single-icon">
                                    <span className="fa fa-map-marker"></span>
                                </div>
                                <div className="contact-box__single-text">
                                    <h2><a href="#">Lokasi Workshop</a></h2>
                                    <p>Jl. Raya Songgo Langit No.2, Gentan,<br />Baki, Sukoharjo 57556</p>
                                </div>
                            </div>
                        </div>
                        {/* End Contact Box Single */}
                        
                        {/* Start Contact Box Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1500ms">
                            <div className="contact-box__single text-center">
                                <div className="contact-box__single-icon">
                                    <span className="icon-email"></span>
                                </div>
                                <div className="contact-box__single-text">
                                    <h2><a href="#">Kontak & Sosial</a></h2>
                                    <p><a href="https://wa.me/6285659176079" target="_blank" rel="noreferrer">WhatsApp: 0856-5917-6079</a></p>
                                    <p><a href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer">Instagram @kickclean.gentan</a></p>
                                </div>
                            </div>
                        </div>
                        {/* End Contact Box Single */}

                        {/* Start Contact Box Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="1500ms">
                            <div className="contact-box__single text-center">
                                <div className="contact-box__single-icon">
                                    <span className="fa fa-phone"></span>
                                </div>
                                <div className="contact-box__single-text">
                                    <h2><a href="#">Jam Operasional</a></h2>
                                    <p>Senin - Minggu</p>
                                    <p>09.00 - 21.00 WIB</p>
                                </div>
                            </div>
                        </div>
                        {/* End Contact Box Single */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactInfo;
