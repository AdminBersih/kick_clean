import React, { useState } from 'react';
import NavMenu from './NavMenu';
import Sidebar from './sidebar';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';

const HeaderOne = () => {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <header className="main-header">
        <div className="main-header__top clearfix">
          <div className="container clearfix">
            <div className="main-header__top-inner clearfix">
              <div className="main-header__top-left">
                <ul className="main-header__top-address">
                  <li>
                    <div className="icon">
                      <span className="icon-email"></span>
                    </div>
                    <div className="text">
                      <p>
                        <a
                          href="https://wa.me/6285659176079"
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp: 0856-5917-6079
                        </a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-wall-clock"></span>
                    </div>
                    <div className="text">
                      <p>Setiap Hari: 09.00 - 21.00 WIB</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="main-header__top-right">
                <div className="main-header__top-right-search">
                  <a
                    href="#"
                    className="search-toggler"
                    onClick={handleShow}
                  >
                    <i className="fa fa-search"></i>
                  </a>
                  <div className="search-popup">
                    <Modal
                      show={show}
                      onHide={handleClose}
                      className="search-popup__overlay search-toggler"
                    >
                      <div className="search-popup__content">
                        <form action="#">
                          <label htmlFor="search" className="sr-only">
                            Cari di sini
                          </label>
                          <input
                            type="text"
                            id="search"
                            placeholder="Cari konten..."
                          />
                          <button
                            type="submit"
                            aria-label="search submit"
                            className="thm-btn"
                          >
                            <i
                              className="fa fa-search"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </form>
                      </div>
                    </Modal>
                  </div>
                </div>

                <div className="main-header__top-right-social">
                  <a
                    href="https://www.instagram.com/kickclean.gentan"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://wa.me/6285659176079"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="main-menu clearfix">
          <div className="container clearfix">
            <div className="main-menu-wrapper clearfix">
              <div className="main-menu-wrapper__left">
                <div className="main-menu-wrapper__logo">
                  <Link href="/">
                    <img src="/assets/images/resources/logo-1.png" alt="" />
                  </Link>
                </div>
              </div>

              <div className="main-menu-wrapper__right">
                <div className="main-menu-wrapper__main-menu">
                  {/* Toggler hanya untuk sidebar/menu mobile */}
                  <button
                    type="button"
                    className="mobile-nav__toggler"
                    onClick={() => setIsActive(true)}
                  >
                    <i className="fa fa-bars"></i>
                  </button>

                  <NavMenu />
                </div>

                <Link
                    href="/contact"
                    className="main-header__btn thm-btn main-header__btn--contact"
                    >
                    <span>Hubungi Kami</span>
                    <div className="liquid"></div>
                </Link>

              </div>
            </div>
          </div>
        </nav>
      </header>

      <Sidebar isActive={isActive} setIsActive={setIsActive} />
      <div className="body-overlay"></div>
    </>
  );
};

export default HeaderOne;
