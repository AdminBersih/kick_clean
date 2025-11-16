const menu_data = [
    {
      id: 1,
      has_dropdown: false,
      title: "Beranda",
      link: "/",
    },
    {
      id: 2,
      has_dropdown: false,
      title: "Tentang",
      link: "/about",
    },
    {
      id: 3,
      has_dropdown: true,
      title: "Jasa",
      link: "#",
      sub_menus: [
        { link: "/service-one", title: "Jasa Kick Clean 01" },
        { link: "/bedroom-cleaning", title: "Cuci Sepatu" },
        { link: "/window-cleaning", title: "Cuci Topi & Tas" },
        { link: "/office-cleaning", title: "Repaint Sepatu & Topi" },
        { link: "/commercial-cleaning", title: "Reglue Sepatu" },
        { link: "/house-cleaning", title: "Treatment Sepatu & Tas" },
        { link: "/car-cleaning", title: "Antar Jemput" },
      ],
    },
    {
      id: 4,
      mega_menu: false,
      has_dropdown: true,
      title: "Halaman",
      link: "#",
      sub_menus: [
        { link: "/project", title: "Portofolio" },
        { link: "/project-details", title: "Detail Portofolio" },
        { link: "/gallery-two", title: "Galeri 02" },
        { link: "/gallery-details", title: "Detail Galeri" },
        { link: "/faq", title: "FAQ" },
      ],
    },
    {
      id: 5,
      mega_menu: false,
      has_dropdown: false,
      title: "Kontak",
      link: "/contact",
    },
  ];
  export default menu_data;
