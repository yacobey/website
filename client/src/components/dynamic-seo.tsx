import { Helmet } from "react-helmet";
import { useSEO } from "@/hooks/useSEO";

interface DynamicSEOProps {
  page: string;
  customTitle?: string;
  customDescription?: string;
}

export default function DynamicSEO({ page, customTitle, customDescription }: DynamicSEOProps) {
  const { seoData, isLoading } = useSEO(page);

  if (isLoading) {
    return null; // Don't render SEO tags while loading
  }

  const title = customTitle || seoData.title;
  const description = customDescription || seoData.description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="robots" content={seoData.metaRobots} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={seoData.ogTitle} />
      <meta property="og:description" content={seoData.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoData.canonicalUrl} />
      <meta property="og:site_name" content="Lenox CPA" />
      <meta property="og:image" content={seoData.ogImage} />
      <meta property="og:image:alt" content={seoData.ogImageAlt} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.twitterTitle} />
      <meta name="twitter:description" content={seoData.twitterDescription} />
      <meta name="twitter:image" content={seoData.twitterImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData.canonicalUrl} />
      
      {/* Structured Data */}
      {seoData.structuredData && (
        <script type="application/ld+json">
          {seoData.structuredData}
        </script>
      )}
    </Helmet>
  );
}