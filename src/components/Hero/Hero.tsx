import "../../index.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Grid, User, Mail, Zap, PhoneCall } from "lucide-react";
import { handleSmoothScroll } from "../../utils/smooth";
import useActiveSection from "../../hooks/useActiveSection";
import { useThemeContext } from "../../context/useThemeContext";
import { buttonVariants } from "../../utils/animations";
import CodeWindow from "./CodeWindow";

const Hero = () => {
  const active = useActiveSection(["home", "projects", "about", "contact"]);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const { theme } = useThemeContext();

  const contactThemeClasses =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const atBottom = scrollPosition >= docHeight - 80; // pequeno buffer para ocultar perto do final
      setShowMobileNav(!atBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    // retorno de cleanup para remover o event listener quando o componente for desmontado, evitando vazamentos de memória e comportamento inesperado.
    return () => window.removeEventListener("scroll", handleScroll);
    // array de dependências vazio para garantir que o efeito seja executado apenas uma vez na montagem do componente, configurando o listener de scroll e a função de limpeza corretamente.
  }, []);

  return (
    <div
      id="home"
      className="w-full min-h-auto md:min-h-screen flex flex-col items-center justify-start md:justify-center relative px-4 md:px-0 pt-28 md:pt-0"
    >
      {/* LAYOUT HERO - 2 colunas no desktop, centrado */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16 w-full max-w-6xl mx-auto mb-28">
        {/* COLUNA ESQUERDA - Code Window */}
        <div className="hidden md:flex md:flex-1 md:justify-center md:order-1">
          <CodeWindow />
        </div>

        {/* COLUNA DIREITA - Texto */}
        <div className="md:flex-1 flex justify-center md:justify-start md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col font-semibold text-center md:text-left w-full md:w-auto gap-6 items-center md:items-start"
          >
            <h1
              style={{
                hyphens: "none",
                WebkitHyphens: "none",
                msHyphens: "none",
              }}
              className="md:text-5xl md:max-w-xl text-4xl font-poppins leading-tight font-bold"
            >
              <span className="block dark:text-appTextDark">
                Transformo <span className="text-emerald-500">ideias </span>
                em <span className="text-emerald-500">soluções digitais</span>
                <br /> completas
              </span>
            </h1>
            <p className="font-semibold text-lg italic md:text-lg font-poppins text-gray-600 dark:text-gray-400 md:max-w-lg">
              Desenvolvimento full-stack com foco em experiência do usuário e
              performance.
            </p>

            {/* BUTTONS - Below text */}
            <div className="flex flex-col gap-3 w-44 md:flex-row md:gap-6 md:items-center md:w-auto pt-2 md:pt-4">
              <motion.button
                {...buttonVariants}
                style={{ cursor: "pointer" }}
                onClick={() => handleSmoothScroll({ id: "contact" })}
                className={`w-full md:w-auto px-8 py-4 rounded-2xl md:rounded-2xl font-bold font-poppins text-base md:text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 ${contactThemeClasses}`}
              >
                <PhoneCall className="w-5 h-5" />
                <span>CONTATO</span>
              </motion.button>

              <motion.button
                {...buttonVariants}
                style={{ cursor: "pointer" }}
                onClick={() => handleSmoothScroll({ id: "projects" })}
                className="w-full md:w-auto px-8 py-4 rounded-2xl md:rounded-2xl font-bold font-poppins text-base md:text-lg flex items-center justify-center gap-2 bg-emerald-500 dark:bg-emerald-400 text-black transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                <span>PROJETOS</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM NAV MOBILE */}
      <motion.nav
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] md:hidden z-40"
        style={{ pointerEvents: showMobileNav ? "auto" : "none" }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: showMobileNav ? 0 : 80, opacity: showMobileNav ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl px-4 py-3 flex justify-between items-center">
          {/* make nav icons reflect active section */}
          <>
            <button
              onClick={() => handleSmoothScroll({ id: "home" })}
              className={`flex flex-col items-center`}
            >
              <Home
                className="w-6 h-6"
                color={active === "home" ? "#10B981" : "#6B7280"}
              />
              <span
                className={`text-xs mt-1 font-semibold ${active === "home" ? "text-emerald-500" : "text-slate-500"}`}
              >
                INÍCIO
              </span>
            </button>

            <button
              onClick={() => handleSmoothScroll({ id: "about" })}
              className={`flex flex-col items-center`}
            >
              <User
                className="w-6 h-6"
                color={active === "about" ? "#10B981" : "#6B7280"}
              />
              <span
                className={`text-xs mt-1 ${active === "about" ? "text-emerald-500" : "text-slate-500"}`}
              >
                SOBRE
              </span>
            </button>
            <button
              onClick={() => handleSmoothScroll({ id: "projects" })}
              className={`flex flex-col items-center`}
            >
              <Grid
                className="w-6 h-6"
                color={active === "projects" ? "#10B981" : "#6B7280"}
              />
              <span
                className={`text-xs mt-1 ${active === "projects" ? "text-emerald-500" : "text-slate-500"}`}
              >
                PROJETOS
              </span>
            </button>

            <button
              onClick={() => handleSmoothScroll({ id: "contact" })}
              className={`flex flex-col items-center`}
            >
              <Mail
                className="w-6 h-6"
                color={active === "contact" ? "#10B981" : "#6B7280"}
              />
              <span
                className={`text-xs mt-1 ${active === "contact" ? "text-emerald-500" : "text-slate-500"}`}
              >
                EMAIL
              </span>
            </button>
          </>
        </div>
      </motion.nav>
    </div>
  );
};

export default Hero;
