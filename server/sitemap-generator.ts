import { storage } from "./storage";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export async function generateSitemap(): Promise<string> {
  // Use the actual domain - Replit domain in development, custom domain in production
  const baseUrl = process.env.NODE_ENV === 'production' && process.env.CUSTOM_DOMAIN 
    ? `https://${process.env.CUSTOM_DOMAIN}`
    : process.env.REPLIT_DOMAINS 
    ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
    : 'https://selamcpa.com';
  const urls: SitemapUrl[] = [];

  // Static pages
  const staticPages = [
    { path: '/', changefreq: 'weekly' as const, priority: '1.0' },
    { path: '/about', changefreq: 'monthly' as const, priority: '0.9' },
    { path: '/blog', changefreq: 'daily' as const, priority: '0.8' },
    { path: '/ai-tools', changefreq: 'weekly' as const, priority: '0.8' },
    { path: '/advisory', changefreq: 'monthly' as const, priority: '0.7' },
    { path: '/bookkeeping', changefreq: 'monthly' as const, priority: '0.7' },
    { path: '/tax', changefreq: 'monthly' as const, priority: '0.7' },
    { path: '/audit', changefreq: 'monthly' as const, priority: '0.7' },
    { path: '/partners', changefreq: 'monthly' as const, priority: '0.6' },
    { path: '/ai-tools-affiliate', changefreq: 'weekly' as const, priority: '0.6' },
    { path: '/careers', changefreq: 'weekly' as const, priority: '0.5' },
    { path: '/payment', changefreq: 'monthly' as const, priority: '0.4' }
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
  // Use the actual domain - Replit domain in development, custom domain in production
  const baseUrl = process.env.NODE_ENV === 'production' && process.env.CUSTOM_DOMAIN 
    ? `https://${process.env.CUSTOM_DOMAIN}`
    : process.env.REPLIT_DOMAINS 
    ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
    : 'https://selamcpa.com';
  
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