import Typewriter from "../../utils/Typewritter";

const Text = () => {
  return (
    <div className="md:pl-28 flex mx-auto w-78 md:h-28 justify-center md:justify-start md:mx-0 md:w-full">
      <Typewriter
        text={`Desenvolvo interfaces modernas, acessíveis <md/>e focadas na experiência do usuário, estas são algumas das tecnologias que já utilizei em meus projetos.`}
        speed={14}
        startOnView={true}
        style={{
          hyphens: "auto",
          WebkitHyphens: "none",
          msHyphens: "none",
        }}
        className="text-[#F2F2F2] text-start text-xl px-2 md:px-0 md:text-2xl font-semibold font-poppins mt-45 md:mt-[12rem] md:text-justify h-54"
      />
    </div>
  );
};

export default Text;
