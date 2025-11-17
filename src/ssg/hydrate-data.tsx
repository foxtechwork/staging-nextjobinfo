import { ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

declare global {
  interface Window {
    __SSG_DATA__?: any;
  }
}

export function HydrateData({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && window.__SSG_DATA__) {
      const data = window.__SSG_DATA__;

      // Hydrate news data with staleTime
      if (data.news) {
        queryClient.setQueryData(['news'], data.news);
        queryClient.setQueryDefaults(['news'], {
          staleTime: Infinity,
          gcTime: Infinity,
        });
      }

      // Hydrate stats data with staleTime
      if (data.stats) {
        queryClient.setQueryData(['jobs-stats'], data.stats);
        queryClient.setQueryDefaults(['jobs-stats'], {
          staleTime: Infinity,
          gcTime: Infinity,
        });
      }

      // Hydrate jobs data - store in window for direct access by hooks
      if (data.jobs) {
        // CRITICAL: Keep raw data in window.__SSG_DATA__ for hooks to access
        // Hooks use this directly via initialData, bypassing React Query cache issues
        
        // Still hydrate base query for backwards compatibility
        queryClient.setQueryData(['jobs'], data.jobs);
        queryClient.setQueryDefaults(['jobs'], {
          staleTime: Infinity,
          gcTime: Infinity,
        });
        
        // Set query defaults for job-search queries to use SSG data with infinite stale time
        queryClient.setQueryDefaults(['job-search'], {
          staleTime: Infinity,
          gcTime: Infinity,
        });
      }

      // Hydrate specific job data
      if (data.currentJob) {
        const pageLink = data.currentJob.page_link;
        queryClient.setQueryData(['job-by-page-link', pageLink], data.currentJob);
        queryClient.setQueryDefaults(['job-by-page-link'], {
          staleTime: Infinity,
          gcTime: Infinity,
        });
      }
    }
  }, [queryClient]);

  return <>{children}</>;
}
