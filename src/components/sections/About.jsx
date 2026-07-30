import { COLORS } from "../../config/theme";
import { PHOTOS } from "../../data/photos";


export default function About() {
  return (
    <section id="about" className="py-24 md:py-32" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-14 items-center">
        <div className="md:col-span-3">
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: COLORS.blue }}>
            About Kreedum
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6" style={{ color: COLORS.navy }}>
            A trusted name in Lucknow's sporting goods trade.
          </h2>
          <p className="font-body text-base leading-relaxed mb-5" style={{ color: COLORS.slate }}>
            Kreedum International Private Limited is a leading provider of
            sports equipment, apparel, footwear, and accessories, along with
            fitness machines and accessories. We also specialise in sports
            infrastructure and ground equipment — the kind of work that turns
            an empty plot into a working field.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: COLORS.slate }}>
            With two stores in the Aminabad market, we serve walk-in
            customers and institutions alike: schools, academies, and sports
            authorities who need reliable equipment and a partner who
            understands the game.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="pl-4" style={{ borderLeft: `3px solid ${COLORS.blue}` }}>
              <div className="font-display font-semibold text-sm" style={{ color: COLORS.navy }}>Retail Customers</div>
              <div className="font-body text-sm mt-1" style={{ color: COLORS.slateLight }}>
                Individual athletes, families, and local teams
              </div>
            </div>
            <div className="pl-4" style={{ borderLeft: `3px solid ${COLORS.blue}` }}>
              <div className="font-display font-semibold text-sm" style={{ color: COLORS.navy }}>Institutional Customers</div>
              <div className="font-body text-sm mt-1" style={{ color: COLORS.slateLight }}>
                Schools, academies, and sports bodies
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 diag-photo overflow-hidden rounded-2xl">
          <img
            src={PHOTOS.interior1}
            alt="Modern gym filled with fitness machines"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
