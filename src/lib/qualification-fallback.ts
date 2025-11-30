import type { Json } from '@/integrations/supabase/types';

/**
 * Gets qualification display text with fallback to education_tags
 * If qualification is NULL/empty, extracts and formats education_tags array
 * 
 * @param qualification - The qualification field value
 * @param educationTags - The education_tags array field (can be Json type from Supabase)
 * @param fallbackText - Text to show if both are empty (default: "Check Official Notification")
 * @returns Formatted qualification string
 */
export function getQualificationDisplay(
  qualification: string | null | undefined,
  educationTags: Json | string[] | null | undefined,
  fallbackText: string = "Check Official Notification"
): string {
  // If qualification exists and is not empty, use it
  if (qualification && qualification.trim() !== "") {
    return qualification;
  }

  // Fallback to education_tags if available
  // Handle Json type from Supabase - need to verify it's actually an array of strings
  if (educationTags && Array.isArray(educationTags) && educationTags.length > 0) {
    // Clean up tags: filter only strings, replace underscores with spaces, format nicely
    const formattedTags: string[] = [];
    for (const tag of educationTags) {
      if (typeof tag === 'string') {
        const formatted = tag.replace(/_/g, ' ').trim();
        if (formatted !== "") {
          formattedTags.push(formatted);
        }
      }
    }
    
    if (formattedTags.length > 0) {
      return formattedTags.join(', ');
    }
  }

  // Final fallback
  return fallbackText;
}

/**
 * Check if qualification data is available (either from qualification or education_tags)
 */
export function hasQualificationData(
  qualification: string | null | undefined,
  educationTags: Json | string[] | null | undefined
): boolean {
  if (qualification && qualification.trim() !== "") {
    return true;
  }
  if (educationTags && Array.isArray(educationTags)) {
    return educationTags.some(tag => typeof tag === 'string' && tag.trim() !== "");
  }
  return false;
}
