import { storage } from "./storage";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export async function generateSitemap(): Promise<string> {
  // Always use selamcpa.com as the base URL
  const baseUrl = 'https://selamcpa.com';
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: '/', changefreq: 'weekly' as const, priority: '1.0' },
    // Service pages
    { path: '/tax', changefreq: 'monthly' as const, priority: '0.9' },
    { path: '/bookkeeping', changefreq: 'monthly' as const, priority: '0.9' },
    { path: '/advisory', changefreq: 'monthly' as const, priority: '0.9' },
    { path: '/audit', changefreq: 'monthly' as const, priority: '0.9' },
    { path: '/ai-consulting', changefreq: 'monthly' as const, priority: '0.9' },
    // Calculator hub + individual calculators
    { path: '/calculators', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/calculators/scorp-savings', changefreq: 'monthly' as const, priority: '0.9' },
    { path: '/calculators/estimated-tax', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/calculators/self-employment-tax', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/calculators/home-office', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/calculators/mileage', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/calculators/section-179', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/calculators/retirement', changefreq: 'monthly' as const, priority: '0.8' },
    // Industry pages
    { path: '/industries/healthcare', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/industries/legal', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/industries/real-estate', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/industries/technology', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/industries/retail', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/industries/construction', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/industries/nonprofit', changefreq: 'monthly' as const, priority: '0.8' },
    { path: '/industries/hospitality', changefreq: 'monthly' as const, priority: '0.8' },
    // Other pages
    { path: '/tools', changefreq: 'monthly' as const, priority: '0.7' },
    { path: '/blog', changefreq: 'weekly' as const, priority: '0.7' },
    { path: '/contact', changefreq: 'monthly' as const, priority: '0.7' },
    { path: '/testimonials', changefreq: 'monthly' as const, priority: '0.6' },
    { path: '/partners', changefreq: 'monthly' as const, priority: '0.6' },
    { path: '/careers', changefreq: 'monthly' as const, priority: '0.5' },
  ];

  // Add static pages
  staticPages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Add blog posts
  try {
    const blogPosts = await storage.getBlogPosts();
    blogPosts.forEach(post => {
      if (post.status === 'published') {
        urls.push({
          loc: `${baseUrl}/blog/${post.slug}`,
          lastmod: new Date(post.publishedAt).toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.6'
        });
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

export function generateRobotsTxt(): string {
  // Always use selamcpa.com as the base URL
  const baseUrl = 'https://selamcpa.com';
  
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin-login
Disallow: /seo-dashboard
Disallow: /indexing-control
Disallow: /api/

# Allow important pages
Allow: /
Allow: /about
Allow: /blog
Allow: /ai-tools
Allow: /advisory
Allow: /bookkeeping
Allow: /tax
Allow: /audit
Allow: /partners
Allow: /ai-tools-affiliate
Allow: /careers
Allow: /payment

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional - adjust as needed)
Crawl-delay: 1`;
}