import { ReaderContext } from "@/lib/client";
import { BackTop, Divider, FloatButton } from "antd";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useId, useContext } from "react";
import ContentNav from "./ContentNav";
import MarkDown from "./Markdown";
import styles from "./index.module.scss";

interface ContentReaderProps {
  content?: ContentPayload;
  chapters?: MenuPayload["chapters"];
}

const ContentReader: FC<ContentReaderProps> = ({ content, chapters }) => {
  const id = useId();
  const router = useRouter();
  const { fontSize } = useContext(ReaderContext);

  return (
    <section className={styles["reader-wrapper"]}>
      <nav className={styles["reader-nav"]}>
        <ContentNav content={content} chapters={chapters} />
      </nav>

      <div className={styles["reader"]} style={{ fontSize }}>
        {content?.contents.map((e) => (
          <article key={`${id}-${e.index}`} id={`${e.index}`}>
            <MarkDown
              content={e.content}
              book={router.query.book as string}
              chapter={router.query.chapter as string}
            />
            <Divider />
          </article>
        ))}
      </div>
      <FloatButton.BackTop />
    </section>
  );
};

export default ContentReader;
