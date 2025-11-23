import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../common/auth/AuthContext';

const ContactOne = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("kickclean-contact");
        if (!stored) return;

        try {
            const parsed = JSON.parse(stored);
            setFormData((prev) => ({ ...prev, ...parsed }));
        } catch (error) {
            // ignore corrupted storage
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        setFormData((prev) => ({
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
        }));
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            localStorage.setItem("kickclean-contact", JSON.stringify(formData));
        } catch (err) {
            // ignore storage errors
        }
        router.push("/service-pick");
    };

    return (
        <>
        
        <section className="contact-one pd-120-0-120" id='contact-one'>
            <div className="contact-one__bg jarallax" data-jarallax data-speed="0.2" data-imgposition="50% 0%">
            </div>
            <div className="contact-one__img wow slideInRight" data-wow-delay="500ms" data-wow-duration="2500ms"><img src="/assets/images/resources/contact-v1-img1.png" alt="" /></div>
            <div className="container">
                <div className="row">
                    {/* Start Contact One Form Box */}
                    <div className="col-xl-8">
                        <div className="contact-one__form-box">
                            <div className="section-title">
                                <span className="section-title__tagline">Pesan Layanan</span>
                                <h2 className="section-title__title">Kirim Pesan & Booking Layanan</h2>
                            </div>
                            <form id="contact-form" name="contact_form" className="default-form2" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Nama lengkap"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Nomor WhatsApp"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="input-box">
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Alamat penjemputan"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6 text-center">
                                        <div className="button-box">
                                            <input id="form_botcheck" name="form_botcheck" className="form-control" type="hidden" defaultValue="" />
                                            <button className="thm-btn" type="submit" data-loading-text="Mohon tunggu...">
                                                <span>Konfirmasi</span>
                                                <i className="liquid"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    {/* End Contact One Form Box */}
                </div>
            </div>
        </section>

        </>
    )
}

export default ContactOne;
