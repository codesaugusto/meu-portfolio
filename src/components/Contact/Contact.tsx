import { SiGithub, SiWhatsapp, SiLinkedin, SiInstagram } from "react-icons/si";

const Contact = () => {
  return (
    <div className="flex flex-col gap-1 mt-[18rem]">
      <h1 className="text-[#f2f2f2] text-4xl flex justify-center items-center font-semibold font-poppins">
        Contato
      </h1>
      <div className=" grid gap-14 mt-4">
        <div className="flex justify-end mx-65 rounded-xl mt-5 h-[38rem] py-9 pr-9 bg-linear-to-r from-[#189c70] via-[#219b72] to-[#1f855c] mb-33">
          <div className="grid grid-cols-1 text-start items-center mx-auto">
            <div className="pb-14 flex justify-between h-full">
              <div className="items-start flex flex-col gap-10">
                <h1 className="font-poppins font-bold text-3xl w-[35rem]">
                  Vamos discutir as suas ideias e transforma-las em
                  <span className="text-[#13094e] font-bold"> realidade </span>
                  juntos!
                </h1>
                <div className="gap-9 flex flex-col items-start border-2 w-[19rem] px-5 py-2 rounded-xl">
                  <div className="flex gap-3 items-center justify-center">
                    <SiWhatsapp className="size-5" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      (67) 99655-7683
                    </p>
                  </div>
                </div>
                <div className="gap-9 flex flex-col items-start border-2 w-[19rem] px-5 py-2 rounded-xl">
                  <div className="flex gap-3 items-center justify-center">
                    <SiInstagram className="size-5" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      @codes.augusto
                    </p>
                  </div>
                </div>
                <div className="gap-9 flex flex-col items-start border-2 w-[19rem] px-5 py-2 rounded-xl">
                  <div className="flex gap-3 items-center justify-center">
                    <SiLinkedin className="size-5" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      codesaugusto
                    </p>
                  </div>
                </div>
                <div className="gap-9 flex flex-col items-start border-2 w-[19rem] px-5 py-2 rounded-xl">
                  <div className="flex gap-3 items-center justify-center">
                    <SiGithub className="size-5" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      codesaugusto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-1/2 rounded-2xl bg-[#0e0930] via-[#0a001e] to-[#343485]"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
