import { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
      return;
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Handle different types of performance entries
        let metricValue: number;
        if ('value' in entry) {
          metricValue = entry.value as number;
        } else if ('duration' in entry) {
          metricValue = entry.duration;
        } else {
          metricValue = 0;
        }

        // Only log in development for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log(`Performance metric - ${entry.name}:`, metricValue);
        }

        // In production, you would send this data to your analytics service
        if (process.env.NODE_ENV === 'production') {
          // Example: Send to analytics service
          // analytics.track('performance_metric', {
          //   name: entry.name,
          //   value: metricValue,
          //   url: window.location.pathname
          // });
        }
      });
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      
      // Try to observe LCP if supported
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP not supported, continue without it
      }
    } catch (e) {
      console.warn('Performance observer not supported');
    }

    // Custom performance tracking
    const trackPageLoad = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const metrics: PerformanceMetrics = {
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            renderTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            interactionTime: navigation.domInteractive - navigation.fetchStart,
          };

          // Log metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.log('Page Performance Metrics:', metrics);
          }
        }
      }
    };

    // Track after page load
    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
    }

    return () => {
      if (typeof window !== 'undefined') {
        observer?.disconnect();
        window.removeEventListener('load', trackPageLoad);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

// Hook for monitoring component render performance
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof performance === 'undefined') {
      return;
    }

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  });
};