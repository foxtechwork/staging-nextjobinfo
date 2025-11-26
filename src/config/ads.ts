/**
 * Advertisement Configuration
 * 
 * Centralized configuration for all advertisements in the application.
 * Update this file to manage AdSense IDs and custom ad settings.
 */

export const ADS_CONFIG = {
  // ========================================
  // Google AdSense Configuration
  // ========================================
  ADSENSE_CLIENT_ID: 'ca-pub-9846786524269953',
  
  // Ad Slot IDs for different positions
  // Create these in your AdSense dashboard
  AD_SLOTS: {
    LEFT_SIDEBAR: '9220916919',        // Auto responsive ad
    RIGHT_SIDEBAR: '9220916919',       // Auto responsive ad
    JOB_HEADER: '9220916919',          // Auto responsive ad
    JOB_FOOTER: '9220916919',          // Auto responsive ad
    CATEGORY_PAGE: '9220916919',       // Auto responsive ad
    MOBILE_STICKY: '9220916919',       // Auto responsive ad
  },
  
  // ========================================
  // Custom Image/HTML Ads Configuration
  // ========================================
  // Use this if you have direct advertisers or want to use custom ads
  CUSTOM_ADS: {
    LEFT_SIDEBAR: {
      enabled: false, // Set to true to use custom ad instead of AdSense
      image: '/ads/sidebar-ad-300x250.jpg',
      link: 'https://example.com/advertiser-link',
      alt: 'Sidebar Advertisement',
      width: 300,
      height: 250,
    },
    RIGHT_SIDEBAR: {
      enabled: false,
      image: '/ads/sidebar-ad-300x250.jpg',
      link: 'https://example.com/advertiser-link',
      alt: 'Sidebar Advertisement',
      width: 300,
      height: 250,
    },
    JOB_HEADER: {
      enabled: false,
      image: '/ads/header-ad-728x90.jpg',
      link: 'https://example.com/advertiser-link',
      alt: 'Header Advertisement',
      width: 728,
      height: 90,
    },
    JOB_FOOTER: {
      enabled: false,
      image: '/ads/footer-ad-728x90.jpg',
      link: 'https://example.com/advertiser-link',
      alt: 'Footer Advertisement',
      width: 728,
      height: 90,
    },
  },
  
  // ========================================
  // Ad Display Settings
  // ========================================
  SETTINGS: {
    // Show ads only after page is fully loaded
    delayLoad: true,
    delayMs: 500,
    
    // Show placeholder during SSR
    showPlaceholder: true,
    
    // Test mode (shows test ads from AdSense)
    testMode: false, // Set to true during development
    
    // Enable ad refresh (rotate ads after certain time)
    enableRefresh: false,
    refreshIntervalMs: 60000, // 60 seconds
    
    // Responsive breakpoints
    mobileBreakpoint: 768,
  },
};

/**
 * Helper function to get ad configuration by position
 */
export function getAdConfig(position: keyof typeof ADS_CONFIG.AD_SLOTS) {
  return {
    client: ADS_CONFIG.ADSENSE_CLIENT_ID,
    slot: ADS_CONFIG.AD_SLOTS[position],
    testMode: ADS_CONFIG.SETTINGS.testMode,
  };
}

/**
 * Helper function to check if custom ad should be used
 */
export function useCustomAd(position: keyof typeof ADS_CONFIG.CUSTOM_ADS) {
  return ADS_CONFIG.CUSTOM_ADS[position]?.enabled || false;
}
