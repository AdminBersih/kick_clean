import React, { useEffect } from 'react';
import { TestimonialOneData } from '@/data/testimonial';

const GalleryTwo = () => {

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
            <section className="gallery-page">
                <div className="container">
                    <div className="row">
                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                            <div className="gallery-page__single">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img1.jpg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img1.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}

                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="gallery-page__single">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img2.jpg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img2.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}

                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <div className="gallery-page__single">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img3.jpg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img3.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}

                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                            <div className="gallery-page__single">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img4.jpg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img4.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}

                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="gallery-page__single">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img5.jpg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img5.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}

                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <div className="gallery-page__single">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img6.jpg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img6.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default GalleryTwo;