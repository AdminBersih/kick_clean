import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import CuciSepatu from "../components/service/CuciSepatu";
import FooterOne from "../common/footer/FooterOne";

export default function CuciSepatuPage() {
    return (
        <>
            <SEO pageTitle={"Cuci Sepatu (Shoes Treatment)"} />
            <HeaderOne />
            <Breadcrumb heading="Cuci Sepatu (Shoes Treatment)" currentPage="Cuci Sepatu" />
            <CuciSepatu />
            <ContactOne />
            <FooterOne />
        </>
    );
}
