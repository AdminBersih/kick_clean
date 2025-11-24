import React from 'react';

const ContactMap = () => {
    return (
        <>
            <section className="contact-page-google-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.9067742454504!2d110.7784491!3d-7.5803738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a15000273a66b%3A0x188127a33911bf0d!2sKick%20Clean%20Gentan!5e0!3m2!1sen!2sid!4v1732404892001!5m2!1sen!2sid"
                    className="contact-page-google-map__one"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kick Clean Gentan"></iframe>
            </section>
        </>
    )
}

export default ContactMap;
