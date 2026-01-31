import { useId } from "react";
import { Moon, Sun } from "lucide-react";

import { Label } from "../ui/label";
import { Switch, SwitchIndicator, SwitchWrapper } from "../ui/switch";
import { useThemeContext } from "../../context/useThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const id = useId();
  const isDark = theme === "dark";

  return (
    <div className="fixed z-50 select-none top-6 right-3 md:top-12 md:right-22">
      <div className="flex items-center space-x-2.5">
        <SwitchWrapper checked={isDark} onCheckedChange={toggleTheme}>
          <Switch
            id={id}
            size="xl"
            aria-label="Alternar tema"
            title={isDark ? "Mudar para claro" : "Mudar para escuro"}
          />
          <SwitchIndicator state="off" showWhen="always" position="left">
            <Sun className="size-4 text-muted-foreground" />
          </SwitchIndicator>
          <SwitchIndicator state="on" showWhen="always" position="right">
            <Moon className="size-4 text-muted-foreground" />
          </SwitchIndicator>
        </SwitchWrapper>
        <Label htmlFor={id} className="sr-only">
          Permanent Indicator
        </Label>
      </div>
    </div>
  );
}
