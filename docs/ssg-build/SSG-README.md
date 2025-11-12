# Static Site Generation (SSG) Setup

This project supports Static Site Generation (SSG) to pre-render all pages at build time for improved performance and SEO.

## Overview

The SSG implementation uses `vite-react-ssg` to generate static HTML files for all routes, including dynamic routes that fetch data from the Supabase database.

## How It Works

1. **Route Generation**: The `scripts/generate-routes.ts` script fetches all dynamic data from the database (jobs, states, categories) and generates a list of routes to pre-render.

2. **Static Build**: The build process uses `vite-react-ssg` to render each route on the server and generate static HTML files.

3. **Result**: Every page becomes a static HTML file that can be served directly without requiring JavaScript to render the initial content.

## Setup & Usage

### 1. Generate Routes

Before building, generate the list of routes by running:

```bash
npm run generate-routes
```

This command:
- Connects to your Supabase database
- Fetches all active job listings
- Creates routes for all states and categories
- Saves the route list to `static-routes.json`

**Output**: A JSON file with all routes (e.g., `["/", "/job/some-job", "/state-jobs/delhi", ...]`)

### 2. Build Static Site

After generating routes, build the static site:

```bash
npm run build:ssg
```

This command:
- Reads the generated routes from `static-routes.json`
- Pre-renders each route by fetching data from Supabase
- Generates static HTML files in the `dist/` directory
- Optimizes and minifies all assets

**Output**: A `dist/` folder with static HTML files for every route

### 3. Preview Static Site

Test the static build locally:

```bash
npm run preview
```

Visit `http://localhost:4173` to see the static site in action.

## Complete Workflow

```bash
# Step 1: Ensure environment variables are set
# Make sure .env has VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY

# Step 2: Generate routes from database
npm run generate-routes

# Step 3: Build static site
npm run build:ssg

# Step 4: Preview (optional)
npm run preview

# Step 5: Deploy dist/ folder to your hosting service
```

## Routes Generated

The SSG process generates static pages for:

### Static Routes
- Home: `/`
- About: `/about`
- Contact: `/contact`
- Privacy: `/privacy`
- Terms: `/terms`
- Disclaimer: `/disclaimer`
- Support: `/support`
- And all other static pages

### Dynamic Routes

#### State Routes
Generated for all Indian states and union territories:
- `/state-jobs/ap` (Andhra Pradesh)
- `/state-jobs/dl` (Delhi)
- `/state-jobs/mh` (Maharashtra)
- ... (38 states/UTs total)

#### Category Routes
Generated for job categories:
- `/category/banking`
- `/category/railway`
- `/category/ssc`
- `/category/upsc`
- ... (10 categories)

#### Job Detail Routes
Generated for every active job in the database:
- `/job/upsc-civil-services-2024`
- `/job/ssc-cgl-2024`
- ... (fetched from database)

## Configuration

### Route Generation Script

Edit `scripts/generate-routes.ts` to customize:
- State codes and names
- Category mappings
- Route generation logic
- Database queries

### SSG Configuration

Edit `vite.config.ts` to customize:
- Script loading strategy
- HTML formatting/minification
- Critical CSS inlining
- Pre/post rendering hooks

### SSG Entry Point

Edit `ssg-main.tsx` to customize:
- App wrappers and providers
- React Query configuration
- Initial state handling

## Environment Variables

Ensure these variables are set in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

**Important**: The generate-routes script needs access to these variables to connect to Supabase.

## Deployment

After building, deploy the `dist/` folder to any static hosting service:

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
# Push dist/ folder to gh-pages branch
npm run deploy
```

### Any Static Host
Simply upload the contents of `dist/` folder to your web server.

## Benefits of SSG

1. **Performance**: Pages load instantly with pre-rendered HTML
2. **SEO**: Search engines can crawl and index all content
3. **Cost**: Lower hosting costs with static files
4. **CDN**: Easy to distribute via CDN for global performance
5. **Reliability**: No database queries at runtime

## Updating Content

When job listings or content changes:

1. Re-generate routes: `npm run generate-routes`
2. Re-build site: `npm run build:ssg`
3. Re-deploy: Upload new `dist/` folder

**Tip**: Automate this process with CI/CD (e.g., GitHub Actions, Netlify build hooks)

## CI/CD Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy SSG

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:  # Manual trigger

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Generate routes
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        run: npm run generate-routes
        
      - name: Build SSG
        run: npm run build:ssg
        
      - name: Deploy
        # Add your deployment step here
        run: echo "Deploy dist/ folder to hosting"
```

## Troubleshooting

### Routes not generated
- Check if `.env` file exists with correct Supabase credentials
- Verify database connection: `npm run generate-routes`
- Check console output for errors

### Build fails
- Ensure `static-routes.json` exists (run `npm run generate-routes` first)
- Check if all dependencies are installed: `npm install`
- Verify Supabase is accessible during build

### Pages show old data
- Re-generate routes to fetch latest data
- Rebuild the site
- Clear browser cache after deployment

### 404 errors on dynamic routes
- Ensure route generation included all required routes
- Check hosting service configuration (some hosts need rewrites configured)
- Verify `static-routes.json` contains the missing routes

## Development vs Production

- **Development** (`npm run dev`): Uses regular Vite dev server with client-side routing
- **Production** (`npm run build:ssg`): Generates static HTML for all routes

Both modes use the same React components and logic, just different rendering strategies.
