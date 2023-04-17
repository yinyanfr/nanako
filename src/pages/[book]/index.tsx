import {
  BookOutlined,
  DownloadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Collapse, Divider, List } from "antd";
import type { GetServerSideProps } from "next/types";
import Link from "next/link";
import type { FC } from "react";
import { useId } from "react";
import { convertMenuCC, getBook } from "@/lib/server";
import path from "path";
import nookies from "nookies";
import Head from "next/head";
import { DynamicDarkReader, NotFound } from "@/components";

interface BookProps {
  book?: MenuPayload;
  cookies: Record<string, string>;
}

// __dirname in built file: .next/server/pages/[book].js
const docPath = path.join(__dirname, "..", "..", "..", "docs");

const Book: FC<BookProps> = ({ book, cookies }) => {
  const id = useId();

  return (
    <main>
      <Head>
        <title>{book?.title}</title>
        <meta key="title" property="og:title" content={book?.title} />
      </Head>
      <header className="header">
        <Breadcrumb
          items={[
            {
              key: "/",
              title: <HomeOutlined />,
            },
            {
              key: book?.pathName,
              title: (
                <a>
                  <BookOutlined /> {book?.title}
                </a>
              ),
            },
          ]}
        />

        <DynamicDarkReader defaultDarken={cookies.theme === "dark"} />
      </header>

      <div className="container">
        {book ? (
          <>
            <h1>{book?.title}</h1>

            <h2>目录</h2>
            <Collapse bordered={false}>
              {book?.chapters.map((e) => (
                <Collapse.Panel
                  key={`${id}-chapters-${e.pathName}`}
                  header={e.title}
                >
                  <List
                    dataSource={e.sections}
                    renderItem={(item) => (
                      <div className="underlined">
                        <Link
                          key={`${id}-${item.index}`}
                          href={`/${book.pathName}/${e.pathName}${
                            item.index === 1 ? "" : "#" + item.index
                          }`}
                        >
                          <List.Item>{item.title}</List.Item>
                        </Link>
                      </div>
                    )}
                  />
                </Collapse.Panel>
              ))}
            </Collapse>

            <Divider />

            <h2>下载</h2>
            <Collapse
              bordered={false}
              defaultActiveKey={book?.chapters
                .filter((e) => e.archives?.length)
                .map((e) => `${id}-archives-${e.pathName}`)}
            >
              {book?.chapters?.map((e) => (
                <Collapse.Panel
                  key={`${id}-archives-${e.pathName}`}
                  header={e.title}
                >
                  <List
                    dataSource={e.archives}
                    renderItem={(item) => (
                      <a
                        href={`/api/archive?book=${book?.pathName}&chapter=${e.pathName}&archive=${item}`}
                      >
                        <List.Item>
                          <DownloadOutlined /> {item}
                        </List.Item>
                      </a>
                    )}
                  />
                </Collapse.Panel>
              ))}
            </Collapse>
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<BookProps> = async (
  context
) => {
  const { book } = context.params || {};
  const cookies = nookies.get(context);

  try {
    const bookPayload = await getBook(docPath, book as string);
    return {
      props: {
        book:
          context.locale === "zh-Hant"
            ? convertMenuCC(bookPayload)
            : bookPayload,
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

export default Book;
