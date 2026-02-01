import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import {
  SiPython,
  SiGithub,
  SiJavascript,
  SiDiscord,
  SiWhatsapp,
} from "react-icons/si";
import { RiFileExcel2Line } from "react-icons/ri";
import type { IconType } from "react-icons";

const Icons = ({ icons }: { icons: { icon: IconType; name: string }[] }) => {
  // [] TypeScript dizendo o que espera do retorno da arrow function e que icons é um array de objetos daquele tipo, não um array vazio.
  return (
    <div className="flex items-center gap-4">
      {icons.map((t) => {
        const IconComp = t.icon;
        return (
          <IconComp
            key={t.name}
            className="w-7 h-7 text-appTextLight dark:text-appTextDark"
            title={t.name}
          />
        );
      })}
    </div>
  );
};

function ProjectCard({
  imgSrc = "",
  description = "",
  icon = "",
}: {
  imgSrc?: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  const { ref, inView } = useInViewAnimation({
    once: false,
    duration: 0.8,
    ease: "easeInOut",
    leaveGrace: 3000,
  });

  const imgControls = useAnimation();

  useEffect(() => {
    if (inView) {
      imgControls.start({
        y: [0, -6, 0],
        transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
      });
    } else {
      imgControls.start({ y: 0, scale: 1.16, transition: { duration: 0.2 } });
      try {
        imgControls.stop();
      } catch {
        /* ignore */
      }
    }
  }, [inView, imgControls]);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      whileTap={{ scale: 0.95 }}
      style={{
        cursor: "pointer",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      className="grid rounded-2xl text-left"
    >
      <motion.div className="flex flex-col items-center bg-[#00BC7D] gap-4 rounded-2xl w-[18rem] h-[27rem] md:w-[25rem] shadow-lg shadow-black/60 md:h-[29rem] p-4">
        <div className="mx-auto mt-4 flex rounded-2xl w-[16rem] h-[15rem]  md:w-[21rem] md:h-[14rem] select-none overflow-hidden">
          {imgSrc ? (
            <motion.img
              src={imgSrc}
              loading="lazy"
              decoding="async"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="rounded-xl w-full h-full object-cover select-none"
              alt=""
              initial={{ y: 0, scale: 1.16 }}
              whileHover={{ scale: 1.28 }}
              animate={imgControls}
              style={{
                transformOrigin: "center",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-white/5 flex items-center justify-center text-xs text-white/60">
              Sem imagem
            </div>
          )}
        </div>
        <div className="px-4 mt-2">
          <p
            lang="pt-BR"
            style={{
              WebkitHyphens: "auto",
              msHyphens: "auto",
            }}
            className="font-semibold font-poppins select-none wrap-break-word tracking-[-0.12px] md:tracking-[-0.08px] [word-spacing:-0.06em]"
          >
            {description}
          </p>
          {/* ICONES */}
          <div className="mt-4 flex gap-3">{icon}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CardProject() {
  return (
    <div
      id="projects"
      className="justify-center grid gap-12 pt-22 xl:pt-34 xl:pb-20"
    >
      <h1 className="text-4xl text-current flex justify-center items-center font-semibold font-poppins">
        Meus Projetos
      </h1>
      {/* Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 justify-center gap-22 xl:px-0 md:gap-16 md:px-12 md:pr-16 xl:pr-0 xl:gap-22">
        <ProjectCard
          imgSrc="../../../imgs/img_bot_discord_deals.jpg"
          description={
            "Discord Deals Offerts - Um disparador de jogos gratuitos e pagos desenvoldido com Python, para canais de servidores Discord."
          }
          icon={
            <Icons
              icons={[
                { icon: SiPython, name: "Python" },
                { icon: SiGithub, name: "GitHub" },
                { icon: SiDiscord, name: "Discord" },
              ]}
            />
          }
        />
        <ProjectCard
          imgSrc="../../../imgs/turcb.png"
          description={
            "TurCB - Um guia turistico virtual, que dispara informações turisticas relevantes para a cidade de Corumbá-MS desenvolvido com Javascript."
          }
          icon={
            <Icons
              icons={[
                { icon: SiJavascript, name: "JavaScript" },
                { icon: SiGithub, name: "GitHub" },
                { icon: SiWhatsapp, name: "WhatsApp" },
              ]}
            />
          }
        />
        <div className="md:col-span-2 md:flex md:justify-center xl:col-span-1">
          <ProjectCard
            imgSrc="../../../imgs/scraping_gpu.png"
            description={
              "Web Scraping - Raspagem de dados de preços de placas de video de um site e-commerce, feito com uso das bibliotecas Selenium, OS, pandas, re, math"
            }
            icon={
              <Icons
                icons={[
                  { icon: SiPython, name: "Python" },
                  { icon: SiGithub, name: "GitHub" },
                  { icon: RiFileExcel2Line, name: "Excel" },
                ]}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CardProject;
