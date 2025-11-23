import React, {useEffect} from 'react';
import { animationCreate } from "../../utils/utils";
import ScrollToTop from "react-scroll-to-top";
import { FaAngleUp } from 'react-icons/fa';
import Head from "next/head";
import { AuthProvider } from "../common/auth/AuthContext";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        setTimeout(() => {
          animationCreate();
        }, 500);
      }, []);
    return (
        <>
          <Head>
                
            </Head>
            <AuthProvider>
              <div className="page-wrapper">
                <Component {...pageProps} />
              </div>
              <ScrollToTop className="scroll-to-top" smooth component={<FaAngleUp />}  />
            </AuthProvider>
        </>
    );
}

export default MyApp;

