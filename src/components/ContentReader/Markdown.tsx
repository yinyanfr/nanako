import path from "path";
import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface MarkDownProps {
  content: string;
  book: string;
  chapter: string;
}

const MarkDown: FC<MarkDownProps> = ({ content, book, chapter }) => {
  return (
    <ReactMarkdown
      className="markdown"
      transformImageUri={(uri) => {
        const image = path.basename(uri);
        return `/api/image?book=${book}&chapter=${chapter}&image=${image}`;
      }}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={undefined as any}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDown;
