# Cloudflare Pages Deployment Guide

## Issue: Lockfile Frozen Error

If you see this error during deployment:
```
error: lockfile had changes, but lockfile is frozen
note: try re-running without --frozen-lockfile and commit the updated lockfile
```

**Root Cause:** Cloudflare auto-detects Bun because `bun.lockb` exists, but the lockfile is out of sync with `package.json`.

**Solution:** This project now includes `wrangler.toml` and `.npmrc` files that force npm usage, bypassing the Bun lockfile issue completely.

### Quick Fix (Already Done)

The project now has:
1. ✅ `wrangler.toml` - Forces npm usage
2. ✅ `.npmrc` - Configures npm for Cloudflare

**Just commit and push these files, then redeploy on Cloudflare!**

---

## Deployment Steps

### Step 1: Build the Static Site Locally First

Before deploying to Cloudflare, generate the static site:

```bash
# Install dependencies
npm install

# Generate static site
npm run build:ssg
```

This creates the `dist/client/` folder with all pre-rendered HTML pages.

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub/GitLab repository
4. Select your repository: `foxtechwork/NEW_WEBSITE`

### Step 3: Configure Build Settings

**Important:** With `wrangler.toml` in place, Cloudflare will use those settings automatically.

If you need to override settings manually:

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | Leave empty (wrangler.toml handles it) |
| **Build output directory** | `dist/client` |
| **Root directory** | `/` |

**Note:** The `wrangler.toml` file automatically configures the build process.

### Step 4: Set Environment Variables ⚠️ CRITICAL

Go to Cloudflare Pages → Settings → Environment variables and add these **EXACT** variable names:

**For BOTH Production and Preview environments:**

| Variable Name | Example Value | Notes |
|---------------|---------------|-------|
| `NODE_VERSION` | `20` | Forces npm usage |
| `PACKAGE_MANAGER` | `npm` | Ensures npm, not Bun |
| `VITE_SUPABASE_URL` | `https://uertiqcxcbsqkzymguzy.supabase.co` | Your Supabase URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | ⚠️ NOT "ANON_KEY" |
| `VITE_SUPABASE_PROJECT_ID` | `uertiqcxcbsqkzymguzy` | Your project ID |

**⚠️ CRITICAL NOTES:**
- Variable name MUST be `VITE_SUPABASE_PUBLISHABLE_KEY` (NOT `VITE_SUPABASE_ANON_KEY`)
- The "publishable key" is the same as your "anon key" - just use the correct variable name
- Set these for BOTH "Production" AND "Preview" environments
- Double-check spelling - one typo will break the build

### Step 5: Deploy

Click **Save and Deploy**. Cloudflare will:
1. Clone your repository
2. Run `npm install` (not `bun install`)
3. Run `npm run build:ssg`
4. Generate ~500+ static HTML pages
5. Deploy to CDN

---

## Build Configuration File (Optional)

You can also create a `wrangler.toml` file in your project root for more control:

```toml
name = "nextjobinfo"
compatibility_date = "2024-01-01"

# Cloudflare Pages configuration
pages_build_output_dir = "dist/client"
```

---

## Troubleshooting

### Problem: "Lockfile frozen" error persists

**Solution 1:** Force npm usage
1. Go to Cloudflare Pages → Settings → Environment variables
2. Add `NODE_VERSION = 18`
3. Redeploy

**Solution 2:** Update lockfile locally
```bash
# Delete old lockfile
rm bun.lockb

# Regenerate with bun
bun install

# Commit changes
git add bun.lockb
git commit -m "Update bun lockfile"
git push


# Edit wrangler.toml to remove the [build] section
git add wrangler.toml
git commit -m "Fix: remove unsupported [build] section from wrangler.toml"
git push

```

### Problem: "tsx: command not found"

**Solution:** Ensure `tsx` is installed as a dependency (it is in your project).

### Problem: "Supabase connection failed during build"

**Solution:** Add Supabase environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Problem: Pages are blank or missing

