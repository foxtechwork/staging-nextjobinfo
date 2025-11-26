# Dev/Production Dual-Mode Fix (2025-11-25)

## Problem

After implementing React Query hydration for True SSG, the app was showing "No jobs found matching your criteria" in **development/preview mode** because:

1. All hooks had `enabled: false` which prevented data fetching
2. The hydration mechanism (`window.__REACT_QUERY_STATE__`) only exists in SSG builds
3. In dev mode (`npm run dev`), there's no SSG build, so no hydrated data
4. Result: Empty QueryClient → No jobs displayed

## Root Cause

The hooks were configured for **production-only** (SSG mode):

```tsx
// ❌ OLD CODE - Only works in production SSG builds
export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => { /* fetch from Supabase */ },
    enabled: false, // ⚠️ Never fetches - assumes SSG hydration
  });
};
```

In development mode:
- No `window.__REACT_QUERY_STATE__` exists
- `enabled: false` prevents fetching
- QueryClient stays empty
- Components show "No jobs found"

## Solution: Dual-Mode Hooks

All hooks now detect whether they're running in SSG/production or dev mode and adjust accordingly:

```tsx
// ✅ NEW CODE - Works in both dev and production
export const useJobs = () => {
  // Check if SSG hydrated data is available
  const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
  
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      // Fetch from Supabase
      const { data, error } = await supabase
        .from('jobs_data')
        .select('*')
        .eq('is_active', true)
        .order('post_date', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !isSSG, // ✅ Fetch in dev mode, use hydrated data in production
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
```

### How It Works

#### Development Mode (`npm run dev`)

```
1. User opens page
2. Hook checks: window.__REACT_QUERY_STATE__ exists? → NO
3. isSSG = false
4. enabled: !isSSG = true → ✅ Fetching ENABLED
5. Hook fetches data from Supabase
6. QueryClient populated with fresh data
7. Components render with jobs
```

#### Production Mode (SSG Build)

```
1. Build time:
   a. fetchPageData() → Get data from Supabase
   b. Populate QueryClient with data
   c. dehydrate(queryClient) → Serialize state
   d. Inject as window.__REACT_QUERY_STATE__
   e. Render to static HTML

2. Runtime (user visits page):
   a. Browser loads static HTML (instant content)
   b. React hydration starts
   c. Hook checks: window.__REACT_QUERY_STATE__ exists? → YES
   d. isSSG = true
   e. enabled: !isSSG = false → ✅ Fetching DISABLED
   f. QueryClient already has data from hydration
   g. Components render with jobs (no API call)
```

## Updated Hooks

### 1. useJobs

```tsx
export const useJobs = (options?: any) => {
  const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
  
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => { /* fetch logic */ },
    enabled: !isSSG, // Fetch only in dev mode
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
};
```

### 2. useJobByPageLink

```tsx
export const useJobByPageLink = (pageLink: string, options?: any) => {
  const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
  
  return useQuery({
    queryKey: ['job-by-page-link', pageLink],
    queryFn: async () => { /* fetch logic */ },
    enabled: !isSSG && !!pageLink, // Fetch in dev + when pageLink exists
    staleTime: Infinity,
    ...options,
  });
};
```

### 3. useJobsStats

```tsx
export const useJobsStats = () => {
  const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
  
  return useQuery({
    queryKey: ['jobs-stats'],
    queryFn: async () => { /* fetch logic */ },
    enabled: !isSSG, // Fetch only in dev mode
  });
};
```

### 4. useJobSearch

```tsx
export const useJobSearch = (searchQuery: string, filters: any) => {
  const { data: allJobs = [] } = useJobs(); // Auto-fetches in dev, uses hydrated data in prod
  
  return useQuery({
    queryKey: ['job-search', searchQuery, filters],
    queryFn: () => applyFilters(allJobs, searchQuery, filters),
    enabled: Array.isArray(allJobs) && allJobs.length > 0, // Enable when base data available
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
```

### 5. useNews

```tsx
export const useNews = () => {
  const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
  
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => { /* fetch logic */ },
    enabled: !isSSG, // Fetch only in dev mode
  });
};
```

### 6. useRelatedJobs

