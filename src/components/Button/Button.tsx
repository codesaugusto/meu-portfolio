import { motion } from "framer-motion";
import { Zap, PhoneCall } from "lucide-react";
import { useThemeContext } from "../../context/useThemeContext";

const Button = () => {
  const { theme } = useThemeContext();

  const contactThemeClasses =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white";

  return (
    <div className="flex justify-center mt-18 md:mt-[2rem]">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-1 gap-3">
        <motion.button
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-4 rounded-3xl w-fit font-black uppercase tracking-tighter text-xl flex gap-2 items-center ${contactThemeClasses}`}
        >
          <PhoneCall className="w-8 h-8 text-current" />
          CONTATO
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: "pointer" }}
          className="flex items-center px-10 mx-auto py-4 bg-emerald-500 dark:bg-emerald-400 text-black dark:text-white text-xl uppercase tracking-tighter rounded-3xl font-black gap-1"
        >
          <Zap className="w-8 h-8 text-current" />
          Projetos
        </motion.button>
      </div>
    </div>
  );
};

export default Button;
