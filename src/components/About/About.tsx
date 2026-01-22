import { motion } from "framer-motion";
import React, { useEffect } from "react";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import Typewriter from "../../utils/Typewritter";

const About = () => {
  const { ref, controls } = useInViewAnimation({
    once: false,
    duration: 0.8,
    ease: "easeOut",
  });

  useEffect(() => {}, [controls]);

  return (
    <div className="justify-center grid gap-14 mt-45">
      <h1 className="text-white text-4xl flex justify-center items-center font-semibold font-poppins mt-12 italic">
        Sobre mim
      </h1>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-12 md:gap-12">
        <div>
          <motion.div
            ref={ref as React.RefObject<HTMLDivElement>}
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            className="rounded-2xl border-white/10 md:w-92 md:h-128 justify-center w-[18rem] h-[27rem]"
          >
            <img
              src="/imgs/img_perfil.png"
              className="rounded-2xl w-full h-full object-cover"
              alt="Model"
            />
          </motion.div>
        </div>
        <div className="w-[20rem] h-[27rem] md:w-[22rem]">
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
