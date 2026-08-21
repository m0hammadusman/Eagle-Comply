/**
 * EagleComply Central Dispatcher Utility
 * Automatically formats and transmits all user consultations, quotes, orders, and inquiries
 * directly to the primary company email: info@eaglecomply.com
 */

export const COMPANY_EMAIL = "info@eaglecomply.com";
export const UK_WHATSAPP = "+44 7706 413233";
export const UK_WHATSAPP_LINK = "https://wa.me/447706413233";

export function generateMailtoLink({
  type = "General Inquiry",
  clientName = "Prospective Client",
  email = "",
  company = "",
  phone = "",
  jurisdiction = "",
  service = "",
  date = "",
  time = "",
  budget = "",
  timeline = "",
  requirement = "",
  notes = ""
}) {
  const subject = `[EagleComply ${type}] - ${company || clientName || 'New Inquiry'} - ${service || 'Advisory Request'}`;

  const body = [
    `==================================================`,
    `EAGLECOMPLY CLIENT ENGAGEMENT DISPATCH`,
    `==================================================`,
    `Inquiry Type: ${type}`,
    `Date/Time: ${new Date().toUTCString()}`,
    ``,
    `CLIENT DETAILS:`,
    `• Full Name: ${clientName || 'N/A'}`,
    `• Work Email: ${email || 'N/A'}`,
    `• Company / Entity: ${company || 'N/A'}`,
    `• Contact Phone: ${phone || 'N/A'}`,
    `• Jurisdiction: ${jurisdiction || 'N/A'}`,
    ``,
    `ENGAGEMENT SCOPE:`,
    `• Requested Service: ${service || 'General Compliance Advisory'}`,
    date ? `• Preferred Consultation Date: ${date} at ${time || '09:00'}` : '',
    budget ? `• Estimated Budget: ${budget}` : '',
    timeline ? `• Target Timeline: ${timeline}` : '',
    ``,
    `PROJECT DESCRIPTION & REQUIREMENTS:`,
    requirement || notes || 'Please review our compliance profile and contact us with advisory options.',
    ``,
    `==================================================`,
    `Transmitted directly to EagleComply Executive Counsel: ${COMPANY_EMAIL}`,
    `==================================================`
  ].filter(Boolean).join('\n');

  return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function sendInquiryToCompanyEmail(data) {
  const mailtoUrl = generateMailtoLink(data);
  try {
    // Open in background or trigger mail client
    window.location.href = mailtoUrl;
  } catch (err) {
    console.error("Mailto trigger error:", err);
  }
  return mailtoUrl;
}
