-- Create jobs_data table that matches the frontend Job interface
CREATE TABLE IF NOT EXISTS public.jobs_data (
    job_id TEXT PRIMARY KEY,
    post_date TEXT NOT NULL,
    recruitment_board TEXT NOT NULL,
    exam_or_post_name TEXT NOT NULL,
    qualification TEXT,
    advt_no TEXT,
    last_date TEXT,
    state TEXT,
    page_link TEXT UNIQUE,
    total_posts INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    row_html TEXT,
    is_active BOOLEAN DEFAULT true,
    education_tags TEXT[],
    job_type_tags TEXT[],
    job_area_tags TEXT[],
    experience_level_tags TEXT[],
    post_position_tags TEXT[],
    job_posting_deadline_tags TEXT[]
);

-- Enable Row Level Security
ALTER TABLE public.jobs_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is job listing data)
CREATE POLICY "Allow public read access to active jobs"
ON public.jobs_data
FOR SELECT
USING (is_active = true);

-- Create policy for service role to manage all data
CREATE POLICY "Service role can manage all jobs"
ON public.jobs_data
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX idx_jobs_data_post_date ON public.jobs_data(post_date DESC);
CREATE INDEX idx_jobs_data_state ON public.jobs_data(state);
CREATE INDEX idx_jobs_data_is_active ON public.jobs_data(is_active);
CREATE INDEX idx_jobs_data_page_link ON public.jobs_data(page_link);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_jobs_data_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_data_updated_at_trigger
BEFORE UPDATE ON public.jobs_data
FOR EACH ROW
EXECUTE FUNCTION public.update_jobs_data_updated_at();