/**
 * EagleComply Central Dispatcher Utility
 * Automatically formats and transmits all user consultations, quotes, orders, and inquiries
 * directly to the primary company email: info@eaglecomply.com via FormSubmit API.
 */

export const COMPANY_EMAIL = "info@eaglecomply.com";
export const UK_WHATSAPP = "+44 7706 413233";
export const UK_WHATSAPP_LINK = "https://wa.me/447706413233";
export const ITALY_WHATSAPP_LINK = "https://wa.me/393488184787";

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

/**
 * Dispatches the inquiry directly to info@eaglecomply.com over the internet using FormSubmit API.
 */
export async function sendInquiryToCompanyEmail(data) {
  const {
    type = "General Inquiry",
    clientName = "",
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
  } = data;

  const subject = `[EagleComply ${type}] - ${company || clientName || 'New Client'} (${service || 'Advisory'})`;

  const payload = {
    _subject: subject,
    _replyto: email || undefined,
    _template: "table",
    _captcha: "false",
    "Engagement Type": type,
    "Client Name": clientName || "N/A",
    "Work Email": email || "N/A",
    "Company / Entity": company || "N/A",
    "Phone / Contact": phone || "N/A",
    "Jurisdiction": jurisdiction || "N/A",
    "Service Requested": service || "General Compliance Advisory",
    "Scheduled Date & Time": date ? `${date} at ${time || '09:00'}` : "Immediate Scoping",
    "Budget Range": budget || "To be scoped",
    "Target Timeline": timeline || "Standard",
    "Scope & Requirement": requirement || notes || "Advisory consultation requested.",
    "Submitted At": new Date().toUTCString()
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${COMPANY_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return { success: true, result };
  } catch (err) {
    console.error("FormSubmit dispatch error:", err);
    return { success: false, error: err };
  }
}

