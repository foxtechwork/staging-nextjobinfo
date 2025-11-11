-- Add new columns to jobs_data table
ALTER TABLE public.jobs_data 
ADD COLUMN education_tags JSONB DEFAULT '[]'::jsonb,
ADD COLUMN job_type_tags JSONB DEFAULT '[]'::jsonb,
ADD COLUMN job_area_tags JSONB DEFAULT '[]'::jsonb,
ADD COLUMN experience_level_tags JSONB DEFAULT '[]'::jsonb,
ADD COLUMN post_position_tags JSONB DEFAULT '[]'::jsonb,
ADD COLUMN job_posting_deadline_tags JSONB DEFAULT '[]'::jsonb,
ADD COLUMN is_active BOOLEAN DEFAULT true,
ADD COLUMN row_html TEXT;

-- Initial sync of existing row_html data from job_details to jobs_data
UPDATE public.jobs_data 
SET row_html = jd.row_html
FROM public.job_details jd
WHERE jobs_data.job_id = jd.job_id;