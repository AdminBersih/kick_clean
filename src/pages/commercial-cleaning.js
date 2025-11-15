import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import CommercialCleaning from "../components/service/CommercialCleaning";
import FooterOne from "../common/footer/FooterOne";

export default function LibraryBusinessPage() {
	return (
		<>
			<SEO pageTitle={"Reglue Sepatu"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Reglue Sepatu"
                currentPage="Reglue Sepatu" 
            />
			<CommercialCleaning />
			<FooterOne />
		</>
	);
}


