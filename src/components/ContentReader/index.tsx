import { BackTop } from "antd";
import { useRouter } from "next/router";
import path from "path";
import type { FC } from "react";
import { useId } from "react";
import ReactMarkdown from "react-markdown";
import ContentNav from "./ContentNav";

interface ContentReaderProps {
  content: ContentPayload;
}

const ContentReader: FC<ContentReaderProps> = ({ content }) => {
  const id = useId();
  const router = useRouter();

  return (
    <div>
      <ContentNav content={content} />
      {content?.contents.map((e) => (
        <article key={`${id}-${e.index}`} id={`${e.index}`}>
          <ReactMarkdown
            transformImageUri={(uri) => {
              const { book, chapter } = router.query;
              const image = path.basename(uri);

              return `../api/image?book=${book}&chapter=${chapter}&image=${image}`;
            }}
          >
            {e.content}
          </ReactMarkdown>
        </article>
      ))}
      <BackTop />
    </div>
  );
};

export default ContentReader;
