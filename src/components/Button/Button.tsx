import { motion } from "framer-motion";
import { Zap, PhoneCall } from "lucide-react";
import { useThemeContext } from "../../context/useThemeContext";

const Button = () => {
  const { theme } = useThemeContext();

  const contactThemeClasses =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white";

  return (
    <div className="flex justify-center mt-38 md:mt-[2rem]">
      <div className="flex md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
        <motion.button
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className={`md:px-8 px-4 py-4 md:rounded-3xl rounded-xl md:w-fit w-[4rem] font-black uppercase tracking-tighter md:text-xl text-lg flex justify-center gap-2 items-center ${contactThemeClasses}`}
        >
          <PhoneCall className="w-8 h-8 text-current" />
          <h1 className="hidden md:flex">CONTATO</h1>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: "pointer" }}
          onClick={() => {
            const el = document.getElementById("projects");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="flex justify-center items-center md:px-10 w-[4rem] md:w-fit px-4 rounded-xl mx-auto py-4 bg-emerald-500 dark:bg-emerald-400 text-black dark:text-white md:text-xl text-lg uppercase tracking-tighter md:rounded-3xl font-black gap-1"
        >
          <Zap className="w-8 h-8 text-current" />
          <h1 className="hidden md:flex">PROJETOS</h1>
        </motion.button>
      </div>
    </div>
  );
};

export default Button;
