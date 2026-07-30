/** Opens a pre-filled WhatsApp chat in a new tab. Both site forms submit this way. */
export function openWhatsApp(number, text) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/** A 10-digit Indian mobile number starting with 6-9. */
export function isValidIndianMobile(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}
