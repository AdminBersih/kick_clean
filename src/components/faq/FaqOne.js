import React, { useEffect } from 'react';
import { FaqOneData } from '@/data/faq';

const FaqOne = () => {

    useEffect(() => {

      if ($(".accrodion-grp").length) {
        var accrodionGrp = $(".accrodion-grp");
        accrodionGrp.each(function () {
          var accrodionName = $(this).data("grp-name");
          var Self = $(this);
          var accordion = Self.find(".accrodion");
          Self.addClass(accrodionName);
          Self.find(".accrodion .accrodion-content").hide();
          Self.find(".accrodion.active").find(".accrodion-content").show();
          accordion.each(function () {
            $(this)
              .find(".accrodion-title")
              .on("click", function () {
                if ($(this).parent().hasClass("active") === false) {
                  $(".accrodion-grp." + accrodionName)
                    .find(".accrodion")
                    .removeClass("active");
                  $(".accrodion-grp." + accrodionName)
                    .find(".accrodion")
                    .find(".accrodion-content")
                    .slideUp();
                  $(this).parent().addClass("active");
                  $(this).parent().find(".accrodion-content").slideDown();
                }
              });
          });
        });
      }
          
    }, []);

    return (
        <>
            <section class="faq-one pd-120-0-120">
                <div class="container">
                    <div class="section-title__style2">
                        <div class="section-title">
                            <span class="section-title__tagline">Pertanyaan seputar Kick Clean</span>
                            <h2 class="section-title__title">Ada yang ingin ditanyakan?</h2>
                        </div>
                        <div class="text-box">
                            <p>Kami rangkum beberapa hal yang sering ditanyakan pelanggan sebelum memakai layanan Kick Clean Gentan.</p>
                        </div>
                    </div>
                    <div class="row">
                        {/* Start Faq One Content */}
                        <div class="col-xl-7">
                            <div class="faq-one__content">
                                <div class="faq-one__faq">
                                    <div class="accrodion-grp faq-one-accrodion" data-grp-name="faq-one-accrodion-1">
                                        {FaqOneData.map((item, i) => (
                                            <div key={i} className={`accrodion wow fadeInUp ${item.open}`} data-wow-delay={item.delay} data-wow-duration={item.duration}>
                                                <div class="accrodion-title">
                                                    <div class="accrodion-title-inner">
                                                        <div class="icon">
                                                            <span class="icon-maps-and-flags"></span>
                                                        </div>
                                                        <div class="text">
                                                            <h4>{item.heading}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="accrodion-content">
                                                    <div class="inner">
                                                        <div class="img-box">
                                                            <img src={item.image} alt={item.alt} />
                                                        </div>
                                                        <div class="text">
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Faq One Content */}

                        {/* Start Faq One Img */}
                        <div class="col-xl-5">
                            <div class="faq-one__img">
                                <img src="/assets/images/resources/faq-v1-img2.jpg" alt="" />
                            </div>
                        </div>
                        {/* End Faq One Img */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FaqOne;
