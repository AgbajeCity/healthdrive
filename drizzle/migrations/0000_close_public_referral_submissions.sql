DROP POLICY IF EXISTS "Anyone can submit a referral" ON public.referrals;
REVOKE INSERT ON public.referrals FROM anon, authenticated;
COMMENT ON TABLE public.referrals IS 'Public referral submissions closed: no insert policy and no insert grant for anon/authenticated. Existing rows are kept.';