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
import { useRouter } from "next/router";
import { DynamicDarkReader } from "@/components";
import config from "@/nanako.json";

interface HomeProps {
  menu?: Record<string, MenuPayload[]>;
  cookies: Record<string, string>;
}

// __dirname in built file: .next/server/pages/index.js
const docPath = path.join(__dirname, "..", "..", "..", "docs");

const translations: Record<string, string> = config.categories;

const Home: FC<HomeProps> = ({ menu, cookies }) => {
  const id = useId();
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>{config.headTitle}</title>
        <meta key="description" name="description" content="类似于博客的东西" />
        <meta key="title" property="og:title" content="咕噜咕噜喵儿" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <Breadcrumb>
          <Breadcrumb.Item key="/">
            <HomeOutlined />
          </Breadcrumb.Item>
        </Breadcrumb>

        <DynamicDarkReader defaultDarken={cookies.theme === "dark"} />
      </header>

      <div className="container">
        <h1>{config.title}</h1>

        {Object.keys(config.categories).map((e) => (
          <Fragment key={e}>
            <h2>{translations[e]}</h2>
            <Card>
              {menu?.[e]?.length ? (
                menu?.[e]?.map((book) => (
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
  const cookies = nookies.get(context);

  try {
    const menu = await getMenu(docPath);
    return {
      props: {
        menu,
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

export default Home;
