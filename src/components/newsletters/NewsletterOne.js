import React from 'react';

const NewsletterOne = () => {
    return (
        <>
            <section className="subscribe-one">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="subscribe-one__content">
                                <div className="subscribe-title">
                                    <h3>Berlangganan update Kick Clean</h3>
                                </div>
                                <div className="subscribe-box">
                                    <form className="subscribe-form" action="#">
                                        <input type="email" name="email" placeholder="Masukkan email kamu" />
                                        <button className="btn-one" type="submit"><span className="txt">Daftar</span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewsletterOne;
