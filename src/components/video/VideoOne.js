import React, { useEffect } from 'react'
import VideoBGOne from '../../../public/assets/images/backgrounds/video-v1-bg.jpg';

const VideoOne = () => {

    useEffect(() => {

        if ($(".video-popup").length) {
            $(".video-popup").magnificPopup({
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: true,
        
              fixedContentPos: false
            });
        }
          
    }, []);

    return (
        <>
            <section class="video-one">
                <div class="video-one-bg jarallax" data-jarallax data-speed="0.2" data-imgPosition="50% 0%" style={{backgroundImage: `url(${VideoBGOne.src})`}}></div>
                <div class="container">
                    <div class="video-one__inner">
                        <div class="video-one__video-link">
                            <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" class="video-popup">
                                <div class="video-one__video-icon">
                                    <span class="fa fa-play"></span>
                                    <i class="ripple"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VideoOne;