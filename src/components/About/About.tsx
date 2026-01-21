import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";

type TypewriterProps = {
  text: string;
  speed?: number; // ms por caractere
  showCursor?: boolean;
  cursorChar?: string;
  cursorColor?: string;
  startOnView?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 16,
  showCursor = true,
  cursorChar = "|",
  cursorColor = "#ffffff",
  startOnView = false,
  className,
  style,
}) => {
  const [index, setIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [canStart, setCanStart] = useState(!startOnView);
  const elRef = useRef<HTMLParagraphElement | null>(null);

  // start typing when canStart becomes true
  useEffect(() => {
    if (!canStart) return;

    // Defer state resets to avoid synchronous setState inside effect (prevent cascading renders)
    const initId = window.setTimeout(() => {
      setIndex(0);
      setTypingComplete(false);
      setCursorVisible(true);
    }, 0);

    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i >= text.length) {
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

  // observe element to start typing when it enters viewport
  useEffect(() => {
    if (!startOnView) return;
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCanStart(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView]);

  // Blink cursor via JS
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
      {text.slice(0, index)}
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

const About = () => {
  const { ref, controls } = useInViewAnimation({
    once: false,
    duration: 0.8,
    ease: "easeOut",
  });

  useEffect(() => {}, [controls]);

  return (
    <div className="justify-center grid gap-14 mt-12">
      <h1 className="text-white text-4xl flex justify-center items-center font-semibold font-poppins mt-12 italic">
        Sobre mim
      </h1>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-12 md:gap-12">
        <div>
          <motion.div
            ref={ref as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            className="rounded-2xl border-white/10 w-92 h-128"
          >
            <img
              src="/imgs/img_perfil.png"
              className="rounded-2xl w-full h-full object-cover"
              alt="Model"
            />
          </motion.div>
        </div>
        <div className="w-[25rem] md:w-[22rem]">
          <Typewriter
            text={
              "Me chamo Carlos Augusto, atuo como desenvolvedor Full Stack, com foco em JavaScript/TypeScript e construção de aplicações web modernas. Ao longo da minha formação, atuei tanto no backend (autenticação, CRUD, estruturação de banco de dados) quanto no frontend, criando interfaces funcionais e bem estruturadas."
            }
            speed={14}
            startOnView={true}
            className="text-[1.067rem] text-justify leading-relaxed font-semibold font-poppins text-white max-w-[23rem] tracking-[-0.25px] md:tracking-[-0.15px] lg:tracking-[-0.08px] [word-spacing:-0.14em] md:[word-spacing:-0.12em] lg:[word-spacing:-0.08em]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
