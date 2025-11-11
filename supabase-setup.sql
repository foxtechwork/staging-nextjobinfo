-- ============================================
-- SUPABASE SETUP FOR N8N INTEGRATION
-- Run this in Supabase SQL Editor
-- ============================================

-- Create Freejobalert table
CREATE TABLE IF NOT EXISTS public."Freejobalert" (
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
    more_information TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mysarkarinaukri table
CREATE TABLE IF NOT EXISTS public."mysarkarinaukri" (
    extract_time TEXT,
    exam_post_name TEXT,
    state TEXT,
    location TEXT,
    last_date TEXT,
    total_vacancy TEXT,
    data_extract TEXT,
    more_information TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create merge_raw_data table
CREATE TABLE IF NOT EXISTS public."merge_raw_data" (
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

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public."Freejobalert" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."mysarkarinaukri" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."merge_raw_data" ENABLE ROW LEVEL SECURITY;

-- Make tables completely private (only accessible via service_role key from n8n)
-- No SELECT, INSERT, UPDATE, DELETE policies for public or authenticated users
-- This ensures tables are fully secure and private

-- Function 1: Insert multiple rows into Freejobalert (bulk insert)
CREATE OR REPLACE FUNCTION public.insert_freejobalert_bulk(jobs_data JSONB[])
RETURNS TABLE (
    total_processed INTEGER,
    total_inserted INTEGER,
    total_duplicates INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    processed INTEGER := 0;
    inserted INTEGER := 0;
    duplicates INTEGER := 0;
    job_record JSONB;
BEGIN
    FOREACH job_record IN ARRAY jobs_data
    LOOP
        processed := processed + 1;
        
        INSERT INTO public."Freejobalert" (
            extract_time,
            post_date,
            recruitment_board,
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
            job_record->>'recruitment_board',
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
            inserted := inserted + 1;
        ELSE
            duplicates := duplicates + 1;
        END IF;
    END LOOP;
    
    RETURN QUERY SELECT processed, inserted, duplicates;
END;
$$;

-- Function 2: Insert job ignoring duplicates (for Freejobalert)
CREATE OR REPLACE FUNCTION public.insert_job_ignore_duplicates(jobs_data JSONB[])
RETURNS TABLE (
    total_processed INTEGER,
    total_inserted INTEGER,
    total_duplicates INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    processed INTEGER := 0;
    inserted INTEGER := 0;
    duplicates INTEGER := 0;
    job_record JSONB;
BEGIN
    FOREACH job_record IN ARRAY jobs_data
    LOOP
        processed := processed + 1;
        
        INSERT INTO public."Freejobalert" (
            extract_time,
            post_date,
            recruitment_board,
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
            job_record->>'recruitment_board',
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
            inserted := inserted + 1;
        ELSE
            duplicates := duplicates + 1;
        END IF;
    END LOOP;
    
    RETURN QUERY SELECT processed, inserted, duplicates;
END;
$$;

-- Function 3: Insert rows into both tables in a single batch
CREATE OR REPLACE FUNCTION public.insert_jobs_batch(
    freejobalert_data JSONB[] DEFAULT ARRAY[]::JSONB[],
    mysarkarinaukri_data JSONB[] DEFAULT ARRAY[]::JSONB[]
)
RETURNS TABLE (
    table_name TEXT,
    total_processed INTEGER,
    total_inserted INTEGER,
    total_duplicates INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    fja_processed INTEGER := 0;
    fja_inserted INTEGER := 0;
    fja_duplicates INTEGER := 0;
    msn_processed INTEGER := 0;
    msn_inserted INTEGER := 0;
    msn_duplicates INTEGER := 0;
    job_record JSONB;
BEGIN
    -- Insert Freejobalert data
    IF array_length(freejobalert_data, 1) > 0 THEN
        FOREACH job_record IN ARRAY freejobalert_data
        LOOP
            fja_processed := fja_processed + 1;
            
            INSERT INTO public."Freejobalert" (
                extract_time,
                post_date,
                recruitment_board,
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
                job_record->>'recruitment_board',
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
    END IF;
    
    -- Insert mysarkarinaukri data
    IF array_length(mysarkarinaukri_data, 1) > 0 THEN
        FOREACH job_record IN ARRAY mysarkarinaukri_data
        LOOP
            msn_processed := msn_processed + 1;
            
            INSERT INTO public."mysarkarinaukri" (
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
                msn_inserted := msn_inserted + 1;
            ELSE
                msn_duplicates := msn_duplicates + 1;
            END IF;
        END LOOP;
    END IF;
    
    -- Return results for Freejobalert
    IF fja_processed > 0 THEN
        RETURN QUERY SELECT 'Freejobalert'::TEXT, fja_processed, fja_inserted, fja_duplicates;
    END IF;
    
    -- Return results for mysarkarinaukri
    IF msn_processed > 0 THEN
        RETURN QUERY SELECT 'mysarkarinaukri'::TEXT, msn_processed, msn_inserted, msn_duplicates;
    END IF;
END;
$$;

-- Grant execute permissions on functions (accessible via service_role key)
GRANT EXECUTE ON FUNCTION public.insert_freejobalert_bulk(JSONB[]) TO service_role;
GRANT EXECUTE ON FUNCTION public.insert_job_ignore_duplicates(JSONB[]) TO service_role;
GRANT EXECUTE ON FUNCTION public.insert_jobs_batch(JSONB[], JSONB[]) TO service_role;

-- ============================================
-- USAGE EXAMPLES FOR N8N
-- ============================================

/*
In n8n, use "Invoke RPC Function" operation with these function names:

1. For Freejobalert bulk insert:
   Function: insert_freejobalert_bulk
   Parameters: 
   {
     "jobs_data": [
       {
         "extract_time": "2025-01-15",
         "post_date": "2025-01-14",
         "recruitment_board": "SSC",
         "exam_post_name": "Junior Engineer",
         "qualification": "B.Tech",
         "advt_no": "ADV123",
         "last_date": "2025-02-15",
         "state": "Delhi",
         "data_extract": "Details...",
         "total_vacancy": "100",
         "more_information": "https://example.com/job1"
       }
     ]
   }

2. For ignoring duplicates:
   Function: insert_job_ignore_duplicates
   Parameters: Same as above

3. For batch insert to both tables:
   Function: insert_jobs_batch
   Parameters:
   {
     "freejobalert_data": [...],
     "mysarkarinaukri_data": [...]
   }
*/
