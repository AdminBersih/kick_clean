import SEO from "../../common/seo/Seo";
import HeaderOne from "../../common/header/HeaderOne";
import Breadcrumb from "../../common/breadcrumb/Breadcrumb";
import FooterOne from "../../common/footer/FooterOne";
import ServiceOrder from "../../components/order/ServiceOrder";
import { ServiceOneData } from "@/data/service";

export default function OrderPage({ serviceSlug, serviceHeading }) {
    return (
        <>
            <SEO pageTitle={`Order ${serviceHeading || "Layanan"}`} />
            <HeaderOne />
            <Breadcrumb heading={`Order ${serviceHeading}`} currentPage="Order Layanan" />
            <ServiceOrder serviceSlug={serviceSlug} />
            <FooterOne />
        </>
    );
}

export async function getServerSideProps({ params }) {
    const serviceItem = ServiceOneData.find((item) => item.slug === params.service);

    if (!serviceItem) {
        return {
            redirect: {
                destination: "/service-pick",
                permanent: false,
            },
        };
    }

    return {
        props: {
            serviceSlug: params.service,
            serviceHeading: serviceItem.heading,
        },
    };
}
