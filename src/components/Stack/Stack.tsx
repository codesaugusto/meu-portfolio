import React from "react";
import { useThemeContext } from "../../context/useThemeContext";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { useInViewFade } from "../../hooks/useInViewFade";

interface StackProps {
  icon: React.ReactNode;
  description: string;
}

function Stack({ icon, description }: StackProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl text-left flex cursor-pointer flex-row items-center gap-2"
    >
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      <p
        lang="pt-BR"
        style={{
          hyphens: "none",
          WebkitHyphens: "none",
          msHyphens: "none",
        }}
        className="text-lg font-bold font-poppins select-none "
      >
        {description}
      </p>
    </motion.div>
  );
}

const StackSection = () => {
  const { theme } = useThemeContext();
  const { ref, visible } = useInViewFade<HTMLImageElement>();

  return (
    <div
      id="stack"
      className="justify-center grid gap-12 pt-8 md:pt-12 xl:pt-24 xl:pb-48"
    >
      <h1 className="text-4xl text-current flex justify-center items-center font-semibold font-poppins">
        Por que trabalhar comigo?
      </h1>
      {/* cards */}
      <div className="flex gap-3">
        <motion.img
          ref={ref}
          src="../../../imgs/Astronaut.svg"
          alt="Astronauta desenvolvendo"
          initial={{ opacity: 0, x: -50 }}
          animate={
            visible
              ? {
                  opacity: 1,
                  x: 0,
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0],
                }
              : { opacity: 0, x: -50 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            y: { duration: 8, repeat: Infinity },
            rotate: { duration: 8, repeat: Infinity, delay: 0.8 },
          }}
          className="w-73 md:w-96 xl:w-[30rem] select-none pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={
            visible
              ? {
                  opacity: 1,
                  x: 0,
                }
              : { opacity: 0, x: 50 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="flex items-center justify-center bg-emerald-400 gap-7 rounded-2xl w-[18rem] h-[32rem] md:w-[34rem] shadow-lg shadow-black/60 md:h-[28rem]"
        >
          <div className="flex flex-col justify-center gap-22 md:gap-16 md:px-12 md:pr-16 xl:gap-8 xl:px-0">
            <p className="font-poppins text-[1.6rem] font-bold flex justify-center pb-4">
              <span>
                O que você pode esperar de{" "}
                <span className="text-[#f2f2f2] dark:text-[#13094E]">
                  mim...
                </span>
              </span>
            </p>

            <Stack
              icon={
                <FiCheckCircle
                  className={theme === "dark" ? "text-[#f2f2f2]" : "text-black"}
                  size={24}
                  strokeWidth={2.6}
                />
              }
              description="Código limpo, organizado"
            />
            <Stack
              icon={
                <FiCheckCircle
                  className={theme === "dark" ? "text-[#f2f2f2]" : "text-black"}
                  size={24}
                  strokeWidth={2.6}
                />
              }
              description="Foco total na experiência do usuário"
            />
            <Stack
              icon={
                <FiCheckCircle
                  className={theme === "dark" ? "text-[#f2f2f2]" : "text-black"}
                  size={24}
                  strokeWidth={2.6}
                />
              }
              description="Interface moderna e minimalista"
            />
            <Stack
              icon={
                <FiCheckCircle
                  className={theme === "dark" ? "text-[#f2f2f2]" : "text-black"}
                  size={24}
                  strokeWidth={2.6}
                />
              }
              description="Suporte e ajustes pós-entrega"
            />
            <Stack
              icon={
                <FiCheckCircle
                  className={theme === "dark" ? "text-[#f2f2f2]" : "text-black"}
                  size={24}
                  strokeWidth={2.6}
                />
              }
              description="Entrega dentro do prazo combinado"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StackSection;
