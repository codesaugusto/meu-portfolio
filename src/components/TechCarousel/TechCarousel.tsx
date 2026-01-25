import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiPostgresql,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import type { IconType } from "react-icons";
import { useEffect, useRef, useState } from "react";

type Tech = {
  icon: IconType;
  name: string;
};

const TechCarousel = () => {
  const techs = [
    { icon: FaReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
    { icon: FaNodeJs, name: "Node.js" },
    { icon: SiPostgresql, name: "PostgreSQL" },
    { icon: GrMysql, name: "MySQL" },
    { icon: FaDocker, name: "Docker" },
    { icon: SiPython, name: "Python" },
  ];
  // Quantas vezes repetir a sequência dentro de cada bloco (calculado dinamicamente)
  const [repetitions, setRepetitions] = useState<number>(6);
  const maxRepetitions = 24;
  const repeated = Array.from({ length: repetitions }).flatMap(() => techs);

  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const list = listRef.current;
    const spacer = spacerRef.current;
    if (!marquee || !list) return;

    // pausa qualquer animação CSS até termos medidas
    marquee.style.animation = "none";

    let cleanup: (() => void) | null = null;

    const recalc = async (): Promise<() => void> => {
      // esperar fontes carregarem para medidas estáveis
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      if (fonts && typeof fonts.ready?.then === "function") {
        try {
          await fonts.ready;
        } catch (e) {
          void e;
        }
      } else {
        await new Promise((r) => setTimeout(r, 50));
      }

      const width = list.getBoundingClientRect().width;
      const spacerWidth = spacer ? spacer.getBoundingClientRect().width : 0;
      const total = Math.round(width + spacerWidth);

      // Se o bloco A ainda for menor que a viewport, aumentar repetições e refazer
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      if (width < viewportWidth && repetitions < maxRepetitions) {
        setRepetitions((r) => Math.min(maxRepetitions, r + 1));
        // não iniciar animação agora — o efeito será reexecutado após setRepetitions
        return () => {};
      }

      // mostrar somente quando tudo estiver pronto
      marquee.style.visibility = "hidden";

      // animação por rAF
      const speed = 120; // px / s
      let last = performance.now();
      let offset = 0;
      let rafId = 0;
      let running = true;

      const tick = (now: number) => {
        const dt = (now - last) / 1000;
        last = now;
        if (running) {
          offset = (offset + dt * speed) % total;
          marquee.style.transform = `translate3d(${-offset}px,0,0)`;
        }
        rafId = requestAnimationFrame(tick);
      };

      const onEnter = (): void => {
        running = false;
      };
      const onLeave = (): void => {
        running = true;
        last = performance.now();
      };

      marquee.addEventListener("mouseenter", onEnter);
      marquee.addEventListener("mouseleave", onLeave);
      marquee.addEventListener("touchstart", onEnter, {
        passive: true,
      } as EventListenerOptions);
      marquee.addEventListener("touchend", onLeave, {
        passive: true,
      } as EventListenerOptions);

      last = performance.now();
      rafId = requestAnimationFrame(tick);

      // tornar visível somente depois de iniciar o loop
      marquee.style.visibility = "visible";

      // retornar função de limpeza
      return () => {
        cancelAnimationFrame(rafId);
        marquee.style.transform = "";
        marquee.removeEventListener("mouseenter", onEnter);
        marquee.removeEventListener("mouseleave", onLeave);
        marquee.removeEventListener(
          "touchstart",
          onEnter as EventListenerOrEventListenerObject,
        );
        marquee.removeEventListener(
          "touchend",
          onLeave as EventListenerOrEventListenerObject,
        );
        // nothing special to remove (we use JSX clone)
      };
    };

    (async () => {
      cleanup = await recalc();
    })();

    const handleResize = async () => {
      if (cleanup) cleanup();
      cleanup = await recalc();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener("resize", handleResize);
    };
  }, [repetitions, techs.length]);

  const TechItem = ({ tech }: { tech: Tech }) => {
    const Icon = tech.icon;

    return (
      <div className="flex flex-col items-center gap-2 text-[#F2F2F2]/80 hover:text-[#F2F2F2] transition">
        <Icon className="text-5xl" />
        <span className="text-sm font-medium tracking-wide">{tech.name}</span>
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden py-16 mt-[12rem] mb-[4rem]">
      {/* Fade esquerda */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r to-transparent" />

      {/* Fade direita */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l to-transparent" />

      <div ref={marqueeRef} className="flex flex-nowrap">
        {/* Lista A */}
        <div ref={listRef} className="flex flex-none gap-20">
          {repeated.map((tech, index) => (
            <TechItem key={`a-${index}`} tech={tech} />
          ))}
        </div>
        {/* spacer between A and B to avoid icons colliding */}
        <div ref={spacerRef} aria-hidden="true" className="w-20 flex-none" />

        {/* Lista B (renderizada no primeiro paint para evitar pop) */}
        <div aria-hidden="true" className="flex flex-none gap-20">
          {repeated.map((tech, index) => (
            <TechItem key={`b-${index}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
