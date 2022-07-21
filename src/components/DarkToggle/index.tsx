import { setCookie } from "nookies";
import type { FC } from "react";
import Darkreader from "react-darkreader";

interface DarkToggleProps {
  defaultDarken: boolean;
}

const DarkToggle: FC<DarkToggleProps> = ({ defaultDarken }) => {
  return (
    <div>
      <Darkreader
        defaultDarken={defaultDarken}
        onChange={(isDark) => {
          setCookie(null, "theme", isDark ? "dark" : "light", {
            path: "/",
          });
        }}
      />
    </div>
  );
};

export default DarkToggle;
