# Next Job Info - Government Job Portal

A high-performance job portal aggregating government job notifications from across India.

## 🚀 Quick Links

- **[📚 Documentation Hub](docs/README.md)** - Complete documentation index
- **[Quick Start SSG](docs/ssg-build/QUICK-START-SSG.md)** - Generate static pages in 3 steps
- **[SEO & Performance](docs/seo-performance/)** - PageSpeed optimization & SEO fixes
- **[Deployment Guide](docs/deployment/CLOUDFLARE-DEPLOYMENT.md)** - Deploy to production

## ⚡ Static Site Generation (NEW!)

This project now supports **Static Site Generation** to create lightning-fast, SEO-optimized pages.

### Generate 500+ Static Pages in 3 Steps:

1. **Add scripts to package.json**:
```json
"generate-routes": "tsx scripts/generate-routes.ts",
"build:ssg": "npm run generate-routes && vite-ssg build"
```

2. **Build**:
```bash
npm run build:ssg
```

3. **Deploy** the `dist/` folder to any hosting

**Result**: ⚡ 10x faster loading, 🔍 perfect SEO, 💰 lower costs

See [QUICK-START-SSG.md](docs/ssg-build/QUICK-START-SSG.md) for details.

---

## Project info

**URL**: https://lovable.dev/projects/f71c42f3-ab3e-494c-8bd7-56ffc9c5732e

## Technologies

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Routing**: React Router v6
- **State**: TanStack Query (React Query)
- **SEO**: React Helmet Async
- **SSG**: vite-react-ssg

## Features

- 📊 Latest government job notifications
- 🗺️ State-wise job listings (38 states/UTs)
- 📂 Category-based filtering (10 categories)
- 🔍 Advanced job search
- 📧 Email/WhatsApp subscriptions
- 📱 Mobile-responsive design
- ⚡ Static site generation support
- 🎯 SEO optimized

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f71c42f3-ab3e-494c-8bd7-56ffc9c5732e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Development

### Run Development Server

```bash
npm run dev
```
Open http://localhost:8080

### Build for Production

**Option 1: Static Site Generation (Recommended)**
```bash
npm run build:ssg
```
Generates static HTML for all pages. See [SSG docs](docs/ssg-build/QUICK-START-SSG.md).

**Option 2: Standard SPA Build**
```bash
npm run build
```
Creates a single-page application build.

## Deployment

### Option 1: Static Deployment (Recommended for Production)

Generate static HTML pages and deploy to any hosting:

```bash
npm run build:ssg
```

Then deploy `dist/` folder to:
- **Netlify**: Drag & drop or `netlify deploy --prod --dir=dist`
- **Vercel**: `vercel --prod`
- **Cloudflare Pages**: Connect Git repo
- **AWS S3**: `aws s3 sync dist/ s3://bucket`
- **Any CDN/hosting**: Upload dist/ contents

**Benefits**: ⚡ 10x faster, 🔍 perfect SEO, 💰 lower costs

See [Quick Start SSG Guide](docs/ssg-build/QUICK-START-SSG.md) for details.

### Option 2: Lovable Deployment

Simply open [Lovable](https://lovable.dev/projects/f71c42f3-ab3e-494c-8bd7-56ffc9c5732e) and click on Share → Publish.

**Note**: Uses client-side rendering. For best SEO, use static deployment above.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
