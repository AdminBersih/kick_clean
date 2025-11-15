const baseTestimonials = [
    {
        id: 1,
        image: "/assets/images/testimonial/testimonials-v1-img1.png",
        alt: "Testimoni Kick Clean",
        name: "Aditya Nugroho",
        position: "Pecinta Sneaker",
        description: "Sepatu putih saya kembali cling dan wangi. Progresnya selalu di-update lewat WhatsApp, jadi nyaman banget.",
    },
    {
        id: 2,
        image: "/assets/images/testimonial/testimonials-v1-img2.png",
        alt: "Testimoni Kick Clean",
        name: "Galuh Permata",
        position: "Pemilik Toko Thrift",
        description: "Tas canvas pelanggan saya dicuci tanpa merusak bentuk. Layanan jemputnya juga cepat.",
    },
    {
        id: 3,
        image: "/assets/images/testimonial/testimonials-v1-img3.png",
        alt: "Testimoni Kick Clean",
        name: "Yoga Kurnia",
        position: "Komunitas Basket Sukoharjo",
        description: "Tim Kick Clean berhasil reglue outsole basket shoes saya dan terasa kuat lagi dipakai latihan.",
    },
];

// Testimonial One
export const TestimonialOneData = baseTestimonials.concat(baseTestimonials, baseTestimonials);

const testimonialTwoImages = [
    "/assets/images/testimonial/testimonials-v2-thumb-img1.jpg",
    "/assets/images/testimonial/testimonials-v2-thumb-img2.jpg",
    "/assets/images/testimonial/testimonials-v2-thumb-img3.jpg",
];

// Testimonial Two
export const TestimonialTwoData = baseTestimonials.concat(baseTestimonials).map((item, index) => ({
    id: index + 1,
    image: testimonialTwoImages[index % testimonialTwoImages.length],
    alt: item.alt,
    name: item.name,
    position: item.position,
    description: item.description,
}));
