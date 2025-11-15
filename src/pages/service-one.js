import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ServiceOne from "../components/service/ServiceOne";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function ServicePageOne() {
	return (
		<>
			<SEO pageTitle={"Jasa Kick Clean 01"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Jasa Kick Clean 01"
                currentPage="Jasa Kick Clean 01" 
            />
			<ServiceOne />
			<CtaOne />
			<FooterOne />
		</>
	);
}

