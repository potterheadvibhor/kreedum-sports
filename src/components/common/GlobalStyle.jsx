import { COLORS } from "../../config/theme";

/** Site-wide fonts, clip-path utility classes, and focus/reduced-motion rules. Mounted once in App. */
export default function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .font-mono { font-family: 'IBM Plex Mono', monospace; }

      .diag-bottom {
        clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%);
      }
      .diag-top {
  clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%);
}

@media (max-width: 768px) {
  .diag-top {
    clip-path: none;
  }
}
      .diag-card {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      .diag-photo {
        clip-path: polygon(6% 0, 100% 0, 94% 100%, 0% 100%);
      }
      .kr-focus:focus-visible {
        outline: 3px solid ${COLORS.blue};
        outline-offset: 3px;
      }
        .kr-scroll-hide::-webkit-scrollbar {
        display: none;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
      }
    `}</style>
  );
}
