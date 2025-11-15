import React from 'react';
import Link from 'next/link';

const BlogLatestPost = () => {
    return (
        <>
            <div className="sidebar__single sidebar__post wow animated fadeInUp" data-wow-delay="0.3s">
                <h3 className="sidebar__title">Postingan Terbaru</h3>
                <div className="sidebar__post-box">
                    <div className="sidebar__post-single">
                        <div className="sidebar-post__img">
                            <img src="/assets/images/blog/lp-1-1.jpg" alt="" />
                        </div>
                        <div className="sidebar__post-content-box">
                            <h3><Link href="/blog-details">Cara cepat mengeringkan sepatu setelah hujan</Link></h3>
                        </div>
                    </div>
                    <div className="sidebar__post-single">
                        <div className="sidebar-post__img">
                            <img src="/assets/images/blog/lp-1-2.jpg" alt="" />
                        </div>
                        <div className="sidebar__post-content-box">
                            <h3><Link href="/blog-details">Step repaint topi favorit ala Kick Clean</Link></h3>
                        </div>
                    </div>
                    <div className="sidebar__post-single">
                        <div className="sidebar-post__img">
                            <img src="/assets/images/blog/lp-1-3.jpg" alt="" />
                        </div>
                        <div className="sidebar__post-content-box">
                            <h3><Link href="/blog-details">Checklist sebelum pakai layanan antar jemput</Link></h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogLatestPost;
