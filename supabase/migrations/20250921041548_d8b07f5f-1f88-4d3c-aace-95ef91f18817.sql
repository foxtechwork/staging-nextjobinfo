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

-- Create function to sync row_html from job_details to jobs_data
CREATE OR REPLACE FUNCTION public.sync_row_html_to_jobs_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Update jobs_data with row_html from job_details
  UPDATE public.jobs_data 
  SET row_html = NEW.row_html,
      updated_at = now()
  WHERE job_id = NEW.job_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to sync updates from jobs_data to job_details
CREATE OR REPLACE FUNCTION public.sync_jobs_data_to_job_details()
RETURNS TRIGGER AS $$
BEGIN
  -- Update job_details with common fields from jobs_data
  UPDATE public.job_details 
  SET exam_or_post_name = NEW.exam_or_post_name,
      post_date = NEW.post_date,
      recruitment_board = NEW.recruitment_board,
      advt_no = NEW.advt_no,
      updated_at = now()
  WHERE job_id = NEW.job_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for job_details updates to sync row_html to jobs_data
CREATE OR REPLACE TRIGGER sync_row_html_trigger
  AFTER INSERT OR UPDATE ON public.job_details
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_row_html_to_jobs_data();

-- Create trigger for jobs_data updates to sync to job_details
CREATE OR REPLACE TRIGGER sync_jobs_data_trigger
  AFTER UPDATE ON public.jobs_data
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_jobs_data_to_job_details();

-- Initial sync of existing row_html data from job_details to jobs_data
UPDATE public.jobs_data 
SET row_html = jd.row_html
FROM public.job_details jd
WHERE jobs_data.job_id = jd.job_id;