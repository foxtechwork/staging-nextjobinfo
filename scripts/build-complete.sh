#!/bin/bash

echo "🚀 Starting Complete SSG Build with Sitemap Generation..."
echo ""

# Step 1: Generate routes
echo "📍 Step 1: Generating routes from database..."
npm run generate-routes

if [ ! -f "static-routes.json" ]; then
    echo "❌ Error: static-routes.json not generated"
    exit 1
fi

echo "✅ Routes generated successfully"
echo ""

# Step 2: Build client
echo "🏗️  Step 2: Building client..."
npm run build:client

if [ $? -ne 0 ]; then
    echo "❌ Client build failed"
    exit 1
fi

echo "✅ Client built successfully"
echo ""

# Step 3: Build server
echo "🏗️  Step 3: Building server entry..."
npm run build:server

if [ $? -ne 0 ]; then
    echo "❌ Server build failed"
    exit 1
fi

echo "✅ Server built successfully"
echo ""

# Step 4: Prerender
echo "🎨 Step 4: Prerendering pages..."
npm run prerender

if [ $? -ne 0 ]; then
    echo "❌ Prerendering failed"
    exit 1
fi

echo "✅ Pages prerendered successfully"
echo ""

# Step 5: Generate sitemap from SSG build log
echo "🗺️  Step 5: Generating sitemap from SSG build log..."
npm run generate-sitemap

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Complete static site with sitemap generated successfully!"
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
