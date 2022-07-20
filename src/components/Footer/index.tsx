import { GithubOutlined } from "@ant-design/icons";
import type { FC } from "react";
import styles from "./index.module.css";

const nanako = (
  <a
    href="https://github.com/yinyanfr/nanako"
    target="_blank"
    rel="noopener noreferrer"
  >
    Nanako <GithubOutlined />
  </a>
);

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p>对于本网站及展示的作品，作者保留一切权力。</p>
      <p>Powered by {nanako}. All right reserved.</p>
    </footer>
  );
};

export default Footer;
