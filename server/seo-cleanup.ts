import { storage } from './storage';

// Clean up malformed SEO data
export async function cleanupSeoData() {
  try {
    console.log('Starting SEO data cleanup...');
    
    // Get all SEO data
    const allSeoData = await storage.getSeoData();
    
    for (const seoPage of allSeoData) {
      let needsUpdate = false;
      const updates: any = {};
      
      // Clean up meta_robots field
      if (seoPage.metaRobots) {
        const cleanRobots = seoPage.metaRobots
          .split(',')
          .map(directive => directive.trim())
          .filter(directive => directive && 
                  directive !== 'undefined' && 
                  directive !== 'none' &&
                  !directive.includes('null'))
          .filter((directive, index, arr) => arr.indexOf(directive) === index) // Remove duplicates
          .join(', ');
        
        if (cleanRobots !== seoPage.metaRobots) {
          updates.metaRobots = cleanRobots || 'index, follow';
          needsUpdate = true;
          console.log(`Cleaning robots for ${seoPage.page}: "${seoPage.metaRobots}" -> "${updates.metaRobots}"`);
        }
      }
      
      // Ensure basic SEO fields are not empty
      if (!seoPage.metaRobots || seoPage.metaRobots.trim() === '') {
        updates.metaRobots = 'index, follow';
        needsUpdate = true;
      }
      
      // Update if needed
      if (needsUpdate) {
        await storage.updateSeoData(seoPage.page, updates);
        console.log(`Updated SEO data for page: ${seoPage.page}`);
      }
    }
    
    console.log('SEO data cleanup completed successfully');
    return { success: true, message: 'SEO cleanup completed' };
    
  } catch (error) {
    console.error('Error during SEO cleanup:', error);
    return { success: false, message: 'SEO cleanup failed', error: error.message };
  }
}

// Validate robots directive
export function validateRobotsDirective(robots: string): string {
  const validDirectives = [
    'index', 'noindex', 
    'follow', 'nofollow',
    'noarchive', 'nosnippet', 
    'noimageindex', 'nositelinkssearchbox'
  ];
  
  const directives = robots.split(',')
    .map(d => d.trim().toLowerCase())
    .filter(d => validDirectives.includes(d));
  
  // Ensure we have both index/noindex and follow/nofollow
  const hasIndex = directives.some(d => d === 'index' || d === 'noindex');
  const hasFollow = directives.some(d => d === 'follow' || d === 'nofollow');
  
  if (!hasIndex) directives.unshift('index');
  if (!hasFollow) directives.push('follow');
  
  return directives.join(', ');
}