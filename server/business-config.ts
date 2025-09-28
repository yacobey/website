// Business configuration with professional defaults for Selam CPA
export const businessConfig = {
  // Contact Information
  phone: {
    e164: process.env.PUBLIC_PHONE_E164 || "+13016408549",
    display: process.env.PUBLIC_PHONE_DISPLAY || "(301) 640-8549"
  },
  
  // Business Links
  links: {
    calendly: process.env.CALENDLY_URL || "https://calendly.com/selamcpa/consultation",
    intakeForm: process.env.INTAKE_FORM_URL || "https://docs.google.com/forms/d/e/1FAIpQLSdemo/viewform",
    secureUpload: process.env.SECURE_UPLOAD_URL || "https://1drv.ms/u/s!demo_upload_link",
    agentPublic: process.env.AGENT_PUBLIC_URL || "https://chatgpt.com" // Placeholder AI assistant
  },
  
  // Business Information
  business: {
    name: "Selam CPA",
    email: "info@selamcpa.com",
    address: "Serving MD, VA, DC Metro Area",
    hours: "Monday-Friday: 9:00 AM - 6:00 PM EST"
  },

  // SEO and Social Media
  seo: {
    socialImage: process.env.VITE_SOCIAL_IMAGE || "/assets/stock_images/professional_account_4628fcdf.jpg",
    socialImageAlt: "Selam CPA - Professional Accounting & Tax Services",
    domain: process.env.FRONTEND_ORIGIN || "https://selamcpa.com"
  }
};

// API endpoint to get business configuration
export function getBusinessConfig() {
  return businessConfig;
}