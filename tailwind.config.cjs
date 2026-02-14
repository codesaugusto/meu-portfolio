module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        appLight: "#f2f2f2",
        appDark: "#0e0930",
        appTextLight: "#0b1220",
        appTextDark: "#F2F2F2",
        wordSpacing: {
          // cria a escala
          tight: "-0.08em",
          snug: "-0.04em",
          normal: "0",
          wide: "0.08em",
        },
      },
    },
    plugins: [
      function ({ addUtilities, theme }) {
        const values = theme("wordSpacing");
        const utilities = Object.entries(values).map(([key, val]) => ({
          [`.word-${key}`]: { wordSpacing: val },
        }));
        addUtilities(utilities);
      },
    ],
  },
};
