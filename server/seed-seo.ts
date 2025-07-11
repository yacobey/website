import { storage } from "./storage";

const seoPages = [
  {
    page: "home",
    title: "Selam CPA - Expert Accounting & Tax Services",
    description: "Professional CPA services with expert bookkeeping, tax preparation, audits, and business advisory for individuals and businesses.",
    keywords: "CPA, accounting, tax preparation, bookkeeping, audit, business advisory, ACCA, financial services",
    ogTitle: "Selam CPA - Expert Accounting & Tax Services",
    ogDescription: "Professional CPA services with expert bookkeeping, tax preparation, audits, and business advisory for individuals and businesses.",
    ogImage: "https://selamcpa.com/og-image.jpg",
    ogImageAlt: "Selam CPA - Professional Accounting Services",
    twitterTitle: "Selam CPA - Expert Accounting & Tax Services",
    twitterDescription: "Professional CPA services with expert bookkeeping, tax preparation, audits, and business advisory.",
    twitterImage: "https://selamcpa.com/og-image.jpg",
    canonicalUrl: "https://selamcpa.com",
    metaRobots: "index, follow"
  },
  {
    page: "blog",
    title: "Financial Insights & Tax Tips Blog | Selam CPA",
    description: "Expert financial insights and tax tips from certified CPAs. Latest tax law changes and financial planning strategies.",
    keywords: "tax tips, financial insights, accounting blog, CPA advice, tax law changes, financial planning",
    ogTitle: "Financial Insights & Tax Tips Blog | Selam CPA",
    ogDescription: "Expert financial insights and tax tips from certified CPAs. Latest tax law changes and financial planning strategies.",
    ogImage: "https://selamcpa.com/og-image-blog.jpg",
    ogImageAlt: "Selam CPA Financial Insights Blog",
    twitterTitle: "Financial Insights & Tax Tips | Selam CPA",
    twitterDescription: "Expert financial insights and tax tips from certified CPAs.",
    twitterImage: "https://selamcpa.com/og-image-blog.jpg",
    canonicalUrl: "https://selamcpa.com/blog",
    metaRobots: "index, follow"
  },
  {
    page: "ai-tools",
    title: "AI-Powered Financial Calculators | Selam CPA",
    description: "Free professional financial calculators and AI-powered tools for tax planning, investment analysis, and business decisions.",
    keywords: "financial calculators, tax calculator, ROI calculator, cash flow tracker, loan calculator, AI financial tools, CPA calculators",
    ogTitle: "AI-Powered Financial Calculators | Selam CPA",
    ogDescription: "Free professional financial calculators and AI-powered tools for tax planning, investment analysis, and business decisions.",
    ogImage: "https://selamcpa.com/og-image-ai-tools.jpg",
    ogImageAlt: "AI-Powered Financial Calculators by Selam CPA",
    twitterTitle: "AI Financial Calculators | Selam CPA",
    twitterDescription: "Free professional financial calculators for tax planning and business decisions.",
    twitterImage: "https://selamcpa.com/og-image-ai-tools.jpg",
    canonicalUrl: "https://selamcpa.com/ai-tools",
    metaRobots: "index, follow"
  },
  {
    page: "advisory",
    title: "Business Advisory & Fractional CFO Services | Selam CPA",
    description: "Strategic business advisory, fractional CFO services, financial planning, and business growth consulting from experienced CPAs.",
    keywords: "business advisory, fractional CFO, strategic planning, financial consulting, business growth, CPA advisory services",
    ogTitle: "Business Advisory & Fractional CFO Services | Selam CPA",
    ogDescription: "Strategic business advisory and fractional CFO services to help your business grow and succeed.",
    ogImage: "https://selamcpa.com/og-image-advisory.jpg",
    ogImageAlt: "Business Advisory Services by Selam CPA",
    twitterTitle: "Business Advisory & CFO Services | Selam CPA",
    twitterDescription: "Strategic business advisory and fractional CFO services for business growth.",
    twitterImage: "https://selamcpa.com/og-image-advisory.jpg",
    canonicalUrl: "https://selamcpa.com/advisory",
    metaRobots: "index, follow"
  },
  {
    page: "bookkeeping",
    title: "Professional Bookkeeping Services | Selam CPA",
    description: "Expert bookkeeping, financial statements, accounts payable/receivable, and monthly financial reporting services.",
    keywords: "bookkeeping services, financial statements, accounts payable, accounts receivable, monthly reporting, CPA bookkeeping",
    ogTitle: "Professional Bookkeeping Services | Selam CPA",
    ogDescription: "Expert bookkeeping and financial statement preparation services for businesses of all sizes.",
    ogImage: "https://selamcpa.com/og-image-bookkeeping.jpg",
    ogImageAlt: "Professional Bookkeeping Services by Selam CPA",
    twitterTitle: "Professional Bookkeeping Services | Selam CPA",
    twitterDescription: "Expert bookkeeping and financial statement preparation services.",
    twitterImage: "https://selamcpa.com/og-image-bookkeeping.jpg",
    canonicalUrl: "https://selamcpa.com/bookkeeping",
    metaRobots: "index, follow"
  },
  {
    page: "tax",
    title: "Tax Preparation & Strategic Planning | Selam CPA",
    description: "Comprehensive tax preparation, strategic tax planning, IRS representation, and tax optimization for individuals and businesses.",
    keywords: "tax preparation, tax planning, IRS representation, tax optimization, individual tax, business tax, CPA tax services",
    ogTitle: "Tax Preparation & Strategic Planning | Selam CPA",
    ogDescription: "Comprehensive tax services including preparation, planning, and optimization strategies.",
    ogImage: "https://selamcpa.com/og-image-tax.jpg",
    ogImageAlt: "Tax Preparation Services by Selam CPA",
    twitterTitle: "Tax Preparation & Planning | Selam CPA",
    twitterDescription: "Comprehensive tax preparation and strategic planning services.",
    twitterImage: "https://selamcpa.com/og-image-tax.jpg",
    canonicalUrl: "https://selamcpa.com/tax",
    metaRobots: "index, follow"
  },
  {
    page: "audit",
    title: "Professional Audit & Assurance Services | Selam CPA",
    description: "Independent audits, financial statement reviews, compilations, and assurance services for businesses and organizations.",
    keywords: "audit services, financial statement audit, review services, compilation, assurance services, independent audit, CPA audit",
    ogTitle: "Professional Audit & Assurance Services | Selam CPA",
    ogDescription: "Independent audit and assurance services providing credibility to your financial statements.",
    ogImage: "https://selamcpa.com/og-image-audit.jpg",
    ogImageAlt: "Professional Audit Services by Selam CPA",
    twitterTitle: "Audit & Assurance Services | Selam CPA",
    twitterDescription: "Independent audit and assurance services for businesses.",
    twitterImage: "https://selamcpa.com/og-image-audit.jpg",
    canonicalUrl: "https://selamcpa.com/audit",
    metaRobots: "index, follow"
  },
  {
    page: "partners",
    title: "Technology Partners & Business Solutions | Selam CPA",
    description: "Curated partnerships with leading financial, AI, and SaaS solutions. Streamline operations, enhance security, and grow your business with the best tools.",
    keywords: "business partnerships, technology solutions, financial software, SaaS solutions, business tools, CPA technology partners",
    ogTitle: "Technology Partners & Business Solutions | Selam CPA",
    ogDescription: "Curated partnerships with leading financial, AI, and SaaS solutions to help streamline operations and grow your business.",
    ogImage: "https://selamcpa.com/og-image-partners.jpg",
    ogImageAlt: "Technology Partners by Selam CPA",
    twitterTitle: "Technology Partners & Solutions | Selam CPA",
    twitterDescription: "Leading financial, AI, and SaaS solutions to help streamline operations and grow your business.",
    twitterImage: "https://selamcpa.com/og-image-partners.jpg",
    canonicalUrl: "https://selamcpa.com/partners",
    metaRobots: "index, follow"
  },
  {
    page: "ai-tools-affiliate",
    title: "AI Tools for CPAs - Professional Software Recommendations | Selam CPA",
    description: "CPA-approved AI tools and software recommendations for accounting firms. Automate workflows, improve accuracy, and save time with professionally-vetted solutions.",
    keywords: "AI tools for CPAs, accounting software, CPA software recommendations, AI accounting tools, automation tools, bookkeeping software",
    ogTitle: "AI Tools for CPAs - Professional Software Recommendations | Selam CPA",
    ogDescription: "Professionally-vetted AI tools and software to automate workflows, improve accuracy, and save time for accounting firms.",
    ogImage: "https://selamcpa.com/og-image-ai-affiliate.jpg",
    ogImageAlt: "AI Tools for CPAs by Selam CPA",
    twitterTitle: "AI Tools for CPAs | Selam CPA",
    twitterDescription: "CPA-approved AI tools and software recommendations for accounting firms and businesses.",
    twitterImage: "https://selamcpa.com/og-image-ai-affiliate.jpg",
    canonicalUrl: "https://selamcpa.com/ai-tools-affiliate",
    metaRobots: "index, follow"
  }
];

export async function seedSeoData() {
  console.log("Seeding SEO data...");
  
  for (const pageData of seoPages) {
    try {
      // Check if page already exists
      const existing = await storage.getSeoDataByPage(pageData.page);
      
      if (!existing) {
        await storage.createSeoData(pageData);
        console.log(`✓ Created SEO data for ${pageData.page}`);
      } else {
        console.log(`- SEO data for ${pageData.page} already exists`);
      }
    } catch (error) {
      console.error(`Error seeding SEO data for ${pageData.page}:`, error);
    }
  }
  
  console.log("SEO data seeding completed!");
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedSeoData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}