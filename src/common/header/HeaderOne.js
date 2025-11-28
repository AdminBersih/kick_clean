import React, { useEffect, useRef, useState } from 'react';
import NavMenu from './NavMenu';
import Sidebar from './sidebar';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import { useAuth } from '../auth/AuthContext';

const HeaderOne = () => {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    setDropdownOpen(false);
  }, [router.pathname]);

  const renderPrimaryAction = () => {
    if (user) {
      return (
        <div className="main-header__avatar-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="main-header__avatar-trigger main-header__btn--avatar"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <span className="main-header__avatar-icon">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </span>
          </button>

          <div className={`header-avatar__dropdown ${dropdownOpen ? 'is-open' : ''}`}>
            <div className="header-avatar__meta">
              <p className="header-avatar__welcome">Masuk sebagai</p>
              <strong className="header-avatar__name">{user?.name || 'Pengguna'}</strong>
              <span className="header-avatar__email">{user?.email}</span>
            </div>
            <Link href="/track" className="header-avatar__link">
              <i className="fa fa-box" aria-hidden="true"></i>
              <span>Track Order</span>
            </Link>
            <button
              type="button"
              className="header-avatar__link header-avatar__logout"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out-alt" aria-hidden="true"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <Link href="/login#login-card" className="main-header__btn thm-btn main-header__btn--contact">
        <span>Login</span>
        <div className="liquid"></div>
      </Link>
    );
  };

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

                {renderPrimaryAction()}

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
