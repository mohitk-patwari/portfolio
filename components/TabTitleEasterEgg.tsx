import { useEffect } from "react";

const AWAY_TITLE = "still compiling... 👀";

const TabTitleEasterEgg = () => {
  useEffect(() => {
    const original = document.title;

    const onVisibilityChange = () => {
      document.title = document.hidden ? AWAY_TITLE : original;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return null;
};

export default TabTitleEasterEgg;
