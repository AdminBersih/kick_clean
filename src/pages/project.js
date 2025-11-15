import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ProjectOne from "../components/project/ProjectOne";
import FooterOne from "../common/footer/FooterOne";

export default function ProjectPage() {
	return (
		<>
			<SEO pageTitle={"Portofolio"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Portofolio"
                currentPage="Portofolio" 
            />
			<ProjectOne />
			<FooterOne />
		</>
	);
}


