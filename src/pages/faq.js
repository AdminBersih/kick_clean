import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import FaqOne from "../components/faq/FaqOne";
import ContactTwo from "../components/contact/ContactTwo";
import FooterOne from "../common/footer/FooterOne";

export default function FaqPage() {
	return (
		<>
			<SEO pageTitle={"FAQ"} />
			<HeaderOne />
			<Breadcrumb 
                heading="FAQ"
                currentPage="FAQ" 
            />
			<FaqOne />
			<ContactTwo />
			<FooterOne />
		</>
	);
}


