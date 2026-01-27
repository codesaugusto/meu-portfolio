import type { Transition } from "framer-motion";

export type Options = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // if true, animation runs only once
  duration?: number;
  ease?: Transition["ease"];
  leaveGrace?: number; // ms to wait after leaving before hiding
};
