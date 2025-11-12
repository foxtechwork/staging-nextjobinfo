-- Rename row_html to raw_html_1 and add raw_html_2 and raw_html_3 columns
ALTER TABLE jobs_data RENAME COLUMN row_html TO raw_html_1;

-- Add raw_html_2 and raw_html_3 columns with same type as raw_html_1
ALTER TABLE jobs_data 
ADD COLUMN raw_html_2 text,
ADD COLUMN raw_html_3 text;

-- Add comments to describe the purpose
COMMENT ON COLUMN jobs_data.raw_html_1 IS 'First part of job HTML (up to 10,000 characters)';
COMMENT ON COLUMN jobs_data.raw_html_2 IS 'Second part of job HTML (up to 10,000 characters, overflow from raw_html_1)';
COMMENT ON COLUMN jobs_data.raw_html_3 IS 'Third part of job HTML (up to 10,000 characters, overflow from raw_html_2)';