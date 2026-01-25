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

    // We'll allow the entrance animation to finish even if the user scrolls away.
    // On leave we schedule a hide after a grace period (3s). If the user returns
    // before that, we cancel the hide. This avoids flicker and ensures a single
    // consistent animation lifecycle.
    let leaveTimeout: number | null = null;
    const visibleRef = { current: false } as { current: boolean };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            // still visible: cancel any pending hide and ensure enter animation
            if (leaveTimeout) {
              clearTimeout(leaveTimeout);
              leaveTimeout = null;
            }
            visibleRef.current = true;
            controls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            });
            // start subtle bobbing animation on the image
            // gentler bobbing to reduce rendering cost on low-end devices
            imgControls.start({
              y: [0, -6, 0],
              transition: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            });
            // ensure we resume if page becomes visible again
            // visibleRef marks whether we are considered visible
            visibleRef.current = true;
          } else {
            // schedule hide with a longer grace to allow the entrance animation
            // to finish even if the element briefly leaves the viewport
            if (leaveTimeout) clearTimeout(leaveTimeout);
            leaveTimeout = window.setTimeout(() => {
              leaveTimeout = null;
              visibleRef.current = false;
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
            }, 3000);
          }
        });
      },
      { threshold: [0], rootMargin: "0px 0px -10px 0px" },
    );

    // Handle page visibility to avoid animation jank when tab is frozen
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        // stop running animations
        try {
          controls.stop();
        } catch (e) {
          console.error(e);
        }
        try {
          imgControls.stop();
        } catch (e) {
          console.error(e);
        }
      } else {
        // When tab becomes visible, check if the element is actually in viewport
        // (IntersectionObserver entries may have been missed while hidden).
        try {
          const rect = el.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) {
            visibleRef.current = true;
            controls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            });
            imgControls.start({
              y: [0, -6, 0],
              transition: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    const onPageShow = () => {
      try {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          visibleRef.current = true;
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          });
          imgControls.start({
            y: [0, -6, 0],
            transition: {
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow as EventListener);

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (leaveTimeout) clearTimeout(leaveTimeout);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow as EventListener);
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
        className="flex flex-col items-center bg-gradient-to-r from-[#189c70] via-[#219b72] to-[#1f855c] gap-4 rounded-2xl w-[18rem] h-[27rem] md:w-[25rem] shadow-lg shadow-[#08051a] md:h-[29rem] p-4"
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
              style={{ transformOrigin: "center", willChange: "transform" }}
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
    <div className="justify-center grid gap-12">
      <h1 className="text-white text-4xl flex justify-center items-center font-semibold font-poppins mt-[4rem]">
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
