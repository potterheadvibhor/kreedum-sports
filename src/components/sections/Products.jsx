import { COLORS } from "../../config/theme";
import { PRODUCT_CATEGORIES } from "../../data/products";


export default function Products() {
    return (
    <section id="products" className="py-16 md:py-24 lg:py-32" style={{ backgroundColor: COLORS.paper }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-xl mb-10 md:mb-14">
          <div className="font-mono text-xs tracking-widest uppercase mb-3 md:mb-4" style={{ color: COLORS.blue }}>
            What We Stock
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl" style={{ color: COLORS.navy }}>
            Everything between the whistle and the finish line.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {PRODUCT_CATEGORIES.map((item, i) => (
            <div
              key={item.title}
              className="relative group overflow-hidden rounded-2xl h-40 sm:h-48 md:h-60 flex flex-col justify-end p-6 md:p-8 transition-transform active:scale-[0.98] sm:hover:-translate-y-1"
              style={{ boxShadow: "0 1px 3px rgba(14,26,61,0.06)" }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.img})` }}
              />

              {/* Gradient overlay for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(14,26,61,0.92) 0%, rgba(14,26,61,0.6) 45%, rgba(14,26,61,0.1) 100%)",
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="font-mono text-xs mb-2 md:mb-3 text-white/60">
                  0{i + 1}
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg mb-1.5 md:mb-2 text-white">
                  {item.title}
                </h3>
                <p className="font-body text-xs sm:text-sm leading-relaxed text-white/80">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
