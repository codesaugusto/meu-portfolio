import { FiSun, FiMoon } from "react-icons/fi";
import { useThemeContext } from "../../context/useThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      aria-label="Alternar tema"
      onClick={toggleTheme}
      style={{ cursor: "pointer" }}
      className={`p-3 md:p-2 fixed z-50 rounded-lg shadow active:scale-95 transition-transform flex items-center justify-center top-6 right-6 md:top-12 md:right-21 ${theme === "dark" ? "bg-white" : "bg-black"}`}
      title={theme === "dark" ? "Mudar para claro" : "Mudar para escuro"}
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 text-black" />
      ) : (
        <FiMoon className="w-5 h-5 text-yellow-400 " />
      )}
    </button>
  );
}
