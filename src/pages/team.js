import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import TeamThree from "../components/team/TeamThree";
import FooterOne from "../common/footer/FooterOne";

export default function TeamPage() {
	return (
		<>
			<SEO pageTitle={"Tim"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Tim Kick Clean"
                currentPage="Tim" 
            />
			<TeamThree />
			<FooterOne />
		</>
	);
}

