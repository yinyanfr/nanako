import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import type { GetServerSideProps } from "next/types";
import Link from "next/link";
import type { FC } from "react";
import { convertMenuCC, getBook } from "@/lib/server";
import path from "path";
import nookies from "nookies";

interface BookProps {
  book: MenuPayload;
  cookies: Record<string, string>;
}

// __dirname in built file: .next/server/pages/[book].js
const docPath = path.join(__dirname, "..", "..", "..", "docs");

const Book: FC<BookProps> = ({ book }) => {
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
        <Breadcrumb.Item key={book.pathName}>
          <a>
            <BookOutlined /> {book.title}
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<BookProps> = async (
  context
) => {
  const { book } = context.params || {};
  const bookPayload = await getBook(docPath, book as string);
  const cookies = nookies.get(context);

  return {
    props: {
      book:
        context.locale === "zh-Hant" ? convertMenuCC(bookPayload) : bookPayload,
      cookies,
    },
  };
};

export default Book;
