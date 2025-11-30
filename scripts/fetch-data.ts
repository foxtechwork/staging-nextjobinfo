import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../src/config/supabase';

// Create Supabase client for data fetching
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'fetch-data-supabase-auth',
    storage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    }
  }
});

// Sanitize HTML to remove malicious scripts
function sanitizeHtml(html: string | null): string {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
    .replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '');
}

// Sanitize all job data HTML fields
function sanitizeJobsData(jobs: any[]): any[] {
  return jobs.map(job => ({
    ...job,
    raw_html_1: sanitizeHtml(job.raw_html_1),
    raw_html_2: sanitizeHtml(job.raw_html_2),
    raw_html_3: sanitizeHtml(job.raw_html_3),
    raw_html_4: sanitizeHtml(job.raw_html_4),
    raw_html_5: sanitizeHtml(job.raw_html_5),
  }));
}

async function fetchAllData() {
  console.log('🔍 Starting data fetch from Supabase...\n');
  const startTime = Date.now();

  try {
    // Fetch news data (small dataset, no chunking needed)
    console.log('📰 Fetching news data...');
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(100);

    if (newsError) {
      console.error('❌ Error fetching news:', newsError);
    } else {
      console.log(`✅ Fetched ${newsData?.length || 0} news items`);
    }

    // Fetch jobs data in chunks
    console.log('\n💼 Fetching jobs data in chunks...');
    const CHUNK_SIZE = 200;
    let allJobs: any[] = [];
    let offset = 0;
    let hasMore = true;
    let chunkNum = 1;

    while (hasMore) {
      console.log(`   📦 Fetching chunk ${chunkNum} (offset: ${offset}, limit: ${CHUNK_SIZE})...`);
      
      const { data: jobsChunk, error: jobsError } = await supabase
        .from('jobs_data')
        .select('*')
        .eq('is_active', true)
        .order('last_date', { ascending: false })
        .range(offset, offset + CHUNK_SIZE - 1);

      if (jobsError) {
        console.error(`   ❌ Error fetching jobs chunk ${chunkNum}:`, jobsError);
        break;
      }

      if (!jobsChunk || jobsChunk.length === 0) {
        hasMore = false;
        console.log(`   ✅ No more data (chunk ${chunkNum} returned 0 items)`);
      } else {
        allJobs = [...allJobs, ...jobsChunk];
        console.log(`   ✅ Fetched ${jobsChunk.length} jobs (total: ${allJobs.length})`);
        
        if (jobsChunk.length < CHUNK_SIZE) {
          hasMore = false;
          console.log(`   ✅ Last chunk received (less than ${CHUNK_SIZE} items)`);
        } else {
          offset += CHUNK_SIZE;
          chunkNum++;
        }
      }
    }

    console.log(`\n✅ Total jobs fetched: ${allJobs.length}`);

    // Sanitize job data
    console.log('\n🧹 Sanitizing job data...');
    const sanitizedJobs = sanitizeJobsData(allJobs);
    console.log('✅ Job data sanitized');

    // Fetch stats data (for job statistics)
    console.log('\n📊 Fetching stats data...');
    const { data: statsData, error: statsError } = await supabase
      .from('jobs_data')
      .select('state, total_posts, Is_All_India, is_active, post_date')
      .eq('is_active', true);

    if (statsError) {
      console.error('❌ Error fetching stats:', statsError);
    } else {
      console.log(`✅ Fetched stats for ${statsData?.length || 0} jobs`);
    }

    // Calculate statistics
    console.log('\n🧮 Calculating statistics...');
    const stats = calculateStats(statsData || []);
    console.log('✅ Statistics calculated');

    // Prepare final data structure
    const finalData = {
      fetchedAt: new Date().toISOString(),
      totalJobs: sanitizedJobs.length,
      jobs: sanitizedJobs,
      news: newsData || [],
      stats: stats
    };

    // Save to local JSON file
    const outputPath = path.join(process.cwd(), 'ssg-data.json');
    console.log(`\n💾 Saving data to ${outputPath}...`);
    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const fileSize = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Data Fetch Complete!');
    console.log('='.repeat(60));
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`💼 Jobs: ${sanitizedJobs.length}`);
    console.log(`📰 News: ${newsData?.length || 0}`);
    console.log(`📊 Stats: Calculated`);
    console.log(`💾 File size: ${fileSize} MB`);
    console.log(`📁 Saved to: ${outputPath}`);
    console.log('='.repeat(60) + '\n');

    return finalData;
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    process.exit(1);
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

fetchAllData().catch(console.error);
