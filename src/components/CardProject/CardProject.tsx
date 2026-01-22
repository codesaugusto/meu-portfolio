import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
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
            className="text-white w-7 h-7"
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
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const imgControls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // debounce logic: only consider the element out-of-view if it stays
    // fully non-intersecting for a short timeout. This prevents flicker
    // when a sliver of the card is visible during scrolling.
    let leaveTimeout: number | null = null;
    // increase debounce to avoid flicker and use rootMargin so the element
    // remains considered "in view" a bit longer while scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            // still visible: cancel any pending hide
            if (leaveTimeout) {
              clearTimeout(leaveTimeout);
              leaveTimeout = null;
            }
            controls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            });
            // start subtle bobbing animation on the image
            imgControls.start({
              y: [0, -12, 0],
              transition: {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            });
          } else {
            // schedule hide with a short delay to avoid flicker
            if (leaveTimeout) clearTimeout(leaveTimeout);
            leaveTimeout = window.setTimeout(() => {
              controls.start({
                opacity: 0,
                y: 40,
                transition: { duration: 0.35, ease: "easeInOut" },
              });
              imgControls.start({
                y: 0,
                scale: 1.16,
                transition: { duration: 0.2 },
              });
              leaveTimeout = null;
            }, 300);
          }
        });
      },
      { threshold: [0], rootMargin: "0px 0px -10px 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (leaveTimeout) clearTimeout(leaveTimeout);
    };
  }, [controls, imgControls]);

  return (
    <motion.div
      ref={ref}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: "pointer" }}
      className="grid rounded-2xl text-left"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        className="flex flex-col items-center bg-gradient-to-r from-[#189c70] via-[#219b72] to-[#1f855c] gap-4 rounded-2xl w-[18rem] h-[27rem] md:w-[25rem] md:h-[29rem] p-4"
      >
        <div className="mx-auto mt-4 flex rounded-2xl w-[16rem] h-[15rem]  md:w-[21rem] md:h-[14rem] select-none overflow-hidden">
          {imgSrc ? (
            <motion.img
              src={imgSrc}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="rounded-xl w-full h-full object-cover select-none"
              alt=""
              initial={{ y: 0, scale: 1.16 }}
              whileHover={{ scale: 1.32 }}
              animate={imgControls}
              style={{ transformOrigin: "center" }}
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
              hyphens: "auto",
              WebkitHyphens: "auto",
              msHyphens: "auto",
            }}
            className="font-semibold font-poppins select-none text-justify wrap-break-word tracking-[-0.12px] md:tracking-[-0.08px] [word-spacing:-0.06em]"
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
    <div className="justify-center grid gap-12 mt-12">
      <h1 className="text-white text-4xl flex justify-center items-center font-semibold font-poppins mt-12">
        Meus Projetos
      </h1>
      {/* Cards */}
      <div className="grid md:grid-cols-3 grid-cols-1 justify-center gap-22">
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
  );
}

export default CardProject;
