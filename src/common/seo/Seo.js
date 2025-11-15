import Head from "next/head";

const SEO = ({ pageTitle }) => (
    <>
        <Head>
            <title>
                {pageTitle && `${pageTitle} || Kick Clean Gentan | Jasa Cuci Sepatu & Tas`}
            </title>
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="Kick Clean Gentan - layanan cuci sepatu, tas, topi, repaint, dan reglue profesional di Gentan, Sukoharjo." />
            <meta name="robots" content="noindex, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
    </>
);

export default SEO;
