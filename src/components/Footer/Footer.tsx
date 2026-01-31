import { SiGithub, SiInstagram, SiLinkedin, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <footer className="flex flex-col bg-[#f2f2f2]dark:bg-[#0E0930] items-center justify-around w-full py-6 text-sm text-gray-800/70">
        <div className="flex items-center md:gap-8 gap-5">
          <a
            href="#home"
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Home
          </a>
          <a
            href="#about"
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Sobre Mim
          </a>
          <a
            href="#projects"
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Projetos
          </a>
          <a
            href="#contact"
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Contato
          </a>
        </div>
        <div className="flex items-center gap-4 mt-8 text-[#209168]">
          <a
            href="https://api.whatsapp.com/send?phone=5567991138636"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiWhatsapp className="size-6" />
          </a>
          <a
            href="https://instagram.com/codes.augusto"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiInstagram className="size-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/codesaugusto"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiLinkedin className="size-6" />
          </a>
          <a
            href="https://github.com/codesaugusto"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiGithub className="size-6" />
          </a>
        </div>
        <p className="mt-8 text-center italic dark:text-white">
          Copyright © {new Date().getFullYear()}{" "}
          <a href="https://prebuiltui.com" target="_blank" rel="noreferrer">
            codes.augusto feito com ❤️
          </a>
        </p>
      </footer>
    </>
  );
}
