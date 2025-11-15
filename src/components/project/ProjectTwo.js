import React, { useEffect } from 'react';
import Link from 'next/link';
import { ProjectTwoData } from '@/data/project';

const ProjectTwo = () => {
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
            <section className="projects-two">
                <div className="container">
                    <div className="section-title text-center">
                        <span className="section-title__tagline">Portofolio Terbaru</span>
                        <h2 className="section-title__title">Dokumentasi hasil kerja Kick Clean</h2>
                    </div>
                    <div className="row">
                        {ProjectTwoData.map((item, i) => (
                            <div key={i} className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay={item.delay} data-wow-duration={item.duration}>
                                <div className="projects-two__single">
                                    <div className="projects-two__single-img">
                                        <div className="projects-two__single-img-inner">
                                            <img className="parallax-img" src={item.image} alt={item.alt} />
                                        </div>
                                        <div className="overlay-content text-center">
                                            <div className="text">
                                                <p>{item.category}</p>
                                                <h3><Link href={item.link}>{item.heading}</Link></h3>
                                            </div>
                                            <ul>
                                                <li><a href={item.image_popup} className="img-popup"><i className="icon-plus"></i></a></li>
                                                <li><Link href={item.link}><span className="icon-link"></span></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProjectTwo;
