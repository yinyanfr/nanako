import { ReaderContext } from "@/lib/client";
import { BackTop, Divider } from "antd";
import { useRouter } from "next/router";
import path from "path";
import { FC, useContext } from "react";
import { useId, useState } from "react";
import ReactMarkdown from "react-markdown";
import { DynamicDetectScroll, DynamicReactScrollDetect } from "..";
import ContentNav from "./ContentNav";
import styles from "./index.module.css";

interface ContentReaderProps {
  content: ContentPayload;
  chapters: MenuPayload["chapters"];
}

const ContentReader: FC<ContentReaderProps> = ({ content, chapters }) => {
  const id = useId();
  const router = useRouter();
  const { fontSize } = useContext(ReaderContext);
  const [scrollIndex, setScrollIndex] = useState(0);

  return (
    <section className={styles["reader-wrapper"]}>
      <nav className={styles["reader-nav"]}>
        <ContentNav
          content={content}
          chapters={chapters}
          scrollIndex={scrollIndex}
          setScrollIndex={setScrollIndex}
        />
      </nav>

      <div className={styles["reader"]} style={{ fontSize }}>
        <DynamicReactScrollDetect
          triggerPoint="top"
          onChange={(index) => {
            setScrollIndex(index);
          }}
        >
          {content?.contents.map((e) => (
            <article key={`${id}-${e.index}`} id={`${e.index}`}>
              <DynamicDetectScroll>
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
              </DynamicDetectScroll>
              <Divider />
            </article>
          ))}
        </DynamicReactScrollDetect>
      </div>
      <BackTop />
    </section>
  );
};

export default ContentReader;
