import React, { useEffect, useRef, useState } from "react";
import type { TypewriterProps } from "../types/typewritterProps";

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 16,
  showCursor = true,
  cursorChar = "|",
  cursorColor = "#ffffff",
  startOnView = false,
  className,
  style,
  mdBreakToken = "<md/>",
}) => {
  const [index, setIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [canStart, setCanStart] = useState(!startOnView);
  const elRef = useRef<HTMLParagraphElement | null>(null);

  // Preprocess text to support a desktop-only break token (mdBreakToken).
  // We treat occurrences of mdBreakToken as zero-length inserts of
  // <span className="hidden md:block" /> between characters.
  const rawText = String(text ?? "");
  const segments = rawText.split(mdBreakToken);
  const insertPositions: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < segments.length - 1; i++) {
    cumulative += segments[i].length;
    insertPositions.push(cumulative);
  }
  const cleanText = segments.join("");

  useEffect(() => {
    if (!canStart) return;

    const initId = window.setTimeout(() => {
      setIndex(0);
      setTypingComplete(false);
      setCursorVisible(true);
    }, 0);

    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i >= cleanText.length) {
          clearInterval(id);
          setTypingComplete(true);
          return i;
        }
        return i + 1;
      });
    }, speed);

    return () => {
      clearTimeout(initId);
      clearInterval(id);
    };
  }, [text, speed, canStart]);

  useEffect(() => {
    if (!startOnView) return;
    const el = elRef.current;
    if (!el) return;

    let leaveTimeout: number | null = null;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            if (leaveTimeout) {
              clearTimeout(leaveTimeout);
              leaveTimeout = null;
            }
            setIndex(0);
            setTypingComplete(false);
            setCursorVisible(true);
            setCanStart(true);
          } else {
            if (leaveTimeout) clearTimeout(leaveTimeout);
            leaveTimeout = window.setTimeout(() => {
              setCanStart(false);
              leaveTimeout = null;
            }, 300);
          }
        });
      },
      { threshold: [0], rootMargin: "0px 0px -10px 0px" },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (leaveTimeout) clearTimeout(leaveTimeout);
    };
  }, [startOnView]);

  useEffect(() => {
    if (!showCursor) return;
    if (!typingComplete) {
      const timeoutId = window.setTimeout(() => setCursorVisible(true), 0);
      return () => clearTimeout(timeoutId);
    }
    const blinkId = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blinkId);
  }, [typingComplete, showCursor]);

  return (
    <p
      ref={elRef}
      lang="pt-BR"
      style={{
        hyphens: "auto",
        WebkitHyphens: "auto",
        msHyphens: "auto",
        ...style,
      }}
      className={className}
    >
      {/* Build displayed output inserting responsive spans at recorded positions */}
      {(() => {
        const displayed = cleanText.slice(0, index);
        if (insertPositions.length === 0) return displayed;
        const parts: Array<string | JSX.Element> = [];
        let last = 0;
        insertPositions.forEach((pos, idx) => {
          if (pos <= displayed.length) {
            const chunk = displayed.slice(last, pos);
            if (chunk) parts.push(chunk);
            parts.push(
              <span
                key={`mdbreak-${idx}-${pos}`}
                className="hidden md:block"
              />,
            );
            last = pos;
          }
        });
        const tail = displayed.slice(last);
        if (tail) parts.push(tail);
        return parts;
      })()}
      {showCursor && (
        <span
          aria-hidden
          className="ml-1 inline-block"
          style={{ color: cursorColor, opacity: cursorVisible ? 1 : 0 }}
        >
          {cursorChar}
        </span>
      )}
    </p>
  );
};

export default Typewriter;
