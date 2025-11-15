import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import WindowCleaning from "../components/service/WindowCleaning";
import FooterOne from "../common/footer/FooterOne";

export default function WindowCleaningPage() {
	return (
		<>
			<SEO pageTitle={"Cuci Topi & Tas"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Cuci Topi & Tas"
                currentPage="Cuci Topi & Tas" 
            />
			<WindowCleaning />
			<FooterOne />
		</>
	);
}

