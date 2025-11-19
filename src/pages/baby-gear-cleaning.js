import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BabyGearCleaning from "../components/service/BabyGearCleaning";
import FooterOne from "../common/footer/FooterOne";

export default function BabyGearCleaningPage() {
    return (
        <>
            <SEO pageTitle={"Baby Gear Cleaning"} />
            <HeaderOne />
            <Breadcrumb heading="Baby Gear Cleaning" currentPage="Baby Gear Cleaning" />
            <BabyGearCleaning />
            <ContactOne />
            <FooterOne />
        </>
    );
}
