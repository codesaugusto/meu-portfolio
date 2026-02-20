import React from "react";
import { useThemeContext } from "../../context/useThemeContext";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { useInViewFade } from "../../hooks/useInViewFade";
import useIsMobile from "../../hooks/useIsMobile";

interface StackProps {
  icon: React.ReactNode;
  description: string;
  disableMotion?: boolean;
}

function Stack({ icon, description, disableMotion }: StackProps) {
  const content = (
    <div className="w-8 h-8 flex cursor-pointer items-center">{icon}</div>
  );

  const baseClass =
    "w-full cursor-pointer grid grid-cols-[32px_1fr] gap-3 items-center justify-start";

  const text = (
    <p
      lang="pt-BR"
      className="md:text-lg text-sm font-bold font-poppins select-none text-left"
    >
      {description}
    </p>
  );

  if (disableMotion) {
    return (
      <div className="rounded-2xl text-center flex cursor-pointer flex-row items-center gap-1">
        {content}
        {text}
      </div>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.03 }} className={baseClass}>
      {content}
      {text}
    </motion.div>
  );
}

const StackSection = () => {
  const { theme } = useThemeContext();
  const { ref, visible } = useInViewFade<HTMLImageElement>();
  const isMobile = useIsMobile();

  return (
    <div
      id="stack"
      className="justify-center md:flex md:flex-col md:items-center gap-12 pt-20 md:pt-[4rem] xl:pt-20 xl:pb-48"
    >
      <h1 className="mx-auto px-10 md:px-0 md:mx-0 text-3xl md:text-4xl text-center flex justify-center items-center font-semibold font-poppins">
        Por que trabalhar comigo?
      </h1>
      {/* cards */}
      <div className="flex flex-col xl:flex-row items-center mx-auto pt-5 md:pt-0 md:mx-0 md:flex gap-3">
        {isMobile ? (
          <img
            ref={ref}
            src="../../../imgs/Astronaut.svg"
            alt="Astronauta desenvolvendo"
            className="w-73 md:w-96 xl:w-[30rem] select-none pointer-events-none"
          />
        ) : (
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
              duration: 1.2,
              ease: "easeOut",
              y: { duration: 8, repeat: Infinity },
              rotate: { duration: 8, repeat: Infinity, delay: 0.8 },
            }}
            className="w-73 md:w-96 xl:w-[30rem] select-none pointer-events-none"
          />
        )}

        {isMobile ? (
          <div className="flex items-center justify-center w-[18rem] h-[27rem] bg-emerald-400 gap-7 rounded-2xl md:w-[34rem] shadow-lg shadow-black/60 md:h-[28rem]">
            <div className="flex flex-col items-start justify-center gap-7 w-full px-5 md:gap-16 md:px-12 md:pr-16 xl:gap-8 xl:px-0">
              <p className="py-2 md:py-0 md:flex font-poppins font-bold justify-center">
                <span>
                  O que você pode esperar de{" "}
                  <span className="text-[#f2f2f2] dark:text-[#13094E]">
                    mim...
                  </span>
                </span>
              </p>

              <Stack
                disableMotion
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Código limpo, organizado"
              />
              <Stack
                disableMotion
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Foco total na experiência do usuário"
              />
              <Stack
                disableMotion
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Interface moderna e minimalista"
              />
              <Stack
                disableMotion
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Suporte e ajustes pós-entrega"
              />
              <Stack
                disableMotion
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Entrega dentro do prazo combinado"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-[18rem] h-[27rem] bg-emerald-400 gap-7 rounded-2xl md:w-[34rem] shadow-lg shadow-black/60 md:h-[28rem]">
            <div className="flex flex-col justify-center gap-22 md:gap-6 md:px-12 md:pr-16 xl:gap-8 xl:px-0">
              <p className="hidden md:flex font-poppins font-bold justify-center pb-4 text-2xl">
                <span>
                  O que você pode esperar de{" "}
                  <span className="text-[#f2f2f2] dark:text-[#13094E]">
                    mim...
                  </span>
                </span>
              </p>

              <Stack
                disableMotion={isMobile}
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Código limpo, organizado"
              />
              <Stack
                disableMotion={isMobile}
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Foco total na experiência do usuário"
              />
              <Stack
                disableMotion={isMobile}
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Interface moderna e minimalista"
              />
              <Stack
                disableMotion={isMobile}
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Suporte e ajustes pós-entrega"
              />
              <Stack
                disableMotion={isMobile}
                icon={
                  <FiCheckCircle
                    className={
                      theme === "dark" ? "text-[#f2f2f2]" : "text-black"
                    }
                    size={24}
                    strokeWidth={2.6}
                  />
                }
                description="Entrega dentro do prazo combinado"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackSection;
