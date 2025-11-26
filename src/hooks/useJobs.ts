import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export interface Job {
  job_id: string;
  post_date: string;
  recruitment_board: string;
  exam_or_post_name: string;
  qualification: string | null;
  advt_no: string | null;
  last_date: string | null;
  state: string | null;
  page_link: string | null;
  total_posts: number | null;
  created_at: string;
  updated_at: string;
  raw_html_1: string | null;
  raw_html_2: string | null;
  raw_html_3: string | null;
  raw_html_4?: string | null;
  raw_html_5?: string | null;
  is_active: boolean | null;
  Is_All_India: boolean | null;
  education_tags: Json | null;
  job_type_tags: Json | null;
  job_area_tags: Json | null;
  experience_level_tags: Json | null;
  post_position_tags: Json | null;
  job_posting_deadline_tags: Json | null;
  EmployerSectorTag?: Json | null;
}

// Helper function to combine HTML from all columns without extra spaces
export const combineJobHtml = (job: Job): string => {
  const html1 = job.raw_html_1 || '';
  const html2 = job.raw_html_2 || '';
  const html3 = job.raw_html_3 || '';
  const html4 = job.raw_html_4 || '';
  const html5 = job.raw_html_5 || '';
  return html1 + html2 + html3 + html4 + html5;
};

export interface JobDetail {
  job_id: string;
  raw_html_1: string;
  raw_html_2: string | null;
  raw_html_3: string | null;
  created_at: string;
  updated_at: string;
}

export const useJobs = (options?: any) => {
  const queryClient = useQueryClient();
  const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV;
  
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      // Only fetch in development mode
      if (isDev) {
        console.warn('⚠️ [useJobs] Fetching from Supabase (DEV mode)');
        
        const { data, error } = await supabase
          .from('jobs_data')
          .select('*')
          .eq('is_active', true)
          .order('post_date', { ascending: false });

        if (error) throw error;
        return data as Job[];
      }
      
      // Production - should never reach here
      throw new Error('Production mode should use SSG data only');
    },
    initialData: () => {
      // Check cache FIRST - prevents loading state
      const cached = queryClient.getQueryData<Job[]>(['jobs']);
      if (cached) {
        console.log('✅ Using SSG cached jobs data');
      }
      return cached;
    },
    enabled: isDev, // Only fetch in dev mode
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });
};

export const useJobDetails = (jobId: string) => {
  return useQuery({
    queryKey: ['job-details', jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs_data')
        .select('*')
        .eq('job_id', jobId)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as Job;
    },
    enabled: !!jobId,
  });
};

export const useJobByPageLink = (pageLink: string, options?: any) => {
  const queryClient = useQueryClient();
  const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV;
  
  return useQuery({
    queryKey: ['job-by-page-link', pageLink],
    queryFn: async () => {
      // Only fetch in development mode
      if (isDev && pageLink) {
        console.warn('⚠️ [useJobByPageLink] Fetching from Supabase (DEV mode):', pageLink);
        
        const { data, error } = await supabase
          .from('jobs_data')
          .select('*')
          .eq('page_link', pageLink)
          .eq('is_active', true)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('Job not found');
        return data as Job;
      }
      
      // Production - should never reach here
      throw new Error('Production mode should use SSG data only');
    },
    initialData: () => {
      // Prefer dedicated job detail cache if present
      const cached = queryClient.getQueryData<Job>(['job-by-page-link', pageLink]);
      if (cached) {
        console.log('✅ Using SSG cached job:', pageLink);
        return cached;
      }

      // Fallback: derive job from the pre-fetched jobs list so client-side navigation works
      const allJobs = queryClient.getQueryData<Job[]>(['jobs']);
      if (allJobs && pageLink) {
        const fromList = allJobs.find((job) => job.page_link === pageLink);
        if (fromList) {
          console.log('✅ Derived job from SSG jobs list:', pageLink);
          // Prime the dedicated cache for future lookups
          queryClient.setQueryData(['job-by-page-link', pageLink], fromList);
          return fromList;
        }
      }

      return undefined;
    },
    enabled: isDev && !!pageLink, // Only fetch in dev mode
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    ...options,
  });
};

