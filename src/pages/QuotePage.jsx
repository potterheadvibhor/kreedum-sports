import { useState } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../config/theme";
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL, WHATSAPP_NUMBER } from "../config/contact";
import {
  FACILITY_TYPES,
  BUDGET_BANDS,
  TIMELINES,
  EQUIPMENT_NEEDS,
  QUOTE_HIGHLIGHTS,
} from "../data/quoteFormOptions";
import { openWhatsApp, isValidIndianMobile } from "../utils/whatsapp";
import { PhoneIcon, CheckCircleIcon } from "../components/common/Icons";
import Footer from "../components/layout/Footer";
import logo from "../assets/logo.png";
import { getCurrentDateAndTime } from "../components/common/SubmitedAt";



function QuoteNav() {
  return (
    <header
      className="sticky top-0 left-0 right-0 z-50"
      style={{ backgroundColor: COLORS.navy, boxShadow: "0 1px 0 rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="flex items-center gap-2 kr-focus"
        >
          <img src={logo} alt="Kreedum logo" className="w-8 h-8 md:w-9 md:h-9" />
          <span className="font-display font-bold text-lg md:text-xl tracking-tight" style={{ color: COLORS.white }}>
            Kreedum<span style={{ color: COLORS.blue }}>Sports</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <a
            href={`tel:${PHONE_NUMBER_TEL}`}
            className="hidden sm:flex items-center gap-2 font-body text-sm font-medium kr-focus"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            <PhoneIcon color="rgba(255,255,255,0.9)" />
            {PHONE_NUMBER_DISPLAY}
          </a>
          <Link
            to="/"
            className="font-body text-sm font-medium kr-focus"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuoteHero() {
  return (
    <section className="relative overflow-hidden diag-bottom" style={{ backgroundColor: COLORS.navy }}>
      <div
        className="absolute inset-0 opacity-90"
        style={{ background: `linear-gradient(120deg, ${COLORS.navy} 35%, ${COLORS.blueDark} 100%)` }}
      />
      <div
        className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full opacity-20"
        style={{ background: COLORS.blue, filter: "blur(10px)" }}
      />
      <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-24 text-center">
        <div
          className="font-mono text-xs tracking-widest uppercase mb-5 inline-block px-3 py-1 rounded-full"
          style={{ color: COLORS.white, backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          Gym & Fitness Equipment
        </div>
        <h1 className="font-display font-bold text-3xl md:text-5xl leading-[1.1] mb-5" style={{ color: COLORS.white }}>
          Get a costed quote for
          <br />
          <span style={{ color: "#8FADFF" }}>your gym floor.</span>
        </h1>
        <p className="font-body text-base md:text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
          Tell us about your space and budget — cardio, strength, free weights
          or a full setup. We'll send an itemised, no-obligation quote.
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {QUOTE_HIGHLIGHTS.map((h) => (
            <div key={h} className="flex items-center gap-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
              <CheckCircleIcon />
              {h}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function QuotePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    facilityType: "",
    equipmentNeed: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phone = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, phone }));
      setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!isValidIndianMobile(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (!form.facilityType) newErrors.facilityType = "Please select a facility type.";
    if (!form.equipmentNeed) newErrors.equipmentNeed = "Please select what you need.";
    if (!form.budget) newErrors.budget = "Please select a budget band.";
    if (!form.timeline) newErrors.timeline = "Please select a timeline.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const text = `New Gym Equipment Quote Request

Date & Time: ${getCurrentDateAndTime()}

Name: ${form.name}
Phone: ${form.phone}
${form.email ? `Email: ${form.email}\n` : ""}City: ${form.city}
Facility Type: ${form.facilityType}
Equipment Needed: ${form.equipmentNeed}
Budget: ${form.budget}
Timeline: ${form.timeline}
${form.message ? `\nMessage:\n${form.message}` : ""}`;

    openWhatsApp(WHATSAPP_NUMBER, text);
    setSent(true);
  };

  const labelStyle = { color: COLORS.slate };
  const inputStyle = {
    backgroundColor: COLORS.paper,
    color: COLORS.navy,
    border: `1px solid ${COLORS.paperDim}`,
  };

  return (
    <div className="font-body" style={{ backgroundColor: COLORS.white }}>
      <QuoteNav />
      <QuoteHero />

      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          {sent ? (
            <div className="text-center p-10 rounded-2xl" style={{ backgroundColor: COLORS.paper }}>
              <p className="font-display font-semibold text-xl mb-2" style={{ color: COLORS.navy }}>
                Opening WhatsApp…
              </p>
              <p className="font-body text-sm" style={{ color: COLORS.slate }}>
                If it didn't open automatically, check your browser's pop-up
                blocker, or message us directly at +91 70841 44623.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 font-body text-sm font-semibold px-6 py-2.5 rounded-full kr-focus"
                style={{ backgroundColor: COLORS.blue, color: COLORS.white }}
              >
                Request another quote
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 p-6 md:p-10 rounded-2xl"
              style={{ backgroundColor: COLORS.paper }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                    Name
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                    style={inputStyle}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                    Phone
                  </label>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[6-9]{1}[0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                    style={inputStyle}
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                    Email (optional)
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                    style={inputStyle}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                    City
                  </label>
                  <input
                    required
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                    style={inputStyle}
                    placeholder="Lucknow"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                  Facility Type
                </label>
                <select
                  required
                  name="facilityType"
                  value={form.facilityType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                  style={inputStyle}
                >
                  <option value="">Select facility type</option>
                  {FACILITY_TYPES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                {errors.facilityType && <p className="mt-2 text-sm text-red-600">{errors.facilityType}</p>}
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                  Equipment Needed
                </label>
                <select
                  required
                  name="equipmentNeed"
                  value={form.equipmentNeed}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                  style={inputStyle}
                >
                  <option value="">Select what you need</option>
                  {EQUIPMENT_NEEDS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                {errors.equipmentNeed && <p className="mt-2 text-sm text-red-600">{errors.equipmentNeed}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                    Budget Band
                  </label>
                  <select
                    required
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                    style={inputStyle}
                  >
                    <option value="">Select budget</option>
                    {BUDGET_BANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  {errors.budget && <p className="mt-2 text-sm text-red-600">{errors.budget}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                    Timeline
                  </label>
                  <select
                    required
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                    style={inputStyle}
                  >
                    <option value="">Select timeline</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.timeline && <p className="mt-2 text-sm text-red-600">{errors.timeline}</p>}
                </div>
              </div>

              <div>
                <label className="font-mono text-xs uppercase tracking-wide block mb-2" style={labelStyle}>
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus resize-none"
                  style={inputStyle}
                  placeholder="Anything else we should know?"
                />
              </div>

              <button
                type="submit"
                className="font-body font-semibold text-sm px-7 py-3.5 rounded-full kr-focus transition-transform hover:scale-105 justify-self-center inline-flex items-center gap-2"
                style={{ backgroundColor: "#25D366", color: "#08331C" }}
              >
                Get my quote on WhatsApp
              </button>

              <p className="font-body text-xs" style={{ color: COLORS.slateLight }}>
                An equipment expert usually replies within a few working
                hours. No spam, no obligation.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
