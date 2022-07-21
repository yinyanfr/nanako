import { Button, Result } from "antd";
import Link from "next/link";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <section>
      <Result
        status="404"
        title="404"
        subTitle="您查找的内容不存在。"
        extra={
          <Link href="/">
            <Button type="primary">返回主页</Button>
          </Link>
        }
      />
    </section>
  );
};

export default NotFound;
