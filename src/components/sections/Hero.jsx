import { Link } from "react-router-dom";
import { COLORS } from "../../config/theme";
import { PHOTOS } from "../../data/photos";
import { scrollToId } from "../../utils/scrollToId";


export default function Hero() {
  const scrollTo = (id) => scrollToId(id);
  return (
    <section
      id="home"
      className="relative overflow-hidden diag-bottom"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(120deg, ${COLORS.navy} 35%, ${COLORS.blueDark} 100%)`,
        }}
      />
      <div
        className="absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full opacity-20"
        style={{ background: COLORS.blue, filter: "blur(10px)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-28 md:pt-44 md:pb-40 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="font-mono text-xs tracking-widest uppercase mb-5 inline-block px-3 py-1 rounded-full"
            style={{ color: COLORS.white, backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            Lucknow · Since 2015
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] mb-6" style={{ color: COLORS.white }}>
            Equipment for
            <br />
            <span style={{ color: "#8FADFF" }}>every kind of play.</span>
          </h1>
          <p className="font-body text-base md:text-lg mb-9 max-w-md" style={{ color: "rgba(255,255,255,0.75)" }}>
            Sports equipment, apparell, footwear, fitness machines, and full
            ground infrastructure — trusted by athletes, schools, and
            institutions across Lucknow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/quote"
              className="font-body font-semibold text-sm px-7 py-3.5 rounded-full kr-focus transition-transform hover:scale-105 inline-block"
              style={{ backgroundColor: COLORS.blue, color: COLORS.white }}
            >
              Request a Quote
            </Link>
            <button
              onClick={() => scrollTo("products")}
              className="font-body font-semibold text-sm px-7 py-3.5 rounded-full kr-focus border transition-transform hover:scale-105"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: COLORS.white }}
            >
              View Products
            </button>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="diag-photo overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={PHOTOS.storefront}
              alt="Colourful sports equipment on display"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
