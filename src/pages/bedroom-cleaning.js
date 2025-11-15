import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BedroomCleaning from "../components/service/BedroomCleaning";
import FooterOne from "../common/footer/FooterOne";

export default function BusinessGroceryPage() {
	return (
		<>
			<SEO pageTitle={"Cuci Sepatu"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Jasa Cuci Sepatu"
                currentPage="Cuci Sepatu" 
            />
			<BedroomCleaning />
			<FooterOne />
		</>
	);
}


