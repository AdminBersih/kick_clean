import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import AboutOne from "../components/about/AboutOne";
import ServiceOne from "../components/service/ServiceOne";
import ContactOne from "../components/contact/ContactOne";
import TeamOne from "../components/team/TeamOne";
import FooterOne from "../common/footer/FooterOne";

export default function AboutPage() {
	return (
		<>
			<SEO pageTitle={"Tentang"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Tentang Kick Clean"
                currentPage="Tentang" 
            />
			<AboutOne />
			<ServiceOne />
			<ContactOne />
			<TeamOne />
			<FooterOne />
		</>
	);
}


