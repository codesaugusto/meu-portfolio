import { motion } from "framer-motion";
import { Zap, PhoneCall } from "lucide-react";

const Button = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="grid grid-cols-2 gap-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 border-2 border-emerald-900 bg-black text-white rounded-3xl w-fit font-bold text-xl tracking-wide hover:07011d0 flex gap-2 items-center"
        >
          <PhoneCall className="fill-black w-8 h-8" />
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
