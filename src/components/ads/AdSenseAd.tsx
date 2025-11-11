import { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  client: string; // Your AdSense client ID (ca-pub-XXXXXXXXXX)
  slot: string;   // Your ad slot ID
  format?: string; // 'auto', 'rectangle', 'horizontal', 'vertical'
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

/**
 * Google AdSense Ad Component
 * 
 * Usage:
 * <AdSenseAd
 *   client="ca-pub-XXXXXXXXXX"
 *   slot="1234567890"
 *   format="rectangle"
 *   style={{ display: 'block', width: '300px', height: '250px' }}
 * />
 * 
 * Common formats:
 * - 'auto': Responsive (recommended)
 * - 'rectangle': 300x250
 * - 'horizontal': 728x90 or 320x50
 * - 'vertical': 120x600
 */
export default function AdSenseAd({ 
  client, 
  slot, 
  format = 'auto',
  style = { display: 'block' },
  className = '',
  responsive = true
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only load ads on client-side (not during SSG)
    if (typeof window === 'undefined') return;
    
    // Prevent duplicate ad loading
    if (hasLoaded.current) return;

    try {
      // Wait a bit for the page to fully load
      const timer = setTimeout(() => {
        if ((window as any).adsbygoogle && adRef.current) {
          try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            hasLoaded.current = true;
          } catch (err) {
            console.error('AdSense push error:', err);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('AdSense initialization error:', err);
    }
  }, []);

  // Don't render ads during SSR
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
