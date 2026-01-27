import "../../index.css";
import { motion } from "framer-motion";
import { CodeXml } from "lucide-react";

const Hero = () => {
  return (
    <div className="mt-12 w-full justify-center mx-auto flex">
      {/* COLUNA DIREITA */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col font-semibold text-center gap-2 items-center md:pl-10 px-10"
        >
          <h1
            style={{
              hyphens: "auto",
              WebkitHyphens: "auto",
              msHyphens: "auto",
            }}
            className="md:text-6xl text-3xl italic font-playfair leading-tight pt-16 text-center md:text-center font-[640]"
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
          <CodeXml className="md:w-17 md:h-20 w-12 h-12 text-emerald-500" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
