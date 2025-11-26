# Deployment Guide

## Pre-Deployment Security Checklist

Before deploying your SSG job portal to production, ensure all security measures are in place:

### ✅ Required Steps

1. **Run SSG Build**
   ```bash
   npm run build:ssg
   ```
   This generates the static site in `dist/client/` directory.

2. **Verify Build Output**
   - Check that `dist/client/` contains only static files
   - Verify no `.env` file is included
   - Ensure no source code is exposed

3. **Test Locally**
   ```bash
   npx serve dist/client
   ```
   Visit `http://localhost:3000` and test all routes.

4. **Security Scan**
   Run a security scan on the built files:
   ```bash
   # Check for exposed secrets
   grep -r "service_role" dist/client/ || echo "✅ No service role keys found"
   grep -r "password" dist/client/ || echo "✅ No passwords found"
   ```

---

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist/client
   ```

3. **Configure Security Headers**:
   Create `dist/client/_headers`:
   ```
   /*
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     X-XSS-Protection: 1; mode=block
     Referrer-Policy: strict-origin-when-cross-origin
     Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://uertiqcxcbsqkzymguzy.supabase.co; connect-src 'self' https://uertiqcxcbsqkzymguzy.supabase.co
   ```

4. **Environment Variables** (Netlify Dashboard):
   ```
   VITE_SUPABASE_URL=https://uertiqcxcbsqkzymguzy.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   VITE_SUPABASE_PROJECT_ID=uertiqcxcbsqkzymguzy
   ```

### Option 2: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Configure** `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build:ssg",
     "outputDirectory": "dist/client",
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "Referrer-Policy",
             "value": "strict-origin-when-cross-origin"
           }
         ]
       }
     ]
   }
   ```

### Option 3: GitHub Pages

1. **Build**:
   ```bash
   npm run build:ssg
   ```

2. **Deploy**:
   ```bash
   # Add to git
   git add dist/client -f
   git commit -m "Deploy to GitHub Pages"
   
   # Push to gh-pages branch
   git subtree push --prefix dist/client origin gh-pages
   ```

3. **Configure** (GitHub Settings):
   - Go to Settings > Pages
   - Source: Deploy from branch `gh-pages`
   - Enforce HTTPS: ✅ Enabled

### Option 4: AWS S3 + CloudFront

1. **Build**:
   ```bash
   npm run build:ssg
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync dist/client/ s3://your-bucket-name/ --delete
   ```

3. **Configure CloudFront**:
   - Create distribution pointing to S3 bucket
   - Enable HTTPS
   - Set security headers via Lambda@Edge

---

## Post-Deployment Verification

### 1. Security Headers Check
Visit [Security Headers](https://securityheaders.com/) and enter your domain.
Target score: **A** or higher.

### 2. SSL/HTTPS Check
Visit [SSL Labs](https://www.ssllabs.com/ssltest/) and test your domain.
Target score: **A+** or **A**.

### 3. Performance Check
Visit [PageSpeed Insights](https://pagespeed.web.dev/) and test your site.
Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 4. Functionality Check
Test these critical paths:
- [ ] Homepage loads correctly
- [ ] Job listings display
- [ ] Job details pages work
- [ ] State filter pages work
- [ ] Category filter pages work
- [ ] Search functionality works
- [ ] Subscribe form works
- [ ] Mobile responsiveness

---

## Continuous Deployment (CI/CD)

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy SSG

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build SSG
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        VITE_SUPABASE_PROJECT_ID: ${{ secrets.VITE_SUPABASE_PROJECT_ID }}
      run: npm run build:ssg
      
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      with:
        args: deploy --prod --dir=dist/client
```

---

## Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Supabase logs for errors
- [ ] Review security headers status
- [ ] Monitor site performance
- [ ] Check for broken links

### Monthly Tasks
- [ ] Run security scan
- [ ] Update dependencies
- [ ] Review RLS policies
- [ ] Backup database

### Quarterly Tasks
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Update SEO metadata
- [ ] Review analytics data

---

## Rollback Procedure

If you need to rollback a deployment:

### Netlify
```bash
netlify rollback
```

### Vercel
```bash
vercel rollback
```

### Manual
```bash
# Rebuild from previous commit
git checkout <previous-commit-hash>
npm run build:ssg
# Deploy dist/client
```

---

## Troubleshooting

### Build Fails
1. Check that all environment variables are set
2. Verify Node.js version (18+ required)
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### 404 Errors After Deploy
1. Ensure all routes are in `static-routes.json`
2. Check hosting provider's routing configuration
3. Verify `dist/client/index.html` exists

### Supabase Connection Issues
1. Verify environment variables are correct
2. Check Supabase project status
3. Verify RLS policies allow public read access

### Performance Issues
1. Enable CDN on hosting provider
2. Optimize images
3. Enable compression (gzip/brotli)
4. Check for large bundle sizes

---

## Support & Resources

- **SSG Documentation**: See `SSG-README.md`
- **Security Guide**: See `SECURITY.md`
- **Netlify Docs**: https://docs.netlify.com/
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs

---

**Last Updated**: 2025-10-22  
**Version**: 1.0.0
