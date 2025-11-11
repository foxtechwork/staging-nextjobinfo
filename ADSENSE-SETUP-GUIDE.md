# Google AdSense Setup Guide

This guide explains how Google AdSense has been integrated into your application and how to customize it.

## ✅ What's Already Set Up

### 1. AdSense Script Integration
The AdSense script has been added to `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9846786524269953"
     crossorigin="anonymous"></script>
```

### 2. Configuration File
Your AdSense client ID and ad slot have been configured in `src/config/ads.ts`:
```javascript
ADSENSE_CLIENT_ID: 'ca-pub-9846786524269953',
AD_SLOTS: {
  LEFT_SIDEBAR: '9220916919',
  RIGHT_SIDEBAR: '9220916919',
  // ... all slots use your ad slot ID
}
```

### 3. AdSense Component
The `AdSenseAd` component (`src/components/ads/AdSenseAd.tsx`) is ready to use with:
- Auto-responsive design
- SSR-safe rendering (no placeholder during server-side rendering)
- Clean display without borders or titles
- Error handling via `AdWrapper`

## 🎯 How to Use AdSense Ads

### Basic Usage
```tsx
import AdSenseAd from '@/components/ads/AdSenseAd';
import { AdWrapper } from '@/components/ads/AdWrapper';
import { getAdConfig } from '@/config/ads';

// In your component
const adConfig = getAdConfig('LEFT_SIDEBAR');

<AdWrapper>
  <AdSenseAd
    client={adConfig.client}
    slot={adConfig.slot}
    format="auto"
    style={{ display: 'block' }}
    responsive={true}
  />
</AdWrapper>
```

### Available Ad Positions
Configure different ad slots in `src/config/ads.ts`:
- `LEFT_SIDEBAR` - Left sidebar ads (300x250 recommended)
- `RIGHT_SIDEBAR` - Right sidebar ads (300x250 recommended)
- `JOB_HEADER` - Header banner (728x90 or responsive)
- `JOB_FOOTER` - Footer banner (728x90 or responsive)
- `CATEGORY_PAGE` - Category page ads (responsive)
- `MOBILE_STICKY` - Mobile sticky bottom (320x50)

### Example: Add Ad to a Page

```tsx
import AdSenseAd from '@/components/ads/AdSenseAd';
import { AdWrapper } from '@/components/ads/AdWrapper';
import { ADS_CONFIG } from '@/config/ads';

export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      
      {/* Ad Block */}
      <div className="my-8">
        <AdWrapper>
          <AdSenseAd
            client={ADS_CONFIG.ADSENSE_CLIENT_ID}
            slot={ADS_CONFIG.AD_SLOTS.JOB_HEADER}
            format="auto"
            style={{ display: 'block', minHeight: '90px' }}
            responsive={true}
          />
        </AdWrapper>
      </div>
      
      <p>Page content...</p>
    </div>
  );
}
```

## 🔧 Creating Additional Ad Slots

To add more ad slots to your AdSense account:

1. **Go to Google AdSense Dashboard**
   - Visit https://www.google.com/adsense
   - Navigate to Ads → Ad units

2. **Create New Ad Unit**
   - Click "By ad unit" → "Display ads"
   - Name your ad unit (e.g., "Homepage Banner")
   - Choose ad size:
     - **Responsive**: Automatically adapts (recommended)
     - **Fixed size**: 728x90 (leaderboard), 300x250 (rectangle), etc.
   - Click "Create"

3. **Copy Ad Slot ID**
   - Copy the `data-ad-slot` value (e.g., "1234567890")

4. **Update Configuration**
   Add the new slot to `src/config/ads.ts`:
   ```javascript
   AD_SLOTS: {
     LEFT_SIDEBAR: '9220916919',
     RIGHT_SIDEBAR: '9220916919',
     HOMEPAGE_BANNER: '1234567890', // Your new slot ID
     // ...
   }
   ```

5. **Use in Your Code**
   ```tsx
   <AdSenseAd
     client={ADS_CONFIG.ADSENSE_CLIENT_ID}
     slot={ADS_CONFIG.AD_SLOTS.HOMEPAGE_BANNER}
     format="auto"
     responsive={true}
   />
   ```

