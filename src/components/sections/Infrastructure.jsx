import { useState, useEffect } from "react";
import { COLORS } from "../../config/theme";
import { INFRA_PHOTOS } from "../../data/photos";
import { ChevronLeftIcon, ChevronRightIcon } from "../common/Icons";


export default function Infrastructure() {
  const [index, setIndex] = useState(0);
  const total = INFRA_PHOTOS.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="infrastructure"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div
        className="absolute -left-32 bottom-0 w-[420px] h-[420px] rounded-full opacity-10"
        style={{ background: COLORS.blue, filter: "blur(10px)" }}
      />
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="order-2 md:order-1">
          <div className="overflow-hidden rounded-2xl relative">
            {INFRA_PHOTOS.map((p, i) => (
              <img
                key={p.alt}
                src={p.src}
                alt={p.alt}
                className="w-full h-[380px] object-cover transition-opacity duration-700"
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  inset: 0,
                  opacity: i === index ? 1 : 0,
                  pointerEvents: i === index ? "auto" : "none",
                }}
              />
            ))}

            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center kr-focus transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(14,26,61,0.55)", color: COLORS.white }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center kr-focus transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(14,26,61,0.55)", color: COLORS.white }}
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-5">
            {INFRA_PHOTOS.map((p, i) => (
              <button
                key={p.alt}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width: i === index ? "22px" : "8px",
                  height: "8px",
                  backgroundColor: i === index ? COLORS.blue : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#8FADFF" }}>
            Institutional Work
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: COLORS.white }}>
            Sports infrastructure & ground equipment.
          </h2>
          <p className="font-body text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
            Beyond retail, we work with schools, academies, and institutions
            to fit out playing fields and training grounds — from ground
            equipment to full sporting infrastructure, delivered with the
            same reliability our store customers know us for.
          </p>
          <ul className="space-y-3">
            {["Ground equipment supply & setup", "Institutional bulk orders", "Ongoing maintenance & support"].map(
              (t) => (
                <li key={t} className="flex items-center gap-3 font-body text-sm" style={{ color: COLORS.white }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.blue }} />
                  {t}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
