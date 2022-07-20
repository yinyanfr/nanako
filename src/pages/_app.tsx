import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import withDarkMode from "next-dark-mode";
import { Footer } from "@/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default withDarkMode(MyApp);
