export const serviceSidebarLinks = [
    { href: "/cuci-sepatu", label: "Cuci Sepatu (Shoes Treatment)" },
    { href: "/special-treatment", label: "Special Treatment Sepatu" },
    { href: "/cuci-tas-dompet-koper", label: "Cuci Tas, Dompet & Koper" },
    { href: "/baby-gear-cleaning", label: "Baby Gear Cleaning" },
    { href: "/helm-cap-cleaning", label: "Cuci Helm & Cap" },
];

// Cards untuk landing layanan (tanpa antar jemput)
export const ServiceOneData = [
    {
        id: 1,
        icon: "icon-house",
        image: "/assets/images/services/services-v1-img1.png",
        alt: "Cuci Sepatu Kick Clean",
        heading: "Cuci Sepatu (Shoes Treatment)",
        description: "Deep clean sepatu harian dengan chemical aman untuk canvas, knit, leather, suede, dan nubuck.",
        slug: "cuci-sepatu",
        link: "/cuci-sepatu",
        delay: "0ms",
        duration: "1500ms",
    },
    {
        id: 2,
        icon: "icon-flat",
        image: "/assets/images/services/services-v1-img2.png",
        alt: "Special Treatment Kick Clean",
        heading: "Special Treatment Sepatu",
        description: "Layanan ekspres, un-yellowing, repaint, hingga reglue untuk sepatu favoritmu.",
        slug: "special-treatment",
        link: "/special-treatment",
        delay: "100ms",
        duration: "1500ms",
    },
    {
        id: 3,
        icon: "icon-window-cleaning",
        image: "/assets/images/services/services-v1-img3.png",
        alt: "Cuci tas dompet koper",
        heading: "Cuci Tas, Dompet & Koper",
        description: "Perawatan lembut tas, dompet, carrier, dan koper dengan metode manual yang aman.",
        slug: "cuci-tas-dompet-koper",
        link: "/cuci-tas-dompet-koper",
        delay: "200ms",
        duration: "1500ms",
    },
    {
        id: 4,
        icon: "icon-house-1",
        image: "/assets/images/services/services-v1-img4.png",
        alt: "Baby gear cleaning",
        heading: "Baby Gear Cleaning",
        description: "Stroller, bouncer, dan car seat kembali higienis dengan chemical yang ramah anak.",
        slug: "baby-gear-cleaning",
        link: "/baby-gear-cleaning",
        delay: "300ms",
        duration: "1500ms",
    },
    {
        id: 5,
        icon: "icon-carpet-cleaner",
        image: "/assets/images/services/services-v1-img5.png",
        alt: "Cuci helm dan cap",
        heading: "Cuci Helm & Cap",
        description: "Bebas bau apek untuk helm dan topi, menjaga bentuk dan kenyamanan dipakai lagi.",
        slug: "helm-cap-cleaning",
        link: "/helm-cap-cleaning",
        delay: "400ms",
        duration: "1500ms",
    },
];

export const ServiceCategoryCards = [
    {
        id: "shoes-treatment",
        slug: "cuci-sepatu",
        heading: "Shoes Treatment",
        description: "Cuci sepatu harian hingga material khusus dengan paket Lite sampai Suede Treatment.",
        image: "/assets/images/services/services-v1-img1.png",
        icon: "icon-house",
        link: "/cuci-sepatu",
        alt: "Shoes treatment Kick Clean",
        delay: "0ms",
        duration: "1500ms",
    },
    {
        id: "special-treatment",
        slug: "special-treatment",
        heading: "Special Treatment",
        description: "Express, repaint, reglue, hingga un-yellowing untuk sepatu favoritmu.",
        image: "/assets/images/services/services-v1-img2.png",
        icon: "icon-flat",
        link: "/special-treatment",
        alt: "Special treatment Kick Clean",
        delay: "100ms",
        duration: "1500ms",
    },
    {
        id: "other-treatment",
        slug: "cuci-tas-dompet-koper",
        heading: "Other Treatment",
        description: "Tas, koper, baby gear, helm & cap dengan perawatan aman sesuai material.",
        image: "/assets/images/services/services-v1-img3.png",
        icon: "icon-window-cleaning",
        link: "/cuci-tas-dompet-koper",
        alt: "Other treatment Kick Clean",
        delay: "200ms",
        duration: "1500ms",
    },
];

