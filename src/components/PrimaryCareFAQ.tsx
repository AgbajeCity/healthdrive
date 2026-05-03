import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { PRIMARY_CARE_FAQ } from "@/data/faq";

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
          {PRIMARY_CARE_FAQ.map((f, i) => (
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
