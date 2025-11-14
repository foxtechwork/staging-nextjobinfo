import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Job } from './useJobs';

export const useRelatedJobs = (currentJob: Job | undefined, limit: number = 3) => {
  return useQuery({
    queryKey: ['related-jobs', currentJob?.job_id, currentJob?.state, currentJob?.Is_All_India],
    queryFn: async () => {
      if (!currentJob) return [];

      let query = supabase
        .from('jobs_data')
        .select('*')
        .eq('is_active', true)
        .neq('job_id', currentJob.job_id) // Exclude current job
        .order('post_date', { ascending: false })
        .limit(limit);

      // Filter by All India or State
      if (currentJob.Is_All_India) {
        query = query.eq('Is_All_India', true);
      } else if (currentJob.state) {
        query = query.eq('state', currentJob.state).eq('Is_All_India', false);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Job[];
    },
    enabled: !!currentJob,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
