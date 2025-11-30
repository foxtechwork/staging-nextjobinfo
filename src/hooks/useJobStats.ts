import { useQuery } from '@tanstack/react-query';

// Lazy import Supabase only in dev mode to prevent bundling in production
const getSupabaseClient = async () => {
  if (import.meta.env.PROD) {
    throw new Error('Supabase should not be called in production SSG mode');
  }
  const { supabase } = await import('@/integrations/supabase/client');
  return supabase;
};

interface StateJobCount {
  state: string;
  jobCount: number;
  totalPosts: number;
}

interface JobStats {
  totalJobs: number;
  totalVacancies: number;
  stateWiseData: StateJobCount[];
  allIndiaVacancies: number;
}

export function useJobStats() {
  // Check if SSG data is available
  const ssgData = typeof window !== 'undefined' 
    ? (window as any).__SSG_DATA__?.stats 
    : null;

  return useQuery({
    queryKey: ['job-stats'],
    queryFn: async (): Promise<JobStats> => {
      // This should NEVER run in production - only in dev mode
      console.log('🔍 useJobStats: Fetching from Supabase (dev mode only)');
      
      const supabase = await getSupabaseClient();
      const { data: jobs, error } = await supabase
        .from('jobs_data')
        .select('state, total_posts, Is_All_India, is_active')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching job stats:', error);
        throw error;
      }

      if (!jobs) {
        return {
          totalJobs: 0,
          totalVacancies: 0,
          stateWiseData: [],
          allIndiaVacancies: 0,
        };
      }

      // Calculate total vacancies (sum of all total_posts)
      const totalVacancies = jobs.reduce((sum, job) => sum + (job.total_posts || 0), 0);

      // Calculate All India vacancies
      const allIndiaVacancies = jobs
        .filter(job => job.Is_All_India === true)
        .reduce((sum, job) => sum + (job.total_posts || 0), 0);

      // Group by state and calculate counts (exclude All India jobs to avoid double counting)
      const stateMap = new Map<string, { jobCount: number; totalPosts: number }>();

      jobs.forEach(job => {
        // Skip All India jobs in state grouping since we add them separately
        if (job.Is_All_India === true) return;
        
        const stateName = job.state || 'Other';
        const current = stateMap.get(stateName) || { jobCount: 0, totalPosts: 0 };
        
        stateMap.set(stateName, {
          jobCount: current.jobCount + 1,
          totalPosts: current.totalPosts + (job.total_posts || 0),
        });
      });

      // Convert to array and add All India vacancies to each state
      const stateWiseData: StateJobCount[] = Array.from(stateMap.entries()).map(
        ([state, data]) => ({
          state,
          jobCount: data.jobCount,
          totalPosts: data.totalPosts + allIndiaVacancies, // Add All India jobs to each state
        })
      );

      return {
        totalJobs: jobs.length,
        totalVacancies,
        stateWiseData,
        allIndiaVacancies,
      };
    },
    // CRITICAL: In production, ALWAYS use SSG data - never fetch
    // In dev mode, only fetch if no SSG data available
    enabled: import.meta.env.PROD ? false : !ssgData,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: ssgData ? {
      totalJobs: ssgData.totalJobs || 0,
      totalVacancies: ssgData.totalVacancies || 0,
      stateWiseData: ssgData.stateWiseData || [],
      allIndiaVacancies: ssgData.allIndiaVacancies || 0,
    } : undefined,
  });
}

// Helper to get vacancy count for a specific state
export function getStateVacancies(
  stateWiseData: StateJobCount[],
  stateName: string
): number {
  const stateData = stateWiseData.find(
    s => s.state.toLowerCase() === stateName.toLowerCase()
  );
  return stateData?.totalPosts || 0;
}
