import React, { useEffect } from 'react';

const ProjectOne = () => {
    useEffect(() => {
        // inisialisasi magnificPopup seperti sebelumnya
        if ($('.img-popup').length) {
            var groups = {};
            $('.img-popup').each(function () {
                var id = parseInt($(this).attr('data-group'), 10);

                if (!groups[id]) {
                    groups[id] = [];
                }

                groups[id].push(this);
            });

            $.each(groups, function () {
                $(this).magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    gallery: {
                        enabled: true,
                    },
                });
            });
        }
    }, []);

    return (
        <>
            <section className="projects-one pd-120-0-90">
                <div className="container">
                    <div className="section-title text-center">
                        <span className="section-title__tagline">Portofolio Terbaru</span>
                        <h2 className="section-title__title">Lihat hasil pekerjaan Kick Clean</h2>
                    </div>

                    {/* MOBILE: Carousel (tanpa image ke-2) */}
                    <div className="d-block d-md-none">
                        <div
                            id="projectsCarousel"
                            className="carousel slide"
                            data-bs-ride="carousel"
                            data-bs-interval="3000"     // autoplay tiap 3 detik
                            data-bs-touch="true"
                        >
                            <div className="carousel-inner">
                                {/* Slide 1 - img1 */}
                                <div className="carousel-item active">
                                    <div className="projects-one__single">
                                        <div className="projects-one__single-img">
                                            <img
                                                className="parallax-img d-block w-100"
                                                src="/assets/images/projects/projects-v1-img1.jpeg"
                                                alt="Portofolio Kick Clean 1"
                                            />
                                            <div className="overlay-icon">
                                                <a
                                                    className="img-popup"
                                                    href="/assets/images/projects/projects-v1-img1.jpeg"
                                                >
                                                    <span className="icon-link"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Slide 2 - img3 */}
                                <div className="carousel-item">
                                    <div className="projects-one__single">
                                        <div className="projects-one__single-img">
                                            <img
                                                className="parallax-img d-block w-100"
                                                src="/assets/images/projects/projects-v1-img3.jpg"
                                                alt="Portofolio Kick Clean 3"
                                            />
                                            <div className="overlay-icon">
                                                <a
                                                    className="img-popup"
                                                    href="/assets/images/projects/projects-v1-img3.jpg"
                                                >
                                                    <span className="icon-link"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Slide 3 - img4 */}
                                <div className="carousel-item">
                                    <div className="projects-one__single">
                                        <div className="projects-one__single-img">
                                            <img
                                                className="parallax-img d-block w-100"
                                                src="/assets/images/projects/projects-v1-img4.jpg"
                                                alt="Portofolio Kick Clean 4"
                                            />
                                            <div className="overlay-icon">
                                                <a
                                                    className="img-popup"
                                                    href="/assets/images/projects/projects-v1-img4.jpg"
                                                >
                                                    <span className="icon-link"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Slide 4 - img5 */}
                                <div className="carousel-item">
                                    <div className="projects-one__single">
                                        <div className="projects-one__single-img">
                                            <img
                                                className="parallax-img d-block w-100"
                                                src="/assets/images/projects/projects-v1-img5.jpg"
                                                alt="Portofolio Kick Clean 5"
                                            />
                                            <div className="overlay-icon">
                                                <a
                                                    className="img-popup"
                                                    href="/assets/images/projects/projects-v1-img5.jpg"
                                                >
                                                    <span className="icon-link"></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Optional: kalau mau pakai next/prev */}
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#projectsCarousel"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#projectsCarousel"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    {/* DESKTOP / TABLET: layout grid seperti semula */}
                    <div className="row d-none d-md-flex">
                        {/* Start Projects One Single */}
                        <div className="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.1s">
                            <div className="projects-one__single">
                                <div className="projects-one__single-img">
                                    <img
                                        className="parallax-img"
                                        src="/assets/images/projects/projects-v1-img1.jpeg"
                                        alt=""
                                    />
                                    <div className="overlay-icon">
                                        <a
                                            className="img-popup"
                                            href="/assets/images/projects/projects-v1-img1.jpeg"
                                        >
                                            <span className="icon-link"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}

                        {/* Start Projects One Single (image 2 tetap untuk desktop) */}
                        <div className="col-xl-8 col-lg-8 col-md-8 wow animated fadeInUp" data-wow-delay="0.3s">
                            <div className="projects-one__single">
                                <div className="projects-one__single-img">
                                    <img
                                        className="parallax-img"
                                        src="/assets/images/projects/projects-v1-img2.jpg"
                                        alt=""
                                    />
                                    <div className="overlay-icon">
                                        <a
                                            className="img-popup"
                                            href="/assets/images/projects/projects-v1-img2.jpg"
                                        >
                                            <span className="icon-link"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}

                        {/* Start Projects One Single */}
                        <div className="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.5s">
                            <div className="projects-one__single">
                                <div className="projects-one__single-img">
                                    <img
                                        className="parallax-img"
                                        src="/assets/images/projects/projects-v1-img3.jpg"
                                        alt=""
                                    />
                                    <div className="overlay-icon">
                                        <a
                                            className="img-popup"
                                            href="/assets/images/projects/projects-v1-img3.jpg"
                                        >
                                            <span className="icon-link"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}

                        {/* Start Projects One Single */}
                        <div className="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.7s">
                            <div className="projects-one__single">
                                <div className="projects-one__single-img">
                                    <img
                                        className="parallax-img"
                                        src="/assets/images/projects/projects-v1-img4.jpg"
                                        alt=""
                                    />
                                    <div className="overlay-icon">
                                        <a
                                            className="img-popup"
                                            href="/assets/images/projects/projects-v1-img4.jpg"
                                        >
                                            <span className="icon-link"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}

                        {/* Start Projects One Single */}
                        <div className="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.9s">
                            <div className="projects-one__single">
                                <div className="projects-one__single-img">
                                    <img
                                        className="parallax-img"
                                        src="/assets/images/projects/projects-v1-img5.jpg"
                                        alt=""
                                    />
                                    <div className="overlay-icon">
                                        <a
                                            className="img-popup"
                                            href="/assets/images/projects/projects-v1-img5.jpg"
                                        >
                                            <span className="icon-link"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectOne;
