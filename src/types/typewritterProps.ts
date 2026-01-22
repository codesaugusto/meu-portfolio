export type TypewriterProps = {
  text: string;
  speed?: number; // ms por caractere
  showCursor?: boolean;
  cursorChar?: string;
  cursorColor?: string;
  startOnView?: boolean;
  className?: string;
  style?: React.CSSProperties;
};
