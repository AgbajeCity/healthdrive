import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
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

const PrimaryCareFAQ = () => {
  return (
    <section className="py-14" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-3">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h2 id="faq-heading" className="text-3xl font-bold text-foreground">Primary care, answered.</h2>
          <p className="text-muted-foreground mt-2">Access, coverage, and how USSD connects you to care.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-foreground">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PrimaryCareFAQ;
