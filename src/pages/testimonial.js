import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import TestimonialOne from "../components/testimonial/TestimonialOne";
import BrandTwo from "../components/brand/BrandTwo";
import FooterOne from "../common/footer/FooterOne";

export default function TestimonialPage() {
	return (
		<>
			<SEO pageTitle={"Testimoni"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Testimoni"
                currentPage="Testimoni" 
            />
			<TestimonialOne />
			<BrandTwo />
			<FooterOne />
		</>
	);
}

