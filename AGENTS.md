# Agent rules

- Routes for services that do not exist yet (consultations, chat, accounts, onboarding, dashboard) render `src/components/NotAvailableNotice.tsx` and collect nothing — keeps old links from 404ing without storing personal data.
- Public referral submissions are closed at the database (no insert policy or grant for anon/authenticated); do not reopen from the client — the site must not collect names or phone numbers.
- Pilot figures and their label/source live in `src/data/pilot.ts`; non-pilot figures (national stats, model scores) are rendered outside the pilot group — keeps evidence claims correctly attributed.
