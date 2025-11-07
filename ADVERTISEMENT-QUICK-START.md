# Advertisement Quick Start Guide

**🚀 Get ads running in 5 minutes!**

## Step 1: Get Your Google AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up and add your website domain
3. Wait for approval (usually 1-3 days)
4. Once approved, get your **Publisher ID** (looks like: `ca-pub-1234567890123456`)

## Step 2: Add AdSense Script

**Edit file**: `index.html`

Add this inside the `<head>` section:

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```

Replace `ca-pub-YOUR_PUBLISHER_ID` with your actual publisher ID from AdSense.

## Step 3: Create Ad Units in AdSense Dashboard

1. Login to [AdSense](https://www.google.com/adsense/)
2. Go to **Ads** → **By ad unit** → **Display ads**
3. Create these ad units:

| Ad Name | Size | Type |
|---------|------|------|
| Left Sidebar | 300x250 | Square |
| Right Sidebar | 300x250 | Square |
| Job Header | 728x90 | Horizontal |
| Job Footer | 728x90 | Horizontal |

4. For each ad unit, copy the **Ad slot ID** (looks like: `1234567890`)

## Step 4: Update Ad Configuration

**Edit file**: `src/config/ads.ts`

Replace the placeholder values:

```typescript
export const ADS_CONFIG = {
  // Replace with YOUR actual publisher ID
  ADSENSE_CLIENT_ID: 'ca-pub-1234567890123456', // ← Your ID here
  
  // Replace with YOUR actual ad slot IDs
  AD_SLOTS: {
    LEFT_SIDEBAR: '1234567890',      // ← Your slot ID
    RIGHT_SIDEBAR: '0987654321',     // ← Your slot ID
    JOB_HEADER: '1122334455',        // ← Your slot ID
    JOB_FOOTER: '5544332211',        // ← Your slot ID
    CATEGORY_PAGE: '6677889900',     // ← Your slot ID
  },
  // ...
};
```

## Step 5: Implement Ads (Choose Your Method)

### Option A: Quick Implementation (Recommended)

Replace the advertisement placeholder in **Left Sidebar**:

**Edit file**: `src/components/layout/LeftSidebar.tsx` (Lines 124-149)

```tsx
import AdSenseAd from "@/components/ads/AdSenseAd";
import { AdWrapper } from "@/components/ads/AdWrapper";
import { ADS_CONFIG } from "@/config/ads";

// ... existing imports and code ...

// Inside the component, replace the Advertisement Card section:
{/* Advertisement */}
<Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/10">
  <CardHeader className="pb-2 bg-gradient-to-r from-accent/20 to-accent/10">
    <CardTitle className="text-sm flex items-center gap-2">
      <div className="p-1 rounded-full bg-accent/20">
        <Megaphone className="h-3 w-3 text-accent-foreground" />
      </div>
      Advertisement
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4">
    <AdWrapper>
      <AdSenseAd
        client={ADS_CONFIG.ADSENSE_CLIENT_ID}
        slot={ADS_CONFIG.AD_SLOTS.LEFT_SIDEBAR}
        format="rectangle"
        style={{ display: 'block', minHeight: '250px' }}
      />
    </AdWrapper>
  </CardContent>
</Card>
```

### Option B: Custom Image Ad (No AdSense Required)

If you have a direct advertiser or want to use your own banner:

1. Place your ad image in `public/ads/sidebar-ad-300x250.jpg`
2. Replace the Advertisement section:

```tsx
{/* Advertisement */}
<Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/10">
  <CardHeader className="pb-2 bg-gradient-to-r from-accent/20 to-accent/10">
    <CardTitle className="text-sm flex items-center gap-2">
      <div className="p-1 rounded-full bg-accent/20">
        <Megaphone className="h-3 w-3 text-accent-foreground" />
      </div>
      Advertisement
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4">
    <a 
      href="https://your-advertiser-link.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      <img 
        src="/ads/sidebar-ad-300x250.jpg" 
        alt="Advertisement" 
        className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity"
      />
    </a>
  </CardContent>
</Card>
```

## Step 6: Test Your Ads

### Development Testing

1. Enable test mode in `src/config/ads.ts`:
   ```typescript
   SETTINGS: {
     testMode: true, // Shows test ads
   }
   ```

2. Run your dev server:
   ```bash
   npm run dev
   ```

3. Open your browser and check if test ads appear

### Build and Deploy

1. Turn off test mode:
   ```typescript
   SETTINGS: {
     testMode: false, // Shows real ads
   }
   ```

2. Build your SSG site:
   ```bash
   npm run build:ssg
   ```

3. Test the static build:
   ```bash
   npm run serve:ssg
   ```

4. Deploy to your hosting (Netlify, Vercel, etc.)

## Step 7: Monitor Performance

1. Wait 24-48 hours for ad impressions to show in AdSense
2. Check your AdSense dashboard for:
   - **Impressions**: Number of times ads were shown
   - **Clicks**: Number of times ads were clicked
   - **Revenue**: Earnings from ads

---

## 📍 All Advertisement Locations

Update these files to add ads across your site:

| Location | File | Lines |
|----------|------|-------|
| Left Sidebar | `src/components/layout/LeftSidebar.tsx` | 124-149 |
| Right Sidebar | `src/components/layout/RightSidebar.tsx` | 234-259 |
| Job Details Header | `src/pages/JobDetails.tsx` | 260-263 |
| Job Details Footer | `src/pages/JobDetails.tsx` | 411-414 |
| Category Page | `src/pages/CategoryJobs.tsx` | 215-218 |

---

## ⚠️ Common Issues

### Issue: Ads Not Showing

**Solutions:**
- Check if AdSense script is loaded: Open DevTools Console → Type `window.adsbygoogle`
- Verify your Publisher ID and Slot IDs are correct
- Wait 24 hours after adding ads (AdSense needs time)
- Check AdSense account for policy violations
- Disable ad blockers during testing

### Issue: "Ad slot not found" Error

**Solutions:**
- Verify slot IDs in `src/config/ads.ts` match your AdSense dashboard
- Make sure ad units are created in AdSense
- Clear browser cache and reload

### Issue: Ads Show Blank Space

**Solutions:**
- This is normal during development
- Real ads appear after deployment to production domain
- Use test mode to see test ads during development

---

## 💰 Expected Revenue

Typical earnings for government job portals:

| Traffic (Monthly) | Est. Revenue |
|-------------------|--------------|
| 10,000 visitors | $50-$200 |
| 50,000 visitors | $250-$1,000 |
| 100,000 visitors | $500-$2,500 |
| 500,000 visitors | $2,500-$12,500 |

*Note: Actual revenue depends on traffic quality, ad placement, and niche.*

---

## 📚 Full Documentation

For detailed information, see:
- **ADVERTISEMENT-GUIDE.md** - Complete integration guide
- **Google AdSense Help** - [support.google.com/adsense](https://support.google.com/adsense)

---

## ✅ Quick Checklist

- [ ] Sign up for Google AdSense
- [ ] Get AdSense approval
- [ ] Add AdSense script to `index.html`
- [ ] Create ad units in AdSense dashboard
- [ ] Update `src/config/ads.ts` with your IDs
- [ ] Implement ads in components (at least 1)
- [ ] Test with test mode enabled
- [ ] Build SSG: `npm run build:ssg`
- [ ] Deploy to production
- [ ] Turn off test mode
- [ ] Monitor AdSense dashboard

---

**Need Help?** Check the full guide in `ADVERTISEMENT-GUIDE.md`

**Last Updated**: 2025-10-23
