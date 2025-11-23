import { Helmet } from "react-helmet";

interface StructuredDataProps {
  type: "Organization" | "LocalBusiness" | "ProfessionalService" | "WebPage" | "Service" | "Article";
  data: Record<string, any>;
}

const baseOrganization = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "Selam CPA PLLC",
  "description": "Professional CPA firm providing tax preparation, bookkeeping, advisory, and audit services for individuals and businesses in MD, VA, DC Metro Area.",
  "url": "https://selamcpa.com",
  "logo": "https://selamcpa.com/logo.png",
  "telephone": "+12404732623",
  "email": "info@selamcpa.com",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "MD, VA, DC Metro Area",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.0458",
    "longitude": "-76.6413"
  },
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
  "serviceType": [
    "Tax Preparation",
    "Tax Planning", 
    "Bookkeeping",
    "Financial Statement Preparation",
    "Business Advisory",
    "Audit Services",
    "Business Formation",
    "CFO Services"
  ],
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-17:00",
  "sameAs": [
    "https://www.linkedin.com/company/selam-cpa",
    "https://twitter.com/selamcpa"
  ]
};

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case "Organization":
      structuredData = {
        ...baseOrganization,
        ...data
      };
      break;

    case "LocalBusiness":
      structuredData = {
        ...baseOrganization,
        "@type": "LocalBusiness",
        ...data
      };
      break;

    case "ProfessionalService":
      structuredData = {
        ...baseOrganization,
        "@type": "ProfessionalService",
        ...data
      };
      break;

    case "Service":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "provider": baseOrganization,
        ...data
      };
      break;

    case "WebPage":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "publisher": baseOrganization,
        ...data
      };
      break;

    case "Article":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": baseOrganization,
        "author": {
          "@type": "Organization",
          "name": "Selam CPA PLLC"
        },
        ...data
      };
      break;

    default:
      structuredData = data;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

// Pre-configured structured data for common page types
export const CPAServiceStructuredData = ({ 
  serviceName, 
  description, 
  url,
  additionalData = {} 
}: {
  serviceName: string;
  description: string;
  url: string;
  additionalData?: Record<string, any>;
}) => (
  <StructuredData
    type="Service"
    data={{
      "name": serviceName,
      "description": description,
      "url": url,
      "serviceType": serviceName,
      "category": "Professional Services",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${serviceName} Services`,
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": serviceName,
              "description": description
            }
          }
        ]
      },
      ...additionalData
    }}
  />
);

export const WebPageStructuredData = ({
  name,
  description,
  url,
  breadcrumbs = []
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}) => (
  <StructuredData
    type="WebPage"
    data={{
      "name": name,
      "description": description,
      "url": url,
      "breadcrumb": breadcrumbs.length > 0 ? {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      } : undefined
    }}
  />
);

export const FAQStructuredData = ({ 
  faqs 
}: { 
  faqs: Array<{ question: string; answer: string }> 
}) => (
  <StructuredData
    type="WebPage"
    data={{
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }}
  />
);