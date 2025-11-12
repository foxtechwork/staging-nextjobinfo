# Quick Start: Static Site Generation

## 🚀 Generate Static Pages in 3 Steps

### Step 1: Add Scripts to package.json

Open `package.json` and add these two lines to the `"scripts"` section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    // ... existing scripts ...
    
    // ADD THESE:
    "generate-routes": "tsx scripts/generate-routes.ts",
    "build:ssg": "npm run generate-routes && vite-react-ssg build"
  }
}
```

### Step 2: Run the Command

```bash
npm run build:ssg
```

This will:
1. ✅ Connect to your Supabase database
2. ✅ Fetch all jobs, states, and categories
3. ✅ Generate ~500+ static HTML pages
4. ✅ Create optimized `dist/` folder

### Step 3: Deploy

Upload the `dist/` folder to any hosting service:

**Netlify:**
```bash
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
vercel --prod
```

**Or drag & drop** the `dist/` folder to:
- Netlify Drop
- Vercel
- Cloudflare Pages
- Any web hosting

## 📊 What You Get

After running `npm run build:ssg`:

- ✅ **~500+ static HTML pages** (not a SPA!)
- ✅ **Homepage** with all jobs pre-rendered
- ✅ **38 State pages** (Delhi, Mumbai, Karnataka, etc.)
- ✅ **10 Category pages** (Banking, Railway, SSC, etc.)
- ✅ **Individual job pages** for every active job
- ✅ **Perfect SEO** - search engines can crawl everything
- ✅ **Lightning fast** - no JavaScript needed for initial render

## 🔄 Updating Content

When new jobs are added to the database:

```bash
npm run build:ssg    # Regenerate pages
# Then redeploy dist/ folder
```

## 🤖 Automate with CI/CD

Set up automatic daily builds:

1. Create `.github/workflows/ssg.yml`:

```yaml
name: Daily SSG Build

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
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
      - run: npm run build:ssg
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
      # Add deployment step here
```

2. Add secrets to GitHub:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

3. Done! Site rebuilds daily with fresh job data

## ❓ Troubleshooting

**"Cannot find module 'tsx'"**
```bash
npm install
```

**"Database connection error"**
- Check `.env` file exists
- Verify Supabase credentials are correct

**"No routes generated"**
- Check if database has data
- Run `npm run generate-routes` separately to see errors

## 📚 More Info

- **Full docs**: See `SSG-README.md`
- **Setup guide**: See `SETUP-SSG.md`
- **Main docs**: See `DOCUMENTATION.md`

## 💡 Why SSG?

| Feature | SPA (Current) | SSG (Recommended) |
|---------|---------------|-------------------|
| Initial Load | 2-3s | <0.5s |
| SEO | Good | Perfect |
| Hosting Cost | Medium | Very Low |
| Scalability | Good | Unlimited |
| Search Indexing | Delayed | Instant |

**Result:** Better SEO, faster loading, lower costs, better UX!
