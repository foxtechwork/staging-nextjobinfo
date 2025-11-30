import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Job } from './useJobs';

// Lazy import Supabase only in dev mode to prevent bundling in production
const getSupabaseClient = async () => {
  if (import.meta.env.PROD) {
    throw new Error('Supabase should not be called in production SSG mode');
  }
  const { supabase } = await import('@/integrations/supabase/client');
  return supabase;
};

export const useRelatedJobs = (currentJob: Job | undefined, limit: number = 3) => {
  const queryClient = useQueryClient();
  
  // Try to get jobs from SSG data or React Query cache
  const ssgJobs = typeof window !== 'undefined' && window.__SSG_DATA__?.jobs 
    ? window.__SSG_DATA__.jobs 
    : undefined;
  
  const cachedJobs = !ssgJobs ? queryClient.getQueryData<Job[]>(['jobs']) : undefined;
  const sourceJobs = ssgJobs || cachedJobs;

  // Pre-filter related jobs from SSG/cached data
  const filteredData = sourceJobs && currentJob ? (() => {
    let allJobs = sourceJobs.filter((job: Job) => 
      job.job_id !== currentJob.job_id && job.is_active
    );

    // Sort all jobs by last_date first
    allJobs.sort((a, b) => {
      const dateA = new Date(a.last_date || a.post_date || a.updated_at).getTime();
      const dateB = new Date(b.last_date || b.post_date || b.updated_at).getTime();
      return dateB - dateA;
    });

    let relatedJobs: Job[] = [];

    // First priority: Filter by All India or State
    if (currentJob.Is_All_India) {
      relatedJobs = allJobs.filter((job: Job) => job.Is_All_India === true);
    } else if (currentJob.state) {
      relatedJobs = allJobs.filter((job: Job) => 
        job.state === currentJob.state && job.Is_All_India === false
      );
    }

    // If we don't have enough jobs, add more from the remaining pool
    if (relatedJobs.length < limit) {
      const remainingJobs = allJobs.filter(job => 
        !relatedJobs.some(rj => rj.job_id === job.job_id)
      );
      relatedJobs = [...relatedJobs, ...remainingJobs];
    }

    return relatedJobs.slice(0, limit);
  })() : undefined;

  return useQuery({
    queryKey: ['related-jobs', currentJob?.job_id, currentJob?.state, currentJob?.Is_All_India],
    queryFn: async () => {
      if (!currentJob) return [];

      console.log('📊 useRelatedJobs: Fetching from Supabase (dev mode only)');
      const supabase = await getSupabaseClient();
      
      // Fetch more jobs than limit to ensure we have enough for fallback
      const fetchLimit = limit * 10;
      let query = supabase
        .from('jobs_data')
        .select('*')
        .eq('is_active', true)
        .neq('job_id', currentJob.job_id)
        .order('last_date', { ascending: false })
        .limit(fetchLimit);

      const { data: allJobs, error } = await query;
      if (error) throw error;
      
      let relatedJobs: Job[] = [];

      // First priority: Filter by All India or State
      if (currentJob.Is_All_India) {
        relatedJobs = (allJobs || []).filter((job: Job) => job.Is_All_India === true);
      } else if (currentJob.state) {
        relatedJobs = (allJobs || []).filter((job: Job) => 
          job.state === currentJob.state && job.Is_All_India === false
        );
      }

      // If we don't have enough jobs, add more from the remaining pool
      if (relatedJobs.length < limit && allJobs) {
        const remainingJobs = allJobs.filter((job: Job) => 
          !relatedJobs.some((rj: Job) => rj.job_id === job.job_id)
        );
        relatedJobs = [...relatedJobs, ...remainingJobs];
      }

      return relatedJobs.slice(0, limit) as Job[];
    },
    // CRITICAL: In production, ALWAYS disabled
    enabled: import.meta.env.PROD ? false : (!!currentJob && !filteredData),
    initialData: filteredData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
