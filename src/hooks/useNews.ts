import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  const queryClient = useQueryClient();
  const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV;
  
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      // Only fetch in development mode
      if (isDev) {
        console.warn('⚠️ [useNews] Fetching from Supabase (DEV mode)');
        
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("is_active", true)
          .order("updated_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        return data as News[];
      }
      
      // Production - should never reach here
      throw new Error('Production mode should use SSG data only');
    },
    initialData: () => {
      // Check cache FIRST - prevents loading state
      const cached = queryClient.getQueryData<News[]>(["news"]);
      if (cached) {
        console.log('✅ Using SSG cached news');
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
