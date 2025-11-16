import React, { useEffect } from 'react';

const ProjectOne = () => {
    useEffect(() => {

        if ($(".img-popup").length) {
            var groups = {};
            $(".img-popup").each(function () {
              var id = parseInt($(this).attr("data-group"), 10);
        
              if (!groups[id]) {
                groups[id] = [];
              }
        
              groups[id].push(this);
            });
        
            $.each(groups, function () {
              $(this).magnificPopup({
                type: "image",
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: {
                  enabled: true
                }
              });
            });
        }
      
    }, []);
    return (
        <>
            <section class="projects-one pd-120-0-90">
                <div class="container">
                    <div class="section-title text-center">
                        <span class="section-title__tagline">Portofolio Terbaru</span>
                        <h2 class="section-title__title">Lihat hasil pekerjaan Kick Clean</h2>
                    </div>
                    <div class="row">
                        {/* Start Projects One Single */}
                        <div class="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.1s">
                            <div class="projects-one__single">
                                <div class="projects-one__single-img">
                                    <img class="parallax-img" src="/assets/images/projects/projects-v1-img1.jpeg" alt="" />
                                    <div class="overlay-icon">
                                        <a class="img-popup" href="/assets/images/projects/projects-v1-img1.jpeg"><span
                                                class="icon-link"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}
                        {/* Start Projects One Single */}
                        <div class="col-xl-8 col-lg-8 col-md-8 wow animated fadeInUp" data-wow-delay="0.3s">
                            <div class="projects-one__single">
                                <div class="projects-one__single-img">
                                    <img class="parallax-img" src="/assets/images/projects/projects-v1-img2.jpg" alt="" />
                                    <div class="overlay-icon">
                                        <a class="img-popup" href="/assets/images/projects/projects-v1-img2.jpg"><span
                                                class="icon-link"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}
                        {/* Start Projects One Single */}
                        <div class="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.5s">
                            <div class="projects-one__single">
                                <div class="projects-one__single-img">
                                    <img class="parallax-img" src="/assets/images/projects/projects-v1-img3.jpg" alt="" />
                                    <div class="overlay-icon">
                                        <a class="img-popup" href="/assets/images/projects/projects-v1-img3.jpg"><span
                                                class="icon-link"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}
                        {/* Start Projects One Single */}
                        <div class="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.7s">
                            <div class="projects-one__single">
                                <div class="projects-one__single-img">
                                    <img class="parallax-img" src="/assets/images/projects/projects-v1-img4.jpg" alt="" />
                                    <div class="overlay-icon">
                                        <a class="img-popup" href="/assets/images/projects/projects-v1-img4.jpg"><span
                                                class="icon-link"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}
                        {/* Start Projects One Single */}
                        <div class="col-xl-4 col-lg-4 col-md-4 wow animated fadeInUp" data-wow-delay="0.9s">
                            <div class="projects-one__single">
                                <div class="projects-one__single-img">
                                    <img class="parallax-img" src="/assets/images/projects/projects-v1-img5.jpg" alt="" />
                                    <div class="overlay-icon">
                                        <a class="img-popup" href="/assets/images/projects/projects-v1-img5.jpg"><span
                                                class="icon-link"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Projects One Single */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProjectOne;
