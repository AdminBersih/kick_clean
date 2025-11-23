import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import SpecialTreatment from "../components/service/SpecialTreatment";
import FooterOne from "../common/footer/FooterOne";
import ContactOne from "../components/contact/ContactOne";

export default function SpecialTreatmentPage() {
    return (
        <>
            <SEO pageTitle={"Special Treatment Sepatu"} />
            <HeaderOne />
            <Breadcrumb heading="Special Treatment Sepatu" currentPage="Special Treatment" />
            <SpecialTreatment />
            <ContactOne />
            <FooterOne />
        </>
    );
}
