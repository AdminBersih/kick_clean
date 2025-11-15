import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import CarCleaning from "../components/service/CarCleaning";
import FooterOne from "../common/footer/FooterOne";

export default function FocusEmergencyPage() {
	return (
		<>
			<SEO pageTitle={"Antar Jemput"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Antar Jemput"
                currentPage="Antar Jemput" 
            />
			<CarCleaning />
			<FooterOne />
		</>
	);
}


