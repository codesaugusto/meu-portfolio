import { SiGithub, SiWhatsapp, SiLinkedin, SiInstagram } from "react-icons/si";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useState } from "react";
import { useThemeContext } from "../../context/useThemeContext";

const Contact = () => {
  const { theme } = useThemeContext();
  const shouldReduceMotion = useReducedMotion();
  const tapTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 300, damping: 20 };
  // helper to open external links safely in a new tab
  const openExternal = (url: string) => {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      // append to body to ensure click works in some browsers
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      // fallback
      window.open(url, "_blank");
    }
  };
  return (
    <div id="contact" className="flex pt-5 flex-col lg:gap-6 lg:mt-[15rem]">
      <h1 className="text-current text-4xl flex justify-center items-center font-semibold font-poppins">
        Contato
      </h1>
      <div className=" grid">
        <div className="flex flex-col mx-auto justify-center md:flex-row items-center md:justify-end md:mx-65 rounded-xl md:h-auto pt-12 md:pt-8 md:py-6 md:pr-9 bg-transparent md:bg-linear-to-r md:from-[#189c70] md:via-[#219b72] md:to-[#1f855c] mb-11">
          <div className="hidden md:grid grid-cols-1 pl-12 text-start items-center mx-auto">
            <div className="pb-14 flex justify-between h-full">
              <div className="items-start flex flex-col gap-10">
                <h1 className="font-poppins font-bold text-3xl w-[35rem]">
                  Vamos discutir as suas ideias e transforma-las em{" "}
                  <span
                    className={`font-bold ${theme === "dark" ? "text-[#13094e]" : "text-white"}`}
                  >
                    realidade{" "}
                  </span>
                  juntos!
                </h1>
                <motion.button
                  type="button"
                  onClick={() =>
                    openExternal(
                      "https://api.whatsapp.com/send?phone=5567991138636",
                    )
                  }
                  whileTap={{ scale: 0.98, transition: tapTransition }}
                  style={{
                    cursor: "pointer",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="gap-9 flex flex-col items-start border-2 border-white w-[16rem] px-5 py-2 rounded-2xl hover:bg-[#1d8864] transform-gpu transition-colors duration-200 focus:outline-none"
                  aria-label="whatsapp"
                >
                  <div className="flex gap-3 items-center justify-center">
                    <SiWhatsapp className="size-5 text-white" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      (67) 9113-8636
                    </p>
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() =>
                    openExternal("https://instagram.com/codes.augusto")
                  }
                  whileTap={{ scale: 0.98, transition: tapTransition }}
                  style={{
                    cursor: "pointer",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="gap-9 flex flex-col items-start border-2 border-white w-[16rem] px-5 py-2 rounded-2xl hover:bg-[#1d8864] transform-gpu transition-colors duration-200 focus:outline-none"
                  aria-label="instagram"
                >
                  <div className="flex gap-3 items-center justify-center">
                    <SiInstagram className="size-5 text-white" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      @codes.augusto
                    </p>
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() =>
                    openExternal("https://www.linkedin.com/in/codesaugusto")
                  }
                  whileTap={{ scale: 0.98, transition: tapTransition }}
                  style={{
                    cursor: "pointer",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="gap-9 flex flex-col items-start border-2 border-white w-[16rem] px-5 py-2 rounded-2xl hover:bg-[#1d8864] transform-gpu transition-colors duration-200 focus:outline-none"
                  aria-label="linkedin"
                >
                  <div className="flex gap-3 items-center justify-center">
                    <SiLinkedin className="size-5 text-white" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      codesaugusto
                    </p>
                  </div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() =>
                    openExternal("https://github.com/codesaugusto")
                  }
                  whileTap={{ scale: 0.98, transition: tapTransition }}
                  style={{
                    cursor: "pointer",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="gap-9 flex flex-col items-start border-2 border-white w-[16rem] px-5 py-2 rounded-2xl hover:bg-[#1d8864] transform-gpu transition-colors duration-200 focus:outline-none"
                  aria-label="github"
                >
                  <div className="flex gap-3 items-center justify-center">
                    <SiGithub className="size-5 text-white" />
                    <p className="text-[#f2f2f2] font-semibold font-poppins text-lg">
                      codesaugusto
                    </p>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
          <div
            className={`h-full lg:w-1/2 w-[21rem] rounded-2xl md:py-6 ${
              theme === "dark"
                ? "bg-[#0e0930] via-[#0a001e] to-[#343485]"
                : "bg-[#f2f2f2]"
            } flex items-center justify-center`}
          >
            <div className="w-[28rem] flex flex-col justify-center px-7 md:px-5">
              <h2
                className={` ${theme === "dark" ? "text-[#f2f2f2]" : "text-black"} font-bold text-2xl mb-4`}
              >
                Entre em contato <span className="text-[#189c70]">comigo</span>
              </h2>
              {/* Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ContactForm() {
  const [interest, setInterest] = useState<string[]>(["UI/UX design"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "error">(null);
  // honeypot
  const [website, setWebsite] = useState("");
  const [sentOnce, setSentOnce] = useState(false);

  const interests = ["UI/UX design", "Web design", "Design system", "Other"];

  function toggleInterest(i: string) {
    setInterest((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  }

  function validEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault();
    if (website) return; // honeypot filled -> likely bot
    if (loading) return; // prevent double submit while sending
    if (!name.trim() || !validEmail(email) || message.trim().length < 5) {
      setStatus("error");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, interest }),
      });
      setStatus("ok");
      setSentOnce(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForAnother() {
    // keep sentOnce true so button label stays as 'Enviar outra mensagem'
    setName("");
    setEmail("");
    setMessage("");
    setInterest(["UI/UX design"]);
    setStatus(null);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="font-poppins text-sm text- current">
        Estou interessado em...
      </label>
      <div className="flex flex-wrap gap-3 mt-2">
        {interests.map((i) => {
          const active = interest.includes(i);
          return (
            <button
              key={i}
              type="button"
              style={{ cursor: "pointer" }}
              onClick={() => toggleInterest(i)}
              className={`px-3 py-2 rounded-md text-sm border ${active ? "bg-[#219b72] text-white border-[#219b72] font-poppins" : "bg-white text-gray-700 font-poppins border-gray-300"}`}
            >
              {i}
            </button>
          );
        })}
      </div>

      <div>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu Nome"
          className="w-full border-b border-gray-300 py-2 px-1 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu Email"
          className="w-full border-b border-gray-300 py-2 px-1 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Sua mensagem"
          className="w-full h-32 border-b border-gray-300 py-2 px-1 placeholder-gray-400 focus:outline-none resize-none"
        />
      </div>

      {/* honeypot hidden field */}
      <input
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="flex flex-col gap-3 items-center md:justify-between justify-center">
        <div>
          <button
            type="submit"
            onClick={(e) => {
              if (status === "ok") {
                e.preventDefault();
                resetForAnother();
              }
            }}
            disabled={loading}
            aria-disabled={loading}
            className="flex items-center gap-3 bg-gradient-to-r from-[#219b72] to-[#1f855c] text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed font-poppins"
          >
            <HiOutlinePaperAirplane />
            <span>
              {loading
                ? "Enviando..."
                : sentOnce
                  ? "Enviar outra mensagem"
                  : "Enviar Mensagem"}
            </span>
          </button>
        </div>

        <div className="text-md">
          {status === "ok" && (
            <span className="text-green-600">Mensagem enviada!</span>
          )}
          {status === "error" && (
            <span className="text-red-500">Erro — verifique os campos.</span>
          )}
        </div>
      </div>
    </form>
  );
}

export default Contact;
