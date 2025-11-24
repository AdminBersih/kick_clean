import React, { useEffect } from 'react';

const GalleryOne = () => {

    useEffect(() => {

      if ($(".masonary-layout").length) {
        $(".masonary-layout").isotope({
          layoutMode: "masonry"
        });
      }

      if ($(".post-filter").length) {
        $(".post-filter li")
          .children(".filter-text")
          .on("click", function () {
            var Self = $(this);
            var selector = Self.parent().attr("data-filter");
            $(".post-filter li").removeClass("active");
            Self.parent().addClass("active");
            $(".filter-layout").isotope({
              filter: selector,
              animationOptions: {
                duration: 500,
                easing: "linear",
                queue: false
              }
            });
            return false;
          });
      }

      if ($(".post-filter.has-dynamic-filters-counter").length) {
        // var allItem = $('.single-filter-item').length;
        var activeFilterItem = $(".post-filter.has-dynamic-filters-counter").find(
          "li"
        );
        activeFilterItem.each(function () {
          var filterElement = $(this).data("filter");
          var count = $(".filter-layout").find(filterElement).length;
          $(this)
            .children(".filter-text")
            .append('<span class="count">(' + count + ")</span>");
        });
      }

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
                        {/* Start case-studies-one Top */}
                        <div className="gallery-page__top">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="gallery-page__menu-box">
                                    <ul className="project-filter clearfix post-filter has-dynamic-filters-counter">
                                        <li data-filter=".filter-item" className="active"><span className="filter-text">Semua Proyek</span></li>
                                        <li data-filter=".sepatu"><span className="filter-text">Cuci Sepatu</span></li>
                                        <li data-filter=".tas"><span className="filter-text">Perawatan Tas</span></li>
                                        <li data-filter=".topi"><span className="filter-text">Repaint</span></li>
                                        <li data-filter=".perbaikan"><span className="filter-text">Reglue</span></li>
                                        <li data-filter=".treatment"><span className="filter-text">Antar Jemput</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* End case-studies-one Top */}
                    </div>


                    <div className="row filter-layout masonary-layout">
                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 filter-item sepatu treatment">
                            <div className="gallery-page__single wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img1.jpeg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img1.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}

                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 filter-item perbaikan tas">
                            <div className="gallery-page__single wow fadeInUp" data-wow-delay="200ms"
                                data-wow-duration="1500ms">
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
                        <div className="col-xl-4 col-lg-4 col-md-6 treatment topi filter-item">
                            <div className="gallery-page__single wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
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
                        <div className="col-xl-4 col-lg-4 col-md-6 filter-item tas sepatu topi">
                            <div className="gallery-page__single wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                                <div className="gallery-page__single-img">
                                    <img src="/assets/images/gallery/gallery-page-img4.jpeg" alt="" />
                                    <div className="gallery-page__single-icon">
                                        <a className="img-popup" href="/assets/images/gallery/gallery-page-img4.jpg"><span className="icon-plus"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Gallery Page Single */}

                        {/* Start Gallery Page Single */}
                        <div className="col-xl-4 col-lg-4 col-md-6 filter-item sepatu perbaikan topi">
                            <div className="gallery-page__single wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
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
                        <div className="col-xl-4 col-lg-4 col-md-6 filter-item topi sepatu tas">
                            <div className="gallery-page__single wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
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

export default GalleryOne;

