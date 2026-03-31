import { FiMoon, FiSun } from "react-icons/fi";

import { useThemeContext } from "../../context/useThemeContext";

export function ModeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      type="button"
      aria-label="Alternar tema"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1 text-xs"
      title={theme === "dark" ? "Mudar para claro" : "Mudar para escuro"}
    >
      {theme === "dark" ? (
        <FiSun className="h-4 w-4" />
      ) : (
        <FiMoon className="h-4   w-4" />
      )}
      <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
    </button>
  );
}
