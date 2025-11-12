-- ============================================
-- COMPREHENSIVE SECURITY FIX
-- Fixes RLS policies and function security
-- ============================================

-- 1. ADD PUBLIC READ POLICIES FOR SSG TABLES
-- These tables are used by SSG build process and need public read access

-- preprocessing_job_data - Read-only for public, write for authenticated
CREATE POLICY "Anyone can view preprocessing job data"
ON public.preprocessing_job_data
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert preprocessing job data"
ON public.preprocessing_job_data
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update preprocessing job data"
ON public.preprocessing_job_data
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete preprocessing job data"
ON public.preprocessing_job_data
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- row_unique_freejobalert - Read-only for public, write for authenticated
CREATE POLICY "Anyone can view unique freejobalert data"
ON public.row_unique_freejobalert
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert unique freejobalert data"
ON public.row_unique_freejobalert
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update unique freejobalert data"
ON public.row_unique_freejobalert
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete unique freejobalert data"
ON public.row_unique_freejobalert
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- row_unique_mysarkarinaukri - Read-only for public, write for authenticated
CREATE POLICY "Anyone can view unique mysarkarinaukri data"
ON public.row_unique_mysarkarinaukri
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert unique mysarkarinaukri data"
ON public.row_unique_mysarkarinaukri
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update unique mysarkarinaukri data"
ON public.row_unique_mysarkarinaukri
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete unique mysarkarinaukri data"
ON public.row_unique_mysarkarinaukri
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- merge_raw_data - Read-only for public, write for authenticated
CREATE POLICY "Anyone can view merge raw data"
ON public.merge_raw_data
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can insert merge raw data"
ON public.merge_raw_data
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update merge raw data"
ON public.merge_raw_data
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete merge raw data"
ON public.merge_raw_data
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- 2. FIX FUNCTION SECURITY - ADD search_path TO ALL FUNCTIONS
-- This prevents SQL injection attacks through search_path manipulation

