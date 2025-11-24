import React from 'react';
import Link from 'next/link';
import TeamOne from './TeamOne';

const TeamDetails = () => {
    return (
        <>
            <section className="team-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5">
                            {/* Start Team Details Img */}
                            <div className="team-details__img js-tilt">
                                <img src="/assets/images/resources/team-detalis-img1.jpg" alt="Tim Kick Clean" />
                            </div>
                            {/* End Team Details Img */}
                        </div>

                        <div className="col-xl-7">
                            {/* Start Team Details Content */}
                            <div className="team-details__content">
                                <div className="title">
                                    <h2>Profil Tim Kick Clean Gentan</h2>
                                </div>
                                <div className="name">
                                    <h6>Nama : Rian Pratama</h6>
                                </div>
                                <div className="text">
                                    <p>Tentang : Rian adalah founder sekaligus sneaker care specialist yang memastikan setiap cuci, repaint, hingga treatment berjalan sesuai SOP. Ia telah menangani ratusan pasangan sepatu koleksi komunitas di Sukoharjo.</p>
                                </div>
                                <div className="number">
                                    <p>WhatsApp: <Link href="https://wa.me/6285659176079" target="_blank" rel="noreferrer">0856-5917-6079</Link></p>
                                </div>
                                <div className="social-icon">
                                    <div className="title">
                                        <h6>Ikuti kami:</h6>
                                    </div>
                                    <ul>
                                        <li><Link href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></Link></li>
                                        <li><Link href="https://wa.me/6285659176079" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/* End Team Details Content */}
                        </div>
                    </div>
                </div>
            </section>
            <TeamOne />
        </>
    )
}

export default TeamDetails;
