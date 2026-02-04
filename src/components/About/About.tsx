import Typewriter from "../../utils/Typewritter";
import { useInViewFade } from "../../hooks/useInViewFade";
import { useThemeContext } from "../../context/useThemeContext";

const About = () => {
  const { ref, visible } = useInViewFade<HTMLDivElement>();
  const { theme } = useThemeContext();

  return (
    <div
      id="about"
      className="relative overflow-hidden xl:pb-38 xl:pt-6 pt-22 mt-[8rem] md:mt-[5rem]"
    >
      {/* Conteúdo */}
      <div className="relative z-10 justify-center grid gap-14">
        <h1
          className={`${theme === "dark" ? "text-[#f2f2f2]" : "text-black"} text-4xl flex justify-center items-center font-semibold font-poppins`}
        >
          Sobre mim
        </h1>
        <div className="flex flex-col xl:flex-row items-center md:justify-between gap-12 md:gap-12">
          <div
            ref={ref}
            className={`
            transition-all duration-900 ease-in
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          >
            <div
              style={{ willChange: "transform", backfaceVisibility: "hidden" }}
              className="rounded-2xl border-white/10 md:w-92 md:h-128 justify-center w-[18rem] h-[27rem]"
            >
              <img
                src="/imgs/img_perfil.png"
                loading="lazy"
                decoding="async"
                width={288}
                height={432}
                className="rounded-2xl shadow-black select-none shadow-md w-full h-full object-cover"
                alt="Model"
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              />
            </div>
          </div>
          <div
            className={`w-[20rem] px-5 md:px-0 ${theme === "dark" ? "text-white" : "text-black"} h-[27rem] md:w-[22rem]`}
          >
            <Typewriter
              startOnView
              text={
                "Olá, Seja bem vindo(a)! Meu nome é Carlos Augusto, atuo como desenvolvedor Full Stack, com foco em React/TypeScript e construção de aplicações web modernas. Ao longo da minha formação, atuei tanto no backend (autenticação, CRUD, estrutura de banco de dados) quanto no frontend, criando interfaces funcionais e bem estruturadas."
              }
              cursorColor={theme === "dark" ? "text-[#f2f2f2]" : "text-black"}
              speed={14}
              className="text-[1.15rem] text-justify leading-relaxed font-semibold font-poppins text-current max-w-[23rem] tracking-[-0.25px] md:tracking-[-0.15px] lg:tracking-[-0.08px] [word-spacing:-0.14rem] md:[word-spacing:-0.12rem] lg:[word-spacing:-0.09rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
