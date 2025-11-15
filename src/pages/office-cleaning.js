import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import OfficeCleaning from "../components/service/OfficeCleaning";
import FooterOne from "../common/footer/FooterOne";

export default function OfficeCleaningPage() {
	return (
		<>
			<SEO pageTitle={"Repaint Sepatu & Topi"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Repaint Sepatu & Topi"
                currentPage="Repaint Sepatu & Topi" 
            />
			<OfficeCleaning />
			<FooterOne />
		</>
	);
}


