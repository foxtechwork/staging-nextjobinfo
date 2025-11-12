import { useMemo } from 'react';
import type { Job } from './useJobs';
import type { Json } from '@/integrations/supabase/types';

// Memoized filter functions for better performance
export const useOptimizedFilters = (
  jobs: Job[],
  searchQuery: string,
  filters: {
    category?: string;
    state?: string;
    educationTags?: string[];
    jobTypeTags?: string[];
    experienceTags?: string[];
    isStateSpecific?: boolean;
  }
) => {
  return useMemo(() => {
    if (!jobs || jobs.length === 0) return [];

    // Helper function to safely check arrays
    const arrayIncludes = (arr: Json | null, searchTerm: string): boolean => {
      if (!arr || !Array.isArray(arr)) return false;
      return arr.some((item: any) => 
        typeof item === 'string' && item.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    // Apply all filters
    let filteredData = jobs.filter(job => {
      // Search query filter
      const matchesSearch = !searchQuery || 
        job.exam_or_post_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.recruitment_board.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.state && job.state.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.qualification && job.qualification.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.advt_no && job.advt_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
        arrayIncludes(job.education_tags, searchQuery) ||
        arrayIncludes(job.job_type_tags, searchQuery) ||
        arrayIncludes(job.job_area_tags, searchQuery) ||
        arrayIncludes(job.experience_level_tags, searchQuery) ||
        arrayIncludes(job.post_position_tags, searchQuery);

      // Category filter
      const matchesCategory = !filters.category || filters.category === "All India Govt Jobs" ||
        (filters.category === "State Govt Jobs" && (job.state !== "All India" || job.Is_All_India === true)) ||
        (filters.category === "Bank Jobs" && (
          job.recruitment_board.toLowerCase().includes("bank") ||
          job.exam_or_post_name.toLowerCase().includes("bank") ||
          arrayIncludes(job.job_area_tags, "SBI") ||
          arrayIncludes(job.job_area_tags, "IBPS") ||
          arrayIncludes(job.job_area_tags, "RBI")
        )) ||
        (filters.category === "Railway Jobs" && (
          job.recruitment_board.toLowerCase().includes("railway") ||
          job.recruitment_board.toLowerCase().includes("rrb") ||
          job.exam_or_post_name.toLowerCase().includes("railway") ||
          arrayIncludes(job.job_area_tags, "Railway_Recruitment_Board")
        )) ||
        (filters.category === "Teaching Jobs" && (
          job.exam_or_post_name.toLowerCase().includes("teacher") ||
          job.exam_or_post_name.toLowerCase().includes("professor") ||
          arrayIncludes(job.job_area_tags, "School_Teacher") ||
          arrayIncludes(job.post_position_tags, "Teacher")
        )) ||
        (filters.category === "Engineering Jobs" && (
          job.exam_or_post_name.toLowerCase().includes("engineer") ||
          job.qualification?.toLowerCase().includes("engineering") ||
          arrayIncludes(job.job_area_tags, "Civil_Engineering") ||
          arrayIncludes(job.education_tags, "B.Tech")
        )) ||
        (filters.category === "Police/Defence Jobs" && (
          job.recruitment_board.toLowerCase().includes("police") ||
          job.recruitment_board.toLowerCase().includes("defence") ||
          job.exam_or_post_name.toLowerCase().includes("police") ||
          arrayIncludes(job.post_position_tags, "Police_Officer")
        ));

      return matchesSearch && matchesCategory;
    });

    // Sort logic
    if (filters.isStateSpecific && filters.state && filters.state !== 'All India') {
      filteredData.sort((a, b) => {
        const aIsStateSpecific = a.state === filters.state && !a.Is_All_India;
        const bIsStateSpecific = b.state === filters.state && !b.Is_All_India;
        if (aIsStateSpecific && !bIsStateSpecific) return -1;
        if (!aIsStateSpecific && bIsStateSpecific) return 1;
        return 0;
      });
    } else if (filters.category !== "State Govt Jobs") {
      // Homepage: Show ONLY All India jobs
      filteredData = filteredData.filter(job => job.Is_All_India === true);
      filteredData.sort((a, b) => {
        const dateA = new Date(a.post_date || a.updated_at).getTime();
        const dateB = new Date(b.post_date || b.updated_at).getTime();
        return dateB - dateA;
      });
    } else {
      filteredData.sort((a, b) => {
        const dateA = new Date(a.post_date || a.updated_at).getTime();
        const dateB = new Date(b.post_date || b.updated_at).getTime();
        return dateB - dateA;
      });
    }

    return filteredData;
  }, [jobs, searchQuery, filters.category, filters.state, filters.isStateSpecific]);
};
