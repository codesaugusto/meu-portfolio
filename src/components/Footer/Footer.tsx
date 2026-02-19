import { SiGithub, SiInstagram, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { handleSmoothScroll } from "../../utils/smooth";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            `}</style>

      <footer className="flex flex-col items-center justify-around w-full md:py-6 pb-6 text-sm text-gray-800/70">
        <div className="hidden md:flex items-center md:gap-8 gap-5">
          <Link
            to="#home"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll({ id: "home" });
            }}
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Home
          </Link>
          <Link
            to="#about"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll({ id: "about" });
            }}
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Sobre Mim
          </Link>
          <Link
            to="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll({ id: "projects" });
            }}
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Projetos
          </Link>
          <Link
            to="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll({ id: "contact" });
            }}
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Contato
          </Link>
          <Link
            to="#services"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll({ id: "services" });
            }}
            className="font-medium dark:text-white text-gray-500 hover:text-black transition-all"
          >
            Serviços
          </Link>
        </div>
        <div className="flex items-center gap-4 md:mt-8 text-[#209168]">
          <a
            href="https://api.whatsapp.com/send?phone=5567991138636"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiWhatsapp className="w-7 h-7 md:w-6 md:h-6" />
          </a>
          <a
            href="https://instagram.com/codes.augusto"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiInstagram className="w-7 h-7 md:w-6 md:h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/codesaugusto"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiLinkedin className="w-7 h-7 md:w-6 md:h-6" />
          </a>
          <a
            href="https://github.com/codesaugusto"
            target="_blank"
            rel="noreferrer"
            className="hover:-translate-y-0.5 transition-all duration-300"
          >
            <SiGithub className="w-7 h-7 md:w-6 md:h-6" />
          </a>
        </div>
        <p className="mt-8 text-center italic dark:text-white">
          Copyright © {new Date().getFullYear()}{" "}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll({ id: "home" });
            }}
          >
            codes.augusto feito com ❤️
          </a>
        </p>
      </footer>
    </>
  );
}
