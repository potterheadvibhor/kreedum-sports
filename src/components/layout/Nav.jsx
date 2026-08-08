import { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../config/theme";
import { NAV_LINKS } from "../../config/navigation";
import {
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_TEL,
} from "../../config/contact";
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
        boxShadow: scrolled
          ? "0 1px 0 rgba(14,26,61,0.08)"
          : "none",
      }}
    >
      {/* ================= DESKTOP / HEADER ================= */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 kr-focus"
        >
          <img
            src={logo}
            alt="Kreedum logo"
            className="w-8 h-8 md:w-9 md:h-9"
          />

          <span
            className="font-display font-bold text-lg md:text-xl tracking-tight"
            style={{
              color: scrolled ? COLORS.navy : COLORS.white,
            }}
          >
            Kreedum
            <span style={{ color: COLORS.blue }}>Sports</span>
          </span>
        </button>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-body text-sm font-medium kr-focus transition-colors"
              style={{
                color: scrolled
                  ? COLORS.slate
                  : "rgba(255,255,255,0.9)",
              }}
            >
              {l.label}
            </button>
          ))}

          <a
            href={`tel:${PHONE_NUMBER_TEL}`}
            className="flex items-center gap-2 font-body text-sm font-medium kr-focus"
            style={{
              color: scrolled
                ? COLORS.slate
                : "rgba(255,255,255,0.9)",
            }}
          >
            <PhoneIcon
              color={
                scrolled
                  ? COLORS.slate
                  : "rgba(255,255,255,0.9)"
              }
            />

            {PHONE_NUMBER_DISPLAY}
          </a>

          <Link
            to="/quote"
            className="font-body text-sm font-semibold px-5 py-2.5 rounded-full kr-focus transition-transform hover:scale-105 border"
            style={{
              borderColor: scrolled
                ? "rgba(14,26,61,0.2)"
                : "rgba(255,255,255,0.3)",
              color: scrolled ? COLORS.navy : COLORS.white,
            }}
          >
            Get a Quote
          </Link>

          <button
            onClick={() => scrollTo("contact")}
            className="font-body text-sm font-semibold px-5 py-2.5 rounded-full kr-focus transition-transform hover:scale-105"
            style={{
              backgroundColor: COLORS.blue,
              color: COLORS.white,
            }}
          >
            Get in Touch
          </button>
        </nav>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center kr-focus"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className="absolute block w-6 h-[2px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: scrolled
                ? COLORS.navy
                : COLORS.white,
              transform: open
                ? "rotate(45deg)"
                : "translateY(-4px)",
            }}
          />

          <span
            className="absolute block w-6 h-[2px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: scrolled
                ? COLORS.navy
                : COLORS.white,
              transform: open
                ? "rotate(-45deg)"
                : "translateY(4px)",
            }}
          />
        </button>
      </div>

      {/* ================= MOBILE DROPDOWN ================= */}
      <div
        className={`
          md:hidden absolute left-4 right-4 top-full
          transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-3 scale-[0.98] pointer-events-none"
          }
        `}
      >
        <div
          className="mobile-nav-card overflow-hidden"
          style={{
            backgroundColor: COLORS.white,
            border: "1px solid rgba(14,26,61,0.08)",
            boxShadow:
              "0 20px 50px rgba(14,26,61,0.14), 0 4px 12px rgba(14,26,61,0.06)",
          }}
        >
          {/* ================= NAVIGATION LINKS ================= */}
          <div className="px-3 pt-3 pb-2">
            {NAV_LINKS.map((l, index) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`
                  mobile-nav-item
                  mobile-nav-item-${index}
                  w-full flex items-center justify-between
                  text-left
                  px-4 py-3.5
                  rounded-2xl
                  kr-focus
                  transition-all duration-200
                `}
                style={{
                  color: COLORS.navy,
                  opacity: open ? 1 : 0,
                  transform: open
                    ? "translateY(0)"
                    : "translateY(-8px)",
                  transitionDelay: open
                    ? `${index * 45}ms`
                    : "0ms",
                }}
              >
                <span className="mobile-nav-label">
                  {l.label}
                </span>

                <span
                  className="mobile-nav-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* ================= DIVIDER ================= */}
          <div
            className="mx-4"
            style={{
              height: "1px",
              backgroundColor: "rgba(14,26,61,0.08)",
            }}
          />

          {/* ================= CONTACT + CTA ================= */}
          <div className="px-4 pt-4 pb-5">
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              className="mobile-phone flex items-center gap-3 px-3 mb-4 kr-focus"
              style={{
                color: COLORS.navy,
                opacity: open ? 1 : 0,
                transform: open
                  ? "translateY(0)"
                  : "translateY(-8px)",
                transition:
                  "opacity 350ms ease, transform 350ms ease",
                transitionDelay: open ? "250ms" : "0ms",
              }}
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: COLORS.tint,
                }}
              >
                <PhoneIcon color={COLORS.blue} />
              </span>

              <span className="mobile-phone-number">
                {PHONE_NUMBER_DISPLAY}
              </span>
            </a>

            {/* Get a Quote */}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mobile-quote-button flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-2xl kr-focus transition-all duration-200"
              style={{
                backgroundColor: COLORS.blue,
                color: COLORS.white,
                opacity: open ? 1 : 0,
                transform: open
                  ? "translateY(0)"
                  : "translateY(10px)",
                transition:
                  "opacity 350ms ease, transform 350ms ease, background-color 200ms ease",
                transitionDelay: open ? "300ms" : "0ms",
              }}
            >
              <span>Get a Quote</span>

              <span className="text-lg leading-none">
                →
              </span>
            </Link>

            {/* Get in Touch */}
            <button
              onClick={() => scrollTo("contact")}
              className="mobile-contact-button flex items-center justify-center gap-2 w-full mt-2 px-5 py-3.5 rounded-2xl kr-focus transition-all duration-200"
              style={{
                color: COLORS.navy,
                backgroundColor: COLORS.paper,
                opacity: open ? 1 : 0,
                transform: open
                  ? "translateY(0)"
                  : "translateY(10px)",
                transition:
                  "opacity 350ms ease, transform 350ms ease, background-color 200ms ease",
                transitionDelay: open ? "350ms" : "0ms",
              }}
            >
              <span>Get in Touch</span>

              <span className="text-lg leading-none">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}