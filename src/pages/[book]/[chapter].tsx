import { ContentReader, DynamicDarkReader, NotFound } from "@/components";
import {
  convertContentCC,
  convertMenuCC,
  getBook,
  getContents,
} from "@/lib/server";
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
import Head from "next/head";

// __dirname in built file: .next/server/pages/[book]/[chapter].js
const docPath = path.join(__dirname, "..", "..", "..", "..", "docs");

interface ChapterProps {
  content?: ContentPayload;
  book?: MenuPayload;
  cookies: Record<string, string>;
}

const Chapter: FC<ChapterProps> = ({ content, book, cookies }) => {
  const [fontSize, setFontSize] = useState(parseInt(cookies.fontSize) || 16);
  const { chapters } = book || {};

  return (
    <main>
      <Head>
        <title>
          {content?.bookTitle} - {content?.chapterTitle}
        </title>
        <meta
          key="title"
          property="og:title"
          content={`${content?.bookTitle} - ${content?.chapterTitle}`}
        />
      </Head>

      <header className="header">
        <Breadcrumb>
          <Breadcrumb.Item key="/">
            <Link href="/">
              <a>
                <HomeOutlined />
              </a>
            </Link>
          </Breadcrumb.Item>
          {content ? (
            <>
              <Breadcrumb.Item key={content?.bookPath}>
                <Link href={`/${content?.bookPath}`}>
                  <a>
                    <BookOutlined /> {content?.bookTitle}
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key={content?.chapterPath}>
                <a>
                  <FileTextOutlined /> {content?.chapterTitle}
                </a>
              </Breadcrumb.Item>
            </>
          ) : null}
        </Breadcrumb>

        <DynamicDarkReader defaultDarken={cookies.theme === "dark"} />
      </header>

      <ReaderContext.Provider value={{ fontSize, setFontSize }}>
        {content ? (
          <ContentReader content={content} chapters={chapters} />
        ) : (
          <NotFound />
        )}
      </ReaderContext.Provider>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<ChapterProps> = async (
  context
) => {
  const { book, chapter } = context.params || {};

  const cookies = nookies.get(context);
  const hant = context.locale === "zh-Hant";

  try {
    const content = await getContents(
      docPath,
      book as string,
      chapter as string
    );
    const bookPayload = await getBook(docPath, book as string);
    return {
      props: {
        content: hant ? convertContentCC(content) : content,
        book: hant ? convertMenuCC(bookPayload) : bookPayload,
        cookies,
      },
    };
  } catch {
    return {
      props: {
        cookies,
      },
    };
  }
};

export default Chapter;
