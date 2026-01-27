import React, { useEffect, useRef } from "react";
import { useAnimation, type Transition } from "framer-motion";
import useInViewContext from "../context/useInViewContext";

type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // if true, animation runs only once
  duration?: number;
  ease?: Transition["ease"];
  leaveGrace?: number; // ms to wait after leaving before hiding
};

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

  return { ref, controls, inView };
}
