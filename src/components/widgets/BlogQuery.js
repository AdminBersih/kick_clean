import React from 'react';
import QueryImg from '../../../public/assets/images/backgrounds/sidebar-support-bg.jpg';

const BlogQuery = () => {
    return (
        <>
            <div className="sidebar__single sidebar__support wow animated fadeInUp" data-wow-delay="0.4s">
                <div className="sidebar__support-bg" style={{backgroundImage: `url(${QueryImg.src})`}}></div>
                <h3 className="sidebar__suppot-title">Butuh bantuan cepat?</h3>
                <p className="sidebar__suppot-text">Tim Kick Clean siap bantu pilih layanan terbaik untuk sepatu, tas, atau topimu.</p>
                <div className="sidebar__support-btn-box">
                    <button type="submit" className="thm-btn sidebar__support-btn">
                        <span>Hubungi via WhatsApp</span>
                        <i className="liquid"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default BlogQuery;
