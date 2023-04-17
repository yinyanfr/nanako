import "bulma/sass/utilities/_all.sass";
import "@/styles/table.sass";
import "antd/dist/reset.css";
import "@/styles/globals.scss";
import "katex/dist/katex.min.css";

import type { AppProps } from "next/app";
import { Footer } from "@/components";
import CookieConsent from "react-cookie-consent";
import config from "@/nanako.json";

function Nanako({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Component {...pageProps} />
      <Footer />
      {config.cookieConsent ? (
        <CookieConsent
          style={{ background: "white", color: "black" }}
          buttonClasses="ant-btn ant-btn-primary"
          buttonStyle={{
            margin: 15,
          }}
          disableButtonStyles
          buttonText="同意"
        >
          本网站使用Cookie以提升浏览体验。
        </CookieConsent>
      ) : null}
    </div>
  );
}

export default Nanako;
