import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck, Phone, Users, Cross, Activity,
  Stethoscope, Pill, Share2, Baby, HeartPulse, Eye, Syringe, Thermometer, ClipboardList, Hospital, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { PILOT_COST, PILOT_LABEL, PILOT_SOURCE, PLANNED_LABEL, SANDBOX_NOTICE } from "@/data/pilot";
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
      { icon: HeartPulse, title: "Blood pressure & diabetes", desc: "Planned NCD screening at mobile clinic stops." },
      { icon: Baby, title: "Maternal & child checks", desc: "Planned antenatal vitals, growth and immunization checks." },
      { icon: Eye, title: "Vision & basic vitals", desc: "Planned quick assessments by community health workers." },
      { icon: ClipboardList, title: "USSD symptom triage", desc: "Planned code *456# for AI-assisted classification. Not live." },
    ],
  },
  {
    id: "treatment",
    icon: Pill,
    title: "Treatment",
    tagline: "Planned treatment of common primary-care illnesses on site.",
    accent: "text-emerald-500 bg-emerald-500/10",
    items: [
      { icon: Thermometer, title: "Acute illness", desc: "Planned care for malaria, respiratory and diarrhoeal disease." },
      { icon: Syringe, title: "Vaccinations", desc: "Planned routine immunization catch-up." },
      { icon: Pill, title: "Chronic disease refills", desc: "Planned hypertension and diabetes follow-up." },
      { icon: Truck, title: "Solar mobile clinic", desc: "Planned. No vehicle is in service yet." },
    ],
  },
  {
    id: "referrals",
    icon: Share2,
    title: "Referrals",
    tagline: "Planned handoffs when specialist care is needed.",
    accent: "text-purple-500 bg-purple-500/10",
    items: [
      { icon: Hospital, title: "Hospital referral", desc: "Planned routing to the nearest health facility." },
      { icon: Users, title: "Community follow-up", desc: "Planned follow-up by a community health worker." },
      { icon: Phone, title: "*789# community line", desc: "Planned code. Not live." },
      { icon: Activity, title: "Track by code", desc: "Planned. Referral requests are not open yet." },
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo
        title="Planned Primary Care Services"
        description="Planned primary healthcare services from HealthDrive — screening, treatment and referrals via USSD, solar mobile clinics and Health Hubs, starting in Rwanda. Not yet available."
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
                Planned screening, treatment and referrals — through USSD, solar mobile clinics and community Health Hubs, starting in Rwanda. None of these services is available yet.
              </p>
            </div>
            <img
              src={heroMobileClinic}
              alt="Illustration of a planned HealthDrive mobile clinic"
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
                      <Badge variant="outline" className="mt-2">{PLANNED_LABEL}</Badge>
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
                HealthDrive is planned around two delivery channels that reinforce each other — and a community layer to keep care continuous after each visit. Neither channel is operating yet.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><span className="text-primary">1.</span> USSD-Based Telehealth <Badge variant="outline">{PLANNED_LABEL}</Badge></CardTitle>
                  <CardDescription>
                    Four planned short codes for any basic feature phone — *911#, *123#, *456#, *789#. Designed to need no smartphone or internet. The codes are not live: {SANDBOX_NOTICE} No telecom operator agreement is in place and the service is not open to the public.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><span className="text-primary">2.</span> Solar-Powered Mobile Clinics <Badge variant="outline">{PLANNED_LABEL}</Badge></CardTitle>
                  <CardDescription>
                    Planned: vans with diagnostic tools and medical professionals would travel to refugee settlements and remote rural areas, with community Health Hubs sustaining follow-up after each visit. No vehicle or Health Hub is operating yet.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <h3 className="text-xl font-bold text-center text-foreground mb-6">{PILOT_LABEL}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stat: "1,247", label: "USSD sessions" },
                { stat: "78%", label: "90-day retention" },
                { stat: "89%", label: "Elderly (55+) retention" },
                { stat: "92%", label: "CHW platform adoption" },
                { stat: "70.4%", label: "Patient uptake" },
                { stat: "7.8/10", label: "Patient satisfaction" },
                PILOT_COST,
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
              {PILOT_SOURCE}
            </p>

            {/* Not a pilot result — kept outside the pilot group */}
            <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto mt-8">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary mb-1">BLEU 36.55</div>
                  <div className="text-xs text-muted-foreground">Triage model BLEU 36.55 (public GitHub repository, not evaluated in Kinyarwanda)</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <Card className="bg-primary/10 border-primary/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Not open to the public yet.
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  HealthDrive is pre-revenue. The USSD service is in sandbox testing and no mobile clinic or Health Hub is operating. See the planned first deployment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/schedule">See the schedule <ArrowRight className="w-4 h-4 ml-1" /></Link>
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