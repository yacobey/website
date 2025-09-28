import { businessConfig } from "./business-config";

// Generate Local Business structured data for better SEO
export function generateLocalBusinessStructuredData() {
  const config = businessConfig;
  
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": config.business.name,
    "image": `${config.seo.domain}${config.seo.socialImage}`,
    "url": config.seo.domain,
    "telephone": config.phone.e164,
    "email": config.business.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Maryland, Virginia, DC Metro Area",
      "addressRegion": "MD",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.9072",
      "longitude": "-77.0369"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "serviceType": [
      "Tax Preparation",
      "Bookkeeping",
      "Financial Statements",
      "Business Advisory",
      "Audit Services",
      "Payroll Services"
    ],
    "areaServed": [
      {
        "@type": "State",
        "name": "Maryland"
      },
      {
        "@type": "State", 
        "name": "Virginia"
      },
      {
        "@type": "Place",
        "name": "Washington DC Metro Area"
      }
    ],
    "priceRange": "$",
    "currenciesAccepted": "USD",
    "paymentAccepted": ["Credit Card", "Debit Card", "Cash", "Check"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Accounting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tax Preparation",
            "description": "Individual and business tax preparation services"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Bookkeeping",
            "description": "Professional bookkeeping and financial record management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Business Advisory",
            "description": "Strategic business advisory and financial consulting"
          }
        }
      ]
    }
  });
}

// Enhanced SEO data with business integration
export function getEnhancedSEODefaults(page: string) {
  const config = businessConfig;
  const socialImageUrl = `${config.seo.domain}${config.seo.socialImage}`;
  
  const baseDefaults = {
    ogImage: socialImageUrl,
    ogImageAlt: config.seo.socialImageAlt,
    twitterImage: socialImageUrl,
    canonicalUrl: `${config.seo.domain}${page === 'home' ? '' : `/${page}`}`,
    structuredData: page === 'home' ? generateLocalBusinessStructuredData() : null
  };

  switch (page) {
    case 'home':
      return {
        ...baseDefaults,
        title: `${config.business.name} - Expert Accounting & Tax Services | MD, VA, DC`,
        description: `Professional CPA services in MD, VA, DC. Expert tax preparation, bookkeeping, and business advisory. Call ${config.phone.display} for consultation.`,
        keywords: "CPA, accounting, tax preparation, bookkeeping, business advisory, Maryland, Virginia, DC, ACCA",
        ogTitle: `${config.business.name} - Professional CPA Services`,
        ogDescription: `Expert accounting and tax services in Maryland, Virginia, and DC Metro Area. Contact us at ${config.phone.display} for professional consultation.`,
        twitterTitle: `${config.business.name} - Expert CPA Services`,
        twitterDescription: `Professional accounting, tax prep & business advisory in MD, VA, DC. Call ${config.phone.display}`
      };
    
    case 'blog':
      return {
        ...baseDefaults,
        title: `Tax & Accounting Insights - ${config.business.name} Blog`,
        description: `Latest tax updates, accounting tips, and business insights from ${config.business.name}. Stay informed with expert CPA advice.`,
        keywords: "tax news, accounting tips, business insights, CPA blog, tax updates",
        ogTitle: `Tax & Accounting Blog - ${config.business.name}`,
        ogDescription: `Expert insights on taxes, accounting, and business from ${config.business.name}. Professional CPA advice you can trust.`,
        twitterTitle: `Tax & Accounting Blog - ${config.business.name}`,
        twitterDescription: `Expert tax and accounting insights from professional CPAs`
      };
      
    case 'ai-tools':
      return {
        ...baseDefaults,
        title: `AI-Powered Financial Tools - ${config.business.name}`,
        description: `Smart financial calculators and AI tools for tax planning, ROI analysis, and cash flow management. Free tools by ${config.business.name}.`,
        keywords: "financial calculators, tax calculator, ROI calculator, cash flow, AI tools, financial planning",
        ogTitle: `AI Financial Tools - ${config.business.name}`,
        ogDescription: `Free AI-powered financial calculators for tax planning, ROI analysis, and business decision making.`,
        twitterTitle: `AI Financial Tools - ${config.business.name}`,
        twitterDescription: `Smart financial calculators and AI tools for better business decisions`
      };
    
    default:
      return {
        ...baseDefaults,
        title: `${config.business.name} - Professional CPA Services`,
        description: `Expert accounting and tax services by ${config.business.name}. Professional CPA guidance for your business needs.`,
        keywords: "CPA, accounting, tax services",
        ogTitle: `${config.business.name} - Professional CPA Services`,
        ogDescription: `Expert accounting and tax services by ${config.business.name}. Professional CPA guidance for your business needs.`,
        twitterTitle: `${config.business.name} - CPA Services`,
        twitterDescription: `Professional accounting and tax services`
      };
  }
}