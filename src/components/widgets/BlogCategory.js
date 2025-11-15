import React from 'react';
import Link from 'next/link';

const BlogCategory = () => {
    return (
        <>
            <div className="sidebar__single sidebar__category wow animated fadeInUp" data-wow-delay="0.2s">
                <h3 className="sidebar__title">Kategori</h3>
                <ul className="sidebar__category-list list-unstyled">
                    <li><Link href="/blog-details">Tips Sneaker <span>(12)</span></Link></li>
                    <li className="active"><Link href="/blog-details">Cerita Pelanggan<span>(10)</span></Link></li>
                    <li><Link href="/blog-details">Treatment Tas <span>(20)</span></Link></li>
                    <li><Link href="/blog-details">Repaint & Reglue<span>(30)</span></Link></li>
                    <li><Link href="/blog-details">Antar Jemput<span>(15)</span></Link></li>
                </ul>
            </div>
        </>
    )
}

export default BlogCategory;
