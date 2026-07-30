import { useState, useRef } from "react";
import { COLORS } from "../../config/theme";
import { CATEGORY_PHOTOS } from "../../data/photos";
import { ChevronLeftIcon, ChevronRightIcon } from "../common/Icons";


export default function Gallery() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, CATEGORY_PHOTOS.length - 1));
    const card = track.children[clamped];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: COLORS.blue }}>
              Gear & Ground
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: COLORS.navy }}>
              Everything you need, in every sport.
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full flex items-center justify-center kr-focus transition-opacity hover:opacity-70"
              style={{ backgroundColor: COLORS.tint, color: COLORS.blueDark }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="w-11 h-11 rounded-full flex items-center justify-center kr-focus transition-opacity hover:opacity-70"
              style={{ backgroundColor: COLORS.blue, color: COLORS.white }}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 kr-scroll-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORY_PHOTOS.map((p) => (
            <div
              key={p.label}
              className="diag-card overflow-hidden rounded-2xl flex-shrink-0 snap-start relative"
              style={{ width: "280px" }}
            >
              <img src={p.src} alt={`${p.label} — ${p.desc}`} className="w-full h-72 object-cover transition-transform hover:scale-105 duration-500" />
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-4"
                style={{ background: "linear-gradient(to top, rgba(14,26,61,0.85), rgba(14,26,61,0))" }}
              >
                <div className="font-display font-semibold text-base flex items-center gap-2" style={{ color: COLORS.white }}>
                  <span>{p.emoji}</span> {p.label}
                </div>
                <div className="font-body text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {CATEGORY_PHOTOS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${p.label}`}
              className="rounded-full transition-all"
              style={{
                width: i === activeIndex ? "22px" : "8px",
                height: "8px",
                backgroundColor: i === activeIndex ? COLORS.blue : COLORS.paperDim,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
