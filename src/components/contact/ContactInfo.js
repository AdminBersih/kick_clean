import React from 'react';
import Link from 'next/link';

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
                                    <h2>
                                        <Link href="https://www.google.com/maps/place/Kick+Clean+Gentan/@-7.5803738,110.7784491,17z/data=!4m15!1m8!3m7!1s0x2e7a15000273a66b:0x188127a33911bf0d!2sKick+Clean+Gentan!8m2!3d-7.5803738!4d110.78332!10e1!16s%2Fg%2F11xn3n9dq1!3m5!1s0x2e7a15000273a66b:0x188127a33911bf0d!8m2!3d-7.5803738!4d110.78332!16s%2Fg%2F11xn3n9dq1?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
                                            Lokasi Workshop
                                        </Link>
                                    </h2>
                                    <p>
                                        Jl. Raya Songgo Langit No.2, Songgolangit, Gentan,<br />
                                        Kec. Baki, Kabupaten Sukoharjo, Jawa Tengah 57556, Indonesia
                                    </p>
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
                                    <h2><Link href="#">Kontak & Sosial</Link></h2>
                                    <p><Link href="https://wa.me/6285659176079" target="_blank" rel="noreferrer">WhatsApp: 0856-5917-6079</Link></p>
                                    <p><Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer">Instagram @kickclean.gentan</Link></p>
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
                                    <h2><Link href="#">Jam Operasional</Link></h2>
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
