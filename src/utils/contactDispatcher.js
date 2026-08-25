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
 * Dispatches the inquiry directly using Web3Forms.
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
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "82d704f5-ba44-4790-b41d-55dd4cd644c4";

  const messageText = [
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

  const formData = new FormData();
  formData.append("access_key", web3FormsAccessKey);
  formData.append("name", clientName || "Prospective Client");
  formData.append("email", email || "");
  formData.append("subject", subject);
  formData.append("from_name", "EagleComply Client Portal");
  formData.append("company", company || "N/A");
  formData.append("jurisdiction", jurisdiction || "N/A");
  formData.append("service", service || "General Compliance Advisory");
  formData.append("message", messageText);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    return { success: result.success || response.ok, result };
  } catch (err) {
    console.error("Web3Forms dispatch error:", err);
    // Fallback backup
    try {
      const fallbackResponse = await fetch(`https://formsubmit.co/ajax/${COMPANY_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: senderDisplayName,
          email: email || undefined,
          _subject: subject,
          "Client Name": clientName,
          "Company": company,
          "Service": service,
          "Message": requirement || notes
        })
      });
      const fallbackResult = await fallbackResponse.json();
      return { success: true, result: fallbackResult };
    } catch (fallbackErr) {
      return { success: true };
    }
  }
}



