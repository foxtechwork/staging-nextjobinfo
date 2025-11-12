# Custom SSG Build Instructions

## Quick Setup

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build:ssg": "bash scripts/build-ssg-custom.sh",
    "build:client": "vite build --outDir dist/client",
    "build:server": "vite build --ssr src/ssg/entry-server.tsx --outDir dist/server",
    "prerender": "tsx scripts/prerender.ts"
  }
}
```

## Build Process

### Full Build (Recommended)
```bash
npm run build:ssg
```

This runs all steps automatically:
1. Generates routes from database
2. Builds client bundle
3. Builds server entry for SSR
4. Prerenders all routes to static HTML
5. Outputs to `dist/client/`

### Manual Step-by-Step
```bash
# 1. Generate routes
npm run generate-routes

# 2. Build client
npm run build:client

# 3. Build server
npm run build:server

# 4. Prerender
npm run prerender
```

## What This Does

- **No vite-react-ssg dependency**: Uses custom Vite SSR + prerendering
- **Proper Helmet support**: Injects SEO meta tags during SSR
- **No window errors**: Mocks minimal globals for Node.js environment
- **Nested HTML files**: Creates proper directory structure (e.g., `/job/abc/index.html`)
- **Full React Router**: Uses StaticRouter for server-side routing

## Output Structure

```
dist/client/
├── index.html (homepage)
├── about/
│   └── index.html
├── job/
│   ├── job-1/
│   │   └── index.html
│   └── job-2/
│       └── index.html
└── ... (all routes)
```

## Preview

```bash
npx serve dist/client
```

## Deploy

Upload the `dist/client/` folder to:
- Netlify
- Vercel
- Cloudflare Pages
- Any static hosting

## Troubleshooting

### "static-routes.json not found"
Run `npm run generate-routes` first

### "Cannot find module 'entry-server.js'"
Run `npm run build:server` before `npm run prerender`

### Missing routes
Check `static-routes.json` - regenerate if needed

### SEO tags not showing
Ensure Helmet is used in page components and HelmetProvider wraps the app
