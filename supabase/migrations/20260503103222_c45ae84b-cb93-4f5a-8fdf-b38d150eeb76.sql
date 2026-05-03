
-- Referrals table
CREATE TABLE public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code text NOT NULL UNIQUE,
  full_name text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  hub_slug text NOT NULL,
  services text[] NOT NULL DEFAULT '{}',
  notes text,
  status text NOT NULL DEFAULT 'received',
  assigned_chv text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a referral (public form)
CREATE POLICY "Anyone can submit a referral"
  ON public.referrals FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public SELECT — status is fetched via a SECURITY DEFINER function by reference code only
-- (prevents listing all referrals / PII exposure)

CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Lookup function: returns a single referral by its reference code (no PII like phone)
CREATE OR REPLACE FUNCTION public.get_referral_status(_code text)
RETURNS TABLE (
  reference_code text,
  full_name text,
  location text,
  hub_slug text,
  services text[],
  status text,
  assigned_chv text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT reference_code, full_name, location, hub_slug, services, status, assigned_chv, created_at, updated_at
  FROM public.referrals
  WHERE reference_code = _code
  LIMIT 1;
$$;
