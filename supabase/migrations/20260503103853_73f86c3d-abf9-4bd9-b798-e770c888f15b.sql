
-- Admin config (single-row table holding the passcode)
CREATE TABLE public.admin_config (
  id int PRIMARY KEY DEFAULT 1,
  admin_passcode text NOT NULL,
  CONSTRAINT singleton CHECK (id = 1)
);
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;
-- No policies: table is not accessible from the API; only SECURITY DEFINER functions read it.

INSERT INTO public.admin_config (id, admin_passcode) VALUES (1, 'healthdrive-admin');

-- List referrals (passcode protected)
CREATE OR REPLACE FUNCTION public.list_referrals(
  _passcode text,
  _search text DEFAULT NULL,
  _status text DEFAULT NULL,
  _hub_slug text DEFAULT NULL,
  _limit int DEFAULT 25,
  _offset int DEFAULT 0
)
RETURNS TABLE (
  reference_code text,
  full_name text,
  phone text,
  location text,
  hub_slug text,
  services text[],
  notes text,
  status text,
  assigned_chv text,
  created_at timestamptz,
  updated_at timestamptz,
  total_count bigint
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pass text;
BEGIN
  SELECT admin_passcode INTO v_pass FROM public.admin_config WHERE id = 1;
  IF v_pass IS NULL OR _passcode IS NULL OR _passcode <> v_pass THEN
    RAISE EXCEPTION 'unauthorized' USING ERRCODE = '28000';
  END IF;

  RETURN QUERY
  WITH filtered AS (
    SELECT r.*
    FROM public.referrals r
    WHERE (_status IS NULL OR r.status = _status)
      AND (_hub_slug IS NULL OR r.hub_slug = _hub_slug)
      AND (
        _search IS NULL OR _search = '' OR
        r.full_name ILIKE '%' || _search || '%' OR
        r.phone ILIKE '%' || _search || '%' OR
        r.reference_code ILIKE '%' || _search || '%'
      )
  ), counted AS (
    SELECT COUNT(*) AS c FROM filtered
  )
  SELECT f.reference_code, f.full_name, f.phone, f.location, f.hub_slug, f.services,
         f.notes, f.status, f.assigned_chv, f.created_at, f.updated_at,
         (SELECT c FROM counted) AS total_count
  FROM filtered f
  ORDER BY f.created_at DESC
  LIMIT GREATEST(_limit, 1)
  OFFSET GREATEST(_offset, 0);
END;
$$;

-- Update referral status (passcode protected)
CREATE OR REPLACE FUNCTION public.update_referral_status(
  _passcode text,
  _reference_code text,
  _status text,
  _assigned_chv text DEFAULT NULL
)
RETURNS public.referrals
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pass text;
  v_row public.referrals;
BEGIN
  SELECT admin_passcode INTO v_pass FROM public.admin_config WHERE id = 1;
  IF v_pass IS NULL OR _passcode IS NULL OR _passcode <> v_pass THEN
    RAISE EXCEPTION 'unauthorized' USING ERRCODE = '28000';
  END IF;

  IF _status NOT IN ('received','assigned','in_progress','completed') THEN
    RAISE EXCEPTION 'invalid status';
  END IF;

  UPDATE public.referrals
  SET status = _status,
      assigned_chv = COALESCE(_assigned_chv, assigned_chv),
      updated_at = now()
  WHERE reference_code = _reference_code
  RETURNING * INTO v_row;

  IF v_row.reference_code IS NULL THEN
    RAISE EXCEPTION 'referral not found';
  END IF;

  RETURN v_row;
END;
$$;
