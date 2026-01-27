import React, { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import useInViewContext from "../context/useInViewContext";
import type { Options } from "../types/typeOptions";

export default function useInViewAnimation(options: Options = {}): {
  ref: React.RefObject<HTMLElement | null>;
  controls: ReturnType<typeof useAnimation>;
  inView: boolean;
} {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimation();
  const [inView, setInView] = React.useState(false);
  // track previous visibility to avoid restarting the same animation repeatedly
  const wasInViewRef = useRef(false);
  const { observe, unobserve } = useInViewContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let leaveTimeout: number | null = null;
    const LEAVE_GRACE = options.leaveGrace ?? 300;

    const cb = (entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio > 0) {
        if (!wasInViewRef.current) {
          wasInViewRef.current = true;
          setInView(true);
          if (leaveTimeout) {
            clearTimeout(leaveTimeout);
            leaveTimeout = null;
          }
          controls.start({
            opacity: 1,
            y: 0,
            transition: {
              duration: options.duration ?? 0.8,
              ease: options.ease ?? "easeOut",
            },
          });
        }
      } else {
        if (options.once) return;
        setInView(false);
        if (leaveTimeout) clearTimeout(leaveTimeout);
        leaveTimeout = window.setTimeout(() => {
          controls.start({ opacity: 0, y: 40 });
          leaveTimeout = null;
          wasInViewRef.current = false;
        }, LEAVE_GRACE);
      }
    };

    observe(el, cb);

    // Fallback check shortly after mount
    const fallbackId = window.setTimeout(() => {
      try {
        const r = el.getBoundingClientRect();
        if (
          r.top <
            (window.innerHeight || document.documentElement.clientHeight) &&
          r.bottom > 0
        ) {
          // emulate an entry visible
          cb({} as IntersectionObserverEntry);
        }
      } catch {
        /* ignore */
      }
    }, 60);

    return () => {
      unobserve(el, cb);
      if (leaveTimeout) clearTimeout(leaveTimeout);
      clearTimeout(fallbackId);
    };
    // include observe/unobserve (stable) to silence lint
  }, [
    controls,
    options.once,
    options.duration,
    options.ease,
    options.leaveGrace,
    observe,
    unobserve,
  ]);

  // Ensure animations resume correctly when the page becomes visible again.
  // Some browsers may pause IntersectionObserver updates while a tab is hidden;
  // listen to visibility/pageshow and force a reset+start if the element is in view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resumeIfInView = (forceReset = false) => {
      const r = el.getBoundingClientRect();
      const inView =
        r.top < (window.innerHeight || document.documentElement.clientHeight) &&
        r.bottom > 0;
      if (!inView) return;
      try {
        if (forceReset) {
          controls.set({ opacity: 0, y: 40 });
        }
        window.setTimeout(() => {
          // clear any pending leave state so the animation can run
          wasInViewRef.current = false;
          controls.start({
            opacity: 1,
            y: 0,
            transition: {
              duration: options.duration ?? 0.8,
              ease: options.ease ?? "easeOut",
            },
          });
        }, 0);
      } catch (err) {
        console.error("useInViewAnimation resume error", err);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        try {
          controls.stop();
        } catch (e) {
          console.error(e);

          /* ignore */
        }
      } else {
        resumeIfInView(true);
      }
    };

    const onPageShow = () => resumeIfInView(true);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow as EventListener);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow as EventListener);
    };
  }, [controls, options.duration, options.ease]);

  return { ref, controls, inView };
}
