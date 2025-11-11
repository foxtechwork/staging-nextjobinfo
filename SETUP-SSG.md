# SSG Setup Instructions

## Quick Setup

Follow these steps to enable Static Site Generation (SSG) for your project:

### 1. Add NPM Scripts

You need to manually add these scripts to your `package.json` file in the `"scripts"` section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    
    // ADD THESE NEW SCRIPTS:
    "generate-routes": "tsx scripts/generate-routes.ts",
    "build:ssg": "npm run generate-routes && vite-react-ssg build",
    "ssg": "npm run generate-routes && vite-react-ssg build && npm run preview"
  }
}
```

### 2. Verify Environment Variables

Ensure your `.env` file has the required Supabase credentials:

```env
VITE_SUPABASE_URL=https://bgshoswlkpxbmemzwwip.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

### 3. Generate Static Pages

Run the complete SSG process:

```bash
# Generate routes from database
npm run generate-routes

# Build static site
npm run build:ssg

# Preview the static site (optional)
npm run preview
```

## What Each Script Does

### `npm run generate-routes`
- Connects to Supabase database
- Fetches all active job listings
- Creates routes for all states (38 states/UTs)
- Creates routes for all categories (10 categories)
- Generates `static-routes.json` with all routes

### `npm run build:ssg`
- Runs `generate-routes` first
- Pre-renders every route with actual data from database
- Creates static HTML files in `dist/` directory
- Optimizes and minifies all assets

### `npm run ssg` (All-in-one)
- Generates routes
- Builds static site
- Starts preview server automatically

## Output

After running `npm run build:ssg`, you'll get:

```
dist/
├── index.html                      # Homepage
├── about.html                      # Static pages
├── contact.html
├── state-jobs/
│   ├── ap.html                    # Andhra Pradesh jobs
│   ├── dl.html                    # Delhi jobs
│   └── ...                        # All 38 states
├── category/
│   ├── banking.html               # Banking jobs
│   ├── railway.html               # Railway jobs
│   └── ...                        # All 10 categories
├── job/
│   ├── upsc-civil-services.html   # Individual job pages
│   ├── ssc-cgl-2024.html
│   └── ...                        # All active jobs
└── assets/                        # CSS, JS, images
```

## Deployment

Deploy the `dist/` folder to any static hosting:

### Option 1: Netlify
```bash
netlify deploy --prod --dir=dist
```

### Option 2: Vercel
```bash
vercel --prod
```

### Option 3: AWS S3
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

### Option 4: Any Web Server
Simply upload the `dist/` folder contents to your web server root.

## Updating Content

When new jobs are added to the database:

```bash
# Regenerate routes and rebuild
npm run build:ssg

# Deploy new dist/ folder
```

## Automation

Set up automatic daily builds with GitHub Actions:

Create `.github/workflows/ssg-build.yml`:

```yaml
name: Generate Static Site

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
      
      - name: Build static site
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        run: npm run build:ssg
      
      - name: Deploy to hosting
        # Add your deployment command here
        run: echo "Deploy dist/ folder"
```

## Troubleshooting

### "Cannot find module 'tsx'"
```bash
npm install tsx --save
```

### "static-routes.json not found"
```bash
npm run generate-routes
```

### "Database connection error"
- Check `.env` file exists and has correct credentials
- Verify Supabase project is accessible
- Test connection: `npm run generate-routes`

### Build errors
1. Ensure all dependencies are installed: `npm install`
2. Check if routes are generated: `ls -la static-routes.json`
3. Verify database has data: Check Supabase dashboard

## Benefits

✅ **SEO**: Every page is pre-rendered HTML  
✅ **Speed**: Instant page loads with static files  
✅ **Cost**: Lower hosting costs on CDN  
✅ **Scale**: Handles millions of visitors  
✅ **Reliability**: No runtime database queries  

## Support

For detailed documentation, see `SSG-README.md`
