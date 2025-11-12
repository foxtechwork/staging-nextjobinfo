-- Create news table for Latest Updates section
CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL,
  time_updated text NOT NULL,
  source_link text,
  type text DEFAULT 'new',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active news
CREATE POLICY "Anyone can view active news"
ON public.news
FOR SELECT
USING (is_active = true);

-- Only authenticated users can manage news
CREATE POLICY "Authenticated users can insert news"
ON public.news
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update news"
ON public.news
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete news"
ON public.news
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert demo data
INSERT INTO public.news (title, short_description, time_updated, source_link, type) VALUES
('SSC CGL 2024 Notification Released', 'Staff Selection Commission has released the notification for Combined Graduate Level Examination 2024. Apply now!', '2 hours ago', 'https://ssc.nic.in', 'urgent'),
('UPSC Civil Services Results Announced', 'Union Public Service Commission declares Civil Services Examination results. Check your roll number.', '5 hours ago', 'https://upsc.gov.in', 'new'),
('Railway Recruitment 2024 - 50,000 Posts', 'Indian Railways announces massive recruitment drive for various posts across zones.', '1 day ago', 'https://rrc.indianrailways.gov.in', 'success'),
('Bank PO Exam Date Extended', 'IBPS extends the last date for Bank PO examination registration till next month.', '3 hours ago', 'https://ibps.in', 'warning'),
('Teaching Jobs - 10,000 Vacancies', 'State Government announces recruitment for Primary and Secondary Teachers across the state.', '6 hours ago', null, 'new'),
('GATE 2025 Registration Starts', 'Graduate Aptitude Test in Engineering registration portal is now open for candidates.', '12 hours ago', 'https://gate.iitkgp.ac.in', 'new'),
('Police Constable Recruitment - Apply Online', 'State Police Department invites applications for 5000 Constable posts. Physical test dates announced.', '4 hours ago', null, 'urgent'),
('Defence Jobs - Indian Army Recruitment', 'Indian Army recruitment rally schedule released for various states. Check eligibility criteria.', '8 hours ago', 'https://joinindianarmy.nic.in', 'success');