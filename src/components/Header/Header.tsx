import "../../index.css";
import { CodeXml } from "lucide-react";

const Header = () => {
  return (
    <div className="md:pl-28 md:pt-12 mt-6 md:mt-0 pl-4 flex justify-center md:justify-start">
      <header>
        <div className="justify-start flex gap-2 items-center">
          <h1 className="md:text-3xl text-2xl font-semibold font-montserrat italic text-white">
            @codes.augusto
          </h1>
          <span className="text-4xl text-emerald-600">
            <CodeXml className="w-12 h-12 text-emerald-600" />
          </span>
        </div>
      </header>
    </div>
  );
};

export default Header;
