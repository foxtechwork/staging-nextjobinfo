# Advertisement Integration Guide

This guide explains how to add advertisements to your Government Jobs Portal, including custom ads and Google AdSense integration.

## 📍 Advertisement Locations

Your project has multiple advertisement sections across different pages:

### 1. **Sidebar Advertisements (All Pages)**

#### Left Sidebar - `src/components/layout/LeftSidebar.tsx`
- **Location**: Lines 124-149
- **Size**: 300x250 pixels (Medium Rectangle)
- **Visibility**: Visible on all pages with left sidebar

#### Right Sidebar - `src/components/layout/RightSidebar.tsx`
- **Location**: Lines 234-259
- **Size**: 300x250 pixels (Medium Rectangle)
- **Visibility**: Visible on homepage and category pages

### 2. **Job Details Page - `src/pages/JobDetails.tsx`**
- **Header Banner**: Lines 260-263 (728x90 pixels - Leaderboard)
- **Footer Banner**: Lines 411-414 (728x90 pixels - Leaderboard)
- **Visibility**: Visible on all job detail pages

### 3. **Category Jobs Page - `src/pages/CategoryJobs.tsx`**
- **Location**: Lines 215-218 and 380-383
- **Size**: Flexible (responsive container)
- **Visibility**: Visible on all category listing pages

---

## 🎯 Method 1: Adding Custom Image/HTML Ads

### Step 1: Upload Your Ad Images

1. Place your ad images in the `public/ads/` folder:
   ```
   public/
   └── ads/
       ├── sidebar-ad-300x250.jpg
       ├── header-ad-728x90.jpg
       └── footer-ad-728x90.jpg
   ```

### Step 2: Update Advertisement Components

#### Example: Left Sidebar Advertisement

**File**: `src/components/layout/LeftSidebar.tsx` (Lines 124-149)

Replace the placeholder with:

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

#### Example: Job Details Header Banner

**File**: `src/pages/JobDetails.tsx` (Lines 260-263)

Replace with:

```tsx
<a 
  href="https://your-advertiser-link.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="block"
>
  <img 
    src="/ads/header-ad-728x90.jpg" 
    alt="Advertisement" 
    className="w-full h-auto rounded-lg"
  />
</a>
```

---

## 🚀 Method 2: Google AdSense Integration

### Step 1: Get Your AdSense Code

