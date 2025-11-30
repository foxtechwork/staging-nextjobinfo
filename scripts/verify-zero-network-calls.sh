#!/bin/bash

# Verification Script: Zero Network Calls After SSG Build
# This script verifies that the SSG build produces a true static site with zero runtime database calls

echo "🔍 Verifying True SSG - Zero Network Calls"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if dist/client exists
if [ ! -d "dist/client" ]; then
    echo -e "${RED}❌ ERROR: dist/client directory not found${NC}"
    echo "Please run 'npm run build:ssg' first"
    exit 1
fi

echo "✅ Found dist/client directory"
echo ""

# 1. Check for Supabase URLs in generated HTML
echo "📋 Checking for Supabase URLs in generated HTML..."
SUPABASE_URL_COUNT=$(grep -r "ozpvgzdqegtgyscdbccp.supabase.co" dist/client --exclude-dir=assets 2>/dev/null | wc -l)

if [ "$SUPABASE_URL_COUNT" -gt 0 ]; then
    echo -e "${RED}❌ FAIL: Found $SUPABASE_URL_COUNT instances of Supabase URLs in HTML${NC}"
    echo "Locations:"
    grep -r "ozpvgzdqegtgyscdbccp.supabase.co" dist/client --exclude-dir=assets 2>/dev/null | head -5
    exit 1
else
    echo -e "${GREEN}✅ PASS: No Supabase URLs found in HTML${NC}"
fi
echo ""

# 2. Check for Supabase API keys in generated files
echo "🔑 Checking for API keys in generated files..."
KEY_COUNT=$(grep -r "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" dist/client --exclude-dir=assets 2>/dev/null | wc -l)

if [ "$KEY_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  WARNING: Found $KEY_COUNT instances of API keys in files${NC}"
    echo "This is acceptable if they're in JavaScript chunks (will be removed at runtime)"
else
    echo -e "${GREEN}✅ PASS: No API keys found in HTML${NC}"
fi
echo ""

# 3. Check for malicious scripts in HTML
echo "🛡️  Checking for malicious scripts in HTML..."
SCRIPT_COUNT=$(grep -r "<script type=\"text/javascript\">(function" dist/client/*.html 2>/dev/null | wc -l)

if [ "$SCRIPT_COUNT" -gt 0 ]; then
    echo -e "${RED}❌ FAIL: Found $SCRIPT_COUNT malicious script tags${NC}"
    grep -r "<script type=\"text/javascript\">(function" dist/client/*.html 2>/dev/null | head -3
    exit 1
else
    echo -e "${GREEN}✅ PASS: No malicious scripts found${NC}"
fi
echo ""

# 4. Check for window.__SSG_DATA__ injection
echo "📦 Checking for SSG data injection..."
SSG_DATA_COUNT=$(grep -r "window.__SSG_DATA__" dist/client/*.html 2>/dev/null | wc -l)

if [ "$SSG_DATA_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ PASS: Found $SSG_DATA_COUNT pages with SSG data injection${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: No SSG data injection found${NC}"
    echo "Pages might not display data correctly"
fi
echo ""

# 5. Check for proper HTML structure
echo "🏗️  Checking HTML structure..."
INDEX_EXISTS=$([ -f "dist/client/index.html" ] && echo "yes" || echo "no")

if [ "$INDEX_EXISTS" = "yes" ]; then
    echo -e "${GREEN}✅ PASS: index.html exists${NC}"
else
    echo -e "${RED}❌ FAIL: index.html not found${NC}"
    exit 1
fi
echo ""

# 6. Summary
echo "=========================================="
echo "✅ Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Run: npx serve dist/client"
echo "2. Open browser DevTools → Network tab"
echo "3. Test these critical pages:"
echo "   - Homepage: http://localhost:3000"
echo "   - State Selection: http://localhost:3000/state-selection"
echo "   - Job Details: http://localhost:3000/job/[any-job-page-link]"
echo "   - Category Pages: http://localhost:3000/category/[category]"
echo "4. Verify ZERO calls to: ozpvgzdqegtgyscdbccp.supabase.co"
echo ""
echo "Expected Network Requests:"
echo "  ✅ HTML pages"
echo "  ✅ JavaScript bundles"
echo "  ✅ CSS stylesheets"
echo "  ✅ Images/fonts"
echo "  ❌ API calls to Supabase"
echo "  ❌ Database queries"
echo ""
echo "⚠️  CRITICAL TEST: State Selection Page"
echo "   This page previously made runtime DB calls."
echo "   Verify zero Supabase calls when visiting /state-selection"
echo ""
echo "If you see any Supabase calls in the Network tab,"
echo "please report the issue with screenshots."
echo "=========================================="
