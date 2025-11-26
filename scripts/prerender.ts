import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { minifyHTML } from '../src/ssg/minify-html.js';
import { generateContentHash, loadHashManifest, saveHashManifest, hasContentChanged } from '../src/ssg/content-hash.js';
import { validateJobForSSG, SSGValidationError } from '../src/ssg/validators.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Suppress React SSR warnings
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const errorMsg = args[0]?.toString() || '';
  // Suppress useLayoutEffect warnings during SSR
  if (errorMsg.includes('useLayoutEffect does nothing on the server')) {
    return;
  }
  originalConsoleError(...args);
};

// Site URL for absolute canonical/OG tags
const siteUrl = process.env.VITE_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://nextjobinfo.com';

// Mock browser APIs for SSR environment
(global as any).window = {
  location: {
    origin: siteUrl,
    href: siteUrl,
    pathname: '/',
    search: '',
    hash: '',
  },
  matchMedia: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
  addEventListener: () => {},
  removeEventListener: () => {},
  navigator: {
    userAgent: 'SSR',
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  },
  sessionStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  },
  innerWidth: 1024,
  innerHeight: 768,
  scrollTo: () => {},
};

(global as any).document = {
  createElement: () => ({
    setAttribute: () => {},
    appendChild: () => {},
    insertBefore: () => {},
    style: {},
  }),
  createTextNode: () => ({}),
  getElementsByTagName: () => [{ appendChild: () => {} }],
  documentElement: {
    getAttribute: () => 'ltr',
    setAttribute: () => {},
    style: {},
  },
  head: {
    appendChild: () => {},
    insertBefore: () => {},
  },
  body: {
    appendChild: () => {},
  },
  addEventListener: () => {},
  removeEventListener: () => {},
};

(global as any).localStorage = (global as any).window.localStorage;
(global as any).sessionStorage = (global as any).window.sessionStorage;
try {
  if (!(global as any).navigator) {
    Object.defineProperty(global, 'navigator', {
      value: (global as any).window?.navigator || { userAgent: 'node' },
      writable: false,
      configurable: true,
    });
  }
} catch {
}

// Log file setup
interface BuildLog {
  timestamp: string;
  totalRoutes: number;
  skipped: string[];
  generated: string[];
  deleted: string[];
  errors: Array<{ route: string; error: string }>;
}

function getRouteOutputPath(route: string): string {
  if (route === '/') {
    return path.resolve(process.cwd(), 'dist/client/index.html');
  } else {
    const routePath = route.endsWith('/') ? route.slice(0, -1) : route;
    // Remove leading slash to prevent absolute path resolution
    const relativePath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
    return path.resolve(process.cwd(), `dist/client/${relativePath}/index.html`);
  }
}

// SSG persistent cache to survive client rebuilds (which wipes dist/client)
const CACHE_DIR = path.resolve(process.cwd(), 'dist/ssg-cache');
// Bump this version when head/helmet injection logic changes to force a one-time full rebuild
const CACHE_VERSION = 'v6-dynamic-meta-helmet-2025-11-18';
const VERSION_FILE = path.resolve(CACHE_DIR, 'version.json');

function getCacheOutputPath(route: string): string {
  if (route === '/') {
    return path.resolve(CACHE_DIR, 'index.html');
  } else {
    const routePath = route.endsWith('/') ? route.slice(0, -1) : route;
    // Remove leading slash to prevent absolute path resolution
    const relativePath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
    return path.resolve(CACHE_DIR, `${relativePath}/index.html`);
  }
}

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyCacheToDist(route: string): boolean {
  try {
    const cachePath = getCacheOutputPath(route);
    if (!fs.existsSync(cachePath)) return false;

    const distPath = getRouteOutputPath(route);
    const distDir = path.dirname(distPath);
    ensureDir(distDir);

    fs.copyFileSync(cachePath, distPath);
    return true;
  } catch {
    return false;
  }
}

function saveToCache(route: string, html: string) {
  const cachePath = getCacheOutputPath(route);
  const cacheDir = path.dirname(cachePath);
  ensureDir(cacheDir);
  fs.writeFileSync(cachePath, html);
}

