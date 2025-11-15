import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import ProjectDetails from "../components/project/ProjectDetails";
import FooterOne from "../common/footer/FooterOne";

export default function ProjectDetailsPage() {
	return (
		<>
			<SEO pageTitle={"Detail Portofolio"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Detail Portofolio"
                currentPage="Detail Portofolio" 
            />
			<ProjectDetails />
			<FooterOne />
		</>
	);
}


