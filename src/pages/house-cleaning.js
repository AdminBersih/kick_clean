import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import HouseCleaning from "../components/service/HouseCleaning";
import FooterOne from "../common/footer/FooterOne";

export default function BusinessOptionsPage() {
	return (
		<>
			<SEO pageTitle={"Treatment Sepatu & Tas"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Treatment Sepatu & Tas"
                currentPage="Treatment Sepatu & Tas" 
            />
			<HouseCleaning />
			<FooterOne />
		</>
	);
}


