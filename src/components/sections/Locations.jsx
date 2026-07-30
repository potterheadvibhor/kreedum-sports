import { COLORS } from "../../config/theme";
import { STORES } from "../../data/locations";
import { PinIcon } from "../common/Icons";


export default function Locations() {
    const firstStoreAddress = STORES[0].address;
  const storesWithDirections = STORES.map((s) => ({
    ...s,
    // Second store's address is still unconfirmed, so point both buttons
    // to the first (confirmed) store's location for now.
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(firstStoreAddress)}`,
  }));
  return (
    <section id="locations" className="pt-16 pb-10 md:pt-24 md:pb-16" style={{ backgroundColor: COLORS.paper }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: COLORS.blue }}>
            Visit Us
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: COLORS.navy }}>
            Two stores, one street in Aminabad.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {storesWithDirections.map((s) => (
            <div key={s.name} className="p-8 rounded-2xl" style={{ backgroundColor: COLORS.white, boxShadow: "0 1px 3px rgba(14,26,61,0.06)" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-lg" style={{ color: COLORS.navy }}>
                    {s.name}
                  </h3>
                  <div className="font-mono text-xs uppercase tracking-wide mt-1" style={{ color: COLORS.blue }}>
                    {s.tag}
                  </div>
                </div>
                {s.rating && (
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS.tint, color: COLORS.blueDark }}>
                    {s.rating}
                  </span>
                )}
              </div>
              <div className="space-y-2 font-body text-sm" style={{ color: COLORS.slate }}>
                <p>{s.address}</p>
                <p>{s.phone}</p>
                <p>{s.hours}</p>
              </div>
              <a
                href={s.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: COLORS.blue, color: COLORS.white }}
              >
                <PinIcon />
                Get Directions
              </a>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}
