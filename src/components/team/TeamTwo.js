import React, { useEffect } from 'react';
import { TeamOneData } from '@/data/team';
import BackgroundOne from '../../../public/assets/images/pattern/team-v1-pattern.png';

const TeamTwo = () => {
    useEffect(() => {

      if ($(".team-one__carousel").length) {
        $(".team-one__carousel").owlCarousel({
          loop: true,
          margin: 30,
          nav: false,
          smartSpeed: 500,
          autoHeight: false,
          autoplay: true,
          dots: true,
          autoplayTimeout: 10000,
          navText: [
            '<span class="icon-left-arrow"></span>',
            '<span class="icon-right-arrow"></span>'
          ],
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 1
            },
            800: {
              items: 2
            },
            1024: {
              items: 3
            },
            1200: {
              items: 3
            }
          }
        });
      }
          
    }, []);
    return (
        <>
            <section className="team-one">
                <div className="pattern-bg" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                <div className="container">
                    <div className="section-title__style2">
                        <div className="section-title">
                            <span className="section-title__tagline">Tim Profesional</span>
                            <h2 className="section-title__title">Orang-orang di balik Kick Clean Gentan</h2>
                        </div>
                        <div className="text-box">
                            <p>Kami terdiri dari detailer, spesialis repaint, teknisi reglue, dan tim kurir yang siap membantu pelanggan setiap hari.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="team-one__carousel owl-theme owl-carousel owl-dot-style1">
                                {TeamOneData.map((item, i) => (
                                    <div key={i} className="team-one__single">
                                      <div className="team-one__single-img">
                                          <img src={item.image} alt={item.alt} />
                                          <div className="overlay-content">
                                              <div className="title-box">
                                                  <h3>{item.name}</h3>
                                                  <p>{item.position}</p>
                                              </div>
                                              <div className="social-link">
                                                  <a href={item.facebook}><i className="fab fa-facebook"></i></a>
                                                  <a href={item.pinterest}><i className="fab fa-twitter"></i></a>
                                                  <a href={item.pinterest}><i className="fab fa-pinterest-p"></i></a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TeamTwo;
