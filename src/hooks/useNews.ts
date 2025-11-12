import { useQuery } from "@tanstack/react-query";
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
  const ssgNews = typeof window !== 'undefined' && window.__SSG_DATA__?.news 
    ? window.__SSG_DATA__.news 
    : undefined;

  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as News[];
    },
    enabled: !ssgNews, // Disable query if SSG data exists
    initialData: ssgNews,
  });
};
