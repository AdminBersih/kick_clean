import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import AboutOne from "../components/about/AboutOne";
import ServiceOne from "../components/service/ServiceOne";
import ProjectOne from "../components/project/ProjectOne";
import ContactOne from "../components/contact/ContactOne";
import FaqOne from "../components/faq/FaqOne";
import TestimonialOne from "../components/testimonial/TestimonialOne";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";
import HeroTwo from "@/components/hero/HeroTwo";
import FeaturesTwo from "@/components/features/FeaturesTwo";

export default function Home() {
	return (
		<>
			<SEO pageTitle={"Beranda"} />
			<HeaderOne />
      		<HeroTwo />
			<AboutOne />
			<FeaturesTwo />
			<ServiceOne />
			<ProjectOne />
			<ContactOne />
			<FaqOne />
			<TestimonialOne />
			<CtaOne />
			<FooterOne />
		</>
	);
}


