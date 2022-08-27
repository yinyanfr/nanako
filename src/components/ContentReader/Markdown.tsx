import path from "path";
import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface MarkDownProps {
  content: string;
  book: string;
  chapter: string;
}

const MarkDown: FC<MarkDownProps> = ({ content, book, chapter }) => {
  return (
    <ReactMarkdown
      className="markdown"
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
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
            <code
              className={className ? `${className} blockquote` : "blockquote"}
              {...props}
            >
              {children}
            </code>
          );
        },
        a({ className, children, ...props }) {
          return (
            <a
              className={className ? `${className} blue` : "blue"}
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        },
        table({ children, ...props }) {
          return (
            <table
              className="table is-striped is-hoverable is-fullwidth"
              {...props}
            >
              {children}
            </table>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDown;
