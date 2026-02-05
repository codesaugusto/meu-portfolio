import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

// Número pode ser configurado via Vite env: VITE_WHATSAPP (ex: 5511999999999)
const phone = (import.meta.env.VITE_WHATSAPP as string) || "5511999999999";
const defaultText = encodeURIComponent(
  "Olá! Gostaria de falar sobre um projeto.",
);

export default function WhatsAppFloating() {
  const href = `https://wa.me/${phone}?text=${defaultText}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato WhatsApp"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="fixed bottom-6 right-6 z-50 flex items-center bg-[#25D366] text-white px-3 py-3 mb-5 mr-2 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-150 print:hidden"
    >
      <SiWhatsapp className="w-8 h-8" />
      <span className="hidden sm:inline-block font-medium"></span>
    </motion.a>
  );
}
