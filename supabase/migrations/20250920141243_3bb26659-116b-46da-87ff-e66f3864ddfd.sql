-- Add posts/vacancies column to jobs_data table
ALTER TABLE public.jobs_data 
ADD COLUMN total_posts INTEGER DEFAULT 1;