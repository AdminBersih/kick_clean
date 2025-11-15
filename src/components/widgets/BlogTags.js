import React from 'react';
import Link from 'next/link';

const BlogTags = () => {
    return (
        <>
            <div className="sidebar__single sidebar__tags wow animated fadeInUp" data-wow-delay="0.5s">
                <h3 className="sidebar__title">Tag</h3>
                <div className="sidebar__tags-list">
                    <Link href="/">Sneaker Care</Link>
                    <Link href="/">Repaint</Link>
                    <Link href="/">Reglue</Link>
                    <Link href="/">Tas & Topi</Link>
                    <Link href="/">Waterproof</Link>
                    <Link href="/">Antar Jemput</Link>
                    <Link href="/">Kick Clean Tips</Link>
                </div>
            </div>
        </>
    )
}

export default BlogTags;
