#!/bin/bash

echo "🚀 Starting Custom SSG Build..."
echo ""

# Step 1: Fetch all data from database and cache locally
echo "💾 Step 1: Fetching data from database (ONE-TIME CALL)..."
npx tsx scripts/fetch-data.ts

if [ ! -f "ssg-data.json" ]; then
    echo "❌ Error: ssg-data.json not generated"
    exit 1
fi

echo "✅ Data cached successfully"
echo ""

# Step 2: Generate routes from cached data
echo "📍 Step 2: Generating routes from cached data..."
npx tsx scripts/generate-routes.ts

if [ ! -f "static-routes.json" ]; then
    echo "❌ Error: static-routes.json not generated"
    exit 1
fi

echo "✅ Routes generated successfully"
echo ""

# Step 3: Generate sitemap
echo "🗺️  Step 3: Generating sitemap.xml..."
npx tsx scripts/generate-sitemap.ts

if [ ! -f "public/sitemap.xml" ]; then
    echo "❌ Error: sitemap.xml not generated"
    exit 1
fi

echo "✅ Sitemap generated successfully"
echo ""

# Step 4: Build client
echo "🏗️  Step 4: Building client..."
vite build --outDir dist/client

if [ $? -ne 0 ]; then
    echo "❌ Client build failed"
    exit 1
fi

echo "✅ Client built successfully"
echo ""

# Step 5: Build server
echo "🏗️  Step 5: Building server entry..."
vite build --ssr src/ssg/entry-server.tsx --outDir dist/server

if [ $? -ne 0 ]; then
    echo "❌ Server build failed"
    exit 1
fi

echo "✅ Server built successfully"
echo ""

# Step 6: Prerender (uses cached data, NO database calls!)
echo "🎨 Step 6: Prerendering pages from cached data..."
npx tsx scripts/prerender.ts

if [ $? -ne 0 ]; then
    echo "❌ Prerendering failed"
    exit 1
fi

echo "✅ Pages prerendered successfully"
echo ""

# Step 7: Generate final sitemap from SSG build log
echo "🗺️  Step 7: Generating final sitemap from SSG build log..."
npm run generate-sitemap

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Static site generated successfully!"
    echo "📦 Output directory: dist/client/"
    echo "📍 Sitemap: dist/client/sitemap.xml"
    echo ""
    echo "Next steps:"
    echo "  1. Preview: npx serve dist/client"
    echo "  2. Deploy: Upload dist/client/ folder to your hosting service"
else
    echo "❌ Sitemap generation failed"
    exit 1
fi
