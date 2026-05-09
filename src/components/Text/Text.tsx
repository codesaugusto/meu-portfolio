import Typewriter from "../../utils/Typewritter";
import { useEffect, useState } from "react";

const isView1366x768 = () => {
  const vw = window.visualViewport;
  if (vw && vw.width <= 1366 && vw.height <= 768) {
    return true;
  }
  return false;
};

const Text = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(() => isView1366x768());

  // use effect que verifica se a viewport é 1366x768 ou menor, para imprimir outro texto no typewriter, caso seja, para evitar que o texto fique muito grande e ocupe muito espaço na tela, prejudicando a experiência do usuário em telas menores.
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(isView1366x768());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textContent = isSmallScreen
    ? "Desenvolvo interfaces modernas, acessíveis e focadas na experiência do usuário, estas são algumas das tecnologias que já utilizei em meus projetos."
    : `Desenvolvo interfaces modernas, acessíveis e focadas na experiência do usuário, estas são <md/> algumas das tecnologias que já utilizei em meus projetos.`;

  return (
    <div className="hidden md:pl-12 md:px-32 xl:pl-28 px-auto md:flex mx-auto w-78 md:h-28 md:text-center justify-center md:justify-center md:mx-0 md:w-full">
      <Typewriter
        text={textContent}
        speed={14}
        startOnView={true}
        style={{
          hyphens: "none",
          WebkitHyphens: "none",
          msHyphens: "none",
        }}
        className="text-current text-center md:text-2xl font-semibold text-lg font-poppins mt-42 md:mt-19 h-54 px-3 md:px-0"
      />
    </div>
  );
};

export default Text;
