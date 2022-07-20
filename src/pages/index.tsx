import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Divider } from "antd";
import type { GetServerSideProps } from "next/types";
import Head from "next/head";
import type { FC } from "react";
import { Fragment, useId } from "react";
import styles from "../styles/Home.module.css";
import { getMenu } from "@/lib/server";
import path from "path";
import nookies from "nookies";
import Link from "next/link";
import { useRouter } from "next/router";

interface HomeProps {
  menu: Record<string, MenuPayload[]>;
  cookies: Record<string, string>;
}

// __dirname in built file: .next/server/pages/index.js
const docPath = path.join(__dirname, "..", "..", "..", "docs");

const translations: Record<string, string> = {
  novel: "小说",
  casual: "随笔",
  tutorial: "教程",
  uncategorized: "未分类",
};

const Home: FC<HomeProps> = ({ menu }) => {
  const id = useId();
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>咕噜咕噜喵儿</title>
        <meta key="description" name="description" content="类似于博客的东西" />
        <meta key="title" property="og:title" content="咕噜咕噜喵儿" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Breadcrumb>
        <Breadcrumb.Item key="/">
          <HomeOutlined />
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="container">
        <h1>小更新姬的博客</h1>

        {["novel", "casual", "tutorial", "uncategorized"].map((e) => (
          <Fragment key={e}>
            <h2>{translations[e]}</h2>
            <Card>
              {menu[e]?.length ? (
                menu[e].map((book) => (
                  <Card.Grid
                    key={`${id}-${e}-${book.pathName}`}
                    className={styles["card-grid"]}
                    onClick={() => {
                      router.push(`/${book.pathName}`);
                    }}
                  >
                    <a>
                      <BookOutlined /> {book.title}
                    </a>
                  </Card.Grid>
                ))
              ) : (
                <div className={styles.empty}>暂无</div>
              )}
            </Card>

            <Divider />
          </Fragment>
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const menu = await getMenu(docPath);
  const cookies = nookies.get(context);

  return {
    props: {
      menu,
      cookies,
    },
  };
};

export default Home;
