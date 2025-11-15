import SEO from "../common/seo/Seo";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import GalleryDetails from "../components/gallery/GalleryDetails";
import CtaOne from "../components/cta/CtaOne";
import FooterOne from "../common/footer/FooterOne";
import HeaderOne from "@/common/header/HeaderOne";

export default function GalleryDetailsPage() {
	return (
		<>
			<SEO pageTitle={"Detail Galeri"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Detail Galeri"
                currentPage="Detail Galeri" 
            />
			<GalleryDetails />
			<CtaOne />
			<FooterOne />
		</>
	);
}


