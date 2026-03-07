import "../../index.css";
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
          <Link
            to="https://www.instagram.com/codes.augusto/"
            target="_blank"
            rel="noopener noreferrer"
            className="justify-start flex gap-2 items-center"
          ></Link>
          <div className="pr-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
