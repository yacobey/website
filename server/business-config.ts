// Business configuration with professional defaults for Selam CPA
export const businessConfig = {
  // Contact Information
  phone: {
    e164: process.env.PUBLIC_PHONE_E164 || "+13016408549",
    display: process.env.PUBLIC_PHONE_DISPLAY || process.env.VITE_PUBLIC_PHONE_DISPLAY || "(301) 640-8549"
  },
  
  // Business Links
  links: {
    calendly: process.env.CALENDLY_URL || process.env.VITE_CALENDLY_URL || "https://calendly.com/yber2001/30min",
    intakeForm: process.env.INTAKE_FORM_URL || "https://forms.gle/selamcpa-intake-form",
    secureUpload: process.env.SECURE_UPLOAD_URL || "https://portal.selamcpa.com/upload",
    agentPublic: process.env.AGENT_PUBLIC_URL || process.env.VITE_AGENT_PUBLIC_URL || "https://agent.selamcpa.com"
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
  },

  // API Configuration
  api: {
    baseUrl: process.env.VITE_API_URL || "/api"
  }
};

// API endpoint to get business configuration
export function getBusinessConfig() {
  return businessConfig;
}