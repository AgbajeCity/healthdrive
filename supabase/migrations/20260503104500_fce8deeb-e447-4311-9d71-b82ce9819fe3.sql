
-- Function: change admin passcode (must know current passcode)
CREATE OR REPLACE FUNCTION public.update_admin_passcode(
  _current_passcode text,
  _new_passcode text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pass text;
BEGIN
  SELECT admin_passcode INTO v_pass FROM public.admin_config WHERE id = 1;
  IF v_pass IS NULL OR _current_passcode IS NULL OR _current_passcode <> v_pass THEN
    RAISE EXCEPTION 'unauthorized' USING ERRCODE = '28000';
  END IF;
  IF _new_passcode IS NULL OR length(trim(_new_passcode)) < 8 THEN
    RAISE EXCEPTION 'new passcode must be at least 8 characters';
  END IF;
  UPDATE public.admin_config SET admin_passcode = _new_passcode WHERE id = 1;
END;
$$;

-- Harden execute privileges
REVOKE EXECUTE ON FUNCTION public.list_referrals(text, text, text, text, int, int) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.update_referral_status(text, text, text, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.update_admin_passcode(text, text) FROM anon, public;

GRANT EXECUTE ON FUNCTION public.list_referrals(text, text, text, text, int, int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_referral_status(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_admin_passcode(text, text) TO authenticated;
