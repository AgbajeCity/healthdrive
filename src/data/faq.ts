// Source of truth for the homepage Primary Care FAQ.
// Used by the FAQ component AND the JSON-LD on the homepage,
// so structured data and visible content cannot drift apart.

export interface FaqEntry {
  q: string;
  a: string;
}

export const PRIMARY_CARE_FAQ: FaqEntry[] = [
  {
    q: "What is primary healthcare and what does it cover?",
    a: "Primary healthcare is the everyday, first-contact care most people need: screenings, common illness treatment, maternal & child health, chronic disease (NCD) follow-up, mental wellness check-ins, and referrals when specialist care is needed.",
  },
  {
    q: "Do I need a smartphone or internet to use HealthDrive?",
    a: "No. Any basic feature phone works. Dial a USSD short-code like *123# — no data, no app, no account. It runs on the SIM network and is free for the patient.",
  },
  {
    q: "Which USSD code should I dial?",
    a: "*911# for emergencies, *123# to find the nearest clinic or van stop, *456# for AI-assisted symptom guidance, and *789# to reach a Community Health Volunteer.",
  },
  {
    q: "How much does it cost?",
    a: "USSD calls are free for patients. Mobile-clinic visits and Health Hub follow-up are covered through Mutuelle de Santé and partner programs in Rwanda and Nigeria.",
  },
  {
    q: "What happens if I need specialist or hospital care?",
    a: "A CHV or van clinician submits a referral on your behalf. You get a reference code to track it on /referrals, and the receiving facility is notified.",
  },
  {
    q: "Where do you operate?",
    a: "Refugee settlements and rural districts in Rwanda (Bugesera, Kayonza) and Nigeria — with active expansion to nearby underserved communities.",
  },
];

export function buildFaqJsonLd(entries: FaqEntry[] = PRIMARY_CARE_FAQ) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
