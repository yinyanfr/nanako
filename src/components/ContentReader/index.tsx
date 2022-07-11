import ReaderContext from "@/lib/ReaderContext";
import { BackTop, Divider } from "antd";
import { useRouter } from "next/router";
import path from "path";
import { FC, useContext } from "react";
import { useId } from "react";
import ReactMarkdown from "react-markdown";
import ContentNav from "./ContentNav";

interface ContentReaderProps {
  content: ContentPayload;
}

const ContentReader: FC<ContentReaderProps> = ({ content }) => {
  const id = useId();
  const router = useRouter();
  const { fontSize } = useContext(ReaderContext);

  return (
    <div>
      <div className="float-right">
        <ContentNav content={content} />
      </div>
      <div style={{ fontSize }}>
        {content?.contents.map((e) => (
          <article key={`${id}-${e.index}`} id={`${e.index}`}>
            <ReactMarkdown
              className="markdown"
              transformImageUri={(uri) => {
                const { book, chapter } = router.query;
                const image = path.basename(uri);

                return `../../api/image?book=${book}&chapter=${chapter}&image=${image}`;
              }}
            >
              {e.content}
            </ReactMarkdown>
            <Divider />
          </article>
        ))}
      </div>
      <BackTop />
    </div>
  );
};

export default ContentReader;
