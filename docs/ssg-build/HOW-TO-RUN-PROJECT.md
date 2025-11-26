# How to Run the Project - Complete Guide

## 🎯 Overview

This is a **True Static Site Generation (SSG)** project that pre-generates all pages at build time with zero runtime database calls. The project uses React, Vite, Supabase for data, and a custom SSG system with advanced optimizations.

## 📋 Prerequisites

- **Node.js**: 18+ (verify: `node --version`)
- **npm**: 9+ (verify: `npm --version`)
- **Supabase Account**: For database access

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SITE_URL=https://nextjobinfo.com
```

**Get your Supabase credentials:**
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Go to Settings → API
4. Copy "Project URL" and "anon/public" key

### 3. Development Mode

```bash
npm run dev
```

**What happens:**
- Vite dev server starts at `http://localhost:5173`
- Hot module replacement (HMR) enabled
- Live data fetching from Supabase
- React Query caching active
- Perfect for development and testing

**Features in Dev Mode:**
- ✅ Live database connections
- ✅ Hot reload on file changes
- ✅ React DevTools support
- ✅ Fast refresh
- ⚠️ Not optimized for production

### 4. Production SSG Build

```bash
npm run build:ssg
```

**What happens:**
1. **Generate Routes** (`npm run generate-routes`)
   - Fetches all job page links from Supabase
   - Creates `static-routes.json` with 80+ routes
   - Duration: ~5 seconds

2. **Build Client** (`npm run build:client`)
   - Vite builds optimized client bundle
   - Outputs to `dist/client/`
   - Duration: ~30 seconds

3. **Build Server** (`npm run build:server`)
   - Vite builds SSR entry point
   - Outputs to `dist/server/`
   - Duration: ~10 seconds

4. **Prerender Pages** (`npm run prerender`)
   - Fetches data for each route
   - Validates with Zod schemas
   - Checks content hash (skip if unchanged)
   - Renders React to HTML
   - Injects dehydrated React Query state
   - Minifies HTML output
   - Saves to `dist/client/`
   - Updates hash manifest
   - Duration: ~2s per page (first build), ~0.1s per page (incremental)

5. **Generate Sitemap** (`npm run generate-sitemap`)
   - Creates `dist/client/sitemap.xml`
   - Lists all generated pages
   - Duration: ~2 seconds

**Total Build Time:**
- **First Build**: ~160 seconds (80 pages)
- **Incremental Build**: ~5-20 seconds (only changed pages)

**Output:**
```
dist/client/
├── index.html              # Homepage
├── job/
│   ├── job-1/index.html   # Each job page
│   └── ...
├── state-jobs/
│   ├── ap/index.html      # State pages
│   └── ...
├── category/
│   ├── banking/index.html # Category pages
│   └── ...
├── assets/                 # CSS, JS, images
├── sitemap.xml            # SEO sitemap
└── ssg-manifest.json      # Build metadata
```

### 5. Preview Production Build

```bash
npx serve dist/client
```

**Or:**

```bash
npm run serve:ssg
```

**What happens:**
- Static file server starts at `http://localhost:3000`
- Serves pre-generated HTML files
- **Zero database calls** ✅
- **Instant page loads** ⚡
- Exactly what users will see in production

## 🔍 Verification Steps

### After building, verify True SSG:

1. **Open Browser DevTools**
   - Visit `http://localhost:3000`
   - Open Network tab

2. **Navigate Pages**
   - Click on any job listing
   - Visit state pages
   - Check category pages

3. **Verify Zero DB Calls**
   - Network tab should show:
     - ✅ HTML files (from server)
     - ✅ CSS/JS assets (from server)
     - ❌ **NO** Supabase API calls
     - ❌ **NO** `/rest/v1/` requests

4. **Check Console Logs**
   - Should see: `✅ React Query hydrated from SSG with X queries`
   - Should **NOT** see: `⚠️ [useJobs] Fetching from Supabase`

5. **Open Debug Panel**
   - Press `Ctrl+Shift+D` on any page
   - Debug panel appears showing:
     - Route path
     - Generation timestamp
     - Dehydrated state size
     - Number of cached queries
     - Build version
     - Content hash

6. **View Page Source**
   - Right-click → "View Page Source"
   - Look for `<script>window.__REACT_QUERY_STATE__=...`
   - Should contain all job data as JSON

7. **Check Build Artifacts**
   - Visit `/ssg-manifest.json` → Build metadata
   - Check file sizes → HTML should be minified

## 📊 Build Scripts Reference

| Script | Command | Purpose | Duration |
|--------|---------|---------|----------|
| Dev | `npm run dev` | Development server | N/A |
| Generate Routes | `npm run generate-routes` | Fetch routes from DB | ~5s |
| Build Client | `npm run build:client` | Vite client build | ~30s |
| Build Server | `npm run build:server` | Vite SSR build | ~10s |
| Prerender | `npm run prerender` | Generate HTML pages | ~2s/page |
| Generate Sitemap | `npm run generate-sitemap` | Create sitemap.xml | ~2s |
| **Full SSG Build** | `npm run build:ssg` | Complete SSG pipeline | ~160s |
| Serve SSG | `npm run serve:ssg` | Preview static build | N/A |

