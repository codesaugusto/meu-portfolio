import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
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
  // Animation controller to avoid concurrent intervals/timeouts between effects
  const animRef = useRef<{
    intervalId: number | null;
    initTimeoutId: number | null;
    rafId: number | null;
    generation: number;
    running: boolean;
    leaveTimeoutId: number | null;
    postCompleteTimeoutId: number | null;
    leaveRequested: boolean;
  }>({
    intervalId: null,
    initTimeoutId: null,
    rafId: null,
    generation: 0,
    running: false,
    leaveTimeoutId: null,
    postCompleteTimeoutId: null,
    leaveRequested: false,
  });

  const POST_COMPLETE_GRACE = 3000; // ms to wait after completion before force-clearing

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
  const reduceMotion = useReducedMotion();

  // Centralized start/stop helpers to prevent overlapping intervals/timeouts.
  const clearAnim = (reset = false) => {
    if (animRef.current.initTimeoutId) {
      clearTimeout(animRef.current.initTimeoutId);
      animRef.current.initTimeoutId = null;
    }
    if (animRef.current.intervalId) {
      clearInterval(animRef.current.intervalId);
      animRef.current.intervalId = null;
    }
    if (animRef.current.rafId) {
      cancelAnimationFrame(animRef.current.rafId);
      animRef.current.rafId = null;
    }
    if (animRef.current.postCompleteTimeoutId) {
      clearTimeout(animRef.current.postCompleteTimeoutId);
      animRef.current.postCompleteTimeoutId = null;
    }
    // clear leaveRequested when force-clearing
    animRef.current.leaveRequested = false;
    animRef.current.running = false;
    if (reset) {
      setIndex(0);
      setTypingComplete(false);
      setCursorVisible(true);
    }
  };

  // startAnim moved into the useEffect below to avoid changing identity across renders

  useEffect(() => {
    if (reduceMotion) {
      // Respect reduced motion: show full text immediately and mark complete,
      // but schedule state updates asynchronously to avoid cascading renders.
      const timeoutId = window.setTimeout(() => {
        setIndex(cleanText.length);
        setTypingComplete(true);
        setCursorVisible(true);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    // Start/stop animation according to `canStart` and text changes.
    let startTimeoutId: number | null = null;

    const startAnim = () => {
      // If already running, do nothing.
      if (animRef.current.running) return;
      // Bump generation to invalidate older intervals
      animRef.current.generation += 1;
      const gen = animRef.current.generation;

      clearAnim(false);
      animRef.current.initTimeoutId = window.setTimeout(() => {
        setIndex(0);
        setTypingComplete(false);
        setCursorVisible(true);

        // Use requestAnimationFrame with time accumulation so we play nicer
        // with the browser's rendering loop. Clamp a minimum sensible speed
        // (16ms ~= 60fps) to avoid extremely frequent updates that can
        // cause jank on low-end devices. When multiple frames have passed
        // advance by a batch to reduce setState frequency.
        const effectiveSpeed = Math.max(speed, 16);
        let last = performance.now();
        let acc = 0;

        const tick = (now: number) => {
          // stop if a newer generation started
          if (gen !== animRef.current.generation) {
            clearAnim(false);
            return;
          }
          const delta = now - last;
          last = now;
          acc += delta;
          if (acc >= effectiveSpeed) {
            // Calculate how many steps worth of characters we can advance
            // in this tick and subtract only that amount from the accumulator
            // so we don't lose fractional time and to avoid many tiny updates.
            const steps = Math.max(1, Math.floor(acc / effectiveSpeed));
            acc -= steps * effectiveSpeed;
            setIndex((i) => {
              if (gen !== animRef.current.generation) {
                // generation invalidated while in updater
                clearAnim(false);
                return i;
              }
              if (i >= cleanText.length) {
                // complete: stop the raf loop and mark complete
                if (animRef.current.rafId) {
                  cancelAnimationFrame(animRef.current.rafId);
                  animRef.current.rafId = null;
                }
                animRef.current.running = false;
                setTypingComplete(true);
                if (animRef.current.leaveRequested) {
                  clearAnim(true);
                  setCanStart(false);
                } else {
                  if (animRef.current.postCompleteTimeoutId) {
                    clearTimeout(animRef.current.postCompleteTimeoutId);
                  }
                  animRef.current.postCompleteTimeoutId = window.setTimeout(
                    () => {
                      animRef.current.postCompleteTimeoutId = null;
                      clearAnim(true);
                      setCanStart(false);
                    },
                    POST_COMPLETE_GRACE,
                  );
                }
                return i;
              }
              // advance by 'steps', but clamp to the text length
              return Math.min(cleanText.length, i + steps);
            });
          }
          animRef.current.rafId = window.requestAnimationFrame(tick);
        };

        animRef.current.rafId = window.requestAnimationFrame(tick);
        animRef.current.running = true;
        animRef.current.initTimeoutId = null;
      }, 0);
    };

    if (canStart) {
      // if there was a pending post-complete clear, cancel it (we're starting again)
      if (animRef.current.postCompleteTimeoutId) {
        clearTimeout(animRef.current.postCompleteTimeoutId);
        animRef.current.postCompleteTimeoutId = null;
      }
      // schedule start asynchronously to avoid synchronous setState in effect
      startTimeoutId = window.setTimeout(() => startAnim(), 0);
    } else {
      // If canStart becomes false while an animation is running, do NOT force-clear
      // immediately — allow the running animation to finish. Only clear immediately
      // when nothing is running.
      if (!animRef.current.running) {
        // defer reset to avoid calling setState synchronously inside an effect
        startTimeoutId = window.setTimeout(() => clearAnim(true), 0);
      }
      // otherwise, leave the running animation alone; it will clear itself when
      // it completes (respecting leaveRequested/post-complete timers)
    }

    return () => {
      // If props change, only clear the scheduled start timeout here.
      // Do NOT call clearAnim() here because that would cancel a running
      // animation when `canStart` toggles; we want running animations to
      // finish naturally and be cleared by their own completion logic.
      if (startTimeoutId) {
        clearTimeout(startTimeoutId);
        startTimeoutId = null;
      }
    };
    // Intentionally include cleanText so a text change restarts animation.
  }, [canStart, speed, cleanText]);

  // Ensure full cleanup on unmount: if the component unmounts while an
  // animation is running, force-clear everything to avoid leaking timers.
  useEffect(() => {
    return () => {
      clearAnim(true);
    };
    // empty deps -> run once on unmount
  }, []);

  // Handle page visibility changes: when the tab becomes hidden (or the
  // page is frozen) force-clear running animations to avoid stale timers and
  // large deltas when the tab is resumed. When visible again, allow the
  // animation to restart if appropriate.
  useEffect(() => {
    const onVisibility = () => {
      if (typeof document === "undefined") return;
      if (document.visibilityState === "hidden") {
        // Force-clear to avoid timers/raf left running in background.
        clearAnim(true);
        setCanStart(false);
      } else {
        // When tab becomes visible again, allow animation to start.
        // Schedule asynchronously to avoid sync state updates.
        window.setTimeout(() => setCanStart(true), 0);
      }
    };

    const onPageShow = (e: PageTransitionEvent) => {
      // pageshow can be fired on back/forward navigation — restart.
      if (e.persisted) {
        window.setTimeout(() => setCanStart(true), 0);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow as EventListener);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!startOnView) return;
    const el = elRef.current;
    if (!el) return;

    // Snapshot the current animRef to avoid ref-change warnings in cleanup.
    const anim = animRef.current;

    // When element enters/leaves viewport: on leave, request clearing after grace but
    // allow current animation to finish. On enter, cancel any pending leave.
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            // cancel pending leave timeout
            if (anim.leaveTimeoutId) {
              clearTimeout(anim.leaveTimeoutId);
              anim.leaveTimeoutId = null;
            }
            // cancel a previous leave request
            anim.leaveRequested = false;
            // cancel any post-complete clear since user returned
            if (anim.postCompleteTimeoutId) {
              clearTimeout(anim.postCompleteTimeoutId);
              anim.postCompleteTimeoutId = null;
            }
            // If already typing, don't restart it. If not typing and not complete, start.
            if (!anim.running && !typingComplete) {
              setCanStart(true);
            }
          } else {
            // schedule a leave request after grace period
            if (anim.leaveTimeoutId) clearTimeout(anim.leaveTimeoutId);
            anim.leaveTimeoutId = window.setTimeout(() => {
              anim.leaveTimeoutId = null;
              // mark that a leave was requested; do not forcibly stop running animation
              anim.leaveRequested = true;
              setCanStart(false);
              // If nothing is running and typing already finished, clear immediately
              if (!anim.running && typingComplete) {
                clearAnim(true);
              }
            }, POST_COMPLETE_GRACE);
          }
        });
      },
      { threshold: [0], rootMargin: "0px 0px -10px 0px" },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (anim.leaveTimeoutId) {
        clearTimeout(anim.leaveTimeoutId);
        anim.leaveTimeoutId = null;
      }
      // reset leaveRequested when unmounting
      anim.leaveRequested = false;
    };
  }, [startOnView, typingComplete]);

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
        const parts: Array<string | React.ReactNode> = [];
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
