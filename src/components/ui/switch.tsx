import * as React from "react";

import { cn } from "@/lib/utils";

type SwitchSize = "sm" | "md" | "lg" | "xl";

type SwitchContextValue = {
  checked: boolean;
  permanent: boolean;
  setChecked: (next: boolean) => void;
};

const SwitchContext = React.createContext<SwitchContextValue | null>(null);

function useSwitchContext() {
  const context = React.useContext(SwitchContext);
  if (!context) {
    throw new Error("Switch components must be used within SwitchWrapper.");
  }
  return context;
}

type SwitchWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  permanent?: boolean;
};

function SwitchWrapper({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  permanent = false,
  children,
  ...props
}: SwitchWrapperProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const setChecked = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange],
  );

  return (
    <SwitchContext.Provider
      value={{ checked: currentChecked, permanent, setChecked }}
    >
      <div
        className={cn("relative inline-flex items-center", className)}
        {...props}
      >
        {children}
      </div>
    </SwitchContext.Provider>
  );
}

type SwitchProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: SwitchSize;
};

const sizeStyles: Record<
  SwitchSize,
  { track: string; thumb: string; move: string }
> = {
  sm: { track: "h-5 w-9", thumb: "h-4 w-4", move: "translate-x-4" },
  md: { track: "h-6 w-11", thumb: "h-5 w-5", move: "translate-x-5" },
  lg: { track: "h-7 w-12", thumb: "h-6 w-6", move: "translate-x-5" },
  xl: { track: "h-8 w-15", thumb: "h-7 w-7", move: "translate-x-7" },
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size = "md", disabled, children, ...props }, ref) => {
    const { checked, setChecked } = useSwitchContext();
    const styles = sizeStyles[size];

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        disabled={disabled}
        ref={ref}
        onClick={() => {
          if (!disabled) {
            setChecked(!checked);
          }
        }}
        className={cn(
          "relative z-0 inline-flex shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "bg-muted data-[state=checked]:bg-muted-foreground/30",
          styles.track,
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none inline-flex items-center justify-center rounded-full bg-background shadow transition-transform",
            styles.thumb,
            checked ? styles.move : "translate-x-1",
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);

Switch.displayName = "Switch";

type SwitchIndicatorProps = React.HTMLAttributes<HTMLSpanElement> & {
  state: "on" | "off";
  showWhen?: "on" | "off" | "always";
  position?: "left" | "right" | "none";
};

function SwitchIndicator({
  state,
  showWhen,
  position,
  className,
  children,
  ...props
}: SwitchIndicatorProps) {
  const { checked, permanent } = useSwitchContext();
  const isOn = state === "on";
  const isVisible = (isOn && checked) || (!isOn && !checked);
  const shouldShow =
    showWhen === "always"
      ? true
      : showWhen === "on"
        ? checked
        : showWhen === "off"
          ? !checked
          : isVisible;
  const positionClass =
    position === "left"
      ? "left-2"
      : position === "right"
        ? "right-2"
        : position === "none"
          ? ""
          : isOn
            ? "right-1"
            : "left-1";

  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-y-0 z-10 flex items-center transition-opacity",
        positionClass,
        permanent || shouldShow ? "opacity-100" : "opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Switch, SwitchIndicator, SwitchWrapper };
