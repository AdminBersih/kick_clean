import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import GalleryTwo from "../components/gallery/GalleryTwo";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function GalleryOnePage() {
	return (
		<>
			<SEO pageTitle={"Galeri 02"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Galeri 02"
                currentPage="Galeri 02" 
            />
			<GalleryTwo />
			<CtaOne />
			<FooterOne />
		</>
	);
}


