// Centralized Supabase configuration
// IMPORTANT: Only used during SSG build time - NOT included in production bundle

// These credentials are ONLY used during `npm run build:ssg` to fetch data
// They are NOT included in the browser bundle for production
export const SUPABASE_URL = 'https://yvefwcmovrjxcrtllwww.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZWZ3Y21vdnJqeGNydGxsd3d3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI0MzYyOSwiZXhwIjoyMDc5ODE5NjI5fQ.MeFcORseYSRaMf6K_TL_yhmhXEgRxJ5VZkCNF6WC-fQ';

export const getSupabaseUrl = () => SUPABASE_URL;
export const getSupabaseKey = () => SUPABASE_PUBLISHABLE_KEY;
