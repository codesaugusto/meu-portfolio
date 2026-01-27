import React, { useEffect, useRef, useState } from "react";
import { useThemeContext } from "../context/useThemeContext";
import type { TypewriterProps } from "../types/typewritterProps";

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 16,
  showCursor = true,
  cursorChar = "|",
  cursorColor,
  startOnView = false,
  className,
  style,
  mdBreakToken = "<md/>",
}) => {
  const { theme } = useThemeContext();
  const resolvedCursorColor =
    cursorColor ?? (theme === "dark" ? "#f2f2f2" : "#121212");

  const [index, setIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const elRef = useRef<HTMLParagraphElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const visibleRef = useRef(!startOnView);
  const startTimeoutRef = useRef<number | null>(null);

  /* ---------------- TEXT PREPROCESS ---------------- */

  const rawText = String(text ?? "");
  const segments = rawText.split(mdBreakToken);
  const insertPositions: number[] = [];
  let acc = 0;
  for (let i = 0; i < segments.length - 1; i++) {
    acc += segments[i].length;
    insertPositions.push(acc);
  }
  const cleanText = segments.join("");

  /* ---------------- CORE ANIMATION ---------------- */

  const startTyping = () => {
    if (runningRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    runningRef.current = true;
    setIndex(0);
    setTypingComplete(false);
    setCursorVisible(true);

    let last = performance.now();
    let buffer = 0;
    const interval = Math.max(speed, 16);

    const tick = (now: number) => {
      if (!runningRef.current) return;

      buffer += now - last;
      last = now;

      if (buffer >= interval) {
        buffer -= interval;

        setIndex((i) => {
          if (i + 1 >= cleanText.length) {
            runningRef.current = false;
            setTypingComplete(true);
            return cleanText.length;
          }
          return i + 1;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  /* ---------------- VISIBILITY OBSERVER ---------------- */

  useEffect(() => {
    if (!startOnView) {
      visibleRef.current = true;
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
      startTimeoutRef.current = window.setTimeout(() => {
        startTyping();
        startTimeoutRef.current = null;
      }, 0);
      return () => {
        if (startTimeoutRef.current) {
          clearTimeout(startTimeoutRef.current);
          startTimeoutRef.current = null;
        }
      };
    }

    const el = elRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visibleRef.current = true;

        if (!runningRef.current && !typingComplete) {
          startTyping();
        }
      } else {
        visibleRef.current = false;

        // para animação atual
        runningRef.current = false;

        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }

        // reseta estado
        setIndex(0);
        setTypingComplete(false);
      }
    });

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startOnView, cleanText, typingComplete]);

  /* ---------------- CURSOR BLINK ---------------- */

  useEffect(() => {
    if (!showCursor || !typingComplete) return;

    const id = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => clearInterval(id);
  }, [typingComplete, showCursor]);

  /* ---------------- UNMOUNT ---------------- */

  useEffect(() => {
    return () => {
      runningRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
    };
  }, []);

  /* ---------------- RENDER ---------------- */

  return (
    <p
      ref={elRef}
      className={className}
      style={{
        hyphens: "auto",
        WebkitHyphens: "auto",
        ...style,
      }}
    >
      {(() => {
        const displayed = cleanText.slice(0, index);
        if (!insertPositions.length) return displayed;

        const parts: Array<string | React.ReactNode> = [];
        let last = 0;

        insertPositions.forEach((pos, i) => {
          if (pos <= displayed.length) {
            parts.push(displayed.slice(last, pos));
            parts.push(<span key={i} className="hidden md:block" />);
            last = pos;
          }
        });

        parts.push(displayed.slice(last));
        return parts;
      })()}

      {showCursor && (
        <span
          className="ml-1 inline-block"
          style={{ color: resolvedCursorColor, opacity: cursorVisible ? 1 : 0 }}
        >
          {cursorChar}
        </span>
      )}
    </p>
  );
};

export default Typewriter;
