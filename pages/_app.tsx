import { useCallback, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloader_seen")) {
      setPreloaderDone(true);
    }
  }, []);

  const onComplete = useCallback(() => {
    sessionStorage.setItem("preloader_seen", "1");
    setPreloaderDone(true);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AnimatePresence>
        {!preloaderDone && <Preloader onComplete={onComplete} />}
      </AnimatePresence>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
