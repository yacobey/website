import { useQuery } from '@tanstack/react-query';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonicalUrl: string;
  metaRobots: string;
  structuredData?: string;
}

export function useSEO(page: string) {
  const { data: seoData, isLoading } = useQuery<SEOData>({
    queryKey: ['/api/seo-data', page],
    queryFn: async () => {
      const response = await fetch(`/api/seo-data/${page}`);
      if (!response.ok) {
        // If no SEO data found, return default values
        if (response.status === 404) {
          return getDefaultSEO(page);
        }
        throw new Error('Failed to fetch SEO data');
      }
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return {
    seoData: seoData || getDefaultSEO(page),
    isLoading,
  };
}

function getDefaultSEO(page: string): SEOData {
  const defaults: Record<string, SEOData> = {
    home: {
      title: "Lenox CPA - Expert Accounting, Tax & Business Advisory Services",
      description: "Professional CPA services including bookkeeping, tax preparation, audits, compilations, and business advisory. ACCA-qualified with comprehensive financial solutions for individuals and businesses.",
      keywords: "CPA, accounting, tax preparation, bookkeeping, audit, business advisory, ACCA, financial services",
      ogTitle: "Lenox CPA - Expert Accounting & Tax Services",
      ogDescription: "Professional CPA services with expert bookkeeping, tax preparation, audits, and business advisory for individuals and businesses.",
      ogImage: "https://lenoxcpa.com/og-image.jpg",
      ogImageAlt: "Lenox CPA - Professional Accounting Services",
      twitterTitle: "Lenox CPA - Expert Accounting & Tax Services",
      twitterDescription: "Professional CPA services with expert bookkeeping, tax preparation, audits, and business advisory.",
      twitterImage: "https://lenoxcpa.com/og-image.jpg",
      canonicalUrl: "https://lenoxcpa.com",
      metaRobots: "",
    },
    blog: {
      title: "Financial Insights & CPA Expertise Blog | Lenox CPA",
      description: "Expert insights on taxes, accounting, business finance, and financial planning from experienced CPAs. Stay updated with latest financial news and tips.",
      keywords: "financial blog, tax tips, accounting insights, business finance, CPA advice",
      ogTitle: "Financial Blog & Expert Insights | Lenox CPA",
      ogDescription: "Expert insights on taxes, accounting, business finance, and financial planning from experienced CPAs.",
      ogImage: "https://lenoxcpa.com/og-blog.jpg",
      ogImageAlt: "Lenox CPA Financial Blog",
      twitterTitle: "Financial Blog & Expert Insights | Lenox CPA",
      twitterDescription: "Expert insights on taxes, accounting, business finance, and financial planning.",
      twitterImage: "https://lenoxcpa.com/og-blog.jpg",
      canonicalUrl: "https://lenoxcpa.com/blog",
      metaRobots: "",
    },
    'ai-tools': {
      title: "AI-Powered Financial Calculators & Tools | Lenox CPA",
      description: "Access advanced AI-powered financial calculators, tax estimators, and business planning tools. Free online calculators for smart financial decisions.",
      keywords: "financial calculators, AI tools, tax calculator, business planning, financial planning tools",
      ogTitle: "AI Financial Tools & Calculators | Lenox CPA",
      ogDescription: "Advanced AI-powered financial calculators and business planning tools for smart financial decisions.",
      ogImage: "https://lenoxcpa.com/og-ai-tools.jpg",
      ogImageAlt: "AI Financial Tools by Lenox CPA",
      twitterTitle: "AI Financial Tools & Calculators | Lenox CPA",
      twitterDescription: "Advanced AI-powered financial calculators and business planning tools.",
      twitterImage: "https://lenoxcpa.com/og-ai-tools.jpg",
      canonicalUrl: "https://lenoxcpa.com/ai-tools",
      metaRobots: "",
    },
  };

  return defaults[page] || {
    title: `${page.charAt(0).toUpperCase() + page.slice(1)} | Lenox CPA`,
    description: `Professional CPA services and financial expertise for ${page}.`,
    keywords: "CPA, accounting, financial services",
    ogTitle: `${page.charAt(0).toUpperCase() + page.slice(1)} | Lenox CPA`,
    ogDescription: `Professional CPA services and financial expertise for ${page}.`,
    ogImage: "https://lenoxcpa.com/og-image.jpg",
    ogImageAlt: "Lenox CPA Services",
    twitterTitle: `${page.charAt(0).toUpperCase() + page.slice(1)} | Lenox CPA`,
    twitterDescription: `Professional CPA services and financial expertise for ${page}.`,
    twitterImage: "https://lenoxcpa.com/og-image.jpg",
    canonicalUrl: `https://lenoxcpa.com/${page}`,
    metaRobots: "",
  };
}