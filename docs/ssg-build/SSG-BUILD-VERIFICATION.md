# SSG Build Verification Guide

## 🎯 Purpose
This guide helps you verify that your SSG build is working correctly after all PageSpeed optimizations.

---

## ✅ Pre-Build Checklist

Before building, ensure:
- [ ] Database connection is working (`npm run generate-routes` succeeds)
- [ ] All dependencies are installed (`npm install`)
- [ ] No TypeScript errors (`npm run typecheck` if available)
- [ ] Development build works (`npm run dev`)

---

## 🚀 Build Commands

### Full Production Build
```bash
# Clean previous builds (optional but recommended)
rm -rf dist/

# Generate routes from database
npm run generate-routes

# Generate sitemap
npm run generate-sitemap

# Build SSG
npm run build:ssg
```

**Expected Output:**
```
🚀 Starting Custom SSG Build...

📍 Step 1: Generating routes from database...
✅ Routes generated successfully

🗺️  Step 2: Generating sitemap.xml...
✅ Sitemap generated successfully

🏗️  Step 3: Building client...
✅ Client built successfully

🏗️  Step 4: Building server entry...
✅ Server built successfully

🎨 Step 5: Prerendering pages...

============================================================
📊 Build Summary
============================================================
⏱️  Duration: ~200s (for 232 routes)
📍 Total routes: 232
✅ Skipped (already exist): 0
🔨 Generated (new): 232
🗑️  Deleted (orphaned): 0
❌ Errors: 0
============================================================
```

### Fast Test Build
```bash
# Only builds 12 job pages for quick testing
bash scripts/build-ssg-test.sh
```

**Expected Output:**
- Only 12-15 routes generated (homepage + ~12 jobs)
- Build completes in ~30-60 seconds

---

## 🔍 Build Verification Steps

### 1. Check Build Output Structure

```bash
ls -la dist/client/
```

**Expected Structure:**
```
dist/client/
├── index.html                  # Homepage
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── job/
│   ├── job-slug-1/
│   │   └── index.html
│   ├── job-slug-2/
│   │   └── index.html
│   └── ...
├── state/
│   ├── state-name/
│   │   └── index.html
│   └── ...
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── nextjobinfo-logo-*.webp
│   └── ...
├── robots.txt
├── sitemap.xml
└── _headers
```

### 2. Verify SSG Data Injection

Pick any generated HTML file and check for:

```bash
cat dist/client/index.html | grep "__SSG_DATA__"
```

**Expected Output:**
```html
<script>window.__SSG_DATA__={"jobs":[...],"stats":{...},"news":[...]};</script>
```

### 3. Check for React Warnings

```bash
cat ssg-build.log.json | grep -i "error"
```

**Should NOT see:**
- ❌ `fetchPriority` warnings (FIXED)
- ❌ `useLayoutEffect` warnings (Already suppressed)
- ❌ Component rendering errors

### 4. Verify Meta Tags

```bash
cat dist/client/index.html | grep -E "<title>|<meta.*description"
```

**Expected Output:**
```html
<title>Latest Govt Jobs 2025 - NextJobInfo | Sarkari Naukri</title>
<meta name="description" content="Find latest govt jobs 2025...">
<meta name="robots" content="index, follow...">
<meta name="googlebot" content="index, follow">
```

---

## 🌐 Local Testing

### Start Local Server

```bash
npm run serve:ssg
```

**Access at:** http://localhost:3000

### Testing Checklist

#### Homepage (`http://localhost:3000`)
- [ ] Page loads instantly (no loading spinners)
- [ ] Job listings appear immediately
- [ ] Search functionality works
- [ ] Navigation menu opens
- [ ] No console errors (except AdSense)

#### Job Detail Page (`http://localhost:3000/job/any-job-slug`)
- [ ] Page loads with pre-rendered content
- [ ] Job title and details visible immediately
- [ ] Apply button works
- [ ] Related jobs section loads

#### State Jobs Page (`http://localhost:3000/state/state-name`)
- [ ] Pre-rendered job list appears
- [ ] Filter buttons work
- [ ] Pagination works

### Browser DevTools Checks

#### Console Tab
```javascript
// Should see these messages:
[SSG Hydration] ✓ Hydrated jobs data (XXX items)
[SSG Hydration] ✓ Hydrated stats data
[SSG Hydration] ✓ Hydrated news data
```

**No errors except:**
- AdSense slot size warnings (ignorable)

#### Network Tab
- [ ] No Supabase database requests on page load
- [ ] Only asset requests (JS, CSS, images)
- [ ] Fonts load from Google Fonts CDN
- [ ] All resources return 200 OK

#### Application Tab → Local Storage
```javascript
// Check window.__SSG_DATA__
console.log(window.__SSG_DATA__)
```

