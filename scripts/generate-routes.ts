import * as fs from 'fs';
import * as path from 'path';

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

// 🚀 PRODUCTION MODE: Generate ALL job routes
// Uncomment the line below to enable testing mode with limited routes
// const TESTING_LIMIT = 10;

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

  // Load job routes from cached data (no database calls!)
  console.log('💼 Loading job routes from cached data...');
  try {
    const dataPath = path.join(process.cwd(), 'ssg-data.json');
    
    if (!fs.existsSync(dataPath)) {
      console.error('❌ ssg-data.json not found. Run npm run fetch-data first.');
      process.exit(1);
    }
    
    const cachedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const jobs = cachedData.jobs || [];
    
    console.log(`✅ Found ${jobs.length} job listings in cached data`);
    
    // Apply TESTING_LIMIT if defined
    const limitedJobs = typeof TESTING_LIMIT !== 'undefined' ? jobs.slice(0, TESTING_LIMIT) : jobs;
    
    if (typeof TESTING_LIMIT !== 'undefined') {
      console.log(`⚠️ TESTING MODE: Limiting to ${TESTING_LIMIT} jobs`);
    }
    
    limitedJobs.forEach((job: any) => {
      if (job.page_link && job.is_active) {
        // Extract the job identifier from the page_link
        const jobId = job.page_link.split('/').pop() || job.page_link;
        routes.push(`/job/${encodeURIComponent(jobId)}`);
      }
    });
  } catch (error) {
    console.error('❌ Error loading cached job data:', error);
    process.exit(1);
  }


  // Write routes to file
  const outputPath = path.join(process.cwd(), 'static-routes.json');
  fs.writeFileSync(outputPath, JSON.stringify(routes, null, 2));
  
  console.log(`✅ Generated ${routes.length} routes`);
  console.log(`📝 Routes saved to: ${outputPath}`);
  
  return routes;
}

generateRoutes().catch(console.error);
