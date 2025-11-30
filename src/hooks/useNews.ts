import { useQuery } from "@tanstack/react-query";

// Lazy import Supabase only in dev mode to prevent bundling in production
const getSupabaseClient = async () => {
  if (import.meta.env.PROD) {
    throw new Error('Supabase should not be called in production SSG mode');
  }
  const { supabase } = await import('@/integrations/supabase/client');
  return supabase;
};

export interface News {
  id: string;
  title: string;
  short_description: string;
  time_updated: string;
  source_link: string | null;
  type: string;
  is_active: boolean;
  created_at: string;
}

export const useNews = () => {
  const ssgNews = typeof window !== 'undefined' && window.__SSG_DATA__?.news 
    ? window.__SSG_DATA__.news 
    : undefined;

  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      console.log('📰 useNews: Fetching from Supabase (dev mode only)');
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as News[];
    },
    // CRITICAL: In production, ALWAYS disabled
    enabled: import.meta.env.PROD ? false : !ssgNews,
    initialData: ssgNews,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
