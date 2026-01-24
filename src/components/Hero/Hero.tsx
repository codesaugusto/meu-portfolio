import "../../index.css";
import { motion } from "framer-motion";
import { CodeXml } from "lucide-react";

const Hero = () => {
  return (
    <div className="mt-12 md:w-full justify-center flex">
      {/* COLUNA DIREITA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col text-center gap-2 items-center md:pl-10 px-10"
      >
        <h1
          // quebrar linha com hyphens
          style={{ hyphens: "auto", WebkitHyphens: "auto", msHyphens: "auto" }}
          className="md:text-6xl text-4xl italic font-playfair leading-tight pt-16 md:text-center"
        >
          <span className="block text-[#F2F2F2]">
            Transformo <span className="text-[#10b981]">ideias </span>
            em{" "}
            <span className=" text-[#10b981]">
              soluções <br /> digitais{" "}
            </span>
            completas
          </span>
        </h1>
        <CodeXml className="md:w-17 font-semibold md:h-20 w-12 h-12 text-[#10b981]" />
      </motion.div>
    </div>
  );
};

export default Hero;
