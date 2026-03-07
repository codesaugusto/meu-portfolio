import { motion } from "framer-motion";
import { Phone, Zap } from "lucide-react";
import { useThemeContext } from "../../context/useThemeContext";
import { handleSmoothScroll } from "../../utils/smooth";
import { buttonVariants } from "../../utils/animations";

interface FeatureModalProps {
  badge?: string;
  title: string;
  description: string;
  delay?: number;
}

const FeatureModal = ({
  badge = "Desenvolvimento Fullstack",
  title = "Construa o futuro com código de excelência",
  description = "Especialistas em TypeScript, React, Angular e Java Fullstack. Transformamos ideias em soluções digitais de alta performance e escalabilidade.",
  delay = 0,
}: FeatureModalProps) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const contactThemeClasses = isDark
    ? "bg-white text-black"
    : "bg-black text-white";
  const badgeClasses = isDark
    ? "bg-slate-800 text-slate-300"
    : "bg-gray-200 text-gray-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={`w-full rounded-2xl p-8 md:p-12 ${
        isDark ? "bg-slate-900/50" : "bg-white/50"
      } backdrop-blur-md border ${
        isDark ? "border-slate-700/50" : "border-gray-200/50"
      }`}
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
        className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold mb-6 ${badgeClasses}`}
      >
        {badge}
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: delay + 0.2 }}
        className={`text-3xl md:text-4xl font-bold font-poppins mb-6 leading-tight ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {title}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: delay + 0.3 }}
        className={`text-lg mb-8 leading-relaxed max-w-2xl ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {description}
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 items-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: delay + 0.4 }}
      >
        <motion.button
          {...buttonVariants}
          style={{ cursor: "pointer" }}
          onClick={() => handleSmoothScroll({ id: "projects" })}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold font-poppins uppercase tracking-tight text-sm md:text-base flex items-center gap-2 transition-all hover:scale-105 ${contactThemeClasses}`}
        >
          <Zap className="w-4 h-4 md:w-5 md:h-5" />
          Ver Projetos
        </motion.button>

        <motion.button
          {...buttonVariants}
          style={{ cursor: "pointer" }}
          onClick={() => handleSmoothScroll({ id: "contact" })}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold font-poppins uppercase tracking-tight text-sm md:text-base flex items-center gap-2 transition-all hover:scale-105 border-2 ${
            isDark
              ? "border-white text-white hover:bg-white hover:text-black"
              : "border-black text-black hover:bg-black hover:text-white"
          }`}
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
          Fale Conosco
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FeatureModal;
