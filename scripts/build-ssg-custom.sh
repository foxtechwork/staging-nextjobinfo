#!/bin/bash

echo "🚀 Starting Custom SSG Build..."
echo ""

# Step 1: Generate routes
echo "📍 Step 1: Generating routes from database..."
tsx scripts/generate-routes.ts

if [ ! -f "static-routes.json" ]; then
    echo "❌ Error: static-routes.json not generated"
    exit 1
fi

echo "✅ Routes generated successfully"
echo ""

# Step 2: Build client
echo "🏗️  Step 2: Building client..."
vite build --outDir dist/client

if [ $? -ne 0 ]; then
    echo "❌ Client build failed"
    exit 1
fi

echo "✅ Client built successfully"
echo ""

# Step 3: Build server
echo "🏗️  Step 3: Building server entry..."
vite build --ssr src/ssg/entry-server.tsx --outDir dist/server

if [ $? -ne 0 ]; then
    echo "❌ Server build failed"
    exit 1
fi

echo "✅ Server built successfully"
echo ""

# Step 4: Prerender
echo "🎨 Step 4: Prerendering pages..."
tsx scripts/prerender.ts

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Static site generated successfully!"
    echo "📦 Output directory: dist/client/"
    echo ""
    echo "Next steps:"
    echo "  1. Preview: npx serve dist/client"
    echo "  2. Deploy: Upload dist/client/ folder to your hosting service"
else
    echo "❌ Prerendering failed"
    exit 1
fi
