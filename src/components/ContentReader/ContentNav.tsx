import { Menu } from "antd";
import type { FC } from "react";
import { useId, useMemo } from "react";

interface ContentNavProps {
  content: ContentPayload;
}

const ContentNav: FC<ContentNavProps> = ({ content }) => {
  const id = useId();
  const menuItems = useMemo(() => {
    return content?.contents?.map((e) => ({
      key: `${id}-${e.index}`,
      label: <a href={`#${e.index}`}>{e.title}</a>,
    }));
  }, [content, id]);

  return (
    <div>
      <Menu items={menuItems} />
    </div>
  );
};

export default ContentNav;
