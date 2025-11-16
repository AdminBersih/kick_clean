import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ServiceOne from "../components/service/ServiceOne";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function ServicePageOne() {
	return (
		<>
			<SEO pageTitle={"Daftar Layanan Kick Clean"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Daftar Layanan Kick Clean"
                currentPage="Jasa Kick Clean" 
            />
			<ServiceOne />
			<CtaOne />
			<FooterOne />
		</>
	);
}

