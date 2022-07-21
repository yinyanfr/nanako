import dynamic from "next/dynamic";
import { Spin } from "antd";

export { default as ContentReader } from "./ContentReader";
export { default as Footer } from "./Footer";
export { default as NotFound } from "./NotFound";

export const DynamicDarkReader = dynamic(() => import("./DarkToggle"), {
  ssr: false,
  loading: () => <Spin />,
});
