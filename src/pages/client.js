import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import BrandThree from "../components/brand/BrandThree";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function ClientPage() {
	return (
		<>
			<SEO pageTitle={"Klien"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Klien Kick Clean"
                currentPage="Klien" 
            />
			<BrandThree />
			<CtaOne />
			<FooterOne />
		</>
	);
}


