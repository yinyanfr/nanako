import { setCookie } from "nookies";
import type { FC } from "react";
import { useEffect } from "react";
import { DarkModeToggle } from "react-dark-mode-toggle-2";
import { useDarkreader } from "react-darkreader";

interface DarkToggleProps {
  defaultDarken: boolean;
}

const DarkToggle: FC<DarkToggleProps> = ({ defaultDarken }) => {
  const [isDark, { toggle }] = useDarkreader();

  useEffect(() => {
    if (defaultDarken !== isDark) {
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DarkModeToggle
        isDarkMode={isDark}
        onChange={(isDarkMode) => {
          setCookie(null, "theme", isDarkMode ? "dark" : "light", {
            path: "/",
          });
          toggle();
        }}
        size={46}
      />
    </div>
  );
};

export default DarkToggle;
