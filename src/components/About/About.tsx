import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import Typewriter from "../../utils/Typewritter";

const About = () => {
  const { ref, controls } = useInViewAnimation({
    once: false,
    duration: 0.8,
    ease: "easeOut",
    leaveGrace: 3000,
  });

  // Control Typewriter start from this component so we can guarantee the
  // same 3s leave grace and avoid conflicting observers.
  const typeRef = useRef<HTMLDivElement | null>(null);
  const [showType, setShowType] = useState(false);

  useEffect(() => {
    const el = typeRef.current;
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
            setShowType(true);
          } else {
            if (leaveTimeout) clearTimeout(leaveTimeout);
            leaveTimeout = window.setTimeout(() => {
              leaveTimeout = null;
              setShowType(false);
            }, 3000);
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
  }, []);

  useEffect(() => {}, [controls]);

  // Pause/resume framer animations when the page visibility changes to avoid
  // stale RAF/timers when the tab was frozen; resume only if the element is
  // currently in view.
  useEffect(() => {
    const el = typeRef.current;

    const resumeIfInView = (forceReset = false) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (!inView) return;

      // Ensure we reset to the hidden state then animate in so we don't
      // end up with stale transforms/opacity after a page freeze.
      try {
        if (forceReset) {
          // set immediate values synchronously, then animate
          controls.set({ opacity: 0, y: 40 });
        }
        // start the visible animation asynchronously to avoid sync setState
        window.setTimeout(() => {
          setShowType(true);
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          });
        }, 0);
      } catch (err) {
        console.error("About resume error", err);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        try {
          controls.stop();
        } catch (e) {
          console.error(e);
        }
        // request that the typewriter stop; it will restart on visible
        setShowType(false);
      } else {
        // On becoming visible, force a quick reset then resume if in view.
        resumeIfInView(true);
      }
    };

    const onPageShow = (_e: PageTransitionEvent) => {
      // Always attempt to resume animations on pageshow; if the element
      // is in view, reset and start to avoid stale RAF/state.
      resumeIfInView(true);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow as EventListener);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow as EventListener);
    };
  }, [controls]);

  return (
    <div className="justify-center grid gap-12 mt-[9rem]">
      <h1 className="text-white text-4xl flex justify-center items-center font-semibold font-poppins mt-12 ">
        Sobre mim
      </h1>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-12 md:gap-12">
        <div>
          <motion.div
            ref={ref as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            className="rounded-2xl border-white/10 md:w-92 md:h-128 justify-center w-[18rem] h-[27rem]"
          >
            <img
              src="/imgs/img_perfil.png"
              loading="lazy"
              decoding="async"
              width={288}
              height={432}
              className="rounded-2xl w-full h-full object-cover"
              alt="Model"
              style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            />
          </motion.div>
        </div>
        <div
          className="w-[20rem] px-5 md:px-0 h-[27rem] md:w-[22rem]"
          ref={typeRef}
        >
          <Typewriter
            text={
              "Olá, Seja bem vindo(a)! Meu nome é Carlos Augusto, atuo como desenvolvedor Full Stack, com foco em React/TypeScript e construção de aplicações web modernas. Ao longo da minha formação, atuei tanto no backend (autenticação, CRUD, estruturação de banco de dados) quanto no frontend, criando interfaces funcionais e bem estruturadas."
            }
            speed={14}
            startOnView={showType}
            style={{
              hyphens: "auto",
              WebkitHyphens: "auto",
              msHyphens: "auto",
            }}
            className="text-[1.13rem] md:text-justify text-justify leading-relaxed font-semibold font-poppins text-white max-w-[23rem] tracking-[-0.25px] md:tracking-[-0.15px] lg:tracking-[-0.08px] [word-spacing:-0.10rem] md:[word-spacing:-0.04rem] lg:[word-spacing:-0.02rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