export const useJobDetailsByPageLink = (pageLink: string) => {
  return useQuery({
    queryKey: ['job-details-by-page-link', pageLink],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs_data')
        .select('*')
        .eq('page_link', pageLink)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as Job;
    },
    enabled: !!pageLink,
  });
};

interface JobsStats {
  totalJobs: number;
  thisWeekJobs: number;
  stateWiseJobs: Record<string, number>;
  totalApplications: number;
  successRate: number;
}

export const useJobsStats = () => {
  const queryClient = useQueryClient();
  const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV;
  
  return useQuery<JobsStats>({
    queryKey: ['jobs-stats'],
    queryFn: async () => {
      // Only fetch in development mode
      if (isDev) {
        console.warn('⚠️ [useJobsStats] Fetching from Supabase (DEV mode)');
        
        const { data, error } = await supabase
          .from('jobs_data')
          .select('job_id, post_date, state, is_active')
          .eq('is_active', true);

        if (error) throw error;

        const totalJobs = data.length;
        const thisWeekJobs = data.filter(job => {
          const postDate = new Date(job.post_date);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return postDate >= weekAgo;
        }).length;

        const stateWiseJobs = data.reduce((acc, job) => {
          const state = job.state || 'All India';
          acc[state] = (acc[state] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return {
          totalJobs,
          thisWeekJobs,
          stateWiseJobs,
          totalApplications: Math.floor(totalJobs * 50 + Math.random() * 1000),
          successRate: 87
        };
      }
      
      // Production - should never reach here
      throw new Error('Production mode should use SSG data only');
    },
    initialData: () => {
      // Check cache FIRST - prevents loading state
      const cached = queryClient.getQueryData<JobsStats>(['jobs-stats']);
      if (cached) {
        console.log('✅ Using SSG cached jobs-stats');
      }
      return cached;
    },
    enabled: isDev, // Only fetch in dev mode
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// Hook for searching jobs with enhanced filters
export const useJobSearch = (searchQuery: string, filters: {
  category?: string;
  state?: string;
  educationTags?: string[];
  jobTypeTags?: string[];
  experienceTags?: string[];
  isStateSpecific?: boolean;
}) => {
  const { data: allJobs = [] } = useJobs();

  return useQuery({
    queryKey: ['job-search', searchQuery, filters],
    queryFn: () => {
      return applyFilters(allJobs as Job[], searchQuery, filters);
    },
    // Enable this query when we have jobs data from the base useJobs hook
    // During SSR, this will run the filter and cache the result
    // On the client, it will use the cached filtered result
    enabled: Array.isArray(allJobs) && allJobs.length > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// Helper function to apply filters (extracted for reuse)
function applyFilters(data: Job[], searchQuery: string, filters: any): Job[] {
  // Filter on the client side for complex array searches
  let filteredData = data.filter(job => {
        // Helper function to safely check arrays
        const arrayIncludes = (arr: Json | null, searchTerm: string): boolean => {
          if (!arr || !Array.isArray(arr)) return false;
          return arr.some((item: any) => typeof item === 'string' && item.toLowerCase().includes(searchTerm.toLowerCase()));
        };

        // Enhanced search query filter - search across all relevant fields including tags
        const matchesSearch = !searchQuery || 
          job.exam_or_post_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.recruitment_board.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (job.state && job.state.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (job.qualification && job.qualification.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (job.advt_no && job.advt_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
          arrayIncludes(job.education_tags, searchQuery) ||
          arrayIncludes(job.job_type_tags, searchQuery) ||
          arrayIncludes(job.job_area_tags, searchQuery) ||
          arrayIncludes(job.experience_level_tags, searchQuery) ||
          arrayIncludes(job.post_position_tags, searchQuery) ||
          arrayIncludes(job.job_posting_deadline_tags, searchQuery);

        // Enhanced category filter based on new tags structure
        const matchesCategory = !filters.category || filters.category === "All India Govt Jobs" ||
          (filters.category === "State Govt Jobs" && (job.state !== "All India" || job.Is_All_India === true)) ||
          (filters.category === "Bank Jobs" && (
            job.recruitment_board.toLowerCase().includes("bank") ||
            job.exam_or_post_name.toLowerCase().includes("bank") ||
            arrayIncludes(job.job_area_tags, "SBI") ||
            arrayIncludes(job.job_area_tags, "IBPS") ||
            arrayIncludes(job.job_area_tags, "RBI") ||
            arrayIncludes(job.job_area_tags, "Insurance") ||
            arrayIncludes(job.job_area_tags, "Cooperative_Banks")
          )) ||
          (filters.category === "Railway Jobs" && (
            job.recruitment_board.toLowerCase().includes("railway") ||
            job.recruitment_board.toLowerCase().includes("rrb") ||
            job.recruitment_board.toLowerCase().includes("metro") ||
            job.exam_or_post_name.toLowerCase().includes("railway") ||
            job.exam_or_post_name.toLowerCase().includes("rrb") ||
            job.exam_or_post_name.toLowerCase().includes("metro") ||
            arrayIncludes(job.job_area_tags, "Railway_Recruitment_Board") ||
            arrayIncludes(job.job_area_tags, "RRBI") ||
            arrayIncludes(job.job_area_tags, "Railway_Police") ||
            arrayIncludes(job.job_area_tags, "Metro_Rail")
          )) ||
          (filters.category === "Teaching Jobs" && (
            job.exam_or_post_name.toLowerCase().includes("teacher") ||
            job.exam_or_post_name.toLowerCase().includes("professor") ||
            job.exam_or_post_name.toLowerCase().includes("kvs") ||
            job.exam_or_post_name.toLowerCase().includes("nvs") ||
            job.exam_or_post_name.toLowerCase().includes("dsssb") ||
            job.exam_or_post_name.toLowerCase().includes("education") ||
            job.recruitment_board.toLowerCase().includes("education") ||
            arrayIncludes(job.job_area_tags, "School_Teacher") ||
            arrayIncludes(job.job_area_tags, "College_Professor") ||
            arrayIncludes(job.job_area_tags, "DSSSB") ||
            arrayIncludes(job.job_area_tags, "KVS") ||
            arrayIncludes(job.job_area_tags, "NVS") ||
            arrayIncludes(job.post_position_tags, "Teacher") ||
            arrayIncludes(job.post_position_tags, "School_Teacher") ||
            arrayIncludes(job.post_position_tags, "College_Professor_OR_College_Related_jobs_OR_university_Related_jobs") ||
            arrayIncludes(job.post_position_tags, "Assistant_Professor") ||
            arrayIncludes(job.post_position_tags, "Lecturer") ||
            arrayIncludes(job.post_position_tags, "Principal")
          )) ||
          (filters.category === "Engineering Jobs" && (
            job.exam_or_post_name.toLowerCase().includes("engineer") ||
            job.exam_or_post_name.toLowerCase().includes("technical") ||
            job.recruitment_board.toLowerCase().includes("drdo") ||
            job.recruitment_board.toLowerCase().includes("isro") ||
            job.qualification?.toLowerCase().includes("engineering") ||
            job.qualification?.toLowerCase().includes("b.tech") ||
            job.qualification?.toLowerCase().includes("b.e.") ||
            arrayIncludes(job.job_area_tags, "Civil_Engineering") ||
            arrayIncludes(job.job_area_tags, "Mechanical") ||
            arrayIncludes(job.job_area_tags, "Electrical") ||
            arrayIncludes(job.job_area_tags, "Computer_Science") ||
            arrayIncludes(job.post_position_tags, "Civil_Engineer") ||
            arrayIncludes(job.post_position_tags, "Mechanical_Engineer") ||
            arrayIncludes(job.post_position_tags, "Electrical_Engineer") ||
            arrayIncludes(job.post_position_tags, "Electronics_Engineer") ||
            arrayIncludes(job.post_position_tags, "Junior_Engineer") ||
            arrayIncludes(job.post_position_tags, "Assistant_Executive_Engineer") ||
            arrayIncludes(job.education_tags, "B.Tech") ||
            arrayIncludes(job.education_tags, "B.E") ||
            arrayIncludes(job.education_tags, "M.Tech") ||
            arrayIncludes(job.education_tags, "M.E")
          )) ||
          (filters.category === "Police/Defence Jobs" && (
            job.recruitment_board.toLowerCase().includes("police") ||
            job.recruitment_board.toLowerCase().includes("army") ||
            job.recruitment_board.toLowerCase().includes("navy") ||
            job.recruitment_board.toLowerCase().includes("air force") ||
            job.recruitment_board.toLowerCase().includes("bsf") ||
            job.recruitment_board.toLowerCase().includes("crpf") ||
            job.recruitment_board.toLowerCase().includes("cisf") ||
            job.recruitment_board.toLowerCase().includes("defence") ||
            job.exam_or_post_name.toLowerCase().includes("police") ||
            job.exam_or_post_name.toLowerCase().includes("constable") ||
            job.exam_or_post_name.toLowerCase().includes("defence") ||
            arrayIncludes(job.EmployerSectorTag, "Defense") ||
            arrayIncludes(job.post_position_tags, "Police_Officer") ||
            arrayIncludes(job.post_position_tags, "Constable") ||
            arrayIncludes(job.post_position_tags, "Sub-Inspector")
          ));

        // Education tags filter
        const matchesEducation = !filters.educationTags?.length ||
          filters.educationTags.some(tag => arrayIncludes(job.education_tags, tag));

        // Job type tags filter
        const matchesJobType = !filters.jobTypeTags?.length ||
          filters.jobTypeTags.some(tag => arrayIncludes(job.job_type_tags, tag));

        // Experience tags filter
        const matchesExperience = !filters.experienceTags?.length ||
          filters.experienceTags.some(tag => arrayIncludes(job.experience_level_tags, tag));

        return matchesSearch && matchesCategory && matchesEducation && matchesJobType && matchesExperience;
      }) as Job[];

      // Sort based on whether it's a state-specific page or homepage
      if (filters.isStateSpecific && filters.state && filters.state !== 'All India') {
        // State pages: state-specific jobs first, then All India jobs
        filteredData.sort((a, b) => {
          const aIsStateSpecific = a.state === filters.state && !a.Is_All_India;
          const bIsStateSpecific = b.state === filters.state && !b.Is_All_India;
          
          if (aIsStateSpecific && !bIsStateSpecific) return -1;
          if (!aIsStateSpecific && bIsStateSpecific) return 1;
          return 0;
        });
      } else if (filters.category !== "State Govt Jobs") {
        // Homepage: Show ONLY All India jobs (unless searching for State Govt Jobs)
        filteredData = filteredData.filter(job => job.Is_All_India === true);
        
        // Sort by post_date descending for All India jobs
        filteredData.sort((a, b) => {
          const dateA = new Date(a.post_date || a.updated_at).getTime();
          const dateB = new Date(b.post_date || b.updated_at).getTime();
          return dateB - dateA;
        });
      } else {
        // State Govt Jobs category: Show both state-specific AND All India jobs
        // Sort by post_date descending
        filteredData.sort((a, b) => {
          const dateA = new Date(a.post_date || a.updated_at).getTime();
          const dateB = new Date(b.post_date || b.updated_at).getTime();
          return dateB - dateA;
        });
      }

      return filteredData;
}