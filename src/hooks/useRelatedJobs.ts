import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Job } from './useJobs';

export const useRelatedJobs = (currentJob: Job | undefined, limit: number = 3) => {
  const queryClient = useQueryClient();
  const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV;
  
  return useQuery({
    queryKey: ['related-jobs', currentJob?.job_id, currentJob?.state, currentJob?.Is_All_India],
    queryFn: async () => {
      if (!currentJob) return [];

      // Only fetch in development mode
      if (isDev) {
        console.warn('⚠️ [useRelatedJobs] Fetching from Supabase (DEV mode):', currentJob.job_id);
        
        let query = supabase
          .from('jobs_data')
          .select('*')
          .eq('is_active', true)
          .neq('job_id', currentJob.job_id)
          .order('post_date', { ascending: false })
          .limit(limit);

        if (currentJob.Is_All_India) {
          query = query.eq('Is_All_India', true);
        } else if (currentJob.state) {
          query = query.eq('state', currentJob.state).eq('Is_All_India', false);
        }

        const { data, error } = await query;

        if (error) throw error;
        return data as Job[];
      }
      
      // Production - should never reach here
      throw new Error('Production mode should use SSG data only');
    },
    initialData: () => {
      // Check cache FIRST - prevents loading state
      const cached = queryClient.getQueryData<Job[]>(['related-jobs', currentJob?.job_id, currentJob?.state, currentJob?.Is_All_India]);
      if (cached) {
        console.log('✅ Using SSG cached related jobs');
      }
      return cached;
    },
    enabled: isDev && !!currentJob, // Only fetch in dev mode
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
