-- Create merge_raw_data table
CREATE TABLE IF NOT EXISTS public.merge_raw_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    extract_time TEXT,
    post_date TEXT,
    recruitment_board TEXT,
    exam_post_name TEXT,
    qualification TEXT,
    advt_no TEXT,
    last_date TEXT,
    state TEXT,
    location TEXT,
    data_extract TEXT,
    total_vacancy TEXT,
    more_information TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    fingerprint TEXT,
    source TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.merge_raw_data ENABLE ROW LEVEL SECURITY;

-- Make table completely private (only accessible via service_role key from n8n)
-- No SELECT, INSERT, UPDATE, DELETE policies for public or authenticated users
-- This ensures the table is fully secure and private