-- Fix insert_freejobalert_bulk function
CREATE OR REPLACE FUNCTION public.insert_freejobalert_bulk(p_records jsonb)
RETURNS TABLE(inserted_count integer, skipped_count integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  v_inserted_count integer := 0;
  v_skipped_count integer := 0;
  v_record jsonb;
BEGIN
  FOR v_record IN SELECT * FROM jsonb_array_elements(p_records)
  LOOP
    INSERT INTO public.freejobalert (
      recruitment_board,
      exam_post_name,
      last_date,
      state,
      more_information
    )
    VALUES (
      v_record->>'recruitment_board',
      v_record->>'exam_post_name',
      v_record->>'last_date',
      v_record->>'state',
      v_record->>'more_information'
    )
    ON CONFLICT ON CONSTRAINT freejobalert_unique_job DO NOTHING;

    IF FOUND THEN
      v_inserted_count := v_inserted_count + 1;
    ELSE
      v_skipped_count := v_skipped_count + 1;
    END IF;
  END LOOP;

  RETURN QUERY SELECT v_inserted_count, v_skipped_count;
END;
$function$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

-- Fix insert_job_ignore_duplicates function
CREATE OR REPLACE FUNCTION public.insert_job_ignore_duplicates(
  p_recruitment_board text, 
  p_exam_post_name text, 
  p_last_date text, 
  p_state text, 
  p_more_information text, 
  p_job_data jsonb
)
RETURNS TABLE(inserted boolean, job_id text)
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  INSERT INTO jobs_data (
    recruitment_board,
    exam_or_post_name,
    last_date,
    state,
    page_link,
    post_date,
    qualification,
    advt_no,
    total_posts,
    raw_html_1,
    education_tags,
    job_type_tags,
    job_area_tags,
    experience_level_tags,
    post_position_tags,
    job_posting_deadline_tags
  )
  VALUES (
    p_recruitment_board,
    p_exam_post_name,
    p_last_date,
    p_state,
    p_more_information,
    COALESCE((p_job_data->>'post_date')::timestamptz, NOW()),
    p_job_data->>'qualification',
    p_job_data->>'advt_no',
    (p_job_data->>'total_posts')::integer,
    p_job_data->>'row_html',
    (p_job_data->>'education_tags')::text[],
    (p_job_data->>'job_type_tags')::text[],
    (p_job_data->>'job_area_tags')::text[],
    (p_job_data->>'experience_level_tags')::text[],
    (p_job_data->>'post_position_tags')::text[],
    (p_job_data->>'job_posting_deadline_tags')::text[]
  )
  ON CONFLICT (recruitment_board, exam_or_post_name, last_date, state, more_information)
  DO NOTHING
  RETURNING TRUE as inserted, jobs_data.job_id;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE as inserted, NULL::TEXT as job_id;
  END IF;
END;
$function$;

-- Fix insert_jobs_batch function
CREATE OR REPLACE FUNCTION public.insert_jobs_batch(jobs_data jsonb[])
RETURNS TABLE(total_processed integer, inserted_count integer, duplicate_count integer, inserted_job_ids text[])
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
  job_record JSONB;
  inserted_ids TEXT[] := '{}';
  insert_count INTEGER := 0;
  duplicate_count INTEGER := 0;
BEGIN
  FOREACH job_record IN ARRAY jobs_data
  LOOP
    BEGIN
      INSERT INTO jobs_data (
        recruitment_board,
        exam_or_post_name,
        last_date,
        state,
        page_link,
        post_date,
        qualification,
        advt_no,
        total_posts,
        raw_html_1,
        education_tags,
        job_type_tags,
        job_area_tags,
        experience_level_tags,
        post_position_tags,
        job_posting_deadline_tags
      )
      SELECT
        job_record->>'recruitment_board',
        job_record->>'exam_or_post_name',
        job_record->>'last_date',
        job_record->>'state',
        job_record->>'more_information',
        COALESCE((job_record->>'post_date')::timestamptz, NOW()),
        job_record->>'qualification',
        job_record->>'advt_no',
        (job_record->>'total_posts')::integer,
        job_record->>'row_html',
        (job_record->'education_tags')::text[],
        (job_record->'job_type_tags')::text[],
        (job_record->'job_area_tags')::text[],
        (job_record->'experience_level_tags')::text[],
        (job_record->'post_position_tags')::text[],
        (job_record->'job_posting_deadline_tags')::text[]
      ON CONFLICT (recruitment_board, exam_or_post_name, last_date, state, more_information)
      DO NOTHING
      RETURNING job_id INTO inserted_ids[array_length(inserted_ids, 1) + 1];
      
      IF FOUND THEN
        insert_count := insert_count + 1;
      ELSE
        duplicate_count := duplicate_count + 1;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      duplicate_count := duplicate_count + 1;
    END;
  END LOOP;
  
  RETURN QUERY SELECT 
    array_length(jobs_data, 1)::INTEGER,
    insert_count,
    duplicate_count,
    inserted_ids;
END;
$function$;

-- Fix handle_duplicate_jobs trigger function
CREATE OR REPLACE FUNCTION public.handle_duplicate_jobs()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  INSERT INTO jobs_data (
    recruitment_board, exam_or_post_name, last_date, state, page_link,
    post_date, qualification, advt_no, total_posts, raw_html_1,
    education_tags, job_type_tags, job_area_tags, experience_level_tags,
    post_position_tags, job_posting_deadline_tags, is_active
  ) VALUES (
    NEW.recruitment_board, NEW.exam_or_post_name, NEW.last_date, NEW.state, NEW.page_link,
    NEW.post_date, NEW.qualification, NEW.advt_no, NEW.total_posts, NEW.raw_html_1,
    NEW.education_tags, NEW.job_type_tags, NEW.job_area_tags, NEW.experience_level_tags,
    NEW.post_position_tags, NEW.job_posting_deadline_tags, NEW.is_active
  )
  ON CONFLICT (recruitment_board, exam_or_post_name, last_date, state, more_information) 
  DO NOTHING;
  
  RETURN NULL;
END;
$function$;

-- Fix merge_unique_data function
CREATE OR REPLACE FUNCTION public.merge_unique_data()
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
    WITH
    common AS (
        SELECT 
            f.extract_time,
            f.post_date,
            f.recruitment_board,
            f.exam_post_name,
            f.qualification,
            f.advt_no,
            f.last_date,
            f.state,
            m.location,
            f.data_extract,
            f.total_vacancy,
            ARRAY_CAT(ARRAY[f.more_information], ARRAY[m.more_information]) AS more_information,
            f.created_at,
            f.fingerprint,
            'merge' AS source
        FROM public.row_unique_freejobalert f
        JOIN public.row_unique_mysarkarinaukri m
          ON f.fingerprint = m.fingerprint
    ),
    unique_freejobalert AS (
        SELECT
            f.extract_time,
            f.post_date,
            f.recruitment_board,
            f.exam_post_name,
            f.qualification,
            f.advt_no,
            f.last_date,
            f.state,
            NULL::text AS location,
            f.data_extract,
            f.total_vacancy,
            ARRAY[f.more_information] AS more_information,
            f.created_at,
            f.fingerprint,
            'row_unique_freejobalert' AS source
        FROM public.row_unique_freejobalert f
        WHERE f.fingerprint NOT IN (
            SELECT fingerprint FROM public.row_unique_mysarkarinaukri
        )
    ),
    unique_mysarkarinaukri AS (
        SELECT
            m.extract_time,
            NULL::text AS post_date,
            NULL::text AS recruitment_board,
            m.exam_post_name,
            NULL::text AS qualification,
            NULL::text AS advt_no,
            m.last_date,
            m.state,
            m.location,
            m.data_extract,
            m.total_vacancy,
            ARRAY[m.more_information] AS more_information,
            m.created_at,
            m.fingerprint,
            'row_unique_mysarkarinaukri' AS source
        FROM public.row_unique_mysarkarinaukri m
        WHERE m.fingerprint NOT IN (
            SELECT fingerprint FROM public.row_unique_freejobalert
        )
    )
    INSERT INTO merge_raw_data (
        extract_time,
        post_date,
        recruitment_board,
        exam_post_name,
        qualification,
        advt_no,
        last_date,
        state,
        location,
        data_extract,
        total_vacancy,
        more_information,
        created_at,
        fingerprint,
        source
    )
    SELECT * FROM common
    UNION ALL
    SELECT * FROM unique_freejobalert
    UNION ALL
    SELECT * FROM unique_mysarkarinaukri;
END;
$function$;

-- Fix remove_duplicate_from_merge_raw_data function
CREATE OR REPLACE FUNCTION public.remove_duplicate_from_merge_raw_data()
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
    DELETE FROM merge_raw_data
    WHERE ctid IN (
        SELECT ctid
        FROM (
            SELECT ctid,
                   ROW_NUMBER() OVER (
                       PARTITION BY fingerprint, state, last_date
                       ORDER BY created_at ASC
                   ) AS rn
            FROM merge_raw_data
        ) sub
        WHERE sub.rn > 1
    );
END;
$function$;

-- Fix handle_subscriber_updated_at function
CREATE OR REPLACE FUNCTION public.handle_subscriber_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 3. MOVE EXTENSION FROM PUBLIC TO EXTENSIONS SCHEMA (if not already done)
-- This is a minor security improvement
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension 
    WHERE extname = 'pg_trgm' 
    AND extnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  ) THEN
    -- Create extensions schema if it doesn't exist
    CREATE SCHEMA IF NOT EXISTS extensions;
    
    -- Move extension to extensions schema
    ALTER EXTENSION pg_trgm SET SCHEMA extensions;
  END IF;
END $$;