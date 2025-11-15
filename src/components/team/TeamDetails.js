import React from 'react';
import TeamOne from './TeamOne';

const TeamDetails = () => {
    return (
        <>
            <section class="team-details">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-5">
                            {/* Start Team Details Img */}
                            <div class="team-details__img js-tilt">
                                <img src="/assets/images/resources/team-detalis-img1.jpg" alt="Tim Kick Clean" />
                            </div>
                            {/* End Team Details Img */}
                        </div>

                        <div class="col-xl-7">
                            {/* Start Team Details Content */}
                            <div class="team-details__content">
                                <div class="title">
                                    <h2>Profil Tim Kick Clean Gentan</h2>
                                </div>
                                <div class="name">
                                    <h6>Nama : Rian Pratama</h6>
                                </div>
                                <div class="text">
                                    <p>Tentang : Rian adalah founder sekaligus sneaker care specialist yang memastikan setiap cuci, repaint, hingga treatment berjalan sesuai SOP. Ia telah menangani ratusan pasangan sepatu koleksi komunitas di Sukoharjo.</p>
                                </div>
                                <div class="number">
                                    <p>WhatsApp: <a href="https://wa.me/6285659176079" target="_blank" rel="noreferrer">0856-5917-6079</a></p>
                                </div>
                                <div class="social-icon">
                                    <div class="title">
                                        <h6>Ikuti kami:</h6>
                                    </div>
                                    <ul>
                                        <li><a href="https://www.instagram.com/kickclean.gentan" target="_blank" rel="noreferrer"><i class="fab fa-instagram"></i></a></li>
                                        <li><a href="https://wa.me/6285659176079" target="_blank" rel="noreferrer"><i class="fab fa-whatsapp"></i></a></li>
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
