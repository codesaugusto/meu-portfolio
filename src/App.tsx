import "./index.css";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeProvider";
import { InViewProvider } from "./context/InViewContext";
import Hero from "./components/Hero/Hero";
import Button from "./components/Button/Button";
import Text from "./components/Text/Text";
import TechCarousel from "./components/TechCarousel/TechCarousel";
import CardProject from "./components/CardProject/CardProject";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import WhatsAppFloating from "./components/Contact/WhatsAppFloating";
import Footer from "./components/Footer/Footer";
import Services from "./components/Services/Services";
import Stack from "./components/Stack/Stack";

function App() {
  return (
    <InViewProvider>
      <ThemeProvider>
        <Header />
        <Hero />
        <Button />
        <Text />
        <TechCarousel />
        <Services />
        <About />
        <CardProject />
        <Stack />
        <Contact />
        <WhatsAppFloating />
        <Footer />
      </ThemeProvider>
    </InViewProvider>
  );
}

export default App;
