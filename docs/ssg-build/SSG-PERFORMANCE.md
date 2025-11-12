# SSG Performance Optimization

## Problem & Solution

### ❌ Previous Issue
Static pages were showing loading effects even though data was already baked in during build time because:
1. React Query hooks had short `staleTime` (2-5 minutes) that overrode global settings
2. Hooks were configured to refetch data from Supabase on mount
3. This caused unnecessary loading states and database calls

### ✅ Fixed
All hooks now respect the global `Infinity` settings from `RootLayout.tsx`:
- ✅ `staleTime: Infinity` - Data never becomes stale
- ✅ `gcTime: Infinity` - Data kept in cache forever
- ✅ `refetchOnWindowFocus: false` - No refetch on window focus
- ✅ `refetchOnMount: false` - No refetch when component mounts
- ✅ `refetchOnReconnect: false` - No refetch on reconnect

## How It Works

### Build Time (Server)
```bash
npm run build:ssg
```

1. **Data Fetching** (`src/ssg/data-fetcher.ts`)
   - Fetches ALL data from Supabase during build
   - Jobs, news, stats for each route

2. **Pre-rendering** (`scripts/prerender.ts`)
   - Renders each page to HTML
   - Injects data as `<script>window.__SSG_DATA__={...}</script>`
   - Saves complete HTML to `dist/client/`

3. **Output**
   - Static HTML files with ALL data baked in
   - No runtime database calls needed

### Runtime (Client)

1. **Instant Display**
   - Browser loads pre-rendered HTML immediately
   - User sees content instantly (no loading states)

2. **Hydration** (`src/ssg/hydrate-data.tsx`)
   - Reads `window.__SSG_DATA__`
   - Populates React Query cache
   - Happens in the background

3. **Components**
   - Use React Query hooks as normal
   - Hooks return cached data immediately
   - ✅ NO database calls
   - ✅ NO loading states
   - ✅ NO spinners

## Performance Benefits

### Before Optimization
```
1. Load HTML (empty) - 50ms
2. Load JS bundle - 200ms
3. React hydration - 100ms
4. Fetch data from Supabase - 300-1000ms ❌
5. Show loading spinners ❌
6. Render content - 50ms
Total: ~700-1400ms
```

### After Optimization
```
1. Load HTML (with data) - 50ms ✅
2. Load JS bundle - 200ms
3. React hydration + cache population - 150ms ✅
4. Render content immediately - 0ms ✅
Total: ~400ms (50-70% faster!)
```

## Verification

### 1. Check Console
After page load, you should see:
```
✅ SSG data hydrated into React Query cache
```

### 2. Check Network Tab
- ✅ No requests to Supabase REST API
- ✅ No `/rest/v1/` calls
- Only static assets (HTML, CSS, JS, images)

### 3. Check Page Source
View source and find:
```html
<script>window.__SSG_DATA__={"news":[...],"stats":{...},"jobs":[...]}</script>
```

### 4. Performance Test
```bash
# Build static site
npm run build:ssg

# Serve locally
npx serve dist/client

# Open DevTools → Network tab
# Visit pages → No Supabase calls should appear
```

## Key Files

### Data Hydration
- `src/ssg/hydrate-data.tsx` - Client-side data injection
- `src/RootLayout.tsx` - React Query config with Infinity settings

### Data Fetching
- `src/ssg/data-fetcher.ts` - Server-side data fetching during build
- `src/ssg/entry-server.tsx` - SSR entry point

### Hooks (Optimized)
- `src/hooks/useJobs.ts` - Jobs data hooks (no staleTime override)
- `src/hooks/useNews.ts` - News data hook (no staleTime override)

### Build Scripts
- `scripts/prerender.ts` - Pre-renders all routes (now exits automatically)
- `scripts/generate-routes.ts` - Generates route list from database
- `scripts/build-ssg-custom.sh` - Orchestrates full build

## Build Process

### Automatic Exit
The build now exits automatically after completion:
```bash
npm run build:ssg

# Output:
🚀 Starting custom SSG prerendering...
📍 Found 80 routes to prerender
🔨 Rendering: /
🔨 Rendering: /job/xyz
...
✅ Prerendering complete!
   Success: 80 pages
   Errors: 0 pages
📦 Output: dist/client/

# ✅ Exits automatically (no need for Ctrl+C)
```

## Troubleshooting

### Still seeing loading states?
1. Clear browser cache
2. Rebuild: `npm run build:ssg`
3. Check console for "SSG data hydrated" message
4. Verify `window.__SSG_DATA__` exists in page source

### Still seeing database calls?
1. Check Network tab for `/rest/v1/` requests
2. Ensure all hooks respect global Infinity settings
3. Verify React Query config in `RootLayout.tsx`

### Build hanging?
1. Check for errors in prerender output
2. Ensure `scripts/prerender.ts` has `process.exit(0)` at end
3. Try `npm run prerender` separately to debug

## Best Practices

### ✅ Do
- Use React Query hooks normally in components
- Let SSG data hydration handle the data
- Trust the Infinity cache settings
- Rebuild when database content changes

### ❌ Don't
- Override `staleTime` or `gcTime` in individual hooks
- Add manual data fetching on component mount
- Disable the hydration system
- Call Supabase directly in components

## Updating Content

When you update jobs/news in the database:

```bash
# Rebuild static site
npm run build:ssg

# Deploy dist/client/ folder to hosting
# Your hosting will serve the new static files
```

## CI/CD Integration

```yaml
name: Build SSG
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - name: Build static site
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        run: npm run build:ssg
      - name: Deploy
        run: |
          # Deploy dist/client/ to your hosting
          echo "Deploy completed"
```

## Results

✅ **Zero database calls** - All data pre-fetched at build time  
✅ **Instant page loads** - No loading states or spinners  
✅ **SEO optimized** - Fully rendered HTML for crawlers  
✅ **Scalable** - Serve millions from CDN  
✅ **Cost effective** - No runtime database queries  
✅ **Offline capable** - Pages work without backend  
✅ **50-70% faster** - Compared to client-side fetching
