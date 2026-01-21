import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

function ProjectCard({
  imgSrc = "",
  description = "",
}: {
  imgSrc?: string;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            });
          } else {
            // reset instantly so the entrance animation can replay cleanly
            controls.set({ opacity: 0, y: 40 });
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: "pointer" }}
      className="grid rounded-2xl text-left"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        className="flex flex-col items-center border-2 bg-transparent gap-4 rounded-2xl w-[25rem] h-[29rem] p-4"
      >
        <div className="mx-auto mt-4 flex border-2 bg-transparent rounded-2xl w-[21rem] h-[14rem] select-none">
          <img
            src={imgSrc}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="rounded-xl w-full h-full object-cover select-none"
            alt=""
          />
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
      <div className="grid grid-cols-3 justify-center gap-22">
        <ProjectCard
          imgSrc=""
          description={
            "Discord Deals Offerts - Um disparador de jogos gratuitos e pagos desenvoldido com Python, para canais de servidores Discord."
          }
        />
        <ProjectCard
          imgSrc=""
          description={
            "TurCB - Um guia turistico virtual, que dispara informações turisticas relevantes para a cidade de Corumbá-MS desenvolvido com Javascript."
          }
        />
        <ProjectCard
          imgSrc=""
          description={
            "Web Scraping - Raspagem de dados de GPU de um site e-commerce, feito com uso das bibliotecas Selenium, OS, pandas, re, math"
          }
        />
      </div>
    </div>
  );
}

export default CardProject;
