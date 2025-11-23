import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ServicePicker from "../components/service/ServicePicker";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function ServicePageOne() {
	return (
		<>
			<SEO pageTitle={"Daftar Layanan Kick Clean"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Pilih Layanan"
                currentPage="Pilihan Layanan" 
            />
			<ServicePicker />
			<CtaOne />
			<FooterOne />
		</>
	);
}

