import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import StatsBar from "../components/sections/StatsBar";
import About from "../components/sections/About";
import Products from "../components/sections/Products";
import Infrastructure from "../components/sections/Infrastructure";
import Gallery from "../components/sections/Gallery";
import Locations from "../components/sections/Locations";
import ContactForm from "../components/sections/ContactForm";
import { COLORS } from "../config/theme";

export default function HomePage() {
  return (
    <div className="font-body" style={{ backgroundColor: COLORS.white }}>
      <Nav />
      <Hero />
      <StatsBar />
      <About />
      <Products />
      <Infrastructure />
      <Gallery />
      <Locations />
      <ContactForm />
      <Footer />
    </div>
  );
}
