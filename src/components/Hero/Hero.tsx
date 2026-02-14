import "../../index.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CodeXml, Home, Grid, User, Mail } from "lucide-react";
import { handleSmoothScroll } from "../../utils/smooth";
import useActiveSection from "../../hooks/useActiveSection";

const Hero = () => {
  const active = useActiveSection(["home", "projects", "about", "contact"]);
  const [showMobileNav, setShowMobileNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const atBottom = scrollPosition >= docHeight - 80; // small buffer to hide near the end
      setShowMobileNav(!atBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="home"
      className="mt-12 w-full justify-center mx-auto flex relative"
    >
      {/* COLUNA DIREITA */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col font-semibold text-center gap-2 items-center md:pl-10 md:px-10 px-8"
        >
          <h1
            style={{
              hyphens: "none",
              WebkitHyphens: "none",
              msHyphens: "none",
            }}
            className="md:text-6xl text-3xl font-poppins leading-tight md:pt-16 pt-12 text-center md:text-center md:font-[450] font-bold"
          >
            <span className="block dark:text-appTextDark">
              Transformo <span className="text-emerald-500">ideias </span>
              em{" "}
              <span className=" text-emerald-500">
                soluções <br /> digitais{" "}
              </span>
              completas
            </span>
          </h1>
          <CodeXml className="hidden md:flex md:w-20 md:h-20 w-16 h-16 pt-2 text-emerald-500" />
          <p className="font-bold text-center text-lg md:hidden pt-4 text-gray-500">
            Desenvolvimento full-stack com foco em experiência do usuário e
            performance.
          </p>
        </motion.div>
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
