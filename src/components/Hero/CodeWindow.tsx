import { motion } from "framer-motion";
import { useThemeContext } from "../../context/useThemeContext";

const getCodeLines = (isDark: boolean) => [
  {
    indent: 0,
    tokens: [
      { text: "import", color: isDark ? "text-purple-400" : "text-purple-600" },
      { text: " { ", color: isDark ? "text-gray-300" : "text-gray-600" },
      {
        text: "useState",
        color: isDark ? "text-yellow-300" : "text-yellow-600",
      },
      { text: " } ", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "from", color: isDark ? "text-purple-400" : "text-purple-600" },
      {
        text: " 'react'",
        color: isDark ? "text-emerald-400" : "text-emerald-600",
      },
    ],
  },
  {
    indent: 0,
    tokens: [
      { text: "import", color: isDark ? "text-purple-400" : "text-purple-600" },
      { text: " { ", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "api", color: isDark ? "text-yellow-300" : "text-yellow-600" },
      { text: " } ", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "from", color: isDark ? "text-purple-400" : "text-purple-600" },
      {
        text: " '@/lib/api'",
        color: isDark ? "text-emerald-400" : "text-emerald-600",
      },
    ],
  },
  { indent: 0, tokens: [] },
  {
    indent: 0,
    tokens: [
      {
        text: "export function",
        color: isDark ? "text-purple-400" : "text-purple-600",
      },
      { text: " App", color: isDark ? "text-blue-400" : "text-blue-600" },
      { text: "() {", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "const", color: isDark ? "text-purple-400" : "text-purple-600" },
      {
        text: " [data, setData]",
        color: isDark ? "text-gray-300" : "text-gray-600",
      },
      { text: " = ", color: isDark ? "text-gray-300" : "text-gray-600" },
      {
        text: "useState",
        color: isDark ? "text-yellow-300" : "text-yellow-600",
      },
      { text: "(", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "null", color: isDark ? "text-orange-400" : "text-orange-600" },
      { text: ")", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  { indent: 0, tokens: [] },
  {
    indent: 1,
    tokens: [
      {
        text: "async function",
        color: isDark ? "text-purple-400" : "text-purple-600",
      },
      { text: " fetchData", color: isDark ? "text-blue-400" : "text-blue-600" },
      { text: "() {", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: "const", color: isDark ? "text-purple-400" : "text-purple-600" },
      { text: " result = ", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "await", color: isDark ? "text-purple-400" : "text-purple-600" },
      { text: " api.", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "get", color: isDark ? "text-yellow-300" : "text-yellow-600" },
      {
        text: "('/users')",
        color: isDark ? "text-emerald-400" : "text-emerald-600",
      },
    ],
  },
  {
    indent: 2,
    tokens: [
      {
        text: "setData",
        color: isDark ? "text-yellow-300" : "text-yellow-600",
      },
      { text: "(result)", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 1,
    tokens: [{ text: "}", color: isDark ? "text-gray-300" : "text-gray-600" }],
  },
  { indent: 0, tokens: [] },
  {
    indent: 1,
    tokens: [
      { text: "return", color: isDark ? "text-purple-400" : "text-purple-600" },
      { text: " (", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: "<", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "main", color: isDark ? "text-red-400" : "text-red-600" },
      {
        text: " className=",
        color: isDark ? "text-gray-300" : "text-gray-600",
      },
      {
        text: '"container"',
        color: isDark ? "text-emerald-400" : "text-emerald-600",
      },
      { text: ">", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 3,
    tokens: [
      { text: "<", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "h1", color: isDark ? "text-red-400" : "text-red-600" },
      { text: ">", color: isDark ? "text-gray-300" : "text-gray-600" },
      {
        text: "Hello, World!",
        color: isDark ? "text-gray-100" : "text-gray-900",
      },
      { text: "</", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "h1", color: isDark ? "text-red-400" : "text-red-600" },
      { text: ">", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 3,
    tokens: [
      { text: "<", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "Button", color: isDark ? "text-yellow-300" : "text-yellow-600" },
      { text: " onClick=", color: isDark ? "text-gray-300" : "text-gray-600" },
      {
        text: "{fetchData}",
        color: isDark ? "text-blue-300" : "text-blue-700",
      },
      { text: ">", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 4,
    tokens: [
      { text: "Load Data", color: isDark ? "text-gray-100" : "text-gray-900" },
    ],
  },
  {
    indent: 3,
    tokens: [
      { text: "</", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "Button", color: isDark ? "text-yellow-300" : "text-yellow-600" },
      { text: ">", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: "</", color: isDark ? "text-gray-300" : "text-gray-600" },
      { text: "main", color: isDark ? "text-red-400" : "text-red-600" },
      { text: ">", color: isDark ? "text-gray-300" : "text-gray-600" },
    ],
  },
  {
    indent: 1,
    tokens: [{ text: ")", color: isDark ? "text-gray-300" : "text-gray-600" }],
  },
  {
    indent: 0,
    tokens: [{ text: "}", color: isDark ? "text-gray-300" : "text-gray-600" }],
  },
];

const CodeWindow = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const codeLines = getCodeLines(isDark);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      className="hidden md:block w-full max-w-[520px] select-none"
    >
      <div
        className={`rounded-xl overflow-hidden shadow-2xl border ${
          isDark
            ? "border-gray-700/50 bg-[#1e1e2e]"
            : "border-gray-300/50 bg-white"
        }`}
      >
        {/* Title bar */}
        <div
          className={`flex items-center gap-2 px-4 py-3 ${
            isDark
              ? "bg-[#181825] border-gray-700/50"
              : "bg-gray-50 border-gray-300/50"
          } border-b`}
        >
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div
            className={`ml-3 flex items-center gap-1.5 text-sm font-mono ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="text-emerald-500">&gt;_</span>
            <span>app.tsx</span>
          </div>
        </div>

        {/* Code body */}
        <div className="px-5 py-4 font-mono text-[13px] leading-6 overflow-x-auto">
          {codeLines.map((line, i) => (
            <div key={i} className="flex">
              <span
                className={`w-7 text-right mr-4 select-none shrink-0 ${
                  isDark ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {i + 1}
              </span>
              <span style={{ paddingLeft: `${line.indent * 20}px` }}>
                {line.tokens.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.tokens.map((token, j) => (
                    <span key={j} className={token.color}>
                      {token.text}
                    </span>
                  ))
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CodeWindow;
