import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import HeroOne from "../components/hero/HeroOne";
import AboutOne from "../components/about/AboutOne";
import ServiceOne from "../components/service/ServiceOne";
import ProjectOne from "../components/project/ProjectOne";
import ContactOne from "../components/contact/ContactOne";
import TeamOne from "../components/team/TeamOne";
import FaqOne from "../components/faq/FaqOne";
import TestimonialOne from "../components/testimonial/TestimonialOne";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function Home() {
	return (
		<>
			<SEO pageTitle={"Beranda"} />
			<HeaderOne />
      		<HeroOne />
			<AboutOne />
			<ServiceOne />
			<ProjectOne />
			<ContactOne />
			<TeamOne />
			<FaqOne />
			<TestimonialOne />
			<CtaOne />
			<FooterOne />
		</>
	);
}


