import { COLORS } from "../../config/theme";


export default function StatsBar() {
  const stats = [
    { value: "36+", label: "Years in Lucknow" },
    { value: "2", label: "Store Locations" },
    { value: "4.7★", label: "Customer Rating" },
    { value: "B2B + Retail", label: "We Serve Both" },
  ];
  return (
    <section className="py-14" style={{ backgroundColor: COLORS.paper }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-display font-bold text-3xl md:text-4xl" style={{ color: COLORS.navy }}>
              {s.value}
            </div>
            <div className="font-mono text-xs uppercase tracking-wide mt-1" style={{ color: COLORS.slateLight }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
