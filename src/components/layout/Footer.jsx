import { COLORS } from "../../config/theme";
import SocialLinks from "../common/SocialLinks";
import logo from "../../assets/logo.jpg";


export default function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: COLORS.navy }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <img src={logo} alt="Kreedum logo" className="w-7 h-7" />
          <span className="font-display font-semibold text-sm" style={{ color: COLORS.white }}>
            Kreedum<span style={{ color: "#8FADFF" }}>Sports</span>
          </span>
        </div>
        <div className="flex justify-center">
          <SocialLinks />
        </div>
        <p className="font-body text-xs text-center md:text-right" style={{ color: "rgba(255,255,255,0.45)" }}>
          © {new Date().getFullYear()} Kreedum International Private Limited. Aminabad, Lucknow.
        </p>
      </div>
    </footer>
  );
}
