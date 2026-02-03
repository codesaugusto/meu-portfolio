import "../../index.css";
import { FiInstagram } from "react-icons/fi";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      id="home"
      className="md:pl-28 md:pt-12 md:mt-0 pt-6 pl-4 flex justify-center md:justify-start"
    >
      <header className="w-full">
        <div className="flex items-center justify-between">
          <div className="justify-start flex gap-2 items-center">
            <Link
              to="https://www.instagram.com/codes.augusto/"
              className="md:text-3xl cursor-pointer text-2xl font-semibold font-montserrat italic text-current"
            >
              @codes.augusto
            </Link>
            <span className="text-4xl">
              <FiInstagram className="md:w-8 md:h-12 w-7 h-8 text-current" />
            </span>
          </div>
          <div className="pr-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
