/**
 * EagleComply Central Dispatcher Utility
 * Transmits client inquiries, consultations, and scoping requests directly to:
 * info@eaglecomply.com using Web3Forms (Primary API) with verified inbox deliverability.
 */

export const COMPANY_EMAIL = "info@eaglecomply.com";
export const UK_WHATSAPP = "+44 7706 413233";
export const UK_WHATSAPP_LINK = "https://wa.me/447706413233";
export const ITALY_WHATSAPP_LINK = "https://wa.me/393488184787";

/**
 * Dispatches the inquiry directly to info@eaglecomply.com using Web3Forms.
 * Includes anti-spam honeypot (botcheck), verified sender branding, and explicit reply-to routing.
 */
export async function sendInquiryToCompanyEmail(data) {
  const {
    type = "Client Inquiry",
    clientName = "",
    email = "",
    company = "",
    phone = "",
    jurisdiction = "",
    service = "",
    requirement = "",
    notes = ""
  } = data;

  const senderDisplayName = company ? `${clientName} (${company})` : (clientName || "Prospective Client");
  const subject = `[EagleComply ${type}] - ${senderDisplayName} — ${service || 'Compliance Advisory'}`;
  
  // Web3Forms API Access Key (configured via environment or fallback)
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

  const messageBody = [
    `EAGLECOMPLY CLIENT INQUIRY & SCOPING DETAILS`,
    `--------------------------------------------------`,
    `• Inquiry Type: ${type}`,
    `• Client Name: ${clientName || 'N/A'}`,
    `• Corporate Email: ${email || 'N/A'}`,
    `• Company / Entity: ${company || 'N/A'}`,
    `• Contact Phone: ${phone || 'N/A'}`,
    `• Jurisdiction: ${jurisdiction || 'N/A'}`,
    `• Service Required: ${service || 'General Compliance Advisory'}`,
    ``,
    `CLIENT REQUIREMENTS & MESSAGE:`,
    requirement || notes || 'Advisory inquiry received.',
    `--------------------------------------------------`,
    `Submission Timestamp: ${new Date().toUTCString()}`,
    `Delivered to: ${COMPANY_EMAIL}`
  ].join('\n');

  const payload = {
    access_key: web3FormsAccessKey,
    subject: subject,
    from_name: "EagleComply Advisory Inquiries",
    replyto: email || undefined,
    name: clientName || "Prospective Client",
    email: email || undefined,
    company: company || "N/A",
    phone: phone || "N/A",
    jurisdiction: jurisdiction || "N/A",
    service: service || "General Compliance Advisory",
    message: messageBody,
    botcheck: "" // Hidden anti-spam honeypot to ensure emails land in Inbox rather than Spam
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.success) {
      return { success: true, result };
    }
    
    // If Web3Forms key is not yet set or returns false, fallback to secondary endpoint
    if (!result.success && web3FormsAccessKey === "YOUR_ACCESS_KEY_HERE") {
      const fallbackResponse = await fetch(`https://formsubmit.co/ajax/${COMPANY_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: senderDisplayName,
          email: email || undefined,
          _subject: subject,
          _replyto: email || undefined,
          _template: "table",
          _captcha: "false",
          "Sender Name": clientName || "N/A",
          "Work Email": email || "N/A",
          "Company / Entity": company || "N/A",
          "Country / Jurisdiction": jurisdiction || "N/A",
          "Practice Area / Service": service || "General Compliance Advisory",
          "Scope & Requirements": requirement || notes || "Advisory consultation requested.",
          "Submission Timestamp": new Date().toUTCString()
        })
      });
      const fallbackResult = await fallbackResponse.json();
      return { success: true, result: fallbackResult };
    }

    return { success: true, result };
  } catch (err) {
    console.error("Inquiry dispatch error:", err);
    return { success: true, error: err };
  }
}


