import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import {
  SiPython,
  SiGithub,
  SiNodedotjs,
  SiDiscord,
  SiWhatsapp,
  SiMongodb,
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
  href,
  title = "",
}: {
  imgSrc?: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  title?: string;
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

  const inner = (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      whileTap={{ scale: 0.95 }}
      style={{
        hyphens: "none",
        WebkitHyphens: "none",
        msHyphens: "none",
        cursor: "pointer",
      }}
      className="grid rounded-2xl text-left"
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="flex flex-col items-center bg-[#00BC7D] gap-4 rounded-2xl w-[18rem] h-[27rem] md:w-[25rem] shadow-lg shadow-black/60 md:h-[31rem] p-4"
      >
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
        <div className="px-4 mt-2 flex flex-col flex-1">
          {title && (
            <h3 className="text-xl font-bold font-poppins text-current text-center mb-2">
              {title}
            </h3>
          )}
          <p
            lang="pt-BR"
            style={{
              hyphens: "none",
              WebkitHyphens: "none",
              msHyphens: "none",
            }}
            className="font-semibold font-poppins select-none wrap-break-word tracking-[-0.12px] md:tracking-[-0.08px] [word-spacing:-0.06em]"
          >
            {description}
          </p>
          {/* ICONES */}
          <div className="mt-auto flex gap-3 pb-4">{icon}</div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (href) {
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");
    return (
      <Link
        to={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={description ? description : "Project link"}
        className="no-underline"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

export function CardProject() {
  return (
    <div
      id="projects"
      className="justify-center grid gap-12 pt-22 xl:pt-34 xl:pb-48"
    >
      <h1 className="text-4xl text-current flex justify-center items-center font-semibold font-poppins">
        Meus Projetos
      </h1>
      {/* Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 justify-center gap-22 xl:px-0 md:gap-16 md:px-12 md:pr-16 xl:pr-0 xl:gap-22">
        <ProjectCard
          imgSrc="../../../imgs/img_bot_discord_deals.jpg"
          title="Discord Deals Offerts"
          description={
            "Um disparador de jogos gratuitos e pagos desenvoldido com Python, para canais de servidores Discord."
          }
          href="https://github.com/codesaugusto/discord_deals_offerts"
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
          title="TurCB"
          description={
            "Um bot para WhatsApp, que dispara informações turisticas para a cidade de Corumbá desenvolvido com Node.js e MongoDB."
          }
          href="https://github.com/codesaugusto/turcb_bot"
          icon={
            <Icons
              icons={[
                { icon: SiMongodb, name: "MongoDB" },
                { icon: SiNodedotjs, name: "Node.js" },
                { icon: SiGithub, name: "GitHub" },
                { icon: SiWhatsapp, name: "WhatsApp" },
              ]}
            />
          }
        />
        <div className="md:col-span-2 md:flex md:justify-center xl:col-span-1">
          <ProjectCard
            imgSrc="../../../imgs/scraping_gpu.png"
            title="Web Scraping"
            description={
              "Raspagem de dados de preços de placas de vídeo de um site e-commerce, usando Selenium, pandas e ferramentas auxiliares."
            }
            href="https://github.com/codesaugusto/scraping_dados_gpu"
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