function cleanDefaultMeta(template: string): string {
  return template
    .replace(/<title[^>]*>.*?<\/title>/gi, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s+name="keywords"[^>]*>/gi, '')
    .replace(/<meta\s+name="author"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:title"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:description"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:url"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:image"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:image:width"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:image:height"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:site_name"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:type"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:title"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:description"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:url"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:image"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:card"[^>]*>/gi, '');
}

function findExistingPages(distPath: string): Set<string> {
  const existingPages = new Set<string>();
  
  if (!fs.existsSync(distPath)) {
    return existingPages;
  }

  function scanDirectory(dir: string, basePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip asset directories
        if (['assets', '_headers', 'robots.txt'].includes(entry.name)) {
          continue;
        }
        scanDirectory(fullPath, path.join(basePath, entry.name));
      } else if (entry.name === 'index.html') {
        // Convert file path to route
        const route = basePath === '' ? '/' : `/${basePath}`;
        existingPages.add(route);
      }
    }
  }

  scanDirectory(distPath);
  return existingPages;
}

function deleteOrphanedPages(orphanedRoutes: string[], log: BuildLog) {
  for (const route of orphanedRoutes) {
    try {
      const outputPath = getRouteOutputPath(route);
      const cachePath = getCacheOutputPath(route);
      const outputDir = path.dirname(outputPath);
      const cacheDir = path.dirname(cachePath);

      // Delete the HTML files
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      if (fs.existsSync(cachePath)) {
        fs.unlinkSync(cachePath);
      }
      log.deleted.push(route);

      // Delete empty parent directories (but keep dist/client and CACHE_DIR)
      const distClient = path.resolve(process.cwd(), 'dist/client');
      let currentDir = outputDir;
      while (currentDir !== distClient && currentDir.startsWith(distClient)) {
        try {
          const files = fs.readdirSync(currentDir);
          if (files.length === 0) {
            fs.rmdirSync(currentDir);
            currentDir = path.dirname(currentDir);
          } else {
            break;
          }
        } catch {
          break;
        }
      }

      const cacheRoot = CACHE_DIR;
      let curCacheDir = cacheDir;
      while (curCacheDir !== cacheRoot && curCacheDir.startsWith(cacheRoot)) {
        try {
          const files = fs.readdirSync(curCacheDir);
          if (files.length === 0) {
            fs.rmdirSync(curCacheDir);
            curCacheDir = path.dirname(curCacheDir);
          } else {
            break;
          }
        } catch {
          break;
        }
      }

      console.log(`🗑️  Deleted orphaned page: ${route}`);
    } catch (error: any) {
      console.error(`❌ Failed to delete ${route}:`, error.message);
    }
  }
}

async function prerender() {
  const startTime = Date.now();
  console.log('🚀 Starting incremental SSG prerendering...\n');
  
  // Initialize build log
  const buildLog: BuildLog = {
    timestamp: new Date().toISOString(),
    totalRoutes: 0,
    skipped: [],
    generated: [],
    deleted: [],
    errors: []
  };
  
  // Load hash manifest for content-based incremental builds
  const hashManifest = loadHashManifest();
  console.log(`📋 Loaded hash manifest with ${Object.keys(hashManifest.hashes).length} entries`);
  
  // Load routes
  const routesPath = path.resolve(process.cwd(), 'static-routes.json');
  if (!fs.existsSync(routesPath)) {
    console.error('❌ static-routes.json not found. Run npm run generate-routes first.');
    process.exit(1);
  }
  
  const routes: string[] = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));
  buildLog.totalRoutes = routes.length;
  console.log(`📍 Found ${routes.length} routes in database`);
  
  // Check cache directory (survives client rebuild)
ensureDir(CACHE_DIR);
let existingPages = new Set<string>();
let forceRegen = false;
try {
  const versionData = fs.existsSync(VERSION_FILE)
    ? JSON.parse(fs.readFileSync(VERSION_FILE, 'utf-8'))
    : null;
  if (!versionData || versionData.version !== CACHE_VERSION) {
    forceRegen = true;
  }
} catch {}

