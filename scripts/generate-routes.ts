import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../src/config/supabase';

// Use environment variables if available, otherwise use centralized config
const SUPABASE_API_URL = process.env.VITE_SUPABASE_URL || SUPABASE_URL;
const SUPABASE_API_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || SUPABASE_PUBLISHABLE_KEY;

// Create Supabase client for route generation (no auth needed)
const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'routes-gen-supabase-auth', // Unique storage key
  }
});

const stateNames: Record<string, string> = {
  "ap": "Andhra Pradesh",
  "ar": "Arunachal Pradesh",
  "as": "Assam",
  "br": "Bihar",
  "cg": "Chhattisgarh",
  "ga": "Goa",
  "gj": "Gujarat",
  "hr": "Haryana",
  "hp": "Himachal Pradesh",
  "jh": "Jharkhand",
  "ka": "Karnataka",
  "kl": "Kerala",
  "mp": "Madhya Pradesh",
  "mh": "Maharashtra",
  "mn": "Manipur",
  "ml": "Meghalaya",
  "mz": "Mizoram",
  "nl": "Nagaland",
  "od": "Odisha",
  "pb": "Punjab",
  "rj": "Rajasthan",
  "sk": "Sikkim",
  "tn": "Tamil Nadu",
  "tg": "Telangana",
  "tr": "Tripura",
  "up": "Uttar Pradesh",
  "uk": "Uttarakhand",
  "wb": "West Bengal",
  "an": "Andaman and Nicobar",
  "ch": "Chandigarh",
  "dndd": "Dadra and Nagar Haveli and Daman and Diu",
  "dl": "Delhi",
  "jk": "Jammu and Kashmir",
  "la": "Ladakh",
  "ld": "Lakshadweep",
  "py": "Puducherry"
};

const categoryMapping: Record<string, string> = {
  "banking": "Banking",
  "railway": "Railway",
  "ssc": "SSC",
  "upsc": "UPSC",
  "teaching": "Teaching",
  "police": "Police",
  "defence": "Defence",
  "medical": "Medical",
  "engineering": "Engineering",
  "law": "Law"
};

async function generateRoutes() {
  console.log('🚀 Generating static routes...');
  
  const routes: string[] = [
    '/',
    '/state-selection',
    '/support',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/sitemap',
    '/tips',
    '/career',
    '/interview-prep',
    '/resume',
    '/study-material',
    '/mock-tests',
    '/admit-cards',
    '/results',
    '/syllabus',
    '/answer-keys',
    '/cutoff',
    '/merit-list',
  ];

  // Add state routes
  console.log('📍 Adding state routes...');
  Object.keys(stateNames).forEach(stateCode => {
    routes.push(`/state-jobs/${stateCode}`);
  });

  // Add category routes
  console.log('📂 Adding category routes...');
  Object.keys(categoryMapping).forEach(category => {
    routes.push(`/category/${category}`);
  });

  // Fetch all job page links from database
  console.log('💼 Fetching job routes from database...');
  try {
    // TESTING MODE: Limit to 10 job pages for faster builds
    const TESTING_LIMIT = 10;
    
    const { data: jobs, error } = await supabase
      .from('jobs_data')
      .select('page_link')
      .eq('is_active', true)
      .not('page_link', 'is', null)
      .limit(TESTING_LIMIT); // Comment out this line to generate all job pages

    if (error) {
      console.error('❌ Error fetching jobs:', error);
    } else if (jobs && jobs.length > 0) {
      console.log(`✅ Found ${jobs.length} job listings (TESTING MODE: Limited to ${TESTING_LIMIT})`);
      jobs.forEach(job => {
        if (job.page_link) {
          // Extract the job identifier from the page_link
          const jobId = job.page_link.split('/').pop() || job.page_link;
          routes.push(`/job/${encodeURIComponent(jobId)}`);
        }
      });
    }
  } catch (error) {
    console.error('❌ Error fetching job data:', error);
  }

  // Write routes to file
  const outputPath = path.join(process.cwd(), 'static-routes.json');
  fs.writeFileSync(outputPath, JSON.stringify(routes, null, 2));
  
  console.log(`✅ Generated ${routes.length} routes`);
  console.log(`📝 Routes saved to: ${outputPath}`);
  
  return routes;
}

generateRoutes().catch(console.error);
