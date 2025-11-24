import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({heading = "Tentang Kick Clean Gentan", currentPage = "Tentang"}) => {
    return (
        <>
            <section className="page-header">
                <div className="page-header__bg" style={{backgroundImage: `url(/assets/images/backgrounds/page-header-img1.png)`}}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-header__wrapper">
                                <div className="page-header__content">
                                    <h2>{heading}</h2>
                                    <div className="page-header__menu">
                                        <ul>
                                            <li><Link href="/">Beranda</Link></li>
                                            <li>{currentPage}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Breadcrumb;

