-- Enable RLS on the existing jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the existing jobs table
CREATE POLICY "Anyone can view jobs" 
ON public.jobs 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert jobs" 
ON public.jobs 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update jobs" 
ON public.jobs 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete jobs" 
ON public.jobs 
FOR DELETE 
USING (auth.uid() IS NOT NULL);