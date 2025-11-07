#!/bin/bash

echo "🚀 Starting Static Site Generation..."
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

# Step 2: Build with vite-react-ssg
echo "🏗️  Step 2: Building static site..."
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
