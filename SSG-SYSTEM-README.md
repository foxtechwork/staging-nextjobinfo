# Static Site Generation (SSG) System

## Overview

This project uses a custom SSG system that pre-renders all pages with data from the Supabase database. Once generated, the static pages contain all the data and **DO NOT** make any database calls when served.

## How It Works

### 1. Data Fetching During Build

When you run `npm run build:ssg`, the system:

1. **Fetches routes** from the database (`scripts/generate-routes.ts`)
2. **Builds the client** bundle (`vite build --outDir dist/client`)
3. **Builds the server** entry for SSR (`vite build --ssr`)
4. **Pre-renders each page** with data (`scripts/prerender.ts`)

### 2. Data Injection

For each route, the system:

- Calls `fetchPageData()` from `src/ssg/data-fetcher.ts`
- Fetches all necessary data (jobs, news, stats)
- Injects data into HTML as `<script>window.__SSG_DATA__={...}</script>`
- Renders React components to HTML string
- Saves complete HTML file to `dist/client/`

### 3. Client-Side Hydration

When a user visits a static page:

1. Browser loads the pre-rendered HTML (instant display)
2. React hydrates the page
3. `HydrateData` component reads `window.__SSG_DATA__`
4. Populates React Query cache with pre-fetched data
5. **No database calls are made** - all data comes from cache

## React Query Configuration

The system configures React Query to prevent refetching:

```typescript
{
  staleTime: Infinity,        // Never mark data as stale
  gcTime: Infinity,           // Keep data forever
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false
}
```

## Building Static Site

```bash
# Full build process
npm run build:ssg

# Or step by step:
npm run generate-routes  # 1. Generate route list
npm run build:client     # 2. Build client bundle
npm run build:server     # 3. Build SSR entry
npm run prerender        # 4. Pre-render all pages
```

## Output

```
dist/client/
├── index.html                    # Homepage with baked-in data
├── job/
│   ├── job-1/index.html         # Each job page with its data
│   ├── job-2/index.html
│   └── ...
├── state-jobs/
│   ├── ap/index.html            # State pages with filtered data
│   └── ...
├── category/
│   ├── banking/index.html       # Category pages with filtered data
│   └── ...
└── assets/                       # CSS, JS, images
```

## Key Files

### SSG Build System

- `scripts/generate-routes.ts` - Fetches all routes from database
- `scripts/prerender.ts` - Pre-renders each route to HTML
- `scripts/build-ssg-custom.sh` - Orchestrates the build process

### Data Fetching

- `src/ssg/data-fetcher.ts` - Fetches data for each route during build
- `src/ssg/entry-server.tsx` - Server-side rendering entry point
- `src/ssg/hydrate-data.tsx` - Client-side data hydration

### Configuration

- `src/RootLayout.tsx` - Wraps app with HydrateData, configures React Query
- `vite.config.ts` - Vite configuration for SSR build

## Verification

To verify the static pages don't make database calls:

1. **Build the site**: `npm run build:ssg`
2. **Serve locally**: `npx serve dist/client`
3. **Open browser DevTools** → Network tab
4. **Visit any page** → No Supabase API calls should appear
5. **Check Console** → Should see "✅ SSG data hydrated into React Query cache"

## Updating Content

When you add/update jobs in the database:

```bash
npm run build:ssg  # Rebuild static site
# Deploy dist/client/ folder
```

## Benefits

✅ **Zero Database Calls** - All data pre-fetched and baked in  
✅ **Instant Page Loads** - No loading states or spinners  
✅ **SEO Optimized** - Fully rendered HTML for search engines  
✅ **Scalable** - Can handle millions of visitors on CDN  
✅ **Cost Effective** - No runtime database queries  
✅ **Offline Capable** - Pages work without backend  

## Troubleshooting

### Error: "static-routes.json not found"
```bash
npm run generate-routes
```

### Error: "dist/client/index.html not found"
```bash
npm run build:client
```

### Error: "Cannot find module 'entry-server.js'"
```bash
npm run build:server
```

### Pages still making database calls
- Check browser console for "SSG data hydrated" message
- Verify `window.__SSG_DATA__` exists in page source
- Ensure React Query config has `staleTime: Infinity`

### Build fails on specific pages
- Check error logs in prerender output
- Fallback pages are created automatically for failed routes
- Review component code for SSR compatibility issues

## CI/CD Integration

Example GitHub Actions workflow:

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
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build static site
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        run: npm run build:ssg
      
      - name: Deploy to hosting
        run: |
          # Deploy dist/client/ to your hosting
          echo "Deploy completed"
```

## Notes

- The system uses `maybeSingle()` for job queries to handle missing data gracefully
- Error pages get fallback HTML to ensure 100% page generation
- All React Query hooks work as normal - they just use cached data instead of fetching
- The UI and user experience remain unchanged - only the data source changes
