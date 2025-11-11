-- Add missing columns to job_details table
ALTER TABLE public.job_details 
ADD COLUMN post_date DATE,
ADD COLUMN recruitment_board TEXT,
ADD COLUMN exam_or_post_name TEXT,
ADD COLUMN advt_no TEXT;

-- Add index on page_link in jobs_data table for faster lookups
CREATE INDEX IF NOT EXISTS idx_jobs_data_page_link ON public.jobs_data(page_link);

-- Update job_details with data from jobs_data table
UPDATE public.job_details 
SET 
    post_date = jd.post_date,
    recruitment_board = jd.recruitment_board,
    exam_or_post_name = jd.exam_or_post_name,
    advt_no = jd.advt_no
FROM public.jobs_data jd 
WHERE job_details.job_id = jd.job_id;