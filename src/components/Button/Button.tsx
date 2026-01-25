import { motion } from "framer-motion";
import { Zap, PhoneCall } from "lucide-react";

const Button = () => {
  return (
    <div className="flex justify-center mt-18 md:mt-[4rem]">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-1 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-[#F2F2F2] text-black rounded-3xl w-fit font-black uppercase tracking-tighter text-xl flex gap-2 items-center"
        >
          <PhoneCall className=" text-black w-8 h-8" />
          CONTATO
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
          flex items-center
          px-10 mx-auto py-4 
          bg-[#10b981] 
          text-black text-xl font-black uppercase tracking-tighter
          rounded-3xl gap-1
        "
        >
          <Zap className="fill-black w-8 h-8" />
          Projetos
        </motion.button>
      </div>
    </div>
  );
};

export default Button;