```tsx
export const useRelatedJobs = (currentJob: Job | undefined, limit: number = 3) => {
  const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
  
  return useQuery({
    queryKey: ['related-jobs', currentJob?.job_id],
    queryFn: async () => { /* fetch logic */ },
    enabled: !isSSG && !!currentJob, // Fetch in dev + when currentJob exists
    staleTime: Infinity,
  });
};
```

### 7. useJobStats

```tsx
export function useJobStats() {
  const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
  
  return useQuery({
    queryKey: ['job-stats'],
    queryFn: async () => { /* fetch logic */ },
    enabled: !isSSG, // Fetch only in dev mode
  });
}
```

## Benefits

### ✅ Development Experience

- Works perfectly in `npm run dev`
- Hot reload works as expected
- Full database access for testing
- Real-time data updates

### ✅ Production Performance

- Zero database calls at runtime
- Instant page loads with pre-rendered HTML
- Perfect SEO with full static content
- Scalable to millions of users

### ✅ Best of Both Worlds

| Feature | Development | Production |
|---------|-------------|------------|
| Data Source | Supabase (live) | Pre-rendered (static) |
| Database Calls | ✅ Yes (for dev) | ❌ None |
| Hot Reload | ✅ Works | N/A |
| SEO | ⚠️ Dev only | ✅ Perfect |
| Performance | Good | ⚡ Instant |

## Verification

### Test Development Mode

```bash
npm run dev
```

Expected:
- ✅ Jobs load on homepage
- ✅ Network tab shows Supabase API calls
- ✅ No "No jobs found" errors
- ✅ Hot reload works

### Test Production Mode

```bash
npm run build:ssg
npx serve dist/client
```

Expected:
- ✅ Jobs pre-rendered in HTML (View Page Source)
- ✅ Console shows "✅ React Query hydrated from SSG"
- ✅ Network tab shows ZERO Supabase calls
- ✅ Jobs load instantly on all pages

## Files Modified

1. ✅ `src/hooks/useJobs.ts` - Added isSSG detection to all hooks
2. ✅ `src/hooks/useJobStats.ts` - Added isSSG detection
3. ✅ `src/hooks/useNews.ts` - Added isSSG detection
4. ✅ `src/hooks/useRelatedJobs.ts` - Added isSSG detection
5. ✅ `docs/fixes/DEV-PROD-DUAL-MODE-FIX-2025.md` - This documentation

## Technical Notes

### Why This Approach?

Alternative approaches considered:

1. **Separate dev/prod config files**
   - ❌ Requires maintaining two codebases
   - ❌ Easy to get out of sync
   - ❌ Complex build process

2. **Environment variables**
   - ❌ Vite build-time variables don't work for runtime detection
   - ❌ Can't distinguish between dev server and production build

3. **Check for window.__REACT_QUERY_STATE__** ✅
   - ✅ Works automatically
   - ✅ No configuration needed
   - ✅ One codebase for both modes
   - ✅ Type-safe runtime detection

### Performance Impact

- **Development**: Normal React Query behavior (fetches when needed)
- **Production**: Zero fetching, all data from hydration
- **Bundle size**: No increase (simple runtime check)
- **Build time**: No change

## Troubleshooting

### Still seeing "No jobs found" in dev?

1. Check Supabase connection:
   ```bash
   # Verify .env file has correct credentials
   cat .env | grep SUPABASE
   ```

2. Check console for errors:
   - Open DevTools → Console
   - Look for Supabase connection errors
   - Check for query errors

3. Check network tab:
   - Should see requests to `/rest/v1/jobs_data`
   - If no requests, check `enabled` flag in hooks

### Still seeing "No jobs found" in production?

1. Check hydration:
   ```bash
   # View page source, search for:
   window.__REACT_QUERY_STATE__
   ```

2. Check console:
   ```
   # Should see:
   ✅ React Query hydrated from SSG
   ```

3. Rebuild SSG:
   ```bash
   npm run build:ssg
   ```

## Migration Guide

If you're upgrading from the old hooks:

**Before:**
```tsx
enabled: false, // Never fetch
```

**After:**
```tsx
const isSSG = typeof window !== 'undefined' && (window as any).__REACT_QUERY_STATE__;
enabled: !isSSG, // Fetch in dev, use hydrated data in prod
```

Apply this pattern to ALL data-fetching hooks.

---

**Status**: ✅ Complete  
**Date**: 2025-11-25  
**Impact**: Critical - Fixes dev mode data loading  
**Type**: Enhancement + Bug Fix
