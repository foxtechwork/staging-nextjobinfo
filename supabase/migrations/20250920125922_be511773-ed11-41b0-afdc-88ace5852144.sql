-- Create jobs_data table
CREATE TABLE public.jobs_data (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_date DATE NOT NULL,
    recruitment_board TEXT NOT NULL,
    exam_or_post_name TEXT NOT NULL,
    qualification TEXT,
    advt_no TEXT,
    last_date DATE,
    state TEXT,
    page_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job_details table
CREATE TABLE public.job_details (
    job_id UUID PRIMARY KEY REFERENCES public.jobs_data(job_id) ON DELETE CASCADE,
    row_html TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.jobs_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_details ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for jobs_data (publicly readable)
CREATE POLICY "Anyone can view jobs data" 
ON public.jobs_data 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert jobs data" 
ON public.jobs_data 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update jobs data" 
ON public.jobs_data 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete jobs data" 
ON public.jobs_data 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create RLS policies for job_details (publicly readable)
CREATE POLICY "Anyone can view job details" 
ON public.job_details 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert job details" 
ON public.job_details 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update job details" 
ON public.job_details 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete job details" 
ON public.job_details 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX idx_jobs_data_post_date ON public.jobs_data(post_date DESC);
CREATE INDEX idx_jobs_data_recruitment_board ON public.jobs_data(recruitment_board);
CREATE INDEX idx_jobs_data_state ON public.jobs_data(state);
CREATE INDEX idx_jobs_data_last_date ON public.jobs_data(last_date);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_jobs_data_updated_at
    BEFORE UPDATE ON public.jobs_data
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_details_updated_at
    BEFORE UPDATE ON public.job_details
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();