**Solution:** 
1. Check if `static-routes.json` was generated
2. Verify `dist/client/` contains HTML files
3. Run locally: `npm run build:ssg` then check `dist/client/`

### Problem: Build succeeds but site shows errors

**Solution:** Check browser console for:
- Missing environment variables
- CORS errors (check Supabase CORS settings)
- CSP header issues (already configured in `public/_headers`)

---

## Post-Deployment Checklist

✅ Site loads at your Cloudflare domain  
✅ All pages render correctly (home, state pages, job details)  
✅ Images load properly  
✅ Fonts load from Google Fonts  
✅ No console errors in browser DevTools  
✅ SEO meta tags appear in page source (View Page Source)  
✅ Sitemap accessible at `/sitemap.xml`  
✅ Robots.txt accessible at `/robots.txt`  

---

## Performance Optimization

Cloudflare Pages automatically provides:
- ✅ Global CDN distribution
- ✅ HTTP/2 and HTTP/3 support
- ✅ Brotli compression
- ✅ DDoS protection
- ✅ Free SSL certificate

Additional optimizations already implemented:
- ✅ Static HTML pre-rendering (SSG)
- ✅ Image lazy loading
- ✅ Code splitting
- ✅ Cache headers configured
- ✅ Font preloading

Expected performance:
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Lighthouse Score:** 85-95+

---

## Custom Domain Setup

1. Go to Cloudflare Pages → Custom domains
2. Add your domain: `nextjobinfo.com`
3. Update DNS records:
   ```
   CNAME  @  your-project.pages.dev
   CNAME  www  your-project.pages.dev
   ```
4. Wait 5-10 minutes for DNS propagation

---

## Automatic Rebuilds

### Option 1: Daily Builds with GitHub Actions

Create `.github/workflows/daily-rebuild.yml`:

```yaml
name: Daily SSG Rebuild

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
  workflow_dispatch:  # Manual trigger

jobs:
  trigger-rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Cloudflare Pages Deploy
        run: |
          curl -X POST \
            https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/${{ secrets.CLOUDFLARE_DEPLOY_HOOK }}
```

Add `CLOUDFLARE_DEPLOY_HOOK` to GitHub Secrets (get it from Cloudflare Pages → Settings → Build hooks).

### Option 2: Webhook on Database Changes

Set up a Supabase webhook to trigger rebuilds when jobs are added/updated.

---

## Monitoring

### Analytics

Cloudflare provides free analytics:
- Go to Cloudflare Pages → Analytics
- View page views, bandwidth, requests

### Error Tracking

Check build logs:
- Go to Cloudflare Pages → Deployments
- Click on any deployment to see logs

### Uptime Monitoring

Use free services:
- [UptimeRobot](https://uptimerobot.com/)
- [StatusCake](https://www.statuscake.com/)
- Cloudflare Workers (custom monitoring)

---

## Rollback

If a deployment fails:

1. Go to Cloudflare Pages → Deployments
2. Find the last working deployment
3. Click **︙** (three dots) → **Rollback to this deployment**

---

## Cost

Cloudflare Pages is **FREE** for:
- Unlimited requests
- Unlimited bandwidth
- 500 builds/month
- 1 build at a time

Perfect for static job portals! 🎉

---

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Build Troubleshooting:** https://developers.cloudflare.com/pages/platform/build-configuration/
- **Community:** https://community.cloudflare.com/

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Generate static site
npm run build:ssg

# Preview static site locally
npx serve dist/client

# Test production build locally
npm run build:ssg && npx serve dist/client
```

---

## Summary

**Before deploying:**
1. ✅ Set `NODE_VERSION=18` in Cloudflare environment variables
2. ✅ Set build command: `npm run build:ssg`
3. ✅ Set output directory: `dist/client`
4. ✅ Add Supabase environment variables

**This forces Cloudflare to use npm instead of Bun, avoiding the lockfile error.**

Your site will be deployed to: `https://your-project.pages.dev` and will load in under 1 second! 🚀
