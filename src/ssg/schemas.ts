import { z } from 'zod';

// Base schemas for reusable fields
const urlSchema = z.string().url().or(z.string().startsWith('/')).optional().nullable();
const dateSchema = z.string().optional().nullable();

// Job Schema - matches Supabase jobs_data table structure
export const JobSchema = z.object({
  job_id: z.string(),
  exam_or_post_name: z.string().min(10).max(500),
  page_link: z.string().min(1).nullable(),
  recruitment_board: z.string().min(1),
  state: z.string().nullable(),
  total_posts: z.number().optional().nullable(),
  qualification: z.string().optional().nullable(),
  last_date: dateSchema,
  Is_All_India: z.boolean().default(false).optional().nullable(),
  created_at: dateSchema,
  is_active: z.boolean().default(true).optional().nullable(),
  post_date: dateSchema,
  advt_no: z.string().optional().nullable(),
  updated_at: dateSchema,
  
  // Tag fields
  education_tags: z.any().optional().nullable(),
  EmployerSectorTag: z.any().optional().nullable(),
  experience_level_tags: z.any().optional().nullable(),
  job_area_tags: z.any().optional().nullable(),
  job_posting_deadline_tags: z.any().optional().nullable(),
  job_type_tags: z.any().optional().nullable(),
  post_position_tags: z.any().optional().nullable(),
  
  // HTML content fields
  raw_html_1: z.string().optional().nullable(),
  raw_html_2: z.string().optional().nullable(),
  raw_html_3: z.string().optional().nullable(),
  raw_html_4: z.string().optional().nullable(),
  raw_html_5: z.string().optional().nullable(),
});

export type Job = z.infer<typeof JobSchema>;

// News Schema
export const NewsSchema = z.object({
  id: z.string(),
  title: z.string().min(5).max(200),
  short_description: z.string().min(10),
  time_updated: z.string(),
  created_at: dateSchema,
  updated_at: dateSchema,
  is_active: z.boolean().optional().nullable(),
  type: z.string().optional().nullable(),
  source_link: z.string().optional().nullable(),
});

export type News = z.infer<typeof NewsSchema>;

// Stats Schema
export const StatsSchema = z.object({
  totalJobs: z.number().int().nonnegative(),
  thisWeekJobs: z.number().int().nonnegative(),
  stateWiseJobs: z.record(z.string(), z.number()).optional(),
  totalApplications: z.number().int().nonnegative().optional(),
  successRate: z.number().min(0).max(100).optional(),
  totalVacancies: z.number().int().nonnegative().optional(),
  allIndiaVacancies: z.number().int().nonnegative().optional(),
  stateWiseData: z.array(z.object({
    state: z.string(),
    jobCount: z.number(),
    totalPosts: z.number(),
  })).optional(),
});

export type Stats = z.infer<typeof StatsSchema>;

// Page Data Schema (for SSG)
export const PageDataSchema = z.object({
  jobs: z.array(JobSchema).optional(),
  news: z.array(NewsSchema).optional(),
  stats: StatsSchema.optional(),
  currentJob: JobSchema.optional().nullable(),
});

export type PageData = z.infer<typeof PageDataSchema>;
