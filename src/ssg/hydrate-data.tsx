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

      // Hydrate news data
      if (data.news) {
        queryClient.setQueryData(['news'], data.news);
      }

      // Hydrate stats data
      if (data.stats) {
        queryClient.setQueryData(['jobs-stats'], data.stats);
      }

      // Hydrate jobs data
      if (data.jobs) {
        queryClient.setQueryData(['jobs'], data.jobs);
        
        // Also set for search queries with empty filters
        queryClient.setQueryData(['job-search', '', {}], data.jobs);
        queryClient.setQueryData(['job-search', '', { category: 'All India Govt Jobs' }], data.jobs);
      }

      // Hydrate specific job data
      if (data.currentJob) {
        const pageLink = data.currentJob.page_link;
        queryClient.setQueryData(['job-by-page-link', pageLink], data.currentJob);
      }
    }
  }, [queryClient]);

  return <>{children}</>;
}
