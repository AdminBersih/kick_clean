import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ServiceThree from "../components/service/ServiceThree";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function ServicePageOne() {
	return (
		<>
			<SEO pageTitle={"Jasa Kick Clean 02"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Jasa Kick Clean 02"
                currentPage="Jasa Kick Clean 02" 
            />
			<ServiceThree />
			<CtaOne />
			<FooterOne />
		</>
	);
}

