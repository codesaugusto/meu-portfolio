import Typewriter from "../../utils/Typewritter";

const Text = () => {
  return (
    <div className="md:pl-28 px-auto flex mx-auto w-78 md:h-28 justify-center md:justify-start md:mx-0 md:w-full">
      <Typewriter
        text={`Desenvolvo interfaces modernas, acessíveis <md/>e focadas na experiência do usuário, estas são algumas das tecnologias que já utilizei em meus projetos.`}
        speed={14}
        startOnView={true}
        style={{
          hyphens: "auto",
          WebkitHyphens: "none",
          msHyphens: "none",
        }}
        className="text-current text-start md:text-2xl font-semibold text-lg font-poppins mt-42 md:mt-19 md:text-justify h-54 px-3 md:px-0"
      />
    </div>
  );
};

export default Text;
