import Link from 'next/link';
import React from 'react';
import MobileMenus from './mobile-menus';

const Sidebar = ({isActive, setIsActive}) => {

    return (
        <>
    <div className="tt-offcanvas-wrapper">
        <div className={`tt-offcanvas ${isActive ? "opened" : ""}`}>
            <div className="tt-offcanvas-close" onClick={() => setIsActive(false)}>
                <span><i className="fas fa-times"></i></span>
            </div>

                <div className="logo-box">
                    <Link href="/" aria-label="logo image"><img src="/assets/images/resources/logo1.png"
                            width="155" alt="" /></Link>
                </div>
                <div className="mobile-nav__container"></div>

                
                <div className={`tt-mobile-menu mean-container d-xl-none`}> 
                    <div className="mean-bar">
                        <MobileMenus />
                    </div>
                </div>

                <div className="mobile-nav__container"></div>

                <ul className="mobile-nav__contact list-unstyled">
                    <li>
                        <i className="fa fa-map-marker-alt"></i>
                        <Link href="https://maps.app.goo.gl/8iqm6X6f6CzA3oZNA" target="_blank" rel="noreferrer">Jl. Raya Songgo Langit No.2 Gentan</Link>
                    </li>
                    <li>
                        <i className="fa fa-phone-alt"></i>
                        <Link href="https://wa.me/6285659176079" target="_blank" rel="noreferrer">0856-5917-6079 (WhatsApp)</Link>
                    </li>
                </ul>
                <div className="mobile-nav__top">
                    <div className="mobile-nav__social">
                        <Link href="https://www.instagram.com/kickclean.gentan" className="fab fa-instagram" target="_blank" rel="noreferrer"></Link>
                        <Link href="https://wa.me/6285659176079" className="fab fa-whatsapp" target="_blank" rel="noreferrer"></Link>
                    </div>
                </div>
        </div>
    </div>    

<div className={`body-overlay ${isActive ? "opened"  : ""}`} onClick={() => setIsActive(false)}></div>
        </>
    );
};

export default Sidebar;
