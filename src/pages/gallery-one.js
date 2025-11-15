import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import GalleryOne from "../components/gallery/GalleryOne";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";

export default function GalleryOnePage() {
	return (
		<>
			<SEO pageTitle={"Galeri 01"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Galeri 01"
                currentPage="Galeri 01" 
            />
			<GalleryOne />
			<CtaOne />
			<FooterOne />
		</>
	);
}


