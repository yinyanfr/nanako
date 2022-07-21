import { GithubOutlined } from "@ant-design/icons";
import type { FC } from "react";
import styles from "./index.module.css";
import config from "@/nanako.json";

const nanako = (
  <a
    className="natural"
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
      <p>{config.footer}</p>
      <p>Powered by {nanako}. All right reserved.</p>
    </footer>
  );
};

export default Footer;
