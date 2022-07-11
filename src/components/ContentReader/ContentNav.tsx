import ReaderContext from "@/lib/ReaderContext";
import {
  BulbOutlined,
  CheckOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  MenuOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDarkMode } from "next-dark-mode";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useId, useMemo, useContext } from "react";
import { setCookie } from "nookies";

interface ContentNavProps {
  content: ContentPayload;
}

const ContentNav: FC<ContentNavProps> = ({ content }) => {
  const id = useId();
  const router = useRouter();
  const { darkModeActive, switchToLightMode, switchToDarkMode } = useDarkMode();
  const { fontSize, setFontSize } = useContext(ReaderContext);

  const summaryItems = useMemo(() => {
    return content?.contents?.map((e) => ({
      key: `${id}-${e.index}`,
      label: <a href={`#${e.index}`}>{e.title}</a>,
    }));
  }, [content, id]);

  const menuItems = [
    {
      key: "summary",
      label: "目录",
      icon: <MenuOutlined />,
      children: summaryItems,
    },
    {
      key: "locale",
      label: "简繁转换",
      icon: <TranslationOutlined />,
      children: [
        {
          key: "zh-Hans",
          label: (
            <Link href={router.asPath} locale="zh-Hans">
              <a>中文简体 {router.locale !== "zh-Hant" && <CheckOutlined />}</a>
            </Link>
          ),
        },
        {
          key: "zh-Hant",
          label: (
            <Link href={router.asPath} locale="zh-Hant">
              <a>中文繁体 {router.locale === "zh-Hant" && <CheckOutlined />}</a>
            </Link>
          ),
        },
      ],
    },
    {
      key: "theme",
      label: "主题",
      icon: <FontColorsOutlined />,
      children: [
        {
          key: "dark",
          label: "模式",
          icon: <BulbOutlined />,
          type: "group",
          children: [
            {
              key: "light",
              label: (
                <a onClick={switchToLightMode}>
                  亮色 {!darkModeActive && <CheckOutlined />}
                </a>
              ),
            },
            {
              key: "dark",
              label: (
                <a onClick={switchToDarkMode}>
                  暗色 {darkModeActive && <CheckOutlined />}
                </a>
              ),
            },
          ],
        },
        {
          key: "fontSize",
          label: "字号",
          icon: <FontSizeOutlined />,
          type: "group",
          children: [12, 14, 16, 18, 20].map((e) => ({
            key: `font-${e}`,
            label: (
              <a
                onClick={() => {
                  setFontSize(e);
                  setCookie(null, "fontSize", `${e}`, { path: "/" });
                }}
              >
                {e} {fontSize === e && <CheckOutlined />}
              </a>
            ),
          })),
        },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      items={menuItems}
      defaultOpenKeys={["summary"]}
      defaultSelectedKeys={[
        `${id}-1`,
        router.locale === "zh-Hant" ? "zh-Hant" : "zh-Hans",
        darkModeActive ? "dark" : "light",
        `font-${fontSize}`,
      ]}
    />
  );
};

export default ContentNav;
