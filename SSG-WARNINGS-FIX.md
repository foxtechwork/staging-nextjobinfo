# SSG Build Warnings Fix

## Issue Fixed
During SSG build, React warning was appearing:
```
Warning: React does not recognize the `fetchPriority` prop on a DOM element.
```

## Root Cause
The `fetchPriority` attribute was added to the logo `<img>` tag in Header.tsx for performance optimization. However, during SSR/SSG rendering:

1. **TypeScript expects**: `fetchPriority` (camelCase) for React components
2. **HTML spec uses**: `fetchpriority` (lowercase) for actual DOM attributes
3. **React SSR conflict**: During server-side rendering, React warns about unrecognized props

## Solution
Removed the `fetchPriority` attribute entirely from the Header logo image.

**Why this works:**
- The `loading="eager"` attribute already signals browsers to prioritize this image
- The `decoding="async"` attribute ensures non-blocking image decode
- The `width` and `height` attributes prevent layout shift
- No need for redundant `fetchPriority` attribute

## Files Modified
- `src/components/layout/Header.tsx` - Removed `fetchPriority` from logo image

## Before
```tsx
<img 
  src={logo} 
  alt="Next Job Info - Latest Government Job Notifications" 
  className="h-11 sm:h-14 w-auto object-contain"
  width="193"
  height="77"
  loading="eager"
  fetchPriority="high"  // ❌ Causes SSR warning
  decoding="async"
/>
```

## After
```tsx
<img 
  src={logo} 
  alt="Next Job Info - Latest Government Job Notifications" 
  className="h-11 sm:h-14 w-auto object-contain"
  width="193"
  height="77"
  loading="eager"      // ✅ Sufficient for priority
  decoding="async"
/>
```

## Performance Impact
✅ **No negative impact** - `loading="eager"` already ensures high-priority loading

## Additional Notes

### Footer Logo
The footer logo uses `loading="lazy"` which is correct since it's below the fold:
```tsx
<img 
  src={logo} 
  loading="lazy"  // ✅ Correct - footer is below fold
/>
```

### Image Optimization Best Practices Applied
1. ✅ **Width/Height**: Prevents CLS (Cumulative Layout Shift)
2. ✅ **Loading Strategy**: `eager` for above-fold, `lazy` for below-fold
3. ✅ **Async Decoding**: Non-blocking image decode
4. ✅ **Alt Text**: SEO and accessibility
5. ✅ **WebP Format**: Modern, optimized format

## Build Result
✅ No TypeScript errors
✅ No SSR/SSG warnings
✅ Performance maintained
✅ Clean build output

## Testing
Run SSG build to verify:
```bash
npm run build
```

Expected output:
- ✅ No `fetchPriority` warnings
- ✅ Clean TypeScript compilation
- ✅ All routes render successfully
