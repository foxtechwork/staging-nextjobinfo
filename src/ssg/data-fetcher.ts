import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../config/supabase';
import { JobSchema, NewsSchema, StatsSchema, PageDataSchema } from './schemas';
import type { PageData } from './schemas';
import { z } from 'zod';

// Create a simple Supabase client for SSG without auth (prevents GoTrueClient warnings)
// Using a single storage key to prevent multiple GoTrueClient instances
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'ssg-supabase-auth', // Unique storage key for SSG client
    storage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    }
  }
});

export async function fetchPageData(route: string): Promise<PageData> {
  try {
    // Always fetch news and stats for all pages
    const [newsResult, statsResult] = await Promise.all([
      supabase
        .from('news')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(5),
      supabase
        .from('jobs_data')
        .select('state, total_posts, Is_All_India, is_active, post_date')
        .eq('is_active', true)
    ]);

    // Validate news data with Zod
    let validatedNews;
    try {
      validatedNews = z.array(NewsSchema).parse(newsResult.data || []);
    } catch (zodError: any) {
      console.warn(`⚠️ News validation failed for ${route}:`, zodError.message);
      validatedNews = []; // Use empty array as fallback
    }

    const data: PageData = {
      news: validatedNews,
      stats: calculateStats(statsResult.data || [])
    };

    // Fetch all jobs for homepage and category pages
    if (route === '/' || route.startsWith('/category/') || route.startsWith('/state-jobs/')) {
      const jobsResult = await supabase
        .from('jobs_data')
        .select('*')
        .eq('is_active', true)
        .order('post_date', { ascending: false });
      
      // Validate jobs data with Zod
      try {
        data.jobs = z.array(JobSchema).parse(jobsResult.data || []);
      } catch (zodError: any) {
        console.error(`❌ Jobs validation failed for ${route}:`, zodError.message);
        throw new Error(`Invalid jobs data: ${zodError.message}`);
      }
    }

    // Fetch specific job for job detail pages
    if (route.startsWith('/job/')) {
      const pageLink = route.replace('/job/', '');

      // Fetch the specific job for this details page
      const jobResult = await supabase
        .from('jobs_data')
        .select('*')
        .eq('page_link', pageLink)
        .eq('is_active', true)
        .maybeSingle();

      if (jobResult.data) {
        // Validate single job with Zod
        try {
          data.currentJob = JobSchema.parse(jobResult.data);
        } catch (zodError: any) {
          console.error(`❌ Job validation failed for ${route}:`, zodError.message);
          throw new Error(`Invalid job data: ${zodError.message}`);
        }
      }

      // Also fetch a list of recent jobs so sidebars and lists have SSG data
      // This prevents any runtime Supabase calls on details pages as well
      const jobsResult = await supabase
        .from('jobs_data')
        .select('*')
        .eq('is_active', true)
        .order('post_date', { ascending: false });

      // Validate jobs list
      try {
        data.jobs = z.array(JobSchema).parse(jobsResult.data || []);
      } catch (zodError: any) {
        console.warn(`⚠️ Jobs list validation failed for ${route}:`, zodError.message);
        data.jobs = []; // Fallback to empty array
      }
    }

    // Final validation of entire page data
    const validated = PageDataSchema.parse(data);
    return validated;
  } catch (error) {
    console.error(`Error fetching data for ${route}:`, error);
    return {
      news: [],
      stats: { totalJobs: 0, thisWeekJobs: 0, stateWiseJobs: {}, totalApplications: 0, successRate: 87 },
      jobs: [],
      currentJob: null
    };
  }
}

function calculateStats(data: any[]) {
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

  // Calculate total vacancies (sum of all total_posts)
  const totalVacancies = data.reduce((sum, job) => sum + (job.total_posts || 0), 0);

  // Calculate All India vacancies
  const allIndiaVacancies = data
    .filter(job => job.Is_All_India === true)
    .reduce((sum, job) => sum + (job.total_posts || 0), 0);

  // Group by state and calculate vacancy counts (exclude All India jobs to avoid double counting)
  const stateMap = new Map<string, { jobCount: number; totalPosts: number }>();
  
  data.forEach(job => {
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
  const stateWiseData = Array.from(stateMap.entries()).map(
    ([state, data]) => ({
      state,
      jobCount: data.jobCount,
      totalPosts: data.totalPosts + allIndiaVacancies,
    })
  );

  return {
    totalJobs,
    thisWeekJobs,
    stateWiseJobs,
    totalApplications: Math.floor(totalJobs * 50 + Math.random() * 1000),
    successRate: 87,
    // Add vacancy stats for useJobStats hook
    totalVacancies,
    allIndiaVacancies,
    stateWiseData,
  };
}
