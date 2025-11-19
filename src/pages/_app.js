import React, {useEffect} from 'react';
import { animationCreate } from "../../utils/utils";
import ScrollToTop from "react-scroll-to-top";
import { FaAngleUp } from 'react-icons/fa';
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
        setTimeout(() => {
          animationCreate();
        }, 500);
      }, []);
    return (
        <>
          <Head>
                
            </Head>
            <div className="page-wrapper">
              <Component {...pageProps} />
            </div>
            <ScrollToTop className="scroll-to-top" smooth component={<FaAngleUp />}  />
        </>
    );
}

export default MyApp;