**Expected:**
```javascript
{
  jobs: [...],
  stats: {...},
  news: [...],
  currentJob: {...} // Only on job detail pages
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Build Fails with TypeScript Error

**Error:**
```
Property 'fetchPriority' does not exist
```

**Solution:** ✅ FIXED in latest code
- Removed `fetchPriority` from Header.tsx

---

### Issue 2: No Data on Pages

**Symptoms:**
- Loading spinners appear
- "No jobs found" messages
- Empty listings

**Debug:**
```bash
# Check if data was injected
cat dist/client/index.html | grep "__SSG_DATA__"
```

**Solutions:**
1. Ensure `src/ssg/hydrate-data.tsx` is working
2. Check console for hydration messages
3. Verify `window.__SSG_DATA__` exists

---

### Issue 3: 404 on Nested Routes

**Symptoms:**
- Homepage works
- `/job/slug` returns 404

**Solution:**
Check that hosting platform is configured for SPA:
- **Netlify:** Uses `_redirects` or `netlify.toml`
- **Vercel:** Uses `vercel.json` rewrites
- **Cloudflare Pages:** Automatic SPA support

---

### Issue 4: Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors for images

**Debug:**
```bash
ls -la dist/client/assets/*.webp
```

**Solution:**
- Images should be in `dist/client/assets/`
- Check that Vite copied assets during build
- Verify image imports in components

---

### Issue 5: Styles Missing

**Symptoms:**
- Unstyled page
- CSS not loading

**Debug:**
```bash
ls -la dist/client/assets/*.css
cat dist/client/index.html | grep "stylesheet"
```

**Solution:**
- Check that CSS is built and linked
- Verify Tailwind config is correct
- Check browser console for CSS load errors

---

## 📊 Performance Testing

### Local Performance Check

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Desktop" mode
4. Click "Analyze page load"

**Expected Scores (Local):**
- Performance: 90-100 (no network latency)
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

### Production Performance Check

After deployment:

```bash
# Using PageSpeed Insights
https://pagespeed.web.dev/
```

**Expected Scores (Production):**
- Performance: 85-95 (network latency + third-party scripts)
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

---

## 🎯 Success Criteria

Your SSG build is successful if:

✅ **Build Completes Without Errors**
- No TypeScript errors
- No React warnings
- All routes generated

✅ **Data Hydration Works**
- `window.__SSG_DATA__` exists
- Console shows hydration messages
- No loading spinners on page load

✅ **Pages Load Instantly**
- Content visible immediately
- No database requests on load
- Pre-rendered HTML served

✅ **SEO is Optimal**
- Meta tags present
- Canonical URLs correct
- Sitemap generated
- No indexing blocks

✅ **Accessibility is Good**
- All buttons have labels
- All links have names
- No contrast issues
- Screen readers work

✅ **Performance is Fast**
- FCP < 2.5s
- LCP < 2.5s
- CLS < 0.1
- TBT < 200ms

---

## 📝 Build Logs

### Check Build Log

```bash
cat ssg-build.log.json
```

**Useful Information:**
- Total routes generated
- Errors encountered
- Skipped routes (cached)
- Duration

### Monitor Build in Real-Time

```bash
# Watch build progress
npm run build:ssg 2>&1 | tee build-output.log
```

---

## 🚀 Deployment Verification

After deploying to production:

### 1. Test Production URL

```bash
curl -I https://your-site.com
```

**Check Headers:**
```
HTTP/2 200
cache-control: public, max-age=0, must-revalidate
content-security-policy: default-src 'self'; script-src...
strict-transport-security: max-age=31536000
x-content-type-options: nosniff
```

### 2. Verify Indexing

```bash
curl https://your-site.com | grep "robots"
```

**Expected:**
```html
<meta name="robots" content="index, follow...">
<meta name="googlebot" content="index, follow">
```

**Should NOT see:**
```html
<meta name="robots" content="noindex">
```

### 3. Test Sample Pages

- [ ] https://your-site.com
- [ ] https://your-site.com/about
- [ ] https://your-site.com/job/sample-job
- [ ] https://your-site.com/state/sample-state

All should return 200 OK and load instantly.

---

## 🎓 Best Practices

### Before Every Build

1. **Pull latest data** - `npm run generate-routes`
2. **Clear cache** - `rm -rf dist/`
3. **Check dependencies** - `npm outdated`
4. **Test locally first** - `npm run dev`

### After Every Build

1. **Test locally** - `npm run serve:ssg`
2. **Check logs** - Review `ssg-build.log.json`
3. **Verify data** - Check `window.__SSG_DATA__`
4. **Test performance** - Run Lighthouse

### Before Deployment

1. **Full build** - `npm run build:ssg`
2. **Zero errors** - Check build logs
3. **Test all pages** - Manual testing
4. **Run PageSpeed** - After deployment

---

## 📚 Resources

- [SSG System README](./SSG-SYSTEM-README.md)
- [PageSpeed Fixes](./PAGESPEED-FIX-DOCUMENTATION.md)
- [Performance Guide](./PAGESPEED-OPTIMIZATION-GUIDE.md)
- [SSG Performance](./SSG-PERFORMANCE.md)

---

**Last Updated**: 2025-11-11  
**Version**: 1.0.0  
**Status**: ✅ Ready for production
