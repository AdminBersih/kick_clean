import React from 'react';
import Link from 'next/link';
import BackgroundOne from '../../../public/assets/images/backgrounds/cta-v1-bg.jpg';

const CtaOne = () => {
    return (
        <>
            <section className="cta-one">
                <div className="image-layer" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="cta-one__inner">
                                <div className="title">
                                    <h2>Butuh konsultasi cepat soal perawatan sepatu & tas?</h2>
                                    <div className="number">
                                        <p>WhatsApp: <a href="https://wa.me/6285659176079" target="_blank" rel="noreferrer">0856-5917-6079</a></p>
                                    </div>
                                </div>
                                <div className="button-box">
                                    <Link href="https://wa.me/6285659176079" className="thm-btn" target="_blank">
                                        <span>WhatsApp Kami</span>
                                        <div className="liquid"></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CtaOne;
