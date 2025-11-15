import React from 'react';

const NewsletterOne = () => {
    return (
        <>
            <section class="subscribe-one">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="subscribe-one__content">
                                <div class="subscribe-title">
                                    <h3>Berlangganan update Kick Clean</h3>
                                </div>
                                <div class="subscribe-box">
                                    <form class="subscribe-form" action="#">
                                        <input type="email" name="email" placeholder="Masukkan email kamu" />
                                        <button class="btn-one" type="submit"><span class="txt">Daftar</span></button>
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
