-- Create preprocessing_job_data table
CREATE TABLE IF NOT EXISTS public.preprocessing_job_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    extract_time TIMESTAMPTZ,
    post_date DATE,
    recruitment_board TEXT,
    exam_post_name TEXT,
    qualification TEXT,
    advt_no TEXT,
    last_date DATE,
    state TEXT,
    location TEXT,
    data_extract TEXT,
    total_vacancy INTEGER,
    more_information TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    fingerprint TEXT,
    source TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.preprocessing_job_data ENABLE ROW LEVEL SECURITY;

-- Make table completely private (only accessible via service_role key)
-- No policies for public or authenticated users
-- This ensures the table is fully secure and private