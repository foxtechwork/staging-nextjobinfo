-- Create Freejobalert table
CREATE TABLE IF NOT EXISTS public."Freejobalert" (
    extract_time TEXT,
    post_date TEXT,
    exam_post_name TEXT,
    qualification TEXT,
    advt_no TEXT,
    last_date TEXT,
    state TEXT,
    data_extract TEXT,
    total_vacancy TEXT,
    more_information TEXT PRIMARY KEY
);

-- Create mysarkarinaukri table
CREATE TABLE IF NOT EXISTS public.mysarkarinaukri (
    extract_time TEXT,
    exam_post_name TEXT,
    state TEXT,
    location TEXT,
    last_date TEXT,
    total_vacancy TEXT,
    data_extract TEXT,
    more_information TEXT PRIMARY KEY
);

-- Create row_unique_freejobalert table
CREATE TABLE IF NOT EXISTS public.row_unique_freejobalert (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    extract_time TEXT,
    post_date TEXT,
    recruitment_board TEXT,
    exam_post_name TEXT,
    qualification TEXT,
    advt_no TEXT,
    last_date TEXT,
    state TEXT,
    data_extract TEXT,
    total_vacancy TEXT,
    more_information TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    fingerprint TEXT UNIQUE
);

-- Create row_unique_mysarkarinaukri table
CREATE TABLE IF NOT EXISTS public.row_unique_mysarkarinaukri (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    extract_time TEXT,
    exam_post_name TEXT,
    state TEXT,
    location TEXT,
    last_date TEXT,
    total_vacancy TEXT,
    data_extract TEXT,
    more_information TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    fingerprint TEXT UNIQUE
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public."Freejobalert" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mysarkarinaukri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.row_unique_freejobalert ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.row_unique_mysarkarinaukri ENABLE ROW LEVEL SECURITY;

-- Create function: insert_freejobalert_bulk
CREATE OR REPLACE FUNCTION public.insert_freejobalert_bulk(jobs_data JSONB[])
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    job_record JSONB;
    processed_count INT := 0;
    inserted_count INT := 0;
    duplicate_count INT := 0;
BEGIN
    FOREACH job_record IN ARRAY jobs_data
    LOOP
        processed_count := processed_count + 1;
        
        INSERT INTO public."Freejobalert" (
            extract_time,
            post_date,
            exam_post_name,
            qualification,
            advt_no,
            last_date,
            state,
            data_extract,
            total_vacancy,
            more_information
        )
        VALUES (
            job_record->>'extract_time',
            job_record->>'post_date',
            job_record->>'exam_post_name',
            job_record->>'qualification',
            job_record->>'advt_no',
            job_record->>'last_date',
            job_record->>'state',
            job_record->>'data_extract',
            job_record->>'total_vacancy',
            job_record->>'more_information'
        )
        ON CONFLICT (more_information) DO NOTHING;
        
        IF FOUND THEN
            inserted_count := inserted_count + 1;
        ELSE
            duplicate_count := duplicate_count + 1;
        END IF;
    END LOOP;
    
    RETURN json_build_object(
        'processed', processed_count,
        'inserted', inserted_count,
        'duplicates', duplicate_count
    );
END;
$$;

-- Create function: insert_job_ignore_duplicates
CREATE OR REPLACE FUNCTION public.insert_job_ignore_duplicates(jobs_data JSONB[])
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    job_record JSONB;
    processed_count INT := 0;
    inserted_count INT := 0;
    duplicate_count INT := 0;
BEGIN
    FOREACH job_record IN ARRAY jobs_data
    LOOP
        processed_count := processed_count + 1;
        
        INSERT INTO public."Freejobalert" (
            extract_time,
            post_date,
            exam_post_name,
            qualification,
            advt_no,
            last_date,
            state,
            data_extract,
            total_vacancy,
            more_information
        )
        VALUES (
            job_record->>'extract_time',
            job_record->>'post_date',
            job_record->>'exam_post_name',
            job_record->>'qualification',
            job_record->>'advt_no',
            job_record->>'last_date',
            job_record->>'state',
            job_record->>'data_extract',
            job_record->>'total_vacancy',
            job_record->>'more_information'
        )
        ON CONFLICT (more_information) DO NOTHING;
        
        IF FOUND THEN
            inserted_count := inserted_count + 1;
        ELSE
            duplicate_count := duplicate_count + 1;
        END IF;
    END LOOP;
    
    RETURN json_build_object(
        'processed', processed_count,
        'inserted', inserted_count,
        'duplicates', duplicate_count
    );
END;
$$;

-- Create function: insert_jobs_batch
CREATE OR REPLACE FUNCTION public.insert_jobs_batch(
    freejobalert_data JSONB[] DEFAULT ARRAY[]::JSONB[],
    mysarkarinaukri_data JSONB[] DEFAULT ARRAY[]::JSONB[]
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    job_record JSONB;
    fja_processed INT := 0;
    fja_inserted INT := 0;
    fja_duplicates INT := 0;
    msk_processed INT := 0;
    msk_inserted INT := 0;
    msk_duplicates INT := 0;
BEGIN
    -- Process Freejobalert data
    FOREACH job_record IN ARRAY freejobalert_data
    LOOP
        fja_processed := fja_processed + 1;
        
        INSERT INTO public."Freejobalert" (
            extract_time,
            post_date,
            exam_post_name,
            qualification,
            advt_no,
            last_date,
            state,
            data_extract,
            total_vacancy,
            more_information
        )
        VALUES (
            job_record->>'extract_time',
            job_record->>'post_date',
            job_record->>'exam_post_name',
            job_record->>'qualification',
            job_record->>'advt_no',
            job_record->>'last_date',
            job_record->>'state',
            job_record->>'data_extract',
            job_record->>'total_vacancy',
            job_record->>'more_information'
        )
        ON CONFLICT (more_information) DO NOTHING;
        
        IF FOUND THEN
            fja_inserted := fja_inserted + 1;
        ELSE
            fja_duplicates := fja_duplicates + 1;
        END IF;
    END LOOP;
    
    -- Process mysarkarinaukri data
    FOREACH job_record IN ARRAY mysarkarinaukri_data
    LOOP
        msk_processed := msk_processed + 1;
        
        INSERT INTO public.mysarkarinaukri (
            extract_time,
            exam_post_name,
            state,
            location,
            last_date,
            total_vacancy,
            data_extract,
            more_information
        )
        VALUES (
            job_record->>'extract_time',
            job_record->>'exam_post_name',
            job_record->>'state',
            job_record->>'location',
            job_record->>'last_date',
            job_record->>'total_vacancy',
            job_record->>'data_extract',
            job_record->>'more_information'
        )
        ON CONFLICT (more_information) DO NOTHING;
        
        IF FOUND THEN
            msk_inserted := msk_inserted + 1;
        ELSE
            msk_duplicates := msk_duplicates + 1;
        END IF;
    END LOOP;
    
    RETURN json_build_object(
        'freejobalert', json_build_object(
            'processed', fja_processed,
            'inserted', fja_inserted,
            'duplicates', fja_duplicates
        ),
        'mysarkarinaukri', json_build_object(
            'processed', msk_processed,
            'inserted', msk_inserted,
            'duplicates', msk_duplicates
        )
    );
END;
$$;

-- Grant execute permissions to service_role
GRANT EXECUTE ON FUNCTION public.insert_freejobalert_bulk(JSONB[]) TO service_role;
GRANT EXECUTE ON FUNCTION public.insert_job_ignore_duplicates(JSONB[]) TO service_role;
GRANT EXECUTE ON FUNCTION public.insert_jobs_batch(JSONB[], JSONB[]) TO service_role;