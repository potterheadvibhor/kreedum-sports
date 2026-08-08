import { useState } from "react";
import { COLORS } from "../../config/theme";
import { WHATSAPP_NUMBER } from "../../config/contact";
import { CONTACT_INQUIRY_TYPES } from "../../data/quoteFormOptions";
import { openWhatsApp, isValidIndianMobile } from "../../utils/whatsapp";
import { getCurrentDateAndTime } from "../common/SubmitedAt";


export default function ContactForm() {
 const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  inquiryType: "",
  message: "",
});

  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phone = value.replace(/\D/g, "").slice(0, 10);

      setForm((prev) => ({
        ...prev,
        phone,
      }));

      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!isValidIndianMobile(form.phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit Indian mobile number.";
    }
    
    if (!form.inquiryType) {
  newErrors.inquiryType = "Please select an inquiry type.";
}

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});




const text = `New Contact Request

Date & Time: ${getCurrentDateAndTime()}

Name: ${form.name}
Phone: ${form.phone}
${form.email ? `Email: ${form.email}\n` : ""}Inquiry Type: ${form.inquiryType}

Message:
${form.message}`;

    openWhatsApp(WHATSAPP_NUMBER, text);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 diag-top overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <div
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "#8FADFF" }}
          >
            Get In Touch
          </div>

          <h2
            className="font-display font-bold text-3xl md:text-4xl mb-4"
            style={{ color: COLORS.white }}
          >
            Tell us what you're looking for.
          </h2>

          <p
            className="font-body text-base"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Retail enquiry or institutional order — we'll get back to you.
          </p>
        </div>

        {sent ? (
          <div
            className="text-center p-10 rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <p
              className="font-display font-semibold text-xl mb-2"
              style={{ color: COLORS.white }}
            >
              Opening WhatsApp…
            </p>

            <p
              className="font-body text-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              If it didn't open automatically, check your browser's pop-up
              blocker, or message us directly at +91 70841 44623.
            </p>

            <button
              onClick={() => setSent(false)}
              className="mt-6 font-body text-sm font-semibold px-6 py-2.5 rounded-full kr-focus"
              style={{ backgroundColor: COLORS.blue, color: COLORS.white }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 p-8 md:p-10 rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wide block mb-2"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Name
                </label>

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: COLORS.navy,
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  className="font-mono text-xs uppercase tracking-wide block mb-2"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Phone No
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
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: COLORS.navy,
                  }}
                  placeholder="Enter Your Phone No "
                />

                {errors.phone && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className="font-mono text-xs uppercase tracking-wide block mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Email
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: COLORS.navy,
                }}
                placeholder="you@example.com"
              />
            </div>
<div>
  <label
    className="font-mono text-xs uppercase tracking-wide block mb-2"
    style={{ color: "rgba(255,255,255,0.6)" }}
  >
    Inquiry Type
  </label>

  <select
    required
    name="inquiryType"
    value={form.inquiryType}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus"
    style={{
      backgroundColor: "rgba(255,255,255,0.95)",
      color: COLORS.navy,
    }}
  >
    <option value="">Select Inquiry Type</option>
    {CONTACT_INQUIRY_TYPES.map((t) => (
      <option key={t} value={t}>{t}</option>
    ))}
  </select>
</div>
            <div>
              <label
                className="font-mono text-xs uppercase tracking-wide block mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Message
              </label>

              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg font-body text-sm kr-focus resize-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: COLORS.navy,
                }}
                placeholder="What are you looking for?"
              />
            </div>

            <button
              type="submit"
              className="font-body font-semibold text-sm px-7 py-3.5 rounded-full kr-focus transition-transform hover:scale-105 justify-self-center inline-flex items-center gap-2"
              style={{
                backgroundColor: "#25D366",
                color: "#08331C",
              }}
            >
              {/* Your WhatsApp SVG */}
              Message us on WhatsApp
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
