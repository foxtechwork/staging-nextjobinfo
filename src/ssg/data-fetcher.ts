import * as fs from 'fs';
import * as path from 'path';

// Load pre-fetched data from local JSON file (no Supabase calls during SSG)
let cachedData: any = null;

function loadCachedData() {
  if (cachedData) return cachedData;
  
  try {
    const dataPath = path.join(process.cwd(), 'ssg-data.json');
    if (!fs.existsSync(dataPath)) {
      console.error('❌ ssg-data.json not found. Run npm run fetch-data first.');
      return {
        jobs: [],
        news: [],
        stats: { 
          totalJobs: 0, 
          thisWeekJobs: 0, 
          stateWiseJobs: {}, 
          totalApplications: 0, 
          successRate: 87,
          totalVacancies: 0,
          allIndiaVacancies: 0,
          stateWiseData: []
        }
      };
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    cachedData = JSON.parse(fileContent);
    console.log(`✅ Loaded ${cachedData.jobs?.length || 0} jobs from local cache (${cachedData.fetchedAt})`);
    return cachedData;
  } catch (error) {
    console.error('❌ Error loading cached data:', error);
    return {
      jobs: [],
      news: [],
      stats: { 
        totalJobs: 0, 
        thisWeekJobs: 0, 
        stateWiseJobs: {}, 
        totalApplications: 0, 
        successRate: 87,
        totalVacancies: 0,
        allIndiaVacancies: 0,
        stateWiseData: []
      }
    };
  }
}

// NOTE: We NO LONGER strip HTML fields from jobs.
// This ensures client-side navigation works without page reloads.
// The full HTML is needed when users navigate from homepage/list to job details.
// SSG pages are compressed with gzip/brotli which handles repetitive HTML well.

export async function fetchPageData(route: string) {
  try {
    // Load data from local cache (NO Supabase calls during SSG!)
    const cachedData = loadCachedData();
    
    const data: any = {
      news: cachedData.news || [],
      stats: cachedData.stats || { 
        totalJobs: 0, 
        thisWeekJobs: 0, 
        stateWiseJobs: {}, 
        totalApplications: 0, 
        successRate: 87,
        totalVacancies: 0,
        allIndiaVacancies: 0,
        stateWiseData: []
      }
    };

    const allJobs = cachedData.jobs || [];

    // Include ALL jobs with FULL HTML on every page
    // This ensures client-side navigation works without needing network calls
    // The data is compressed by gzip/brotli which handles HTML efficiently
    data.jobs = allJobs;

    // For job detail pages - also set currentJob for direct access
    if (route.startsWith('/job/')) {
      const pageLink = route.replace('/job/', '');
      
      // Find the specific job from cached data (FULL HTML for display)
      const currentJob = allJobs.find(
        (job: any) => job.page_link === pageLink && job.is_active
      );

      if (currentJob) {
        data.currentJob = currentJob;
      }
    }

    return data;
  } catch (error) {
    console.error(`Error fetching data for ${route}:`, error);
    return {
      news: [],
      stats: { 
        totalJobs: 0, 
        thisWeekJobs: 0, 
        stateWiseJobs: {}, 
        totalApplications: 0, 
        successRate: 87,
        totalVacancies: 0,
        allIndiaVacancies: 0,
        stateWiseData: []
      },
      jobs: [],
      currentJob: null
    };
  }
}

// This function is no longer needed as stats are pre-calculated in fetch-data.ts
// Keeping it for reference but it's not used anymore
