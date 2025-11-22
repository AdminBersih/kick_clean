import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({heading = "Tentang Kick Clean Gentan", currentPage = "Tentang"}) => {
    return (
        <>
            <section class="page-header">
                <div class="page-header__bg" style={{backgroundImage: `url(/assets/images/backgrounds/page-header-img1.png)`}}></div>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="page-header__wrapper">
                                <div class="page-header__content">
                                    <h2>{heading}</h2>
                                    <div class="page-header__menu">
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

