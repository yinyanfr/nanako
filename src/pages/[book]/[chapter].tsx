import { ContentReader } from "@/components";
import { convertContentCC, getContents } from "@/lib/server";
import {
  BookOutlined,
  FileTextOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import type { GetServerSideProps } from "next/types";
import Link from "next/link";
import path from "path";
import type { FC } from "react";
import { useState } from "react";
import nookies from "nookies";
import { ReaderContext } from "@/lib/client";

// __dirname in built file: .next/server/pages/[book]/[chapter].js
const docPath = path.join(__dirname, "..", "..", "..", "..", "docs");

interface ChapterProps {
  content: ContentPayload;
  cookies: Record<string, string>;
}

const Chapter: FC<ChapterProps> = ({ content, cookies }) => {
  const [fontSize, setFontSize] = useState(parseInt(cookies.fontSize) || 14);

  return (
    <main>
      <Breadcrumb>
        <Breadcrumb.Item key="/">
          <Link href="/">
            <a>
              <HomeOutlined />
            </a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key={content.bookPath}>
          <Link href={`/${content.bookPath}`}>
            <a>
              <BookOutlined /> {content.bookTitle}
            </a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key={content.chapterPath}>
          <a>
            <FileTextOutlined /> {content.chapterTitle}
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <ReaderContext.Provider value={{ fontSize, setFontSize }}>
        <ContentReader content={content} />
      </ReaderContext.Provider>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<ChapterProps> = async (
  context
) => {
  const { book, chapter } = context.params || {};
  const content = await getContents(docPath, book as string, chapter as string);
  const cookies = nookies.get(context);

  return {
    props: {
      content:
        context.locale === "zh-Hant" ? convertContentCC(content) : content,
      cookies,
    },
  };
};

export default Chapter;