1. Sign up at [Google AdSense](https://www.google.com/adsense/)
2. Create ad units for different sizes:
   - **300x250** (Medium Rectangle) - for sidebars
   - **728x90** (Leaderboard) - for header/footer banners
   - **Responsive** - for flexible layouts
3. Copy the ad code provided by Google

### Step 2: Add AdSense Script to Your Site

**File**: `index.html` (in `<head>` section)

```html
<head>
  <!-- ... existing meta tags ... -->
  
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
</head>
```

Replace `ca-pub-XXXXXXXXXX` with your actual AdSense publisher ID.

### Step 3: Create AdSense Component

**Create new file**: `src/components/ads/AdSenseAd.tsx`

```tsx
import { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  client: string; // Your AdSense client ID (ca-pub-XXXXXXXXXX)
  slot: string;   // Your ad slot ID
  format?: string; // 'auto', 'rectangle', 'horizontal', 'vertical'
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({ 
  client, 
  slot, 
  format = 'auto',
  style = { display: 'block' },
  className = ''
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Only push ad if window.adsbygoogle is available
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

### Step 4: Use AdSense Component in Your Pages

#### Example: Left Sidebar with AdSense

**File**: `src/components/layout/LeftSidebar.tsx`

First, import the component at the top:
```tsx
import AdSenseAd from "@/components/ads/AdSenseAd";
```

Then replace the advertisement section (Lines 124-149):

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
    <AdSenseAd
      client="ca-pub-XXXXXXXXXX"
      slot="1234567890"
      format="rectangle"
      style={{ display: 'block', width: '300px', height: '250px' }}
    />
  </CardContent>
</Card>
```

#### Example: Job Details Header Banner with AdSense

**File**: `src/pages/JobDetails.tsx`

Import at the top:
```tsx
import AdSenseAd from "@/components/ads/AdSenseAd";
```

Replace header banner (Lines 260-263):

```tsx
<div className="bg-muted rounded-lg p-4 md:p-8">
  <AdSenseAd
    client="ca-pub-XXXXXXXXXX"
    slot="0987654321"
    format="horizontal"
    style={{ display: 'block', width: '728px', height: '90px' }}
  />
</div>
```

---

## 📋 Quick Reference: Ad Unit Sizes

| Location | Recommended Size | AdSense Format |
|----------|-----------------|----------------|
| Left Sidebar | 300x250 | `rectangle` |
| Right Sidebar | 300x250 | `rectangle` |
| Job Details Header | 728x90 | `horizontal` |
| Job Details Footer | 728x90 | `horizontal` |
| Category Page | Responsive | `auto` |
| Mobile Sticky Footer | 320x50 | `horizontal` |

---

## 🔧 Advanced: Ad Configuration Component

For easier management, create a centralized ad configuration:

**Create file**: `src/config/ads.ts`

```typescript
export const ADS_CONFIG = {
  ADSENSE_CLIENT_ID: 'ca-pub-XXXXXXXXXX', // Replace with your client ID
  
  AD_SLOTS: {
    LEFT_SIDEBAR: '1234567890',
    RIGHT_SIDEBAR: '0987654321',
    JOB_HEADER: '1122334455',
    JOB_FOOTER: '5544332211',
    CATEGORY_PAGE: '6677889900',
  },
  
  // For custom image ads
  CUSTOM_ADS: {
    LEFT_SIDEBAR: {
      image: '/ads/sidebar-ad-300x250.jpg',
      link: 'https://example.com/ad-link',
      alt: 'Sidebar Advertisement'
    },
    // Add more custom ads...
  }
};
```

Then import and use:

```tsx
import { ADS_CONFIG } from '@/config/ads';

// Usage
<AdSenseAd
  client={ADS_CONFIG.ADSENSE_CLIENT_ID}
  slot={ADS_CONFIG.AD_SLOTS.LEFT_SIDEBAR}
  format="rectangle"
/>
```

---

## ⚠️ Important Notes for SSG (Static Site Generation)

Since your project uses SSG, keep in mind:

1. **AdSense loads client-side**: The ads will only appear after the page hydrates in the browser
2. **No ad revenue during build**: Ads won't show during the static build process
3. **Add error boundaries**: Wrap ads in error boundaries to prevent ad-loading errors from breaking your site

### Error Boundary Wrapper

**Create file**: `src/components/ads/AdWrapper.tsx`

```tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class AdWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Ad loading error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

// Usage:
// <AdWrapper fallback={<div>Ad could not be loaded</div>}>
//   <AdSenseAd ... />
// </AdWrapper>
```

---

## 📊 Testing Your Ads

### Before Going Live

1. **Test Mode**: Use AdSense test ads during development
   - Add `data-adtest="on"` to your ad units
   ```tsx
   <ins
     className="adsbygoogle"
     style={style}
     data-ad-client={client}
     data-ad-slot={slot}
     data-adtest="on"  // Test mode
   />
   ```

2. **Check Console**: Open browser DevTools and check for AdSense errors
3. **Verify SSG**: Run `npm run build:ssg` and check if ads appear on static pages
4. **Mobile Testing**: Test ad responsiveness on mobile devices

### After Going Live

1. Remove `data-adtest="on"` attribute
2. Monitor AdSense dashboard for impressions and revenue
3. Check for policy violations in AdSense account

---

## 📞 Support

For AdSense-specific issues:
- Visit [AdSense Help Center](https://support.google.com/adsense)
- Check [AdSense Forum](https://support.google.com/adsense/community)

For technical implementation issues:
- Review console errors
- Check if AdSense script is loaded: `console.log(window.adsbygoogle)`
- Verify ad slots are correct in AdSense dashboard

---

## ✅ Checklist

- [ ] Sign up for Google AdSense account
- [ ] Get AdSense approval for your domain
- [ ] Create ad units in AdSense dashboard
- [ ] Add AdSense script to `index.html`
- [ ] Create `AdSenseAd` component
- [ ] Replace placeholder ads with AdSense components
- [ ] Test in development with test mode enabled
- [ ] Build SSG and verify ads appear: `npm run build:ssg`
- [ ] Deploy and monitor AdSense dashboard
- [ ] Remove test mode attributes

---

**Last Updated**: 2025-10-23