if (forceRegen) {
  console.log('♻️  Cache invalidated (version change) — forcing full prerender');
} else {
  existingPages = findExistingPages(CACHE_DIR);
}
console.log(`📦 Found ${existingPages.size} existing cached pages${forceRegen ? ' (ignored)' : ''}\n`);
  
  // Identify orphaned pages (exist in cache but not in routes)
  const validRoutes = new Set(routes);
  const orphanedRoutes = Array.from(existingPages).filter(page => !validRoutes.has(page));
  
  if (orphanedRoutes.length > 0) {
    console.log(`🔍 Found ${orphanedRoutes.length} orphaned pages to delete:`);
    orphanedRoutes.forEach(route => console.log(`   - ${route}`));
    console.log('');
    deleteOrphanedPages(orphanedRoutes, buildLog);
    console.log('');
  }
  
  // Identify pages to generate (don't exist in cache yet)
  const routesToGenerate = routes.filter(route => !existingPages.has(route));
  const routesToSkip = routes.filter(route => existingPages.has(route));
  
  console.log(`✅ ${routesToSkip.length} pages already exist (skipping)`);
  console.log(`🔨 ${routesToGenerate.length} pages need to be generated\n`);
  
  buildLog.skipped = routesToSkip;
  
  // Copy cached pages to dist
  if (routesToSkip.length > 0) {
    console.log('📋 Copying cached pages to dist...');
    for (const route of routesToSkip) {
      copyCacheToDist(route);
    }
    console.log(`✅ Copied ${routesToSkip.length} cached pages\n`);
  }
  
  if (routesToGenerate.length === 0) {
    console.log('✨ All pages are up to date! No rendering needed.\n');
  } else {
    // Load the base HTML template
    const templatePath = path.resolve(process.cwd(), 'dist/client/index.html');
    if (!fs.existsSync(templatePath)) {
      console.error('❌ dist/client/index.html not found. Run client build first.');
      process.exit(1);
    }
    
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Import the server render function
    const { render } = await import('../dist/server/entry-server.js');
    
    // Render routes in parallel batches for faster generation
    const BATCH_SIZE = 10; // Process 10 pages at a time
    for (let i = 0; i < routesToGenerate.length; i += BATCH_SIZE) {
      const batch = routesToGenerate.slice(i, i + BATCH_SIZE);
      console.log(`🔨 Rendering batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(routesToGenerate.length / BATCH_SIZE)} (${batch.length} pages)...`);
      
      await Promise.all(batch.map(async (route) => {
        try {
          // Update window location for this route to generate correct absolute URLs
          const routeUrl = new URL(route, siteUrl);
          (global as any).window.location = {
            origin: routeUrl.origin,
            href: routeUrl.href,
            pathname: routeUrl.pathname,
            search: routeUrl.search,
            hash: routeUrl.hash,
          } as any;

          // Render the route (this also fetches and validates data)
          const { html, helmet, dehydratedState, data: pageData } = await render(route);
          
          // Generate content hash for incremental builds
          const contentHash = generateContentHash(pageData);
          
          // Check if content changed since last build
          if (!hasContentChanged(route, contentHash, hashManifest) && existingPages.has(route)) {
            buildLog.skipped.push(route);
            return; // Skip unchanged pages
          }
          
          // Validate job data before rendering (if applicable)
          if (pageData?.currentJob) {
            try {
              validateJobForSSG(pageData.currentJob, route);
            } catch (validationError: any) {
              if (validationError instanceof SSGValidationError) {
                console.error(`\n❌❌❌ SSG VALIDATION FAILED ❌❌❌`);
                console.error(`Route: ${route}`);
                console.error(`Field: ${validationError.field}`);
                console.error(`Context: ${validationError.context}`);
                throw validationError;
              }
            }
          }
        
          // Generate debug metadata
          const debugMetadata = {
            route,
            generatedAt: new Date().toISOString(),
            dehydratedStateSize: JSON.stringify(dehydratedState).length,
            queriesCount: dehydratedState.queries?.length || 0,
            buildVersion: process.env.BUILD_VERSION || 'ssg-1.0',
            contentHash: contentHash,
          };
          
          const debugScript = `<script>window.__SSG_DEBUG__=${JSON.stringify(debugMetadata)};</script>`;
          
          // Create React Query dehydrated state injection script
          const dehydratedStateScript = `<script>window.__REACT_QUERY_STATE__=${JSON.stringify(dehydratedState)};</script>`;
          
          // Inject rendered HTML, Helmet tags, dehydrated state, and debug info
          const base = cleanDefaultMeta(template);
          let finalHtml = base
            .replace('<!--app-head-->', (helmet.title || '') + (helmet.meta || '') + (helmet.link || '') + (helmet.script || '') + dehydratedStateScript + debugScript)
            .replace('<!--app-html-->', html);
          
          // Minify HTML for production
          finalHtml = await minifyHTML(finalHtml);
          
          // Update hash manifest
          hashManifest.hashes[route] = contentHash;
          
          // Save to cache first
          saveToCache(route, finalHtml);
          
          // Then copy to dist
          copyCacheToDist(route);
          
          buildLog.generated.push(route);
        
        } catch (error: any) {
          const errorMsg = error?.message || String(error);
          console.error(`❌ Error rendering ${route}:`, errorMsg);
          buildLog.errors.push({ route, error: errorMsg });
          
          // Create a fallback page for errored routes
          try {
            const base = cleanDefaultMeta(template);
            const fallbackHtml = base
              .replace('<!--app-head-->', `<title>${route === '/' ? 'NextJobInfo' : route.replace(/\/.+\//, '').replace(/-/g, ' ')} – NextJobInfo</title>`)
              .replace('<!--app-html-->', '<div>Loading...</div>');
            
            saveToCache(route, fallbackHtml);
            copyCacheToDist(route);
            console.log(`   ⚠️  Created fallback page for ${route}`);
          } catch (fallbackError) {
            console.error(`   ❌ Failed to create fallback page:`, fallbackError);
          }
        }
      }));
    }
  }
  
  // Save hash manifest
  saveHashManifest(hashManifest);
  console.log(`\n💾 Saved hash manifest with ${Object.keys(hashManifest.hashes).length} entries`);
  
  // Save build log
  const logPath = path.resolve(process.cwd(), 'ssg-build.log.json');
  fs.writeFileSync(logPath, JSON.stringify(buildLog, null, 2));
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  // Generate SSG integrity manifest
  const manifest = {
    buildId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    pagesGenerated: buildLog.generated.length,
    pagesSkipped: buildLog.skipped.length,
    pagesDeleted: buildLog.deleted.length,
    totalPages: buildLog.totalRoutes,
    errors: buildLog.errors,
    performance: {
      buildDuration: `${duration}s`,
      avgTimePerPage: buildLog.generated.length > 0 
        ? `${(parseFloat(duration) / buildLog.generated.length).toFixed(3)}s` 
        : '0s',
    },
    version: '1.0.0',
  };
  
  fs.writeFileSync(
    path.resolve(process.cwd(), 'dist/client/ssg-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\n📋 Generated SSG integrity manifest`);
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Build Summary');
  console.log('='.repeat(60));
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📍 Total routes: ${buildLog.totalRoutes}`);
  console.log(`✅ Skipped (already exist): ${buildLog.skipped.length}`);
  console.log(`🔨 Generated (new): ${buildLog.generated.length}`);
  console.log(`🗑️  Deleted (orphaned): ${buildLog.deleted.length}`);
  console.log(`❌ Errors: ${buildLog.errors.length}`);
  
  if (buildLog.errors.length > 0) {
    console.log('\n⚠️  Failed routes:');
    buildLog.errors.forEach(({ route, error }) => {
      console.log(`   - ${route}: ${error.substring(0, 100)}`);
    });
  }
  
  console.log(`\n📝 Build log saved to: ${logPath}`);
  console.log(`📦 Output directory: dist/client/`);
  console.log('='.repeat(60) + '\n');
  
  // Persist cache version
  try {
    ensureDir(CACHE_DIR);
    fs.writeFileSync(VERSION_FILE, JSON.stringify({ version: CACHE_VERSION }));
  } catch {}
  
  // Exit successfully
  process.exit(0);
}

prerender().catch((error) => {
  console.error('❌ Prerendering failed:', error);
  process.exit(1);
});
