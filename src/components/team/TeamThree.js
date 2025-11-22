import React from 'react';
import Link from 'next/link';
import { TeamThreeData } from '@/data/team';

const TeamThree = () => {
    return (
        <>
            <section className="team-one team-one--team">
                <div className="container">
                    <div className="section-title text-center">
                        <span className="section-title__tagline">Tim Profesional</span>
                        <h2 className="section-title__title">Kenalan dengan kru Kick Clean</h2>
                    </div>
                    <div className="row">
                        {TeamThreeData.map((item, i) => (
                            <div key={i} className="col-xl-4 col-lg-4 col-md-6  wow fadeInUp" data-wow-delay={item.delay} data-wow-duration={item.duration}>
                                <div className="team-one__single">
                                    <div className="team-one__single-img">
                                        <img src={item.image} alt={item.alt} />
                                        <div className="overlay-content">
                                            <div className="title-box">
                                                <h3>{item.name}</h3>
                                                <p>{item.position}</p>
                                            </div>
                                            <div className="social-link">
                                                <Link href={item.facebook}><i className="fab fa-facebook"></i></Link>
                                                <Link href={item.twitter}><i className="fab fa-twitter"></i></Link>
                                                <Link href={item.pinterest}><i className="fab fa-pinterest-p"></i></Link>
                                            </div>
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

export default TeamThree;
