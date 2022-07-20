import dynamic from "next/dynamic";
import { Spin } from "antd";
import type { ComponentType, PropsWithChildren } from "react";
import { ReactScrollDetectProps } from "react-scroll-detect";
export { default as ContentReader } from "./ContentReader";

export const DynamicReactScrollDetect: ComponentType<
  PropsWithChildren<ReactScrollDetectProps>
> = dynamic(() => import("react-scroll-detect"), {
  ssr: false,
  loading: () => <Spin />,
});

export const DynamicDetectScroll: ComponentType<PropsWithChildren> = dynamic(
  () => import("react-scroll-detect").then((mod) => mod.DetectSection),
  {
    ssr: false,
    loading: () => <Spin />,
  }
);
