-- Create subscriber table
CREATE TABLE IF NOT EXISTS public.subscriber (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  area_of_interest TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscriber ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for subscription form)
CREATE POLICY "Anyone can subscribe"
  ON public.subscriber
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to prevent public read access (only authenticated admins can view)
CREATE POLICY "Only authenticated users can view subscribers"
  ON public.subscriber
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_subscriber_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_subscriber_updated_at
  BEFORE UPDATE ON public.subscriber
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_subscriber_updated_at();

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_subscriber_email ON public.subscriber(email);
CREATE INDEX IF NOT EXISTS idx_subscriber_created_at ON public.subscriber(created_at DESC);