import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import AntarJemput from "../components/service/AntarJemput";
import FooterOne from "../common/footer/FooterOne";

export default function AntarJemputPage() {
    return (
        <>
            <SEO pageTitle={"Antar Jemput & FREE DELIVERY"} />
            <HeaderOne />
            <Breadcrumb heading="Antar Jemput & FREE DELIVERY" currentPage="Antar Jemput" />
            <AntarJemput />
            <FooterOne />
        </>
    );
}
