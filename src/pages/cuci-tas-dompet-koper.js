import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import TasDompetKoper from "../components/service/TasDompetKoper";
import FooterOne from "../common/footer/FooterOne";

export default function TasDompetKoperPage() {
    return (
        <>
            <SEO pageTitle={"Cuci Tas, Dompet & Koper"} />
            <HeaderOne />
            <Breadcrumb heading="Cuci Tas, Dompet & Koper" currentPage="Cuci Tas &amp; Koper" />
            <TasDompetKoper />
            <FooterOne />
        </>
    );
}
