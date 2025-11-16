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
        { link: "/service-one", title: "Semua Jasa" },
        { link: "/cuci-sepatu", title: "Cuci Sepatu (Shoes Treatment)" },
        { link: "/special-treatment", title: "Special Treatment Sepatu" },
        { link: "/cuci-tas-dompet-koper", title: "Cuci Tas, Dompet & Koper" },
        { link: "/baby-gear-cleaning", title: "Baby Gear Cleaning" },
        { link: "/helm-cap-cleaning", title: "Cuci Helm & Cap" },
        { link: "/antar-jemput", title: "Antar Jemput & FREE DELIVERY" },
      ],
    },
    {
      id: 4,
      mega_menu: false,
      has_dropdown: false,
      title: "Portofolio",
      link: "/project",
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
