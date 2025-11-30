#!/bin/bash

echo "🚀 Starting Static Site Generation..."
echo ""

# Step 1: Fetch data first
echo "💾 Step 1: Fetching data from database..."
npx tsx scripts/fetch-data.ts

if [ ! -f "ssg-data.json" ]; then
    echo "❌ Error: ssg-data.json not generated"
    exit 1
fi

echo "✅ Data cached successfully"
echo ""

# Step 2: Generate routes
echo "📍 Step 2: Generating routes from database..."
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

# Step 4: Build with vite-react-ssg
echo "🏗️  Step 4: Building static site..."
# Use the React-specific SSG CLI to avoid createApp mismatch
vite-react-ssg build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Static site generated successfully!"
    echo "📦 Output directory: dist/"
    echo ""
    echo "Next steps:"
    echo "  1. Preview: npm run preview"
    echo "  2. Deploy: Upload dist/ folder to your hosting service"
else
    echo "❌ Build failed"
    exit 1
fi
