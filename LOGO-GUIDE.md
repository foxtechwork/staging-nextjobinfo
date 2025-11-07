# Logo Configuration Guide

This guide explains how to configure different logos for the header and footer sections of your website.

## Current Logo Setup

Currently, the website uses a single logo (`src/assets/logo.png`) for both the header and footer sections.

## How to Use Different Logos

### Step 1: Add Your Logo Files

1. Place your logo images in the `src/assets/` directory
2. We recommend using these naming conventions:
   - `logo-header.png` - for the header/navigation bar
   - `logo-footer.png` - for the footer section

**Supported formats:** PNG, SVG, JPG, WEBP

### Step 2: Update the Header Logo

Open `src/components/layout/Header.tsx` and locate line 3:

```typescript
// Current (line 3)
import logo from "@/assets/logo.png";
```

Change it to:

```typescript
// New
import logo from "@/assets/logo-header.png";
```

The logo is used on **line 87-92** in the Header component.

### Step 3: Update the Footer Logo

Open `src/components/layout/Footer.tsx` and add the logo import at the top of the file:

**Add after the existing imports (around line 2):**

```typescript
import footerLogo from "@/assets/logo-footer.png";
```

**Then find the footer brand section** (search for "Next Job Info - Government Job Notifications") and update it:

```typescript
// Current
<div className="flex items-center gap-2 mb-3">
  <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
    <span className="text-primary-foreground font-bold text-lg">N</span>
  </div>
  <span className="text-xl font-bold text-foreground">Next Job Info</span>
</div>
```

**Replace with:**

```typescript
// New - with logo image
<div className="mb-3">
  <img 
    src={footerLogo} 
    alt="Next Job Info - Government Job Notifications" 
    className="h-12 w-auto object-contain"
  />
</div>
```

### Step 4: Verify Your Changes

1. Save all files
2. Refresh your browser
3. Check both the header (top) and footer (bottom) to ensure both logos are displaying correctly

## Logo Sizing Recommendations

### Header Logo
- **Height:** 44-56px (automatically set via `h-11 sm:h-14` classes)
- **Width:** Auto (maintains aspect ratio)
- **Best format:** PNG with transparent background or SVG

### Footer Logo
- **Height:** 48px (set via `h-12` class)
- **Width:** Auto (maintains aspect ratio)
- **Best format:** PNG with transparent background or SVG

## Using the Same Logo for Both

If you want to use the same logo for both header and footer:

1. Keep `src/assets/logo.png` as your main logo
2. No code changes needed - current setup already uses it in the header
3. For footer, import and use the same `logo.png`:

```typescript
// In Footer.tsx
import logo from "@/assets/logo.png";

// Use 'logo' instead of 'footerLogo' in the image src
<img src={logo} alt="..." />
```

## Troubleshooting

### Logo not appearing
- Check file path is correct
- Verify file exists in `src/assets/` directory
- Clear browser cache and refresh

### Logo is too large/small
- Adjust the height class (e.g., `h-10`, `h-12`, `h-14`, `h-16`)
- Keep `w-auto` to maintain aspect ratio

### Logo is blurry
- Use higher resolution images (2x or 3x size)
- Consider using SVG format for crisp display at all sizes

## Notes

- Always use meaningful alt text for accessibility
- Optimize image file size for faster loading
- Test logo appearance in both light and dark modes if your site supports dark mode
- Keep original logo files as backups before making changes
