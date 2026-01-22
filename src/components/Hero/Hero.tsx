import "../../index.css";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="mt-12 justify-center flex">
      {/* COLUNA DIREITA */}
      <div className="flex flex-col gap-12 items-center justify-center pl-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:text-7xl text-4xl font-playfair leading-tight pt-16 text-start md:text-center"
        >
          <span className="block">
            Transformo suas{" "}
            <span className="italic text-emerald-700">ideias</span> em{" "}
            <span className="italic text-emerald-700">soluções</span>
          </span>
          <span className="block">
            de interfaces{" "}
            <span className="italic text-emerald-700">memoráveis.</span>
          </span>
        </motion.h1>
      </div>
    </div>
  );
};

export default Hero;
