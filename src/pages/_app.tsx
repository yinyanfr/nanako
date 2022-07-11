import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import withDarkMode from "next-dark-mode";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withDarkMode(MyApp);
