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
    a: "The planned USSD service is designed to work on any basic feature phone, with no data or app. It is not open to the public yet. A sandbox test build is running for development only, and no telecom operator agreement is in place.",
  },
  {
    q: "Which USSD code should I dial?",
    a: "None yet. The four codes are the planned design and are not live: *911# (emergency triage), *123# (find a clinic), *456# (symptom guidance) and *789# (community health worker). No telecom operator agreement exists and the service is not open to the public.",
  },
  {
    q: "How much does it cost?",
    a: "Nothing is available to use yet. HealthDrive is pre-revenue and no service is open to the public.",
  },
  {
    q: "What happens if I need specialist or hospital care?",
    a: "HealthDrive cannot help with this yet. Referral requests are not open and no mobile clinic or Health Hub is operating. Please use your existing local health services.",
  },
  {
    q: "Where do you operate?",
    a: "No HealthDrive service is operating yet. HealthDrive Technologies LTD is registered in Rwanda (Kigali), and Rwanda is our focus. The planned first deployment is Mahama Refugee Camp, Kirehe District, with no date set. Nigeria is a later expansion market. Our published research pilot ran in Bugesera and Kayonza districts, Rwanda (Aug 2024 – Mar 2026).",
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
