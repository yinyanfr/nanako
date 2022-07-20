import { ReaderContext } from "@/lib/client";
import {
  FileTextOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  MenuOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Dispatch, FC, SetStateAction } from "react";
import { useId, useMemo, useContext, useState, useEffect } from "react";
import { setCookie } from "nookies";
import { useResponsive } from "ahooks";

interface ContentNavProps {
  content: ContentPayload;
  chapters: MenuPayload["chapters"];
  scrollIndex: number;
  setScrollIndex: Dispatch<SetStateAction<number>>;
}

const ContentNav: FC<ContentNavProps> = ({
  content,
  chapters,
  scrollIndex,
  setScrollIndex,
}) => {
  const id = useId();
  const router = useRouter();
  const { fontSize, setFontSize } = useContext(ReaderContext);
  const responsive = useResponsive();

  const [openedKeys, setOpenedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (responsive.lg) {
      setOpenedKeys(["summary", "chapters"]);
    }
  }, [responsive?.lg]);

  const summaryItems = useMemo(() => {
    return content?.contents?.map((e) => ({
      key: `${id}-${e.index}`, // starting from 1
      label: (
        <a
          href={`#${e.index}`}
          onClick={() => {
            setScrollIndex(e.index - 1); // starting from 0
          }}
        >
          {e.title}
        </a>
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, id]);

  const chapterItems = useMemo(() => {
    return chapters.map((e) => ({
      key: e.pathName,
      label: (
        <Link href={`/${router.query.book}/${e.pathName}`}>
          <a>
            {e.index}. {e.title}
          </a>
        </Link>
      ),
    }));
  }, [chapters, router.query]);

  const menuItems = [
    {
      key: "summary",
      label: "目录",
      icon: <MenuOutlined />,
      children: summaryItems,
    },
    {
      key: "chapters",
      label: "章节",
      icon: <FileTextOutlined />,
      children: chapterItems,
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
              <a>中文简体</a>
            </Link>
          ),
        },
        {
          key: "zh-Hant",
          label: (
            <Link href={router.asPath} locale="zh-Hant">
              <a>中文繁体</a>
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
          key: "fontSize",
          label: "字号",
          icon: <FontSizeOutlined />,
          type: "group",
          children: [14, 16, 18, 20, 22].map((e) => ({
            key: `font-${e}`,
            label: (
              <a
                onClick={() => {
                  setFontSize(e);
                  setCookie(null, "fontSize", `${e}`, { path: "/" });
                }}
              >
                {e}
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
      selectedKeys={[
        `${id}-${scrollIndex + 1}`,
        router.query.chapter as string,
        router.locale === "zh-Hant" ? "zh-Hant" : "zh-Hans",
        `font-${fontSize}`,
      ]}
      openKeys={openedKeys}
      onOpenChange={(openedKeys) => {
        setOpenedKeys(openedKeys);
      }}
    />
  );
};

export default ContentNav;
