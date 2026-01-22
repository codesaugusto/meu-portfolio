import Typewriter from "../../utils/Typewritter";

const Text = () => {
  return (
    <div className="md:pl-28 flex mx-auto w-78 justify-center md:justify-start md:mx-0 md:w-full">
      <Typewriter
        text={`Desenvolvo interfaces modernas, acessíveis <md/>e focadas na experiência do usuário, essas são as tecnologias que já utilizei em meus projetos.`}
        speed={14}
        startOnView={true}
        style={{
          hyphens: "auto",
          WebkitHyphens: "none",
          msHyphens: "none",
        }}
        className="text-white md:text-start text-xl font-semibold font-poppins mt-45 md:mt-22 text-justify"
      />
    </div>
  );
};

export default Text;
