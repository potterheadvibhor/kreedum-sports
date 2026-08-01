import { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../config/theme";
import { NAV_LINKS } from "../../config/navigation";
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "../../config/contact";
import { useScrolled } from "../../hooks/useScrolled";
import { scrollToId } from "../../utils/scrollToId";
import { PhoneIcon } from "../common/Icons";
import logo from "../../assets/logo.png";


export default function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? COLORS.white : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(14,26,61,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 kr-focus"
        >
          <img src={logo} alt="Kreedum logo" className="w-8 h-8 md:w-9 md:h-9" />
          <span
            className="font-display font-bold text-lg md:text-xl tracking-tight"
            style={{ color: scrolled ? COLORS.navy : COLORS.white }}
          >
            Kreedum<span style={{ color: COLORS.blue }}>Sports</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-body text-sm font-medium kr-focus transition-colors"
              style={{ color: scrolled ? COLORS.slate : "rgba(255,255,255,0.9)" }}
            >
              {l.label}
            </button>
          ))}
          <a
            href={`tel:${PHONE_NUMBER_TEL}`}
            className="flex items-center gap-2 font-body text-sm font-medium kr-focus"
            style={{ color: scrolled ? COLORS.slate : "rgba(255,255,255,0.9)" }}
          >
            <PhoneIcon color={scrolled ? COLORS.slate : "rgba(255,255,255,0.9)"} />
            {PHONE_NUMBER_DISPLAY}
          </a>
          <Link
            to="/quote"
            className="font-body text-sm font-semibold px-5 py-2.5 rounded-full kr-focus transition-transform hover:scale-105 border"
            style={{ borderColor: scrolled ? "rgba(14,26,61,0.2)" : "rgba(255,255,255,0.3)", color: scrolled ? COLORS.navy : COLORS.white }}
          >
            Get a Quote
          </Link>
          <button
            onClick={() => scrollTo("contact")}
            className="font-body text-sm font-semibold px-5 py-2.5 rounded-full kr-focus transition-transform hover:scale-105"
            style={{ backgroundColor: COLORS.blue, color: COLORS.white }}
          >
            Get in Touch
          </button>
        </nav>

        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 kr-focus"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className="block w-6 h-0.5 rounded transition-transform"
            style={{
              backgroundColor: scrolled ? COLORS.navy : COLORS.white,
              transform: open ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 rounded transition-transform"
            style={{
              backgroundColor: scrolled ? COLORS.navy : COLORS.white,
              transform: open ? "translateY(-4px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      <div
        className={`md:hidden px-6 pb-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-out origin-top ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: COLORS.white }}
      >
        {NAV_LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            className="font-body text-left text-base font-medium kr-focus"
            style={{ color: COLORS.navy }}
          >
            {l.label}
          </button>
        ))}
        <a
          href={`tel:${PHONE_NUMBER_TEL}`}
          className="flex items-center gap-2 font-body text-base font-medium kr-focus"
          style={{ color: COLORS.navy }}
        >
          <PhoneIcon color={COLORS.navy} />
          {PHONE_NUMBER_DISPLAY}
        </a>
        <Link
          to="/quote"
          className="font-body text-sm font-semibold px-5 py-3 rounded-full kr-focus text-center border"
          style={{ borderColor: "rgba(14,26,61,0.2)", color: COLORS.navy }}
        >
          Get a Quote
        </Link>
        <button
          onClick={() => scrollTo("contact")}
          className="font-body text-sm font-semibold px-5 py-3 rounded-full kr-focus text-center"
          style={{ backgroundColor: COLORS.blue, color: COLORS.white }}
        >
          Get in Touch
        </button>
      </div>
    </header>
  );
}
