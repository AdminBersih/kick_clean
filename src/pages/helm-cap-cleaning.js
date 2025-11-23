import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import HelmCapCleaning from "../components/service/HelmCapCleaning";
import FooterOne from "../common/footer/FooterOne";
import ContactOne from "../components/contact/ContactOne";

export default function HelmCapCleaningPage() {
    return (
        <>
            <SEO pageTitle={"Cuci Helm & Cap"} />
            <HeaderOne />
            <Breadcrumb heading="Cuci Helm & Cap" currentPage="Cuci Helm & Cap" />
            <HelmCapCleaning />
            <ContactOne />
            <FooterOne />
        </>
    );
}