## 📱 Ad Formats & Sizes

### Responsive Ads (Recommended)
```tsx
<AdSenseAd
  client="ca-pub-9846786524269953"
  slot="9220916919"
  format="auto"
  responsive={true}
  style={{ display: 'block' }}
/>
```

### Fixed Size Ads
```tsx
// Rectangle (300x250)
<AdSenseAd
  client="ca-pub-9846786524269953"
  slot="9220916919"
  format="rectangle"
  style={{ display: 'block', width: '300px', height: '250px' }}
  responsive={false}
/>

// Leaderboard (728x90)
<AdSenseAd
  client="ca-pub-9846786524269953"
  slot="9220916919"
  format="horizontal"
  style={{ display: 'block', width: '728px', height: '90px' }}
  responsive={false}
/>
```

## 🎨 Styling Ads

### Container Styling
```tsx
<div className="my-8 flex justify-center">
  <AdWrapper>
    <AdSenseAd
      client="ca-pub-9846786524269953"
      slot="9220916919"
      format="auto"
      className="max-w-[728px]" // Limit ad width
      responsive={true}
    />
  </AdWrapper>
</div>
```

### Responsive Layout
```tsx
{/* Desktop: 728x90, Mobile: 320x50 */}
<AdWrapper>
  <AdSenseAd
    client="ca-pub-9846786524269953"
    slot="9220916919"
    format="auto"
    style={{ display: 'block', minHeight: '50px' }}
    responsive={true}
  />
</AdWrapper>
```

## ⚠️ Important Notes

### 1. Ad Approval
- Google AdSense needs to approve your site before ads show
- During approval, you may see blank spaces
- Approval typically takes 1-3 days

### 2. Policy Compliance
- Ensure your content complies with [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- Don't click your own ads
- Don't encourage users to click ads
- Don't place more than 3 ad units per page initially

### 3. Testing Ads
You can test ads in two ways:

**Option 1: Test Mode** (in `src/config/ads.ts`):
```javascript
SETTINGS: {
  testMode: true, // Shows test ads from AdSense
}
```

**Option 2: Live Ads**:
```javascript
SETTINGS: {
  testMode: false, // Shows real ads (only after approval)
}
```

### 4. Ad Performance
- Ads may take 10-30 minutes to appear after setup
- Empty spaces are normal before AdSense approval
- Check Google AdSense dashboard for performance metrics

## 🔒 Error Handling

The `AdWrapper` component prevents ad errors from crashing your app:

```tsx
<AdWrapper fallback={<div>Ad temporarily unavailable</div>}>
  <AdSenseAd ... />
</AdWrapper>
```

If an ad fails to load, it will:
1. Log the error to console
2. Show the fallback UI (or nothing if no fallback provided)
3. Keep the rest of your page working

## 📊 Custom Ads (Alternative)

If you want to use custom image ads instead of AdSense:

1. **Enable Custom Ads** in `src/config/ads.ts`:
```javascript
CUSTOM_ADS: {
  LEFT_SIDEBAR: {
    enabled: true, // Set to true
    image: '/ads/sidebar-ad-300x250.jpg',
    link: 'https://example.com/advertiser-link',
    alt: 'Sidebar Advertisement',
    width: 300,
    height: 250,
  },
}
```

2. **Place Ad Images** in `/public/ads/` folder

3. **Custom ads will override AdSense** for that position

## 📞 Support

- **AdSense Help**: https://support.google.com/adsense
- **Policy Questions**: https://support.google.com/adsense/answer/48182
- **Technical Issues**: Check browser console for error messages

## 🎉 Your Setup is Complete!

Your AdSense integration is ready. Ads will appear automatically once Google approves your site.

**Current Configuration:**
- Client ID: `ca-pub-9846786524269953`
- Ad Slot: `9220916919`
- Format: Auto-responsive
- Clean display (no borders/titles)

You can now add ads to any page using the examples above! 🚀
