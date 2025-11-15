import * as fs from 'fs';
import * as path from 'path';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

async function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml...');
  
  const baseUrl = 'https://www.nextjobinfo.com';
  const today = new Date().toISOString().split('T')[0];
  
  // Try to load routes from ssg-build.log.json first (most accurate), fallback to static-routes.json
  let routes: string[] = [];
  const ssgLogPath = path.resolve(process.cwd(), 'ssg-build.log.json');
  const routesPath = path.resolve(process.cwd(), 'static-routes.json');
  
  if (fs.existsSync(ssgLogPath)) {
    console.log('📋 Reading routes from ssg-build.log.json...');
    const ssgLog = JSON.parse(fs.readFileSync(ssgLogPath, 'utf-8'));
    routes = ssgLog.generated || [];
    console.log(`📍 Found ${routes.length} generated routes from SSG build`);
  } else if (fs.existsSync(routesPath)) {
    console.log('📋 Reading routes from static-routes.json...');
    routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
    console.log(`📍 Found ${routes.length} routes from static-routes.json`);
  } else {
    console.error('❌ Neither ssg-build.log.json nor static-routes.json found.');
    console.error('   Run npm run generate-routes or npm run build:ssg first.');
    process.exit(1);
  }
  
  if (routes.length === 0) {
    console.error('❌ No routes found to generate sitemap.');
    process.exit(1);
  }
  
  // Create sitemap URLs with priorities and change frequencies
  const urls: SitemapUrl[] = routes.map(route => {
    const url: SitemapUrl = {
      loc: `${baseUrl}${route}`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.5'
    };
    
    // Set specific priorities and change frequencies based on route type
    if (route === '/') {
      url.priority = '1.0';
      url.changefreq = 'daily';
    } else if (route.startsWith('/job/')) {
      url.priority = '0.8';
      url.changefreq = 'weekly';
    } else if (route.startsWith('/state-jobs/')) {
      url.priority = '0.9';
      url.changefreq = 'daily';
    } else if (route.startsWith('/category/')) {
      url.priority = '0.9';
      url.changefreq = 'daily';
    } else if (['/about', '/contact', '/privacy', '/terms', '/disclaimer'].includes(route)) {
      url.priority = '0.3';
      url.changefreq = 'monthly';
    } else if (['/tips', '/career', '/interview-prep', '/resume', '/study-material', '/mock-tests'].includes(route)) {
      url.priority = '0.7';
      url.changefreq = 'weekly';
    } else if (['/admit-cards', '/results', '/answer-keys', '/cutoff', '/merit-list', '/syllabus'].includes(route)) {
      url.priority = '0.8';
      url.changefreq = 'daily';
    }
    
    return url;
  });
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // Write to public/sitemap.xml
  const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  
  console.log(`✅ Sitemap generated with ${urls.length} URLs`);
  console.log(`📝 Saved to: ${outputPath}`);
  
  // Also copy to dist/client for deployment
  const distPath = path.resolve(process.cwd(), 'dist/client/sitemap.xml');
  const distDir = path.dirname(distPath);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  fs.copyFileSync(outputPath, distPath);
  console.log(`📦 Copied to: ${distPath}`);
}

generateSitemap().catch(console.error);
