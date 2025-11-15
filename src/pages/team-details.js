import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import TeamDetails from "../components/team/TeamDetails";
import TeamOne from "../components/team/TeamOne";
import ContactFour from "../components/contact/ContactFour";
import FooterOne from "../common/footer/FooterOne";

export default function TeamDetailsPage() {
	return (
		<>
			<SEO pageTitle={"Profil Tim"} />
			<HeaderOne />
			<Breadcrumb 
                heading="Profil Tim"
                currentPage="Profil Tim" 
            />
			<TeamDetails />
			<TeamOne />
			<ContactFour />
			<FooterOne />
		</>
	);
}