## 🎨 SSG Optimizations Applied

### 1. Type-Safe Validation
- **Zod schemas** validate all database data
- Build fails on invalid data
- Prevents broken pages in production

### 2. Incremental Builds
- **Content hashing** tracks changes
- Only regenerates modified pages
- 8x faster on subsequent builds

### 3. HTML Minification
- Removes whitespace and comments
- 30-60% size reduction
- Faster page loads

### 4. Debug Tools
- **SSGDebugPanel** (Ctrl+Shift+D)
- Build metadata tracking
- Performance monitoring

### 5. Hydration Optimization
- React Query state pre-populated
- Zero runtime fetching
- Instant page loads

## 🔧 Troubleshooting

### Issue: "static-routes.json not found"
**Solution:**
```bash
npm run generate-routes
```

### Issue: "dist/client/index.html not found"
**Solution:**
```bash
npm run build:client
```

### Issue: "Cannot find module 'entry-server.js'"
**Solution:**
```bash
npm run build:server
```

### Issue: Pages still making database calls
**Causes:**
1. Serving from dev server (use `npm run serve:ssg`)
2. Not built with SSG (run `npm run build:ssg`)
3. Viewing old cached version (hard refresh)

**Solution:**
```bash
npm run build:ssg
npx serve dist/client
# Hard refresh browser (Ctrl+Shift+R)
```

### Issue: Build fails with validation error
**Example:**
```
❌ SSG VALIDATION FAILED
Route: /job/some-job
Field: Title too short: "ABC"
```

**Solution:**
- Fix the data in Supabase database
- Ensure job titles are at least 10 characters
- Ensure all required fields are present
- Run build again

### Issue: Build is slow on incremental runs
**Solution:**
- Check `dist/ssg-cache/hash-manifest.json` exists
- Verify content hash is being calculated
- Review console logs for "Skipped (content unchanged)"

### Issue: Debug panel not showing
**Solution:**
- Build with SSG: `npm run build:ssg`
- Serve from `dist/client/`: `npx serve dist/client`
- Press `Ctrl+Shift+D` on the page

## 📦 Deployment

### Deploy to Any Static Host

The `dist/client/` folder is a complete static site. Deploy to:

**Netlify:**
```bash
# Drag & drop dist/client/ folder
# Or connect Git repo with build command: npm run build:ssg
```

**Vercel:**
```bash
vercel --prod dist/client/
```

**Cloudflare Pages:**
```bash
# Upload dist/client/ via dashboard
# Build command: npm run build:ssg
# Publish directory: dist/client
```

**GitHub Pages:**
```bash
# Copy dist/client/* to gh-pages branch
# Enable GitHub Pages in repo settings
```

**Any CDN/Host:**
- Upload `dist/client/` contents
- Point domain to uploaded files
- No server-side rendering needed
- Just static file serving

### Automated Builds

**GitHub Actions Example:**

```yaml
name: Build and Deploy SSG

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build SSG
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        run: npm run build:ssg
      
      - name: Deploy to hosting
        run: |
          # Deploy dist/client/ to your hosting
          echo "Deploy completed"
```

## 🎯 Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Full SSG build successful (`npm run build:ssg`)
- [ ] Zero database calls verified (Network tab)
- [ ] Debug panel works (Ctrl+Shift+D)
- [ ] All pages load correctly
- [ ] Sitemap generated
- [ ] SEO meta tags present (view source)
- [ ] Images optimized
- [ ] Cache headers configured (on CDN)

## 📚 Additional Resources

- **SSG Optimization Guide**: `/docs/ssg-build/SSG-OPTIMIZATION-GUIDE-2025.md`
- **SSG Applied Docs**: `/docs/ssg-build/SSG-OPTIMIZATION-APPLIED.md`
- **SSG System README**: `/docs/ssg-build/SSG-SYSTEM-README.md`
- **True SSG Fixes**: `/docs/fixes/TRUE-SSG-ZERO-DB-CALLS-FIX.md`

## 🎉 Expected Results

**After successful build:**
- ✅ 80+ static HTML pages generated
- ✅ Zero runtime database calls
- ✅ Instant page loads (<200ms)
- ✅ Perfect SEO (fully rendered HTML)
- ✅ Unlimited scalability (CDN serving)
- ✅ Offline capable (works without backend)
- ✅ Type-safe validation
- ✅ Incremental builds (8x faster)
- ✅ HTML minification (50% smaller)
- ✅ Debug tools available

## 🔗 Support

For issues or questions:
1. Check troubleshooting section above
2. Review documentation in `/docs/`
3. Check console logs for errors
4. Verify environment variables
5. Test in fresh browser (no cache)