export const servicesCatalog = [
    { name: "Lite Clean", category: "Shoes Treatment", price: 30000, duration: "2 hari", description: "Cuci sepatu bagian upper dan midsole." },
    { name: "Deep Clean", category: "Shoes Treatment", price: 35000, duration: "3-4 hari", description: "Cuci bersih semua bagian sepatu seperti outsole, midsole, insole, tali sepatu." },
    { name: "White Shoes", category: "Shoes Treatment", price: 40000, duration: "3-4 hari", description: "Cuci bersih semua bagian sepatu berwarna putih." },
    { name: "Women & Kids", category: "Shoes Treatment", price: 30000, duration: "2-3 hari", description: "Cuci bersih sepatu anak (size <35) dan sepatu wanita." },
    { name: "Boots & Outdoors", category: "Shoes Treatment", price: 50000, duration: "4-6 hari", description: "Menghilangkan noda lumpur atau basah pada sepatu." },
    { name: "Suede Treatment", category: "Shoes Treatment", price: 55000, duration: "3-4 hari", description: "Cuci sepatu berbahan suede leather dan nubuck." },
    { name: "Sepatu Roda", category: "Shoes Treatment", price: 50000, duration: "3-4 hari", description: "Cuci sepatu roda." },
    { name: "OneDay Service", category: "Special Treatment", price: 45000, duration: "24 jam", description: "Cuci bersih seluruh bagian sepatu, selesai dalam 24 jam." },
    { name: "Express Service", category: "Special Treatment", price: 50000, duration: "6 jam", description: "Cuci bersih seluruh bagian sepatu, selesai dalam 6 jam." },
    { name: "Premium Clean", category: "Special Treatment", price: 60000, duration: "3-4 hari", description: "Cuci bersih sepatu menggunakan cleaner premium (Jason Mark / Creep)." },
    { name: "Un-Yellowing Midsole", category: "Special Treatment", price: 65000, duration: "3-4 hari", description: "Menghilangkan warna kuning pada midsole, termasuk Fast Clean." },
    { name: "Reglue", category: "Special Treatment", price: 35000, duration: "3-4 hari", description: "Lem ulang midsole/outsole sepatu, termasuk Lite Clean." },
    { name: "Repaint Suede", category: "Special Treatment", price: 100000, duration: "3-4 hari", description: "Repaint semua jenis sepatu suede, termasuk Deep Clean." },
    { name: "Repaint Canvas, Mesh, Leather", category: "Special Treatment", price: 80000, duration: "3-4 hari", description: "Repaint canvas, mesh, dan leather, termasuk Deep Clean." },
    { name: "Bag & Wallet - Small", category: "Other Treatment", price: 30000, duration: "2-3 hari", description: "Treatment tas kecil dan dompet." },
    { name: "Bag & Wallet - Medium", category: "Other Treatment", price: 40000, duration: "2-3 hari", description: "Treatment tas ukuran medium." },
    { name: "Bag & Wallet - Large", category: "Other Treatment", price: 50000, duration: "2-3 hari", description: "Treatment tas ukuran besar." },
    { name: "Tas Gunung", category: "Other Treatment", price: 55000, duration: "2-3 hari", description: "Treatment tas gunung." },
    { name: "Koper - Small", category: "Other Treatment", price: 60000, duration: "Maks. 7 hari", description: "Treatment koper kecil." },
    { name: "Koper - Medium", category: "Other Treatment", price: 70000, duration: "Maks. 7 hari", description: "Treatment koper ukuran medium." },
    { name: "Koper - Large", category: "Other Treatment", price: 80000, duration: "Maks. 7 hari", description: "Treatment koper besar." },
    { name: "Stroller", category: "Other Treatment", price: 100000, duration: "4-6 hari", description: "Treatment stroller bayi." },
    { name: "Bouncer", category: "Other Treatment", price: 80000, duration: "4-6 hari", description: "Treatment bouncer bayi." },
    { name: "Car Seat", category: "Other Treatment", price: 70000, duration: "4-6 hari", description: "Treatment car seat bayi." },
    { name: "Helm", category: "Other Treatment", price: 40000, duration: "3-5 hari", description: "Treatment helm." },
    { name: "Cap", category: "Other Treatment", price: 25000, duration: "1 hari", description: "Treatment cap/topi." },
];

const slugToNames = {
    "cuci-sepatu": ["Lite Clean", "Deep Clean", "White Shoes", "Women & Kids", "Boots & Outdoors", "Suede Treatment", "Sepatu Roda"],
    "special-treatment": [
        "OneDay Service",
        "Express Service",
        "Premium Clean",
        "Un-Yellowing Midsole",
        "Reglue",
        "Repaint Suede",
        "Repaint Canvas, Mesh, Leather",
    ],
    "cuci-tas-dompet-koper": [
        "Bag & Wallet - Small",
        "Bag & Wallet - Medium",
        "Bag & Wallet - Large",
        "Tas Gunung",
        "Koper - Small",
        "Koper - Medium",
        "Koper - Large",
    ],
    "baby-gear-cleaning": ["Stroller", "Bouncer", "Car Seat"],
    "helm-cap-cleaning": ["Helm", "Cap"],
};

const makeId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const ServicePricingOptions = Object.entries(slugToNames).reduce((acc, [slug, names]) => {
    acc[slug] = names
        .map((name) => servicesCatalog.find((item) => item.name === name))
        .filter(Boolean)
        .map((item) => ({
            id: makeId(item.name),
            name: item.name,
            label: `${item.name} - Rp${item.price.toLocaleString("id-ID")}`,
            price: item.price,
            note: `${item.duration} · ${item.description}`,
        }));
    return acc;
}, {});

export const OtherTreatmentGroups = [
    {
        id: "bag-wallet",
        label: "Bag & Wallet",
        names: ["Bag & Wallet - Small", "Bag & Wallet - Medium", "Bag & Wallet - Large"],
    },
    {
        id: "tas-gunung",
        label: "Tas Gunung",
        names: ["Tas Gunung"],
    },
    {
        id: "koper",
        label: "Koper",
        names: ["Koper - Small", "Koper - Medium", "Koper - Large"],
    },
];

export default servicesCatalog;
