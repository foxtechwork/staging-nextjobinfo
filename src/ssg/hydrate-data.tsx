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

      // Hydrate jobs data with comprehensive query key coverage
      if (data.jobs) {
        // Set base jobs data with staleTime to prevent refetch
        queryClient.setQueryData(['jobs'], data.jobs);
        queryClient.setQueryDefaults(['jobs'], {
          staleTime: Infinity,
          gcTime: Infinity,
        });
        
        // Set for various search query patterns to ensure data is available
        // regardless of how the page is accessed (direct URL or navigation)
        const commonFilterPatterns = [
          {},
          { category: 'All India Govt Jobs' },
          { isStateSpecific: true },
        ];
        
        // Set data for all common filter patterns
        commonFilterPatterns.forEach(filters => {
          queryClient.setQueryData(['job-search', '', filters], data.jobs);
        });
        
        // If we have state-specific data in the route, hydrate for that state too
        const pathMatch = window.location.pathname.match(/\/state-jobs\/([^/]+)/);
        if (pathMatch) {
          const stateCode = pathMatch[1];
          const stateNames: Record<string, string> = {
            ap: "Andhra Pradesh", ar: "Arunachal Pradesh", as: "Assam", br: "Bihar",
            cg: "Chhattisgarh", ga: "Goa", gj: "Gujarat", hr: "Haryana",
            hp: "Himachal Pradesh", jh: "Jharkhand", ka: "Karnataka", kl: "Kerala",
            mp: "Madhya Pradesh", mh: "Maharashtra", mn: "Manipur", ml: "Meghalaya",
            mz: "Mizoram", nl: "Nagaland", or: "Odisha", pb: "Punjab",
            rj: "Rajasthan", sk: "Sikkim", tn: "Tamil Nadu", tg: "Telangana",
            tr: "Tripura", up: "Uttar Pradesh", uk: "Uttarakhand", wb: "West Bengal",
            dl: "Delhi", ch: "Chandigarh", py: "Puducherry", jk: "Jammu & Kashmir",
            la: "Ladakh", an: "Andaman & Nicobar", dn: "Dadra & Nagar Haveli",
            dd: "Daman & Diu", ld: "Lakshadweep"
          };
          const stateName = stateNames[stateCode];
          if (stateName) {
            queryClient.setQueryData(['job-search', '', { state: stateName, isStateSpecific: true }], data.jobs);
          }
        }
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
