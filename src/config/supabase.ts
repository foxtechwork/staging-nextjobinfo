// Centralized Supabase configuration
// Update these values here and they'll be reflected across the entire application

// Detect environment: Node.js build scripts vs Browser
const isBrowser = typeof window !== 'undefined';
const isViteDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV;
const isBuildTime = !isBrowser; // Node.js scripts during build

// IMPORTANT: 
// - Build scripts (Node.js) NEED credentials to fetch SSG data
// - Browser in DEV mode needs credentials for live queries
// - Browser in PROD mode should NOT have credentials (uses SSG cache)

const SUPABASE_URL_VALUE = 'https://uertiqcxcbsqkzymguzy.supabase.co';
const SUPABASE_KEY_VALUE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlcnRpcWN4Y2JzcWt6eW1ndXp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODI5NTc2MCwiZXhwIjoyMDczODcxNzYwfQ.zt6IgAa2YiT33-05XQOzrASl7D5xkd0D3AZOp5O3WXU';

export const SUPABASE_URL = (isBuildTime || isViteDev) ? SUPABASE_URL_VALUE : 'https://uertiqcxcbsqkzymguzy.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = (isBuildTime || isViteDev) ? SUPABASE_KEY_VALUE : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlcnRpcWN4Y2JzcWt6eW1ndXp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODI5NTc2MCwiZXhwIjoyMDczODcxNzYwfQ.zt6IgAa2YiT33-05XQOzrASl7D5xkd0D3AZOp5O3WXU';

// Helper function to get environment variable with fallback
export const getSupabaseUrl = () => {
  // Available during: build time (Node.js) and browser dev mode
  // Hidden in: browser production mode
  return SUPABASE_URL;
};

export const getSupabaseKey = () => {
  // Available during: build time (Node.js) and browser dev mode
  // Hidden in: browser production mode
  return SUPABASE_PUBLISHABLE_KEY;
};
