import { ReaderContext } from "@/lib/client";
import { BackTop, Divider } from "antd";
import { useRouter } from "next/router";
import path from "path";
import { FC, useContext } from "react";
import { useId } from "react";
import ReactMarkdown from "react-markdown";
import ContentNav from "./ContentNav";
import styles from "./index.module.css";

interface ContentReaderProps {
  content: ContentPayload;
}

const ContentReader: FC<ContentReaderProps> = ({ content }) => {
  const id = useId();
  const router = useRouter();
  const { fontSize } = useContext(ReaderContext);

  return (
    <section className={styles["reader-wrapper"]}>
      <nav className={styles["reader-nav"]}>
        <ContentNav content={content} />
      </nav>
      <div className={styles["reader"]} style={{ fontSize }}>
        {content?.contents.map((e) => (
          <article key={`${id}-${e.index}`} id={`${e.index}`}>
            <ReactMarkdown
              className="markdown"
              transformImageUri={(uri) => {
                const { book, chapter } = router.query;
                const image = path.basename(uri); // really ?

                return `/api/image?book=${book}&chapter=${chapter}&image=${image}`;
              }}
            >
              {e.content}
            </ReactMarkdown>
            <Divider />
          </article>
        ))}
      </div>
      <BackTop />
    </section>
  );
};

export default ContentReader;
