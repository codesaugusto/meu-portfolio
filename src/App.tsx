import "./index.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Button from "./components/Button/Button";
import Text from "./components/Text/Text";
import TechCarousel from "./components/TechCarousel/TechCarousel";
import CardProject from "./components/CardProject/CardProject";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

function App() {
  return (
    <div className="min-h-screen bg-[#090520] via-[#0a001e] to-[#343485]">
      <Header />
      <Hero />
      <Button />
      <Text />
      <TechCarousel />
      <CardProject />
      <About />
      <Footer />
    </div>
  );
}

export default App;
