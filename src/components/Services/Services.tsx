import React from "react";
import { handleSmoothScroll } from "../../utils/smooth";
import { motion } from "framer-motion";
import useInViewAnimation from "../../hooks/useInViewAnimation";
import { MdRocketLaunch } from "react-icons/md";
import { useThemeContext } from "../../context/useThemeContext";
import { MdComputer } from "react-icons/md";
import { PiCoffeeFill } from "react-icons/pi";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const { ref } = useInViewAnimation({
    threshold: 0.1,
  });

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
          <div className="w-full h-full rounded-2xl bg-white/7 flex items-center justify-center text-6xl text-current">
            {icon}
          </div>
        </div>
        <div className="px-4 mt-2">
          <h3 className="text-xl font-bold font-poppins text-current text-center mb-2 select-none">
            {title}
          </h3>
          <p
            lang="pt-BR"
            style={{
              hyphens: "none",
              WebkitHyphens: "none",
              msHyphens: "none",
            }}
            className="text-md font-semibold font-poppins select-none wrap-break-word tracking-[-0.12px] mt-5 md:tracking-[-0.08px] [word-spacing:-0.06em]"
          >
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const Services = () => {
  const { theme } = useThemeContext();
  return (
    <div
      id="services"
      onClick={() => handleSmoothScroll({ id: "services" })}
      className="justify-center grid gap-12 pt-22 xl:pt-34 xl:pb-30"
    >
      <h1 className="text-4xl text-current flex justify-center items-center font-semibold font-poppins">
        Meus Serviços
      </h1>
      {/* cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 justify-center gap-22 xl:px-0 md:gap-16 md:px-12 md:pr-16 xl:pr-0 xl:gap-22">
        <ServiceCard
          icon={
            <PiCoffeeFill
              className={` ${theme === "dark" ? "text-[#f2f2f2]" : "text-black"} size-18`}
            />
          }
          title="UI/UX & Landing Pages"
          description="Desenvolvimento de interfaces de usuário intuitivas e responsivas, Landing pages profissionais focando na experiência do usuário."
        />
        <ServiceCard
          icon={
            <MdComputer
              className={` ${theme === "dark" ? "text-[#f2f2f2]" : "text-black"} size-18`}
            />
          } // Placeholder icon
          title="Aplicações Web"
          description="Criação de aplicações web modernas utilizando as melhores práticas e tecnologias atuais, feitas sob medida para suas necessidades."
        />
        <div className="md:col-span-2 md:flex md:justify-center xl:col-span-1">
          <ServiceCard
            icon={
              <MdRocketLaunch
                className={` ${theme === "dark" ? "text-[#f2f2f2]" : "text-black"} size-18`}
              />
            } // Placeholder icon
            title="Performance & Deploy"
            description="Otimização de performance e deploy de aplicações para produção, preocupação de quem entende a importância de um site rápido e eficiente."
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
