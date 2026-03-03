import { useCallback, useEffect, useRef, useState } from "react";

type ScrambleOptions = {
  trigger?: "mount" | "hover";
  delay?: number;
  duration?: number;
  interval?: number;
  charset?: string;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*<>/\\|[]{}!?~`";

const useScrambleText = (finalText: string, options: ScrambleOptions = {}) => {
  const {
    trigger = "mount",
    delay = 0,
    duration = 1200,
    interval = 30,
    charset = DEFAULT_CHARSET,
  } = options;

  const [displayText, setDisplayText] = useState(finalText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current = [];
  }, []);

  const triggerScramble = useCallback(() => {
    clearTimers();

    if (!finalText.length || interval <= 0 || duration <= 0 || !charset.length) {
      setDisplayText(finalText);
      return;
    }

    const totalChars = finalText.length;
    const startedAt = Date.now();
    const resolveTimes = Array.from(
      { length: totalChars },
      (_, index) => (index / totalChars) * duration
    );

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;

      if (elapsed >= duration) {
        setDisplayText(finalText);
        clearTimers();
        return;
      }

      const nextText = finalText
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return " ";
          }

          if (elapsed >= resolveTimes[index]) {
            return char;
          }

          const randomIndex = Math.floor(Math.random() * charset.length);
          return charset[randomIndex];
        })
        .join("");

      setDisplayText(nextText);
    }, interval);
  }, [charset, clearTimers, duration, finalText, interval]);

  useEffect(() => {
    setDisplayText(finalText);
  }, [finalText]);

  useEffect(() => {
    if (trigger !== "mount") {
      return () => clearTimers();
    }

    if (typeof window === "undefined") {
      return () => clearTimers();
    }

    const timeoutId = window.setTimeout(() => {
      triggerScramble();
    }, delay);

    timeoutRefs.current.push(timeoutId);

    return () => {
      clearTimers();
    };
  }, [clearTimers, delay, trigger, triggerScramble]);

  return { displayText, triggerScramble };
};

export default useScrambleText;
