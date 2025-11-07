// Centralized Supabase configuration
// Update these values here and they'll be reflected across the entire application

export const SUPABASE_URL = 'https://bgshoswlkpxbmemzwwip.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnc2hvc3dsa3B4Ym1lbXp3d2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNDAwODcsImV4cCI6MjA3NzgxNjA4N30.b20Dh-Ken4bIp56G5DuZdCwDqA6DkOUl2qv9RFX3pQM';

// Helper function to get environment variable with fallback
export const getSupabaseUrl = () => {
  if (typeof window === 'undefined') {
    // Node.js environment (SSR/SSG)
    return process.env.VITE_SUPABASE_URL || SUPABASE_URL;
  }
  // Browser environment
  return (import.meta.env as any).VITE_SUPABASE_URL || SUPABASE_URL;
};

export const getSupabaseKey = () => {
  if (typeof window === 'undefined') {
    // Node.js environment (SSR/SSG)
    return process.env.VITE_SUPABASE_PUBLISHABLE_KEY || SUPABASE_PUBLISHABLE_KEY;
  }
  // Browser environment
  return (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY || SUPABASE_PUBLISHABLE_KEY;
};
