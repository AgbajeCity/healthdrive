import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck, Phone, Users, Cross, Activity,
  Stethoscope, Pill, Share2, Baby, HeartPulse, Eye, Syringe, Thermometer, ClipboardList, Hospital, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroMobileClinic from "@/assets/hero-mobile-clinic.jpg";

type ServiceItem = { icon: any; title: string; desc: string };
type Category = {
  id: string;
  icon: any;
  title: string;
  tagline: string;
  accent: string;
  items: ServiceItem[];
};

const categories: Category[] = [
  {
    id: "screening",
    icon: Stethoscope,
    title: "Screening",
    tagline: "Early checks that catch problems before they grow.",
    accent: "text-blue-500 bg-blue-500/10",
    items: [
      { icon: HeartPulse, title: "Blood pressure & diabetes", desc: "NCD screening at every van stop." },
      { icon: Baby, title: "Maternal & child checks", desc: "Antenatal vitals, growth and immunization status." },
      { icon: Eye, title: "Vision & basic vitals", desc: "Quick assessments via CHV." },
      { icon: ClipboardList, title: "USSD symptom triage", desc: "Dial *456# for AI-assisted classification." },
    ],
  },
  {
    id: "treatment",
    icon: Pill,
    title: "Treatment",
    tagline: "Common primary-care illnesses treated on site.",
    accent: "text-emerald-500 bg-emerald-500/10",
    items: [
      { icon: Thermometer, title: "Acute illness", desc: "Malaria, respiratory, diarrhoeal disease." },
      { icon: Syringe, title: "Vaccinations", desc: "Routine immunization catch-up." },
      { icon: Pill, title: "Chronic disease refills", desc: "Hypertension, diabetes follow-up." },
      { icon: Truck, title: "Solar mobile clinic", desc: "Diagnostics & care delivered to you." },
    ],
  },
  {
    id: "referrals",
    icon: Share2,
    title: "Referrals",
    tagline: "Trusted handoffs when specialist care is needed.",
    accent: "text-purple-500 bg-purple-500/10",
    items: [
      { icon: Hospital, title: "Hospital referral", desc: "Routed to the nearest partner facility." },
      { icon: Users, title: "CHV follow-up", desc: "Local volunteer tracks your status." },
      { icon: Phone, title: "*789# CHV line", desc: "Reach your community health volunteer." },
      { icon: Activity, title: "Track by code", desc: "Open /referrals to see live status." },
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo
        title="Primary Care Services"
        description="Primary healthcare services from HealthDrive — screening, treatment and referrals via USSD, solar mobile clinics and Health Hubs in Rwanda and Nigeria."
        path="/services"
      />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>

      <div className="pt-20">
        {/* Header */}
        <section className="pt-12 pb-8">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Primary care, three ways.</h1>
              <p className="text-lg text-muted-foreground">
                Screening, treatment and referrals — delivered by USSD, solar mobile clinics and community Health Hubs.
              </p>
            </div>
            <img
              src={heroMobileClinic}
              alt="HealthDrive mobile clinic"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1600}
              height={900}
              className="rounded-2xl shadow-xl object-cover w-full aspect-[16/9]"
            />
          </div>
        </section>

        {/* Category jump nav */}
        <section className="pb-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-border/50 text-sm text-foreground hover:ring-2 hover:ring-primary/30 transition"
                >
                  <c.icon className="w-4 h-4 text-primary" />
                  {c.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="py-12 scroll-mt-24" aria-labelledby={`${cat.id}-heading`}>
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.accent}`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <div>
                  <h2 id={`${cat.id}-heading`} className="text-2xl md:text-3xl font-bold text-foreground">{cat.title}</h2>
                  <p className="text-muted-foreground text-sm">{cat.tagline}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((it, i) => (
                  <Card key={i} className="bg-card/90 backdrop-blur-sm border-border/50 hover:shadow-healthcare transition">
                    <CardContent className="p-5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${cat.accent}`}>
                        <it.icon className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-foreground text-sm">{it.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{it.desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Our Approach / Impact */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Approach &amp; Impact</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                HealthDrive runs on two integrated delivery channels that reinforce each other — and a community layer that keeps care continuous after each visit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><span className="text-primary">1.</span> USSD-Based Telehealth</CardTitle>
                  <CardDescription>
                    Four short codes on any basic feature phone — *911#, *123#, *456#, *789#. Free for the patient, no smartphone or internet required. Runs on Rwanda's 97.8% mobile SIM coverage and reaches communities outside the digital divide.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><span className="text-primary">2.</span> Solar-Powered Mobile Clinics</CardTitle>
                  <CardDescription>
                    Vans with diagnostic tools and medical professionals travel to refugee settlements and remote rural areas. Community Health Hubs and CHWs sustain follow-up after the van leaves — making care continuous, not episodic.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stat: "1,247", label: "USSD sessions" },
                { stat: "78%", label: "90-day retention" },
                { stat: "89%", label: "Elderly (55+) retention" },
                { stat: "92%", label: "CHW platform adoption" },
                { stat: "70.4%", label: "Patient uptake" },
                { stat: "7.8/10", label: "Patient satisfaction" },
                { stat: "$125/mo", label: "Operational cost" },
                { stat: "BLEU 36.55", label: "AI triage (Llama-3-8B)" },
              ].map((item, i) => (
                <Card key={i} className="bg-card/90 backdrop-blur-sm border-border/50 text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">{item.stat}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-xs text-center text-muted-foreground mt-6">
              Pilot results from Bugesera and Kayonza districts, Rwanda (Aug 2024 – Mar 2026). Findings submitted to IJISRT; presented at the 2nd Primary Health Care Congress, Amref International University, Nairobi.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <Card className="bg-primary/10 border-primary/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to Access Our Services?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join thousands of patients who have already benefited from our 
                  innovative healthcare solutions. Get started today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 shadow-healthcare"
                    asChild
                  >
                    <Link to="/login">Get Started</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    asChild
                  >
                    <Link to="/team">Meet Our Team</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;