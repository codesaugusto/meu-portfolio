import { motion } from "framer-motion";
import { Zap, PhoneCall } from "lucide-react";
import { useThemeContext } from "../../context/useThemeContext";
import { handleSmoothScroll } from "../../utils/smooth";
import { buttonVariants } from "../../utils/animations";

const Button = () => {
  const { theme } = useThemeContext();

  const contactThemeClasses =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white";

  return (
    <>
      <div className="flex justify-center mt-16 md:mt-[2rem]">
        <div className="md:grid-cols-2 md:gap-5 gap-4 flex flex-row">
          <motion.button
            style={{ cursor: "pointer" }}
            {...buttonVariants}
            onClick={() => handleSmoothScroll({ id: "contact" })}
            className={`md:px-8 px-4 py-4 md:rounded-3xl rounded-xl md:w-[13rem] hidden w-[7rem] h-12 md:h-full font-bold font-poppins uppercase tracking-tighter md:text-lg text-xl md:flex justify-center gap-2 items-center ${contactThemeClasses}`}
          >
            <PhoneCall className="w-8 h-8 text-current" />
            <h1 className="hidden md:flex">CONTATO</h1>
          </motion.button>

          <motion.button
            {...buttonVariants}
            style={{ cursor: "pointer" }}
            onClick={() => handleSmoothScroll({ id: "projects" })}
            className="md:flex justify-center items-center md:px-10 w-[7rem] md:w-[13rem] hidden font-poppins h-12 md:h-full px-4 rounded-xl mx-auto py-4 bg-emerald-500 dark:bg-emerald-400 text-black md:text-lg text-xl uppercase tracking-tighter md:rounded-3xl font-bold gap-1"
          >
            <Zap className="w-8 h-8 text-current" />
            <h1 className="hidden md:flex">PROJETOS</h1>
          </motion.button>
        </div>
      </div>

      {/* Mobile CTAs: visíveis somente em telas pequenas */}
      <div className="md:hidden flex justify-center right-5 z-50">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <button
            onClick={() => handleSmoothScroll({ id: "projects" })}
            aria-label="Serviços"
            className="w-52 h-13 bg-emerald-500 text-white py-3 rounded-xl shadow-lg flex items-center justify-center gap-3 font-bold font-poppins text-lg"
          >
            <Zap className="md:w-5 md:h-5 w-6 h-6 text-current" />
            <span>Serviços</span>
          </button>

          <button
            onClick={() => handleSmoothScroll({ id: "contact" })}
            aria-label="Contato"
            className={`w-52   h-13 py-3 rounded-xl shadow-md flex items-center justify-center gap-3 font-bold font-poppins text-lg ${contactThemeClasses}`}
          >
            <PhoneCall className="md:w-5 md:h-5 w-6 h-6 text-current" />
            <span>Contato</span>
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default Button;
