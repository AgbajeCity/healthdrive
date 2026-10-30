import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Phone, Heart, MessageSquare, Users, ArrowRight, Sun, Activity, Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import heroMobileClinic from "@/assets/hero-mobile-clinic.jpg";
import heroUssdPhone from "@/assets/hero-ussd-phone.jpg";
import heroHealthHub from "@/assets/hero-health-hub.jpg";
import heroRouteMap from "@/assets/hero-route-map.jpg";
import PrimaryCareFAQ from "@/components/PrimaryCareFAQ";
import { buildFaqJsonLd } from "@/data/faq";
import { PILOT_LABEL, PILOT_SOURCE, PLANNED_LABEL, SANDBOX_NOTICE, STATUS_NOTICE } from "@/data/pilot";
import { Stethoscope, CalendarDays } from "lucide-react";

const Index = () => {
  const codes = [
    { code: "*911#", label: "Emergency", icon: Heart, color: "text-red-500" },
    { code: "*123#", label: "Find Clinics", icon: MapPin, color: "text-blue-500" },
    { code: "*456#", label: "Health Info", icon: MessageSquare, color: "text-green-500" },
    { code: "*789#", label: "Community", icon: Users, color: "text-purple-500" },
  ];

  // Research pilot results only. National statistics must not be added here.
  const stats = [
    { stat: "1,247", label: "USSD sessions" },
    { stat: "78%", label: "90-day retention" },
    { stat: "89%", label: "Elderly retention" },
  ];

  const contextFigures = [
    { stat: "97.8%", label: "Rwanda mobile SIM coverage (national figure)" },
  ];

  const pillars = [
    { icon: Phone, title: "USSD telehealth", text: "Any feature phone." },
    { icon: Truck, title: "Solar mobile clinics", text: "Care that travels." },
    { icon: Users, title: "Community Hubs", text: "Care between visits." },
    { icon: Activity, title: "AI triage", text: "Llama-3-8B fine-tuned." },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo
        title="HealthDrive — Planned primary healthcare for refugee & rural communities"
        description="HealthDrive Technologies LTD (Rwanda) is developing a planned primary healthcare model for refugee and rural communities, starting in Rwanda. Pre-revenue; no service is open to the public yet."
        path="/"
        jsonLd={buildFaqJsonLd()}
      />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>

      {/* HERO */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div
            role="status"
            className="mb-8 flex items-start gap-3 rounded-xl border border-primary/30 bg-card/90 p-4 text-sm text-foreground"
          >
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <p>{STATUS_NOTICE}</p>
          </div>
        </div>
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Primary healthcare, <span className="text-primary">planned to travel</span> to you.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              A planned primary healthcare model for refugee & rural communities, starting in Rwanda — combining USSD on basic phones, solar mobile clinics and local health workers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/schedule" aria-label="See the mobile clinic schedule">
                  <CalendarDays className="w-4 h-4 mr-2" /> See the schedule
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroMobileClinic}
              alt="Illustration of a planned solar-powered mobile clinic"
              width={1600}
              height={900}
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-2xl shadow-2xl object-cover w-full aspect-[16/9]"
            />
          </div>
        </div>
      </section>

      {/* PLANNED USSD CODES */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Planned USSD codes</h2>
            <p className="text-muted-foreground">Not live yet. {SANDBOX_NOTICE}</p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {codes.map((c) => (
              <li
                key={c.code}
                className="bg-card/90 backdrop-blur-sm border rounded-xl p-5 text-center"
              >
                <c.icon className={`w-8 h-8 mx-auto mb-2 ${c.color}`} aria-hidden="true" />
                <div className="text-2xl font-mono font-bold text-foreground">{c.code}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
                <Badge variant="outline" className="mt-2">{PLANNED_LABEL}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRIMARY CARE CTA */}
      <section className="py-14" aria-labelledby="primary-care-cta">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/20 max-w-5xl mx-auto">
            <CardContent className="p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto md:mx-0">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h2 id="primary-care-cta" className="text-2xl md:text-3xl font-bold text-foreground">Primary care, on the road.</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  Planned: screenings, treatment, maternal & child care, and chronic disease follow-up delivered by solar mobile clinics. No mobile clinic is operating yet.
                </p>
              </div>
              <Button size="lg" asChild className="shrink-0">
                <Link to="/schedule" aria-label="See the mobile clinic schedule">
                  <CalendarDays className="w-4 h-4 mr-2" /> See the schedule
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS - 4 PILLARS */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {pillars.map((p, i) => (
              <Card key={i} className="bg-card/90 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <p.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.text}</div>
                  <Badge variant="outline" className="mt-2">{PLANNED_LABEL}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE CLINICS - VISUAL */}
      <section className="py-14 bg-muted/20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <img
            src={heroRouteMap}
            alt="Illustration of planned mobile clinic coverage"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={1600}
            height={900}
            className="rounded-2xl shadow-xl object-cover w-full aspect-[16/9]"
          />
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8 text-yellow-500" />
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Solar vans. Planned reach.</h2>
            <p className="text-muted-foreground">
              Planned: diagnostics, screenings and treatment delivered where clinics are scarce. No vehicle is in service yet.
            </p>
            <Button asChild><Link to="/schedule" aria-label="See the mobile clinic schedule"><CalendarDays className="w-4 h-4 mr-2" /> See the schedule</Link></Button>
          </div>
        </div>
      </section>

      {/* HEALTH HUBS - VISUAL */}
      <section className="py-14">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            <Users className="w-10 h-10 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Care that stays.</h2>
            <p className="text-muted-foreground">
              Planned: community Health Hubs to keep follow-up going between clinic visits. No Health Hub is operating yet.
            </p>
            <Button asChild variant="outline"><Link to="/health-hubs">View planned hubs <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </div>
          <img
            src={heroHealthHub}
            alt="Illustration of planned community health follow-up"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={1600}
            height={900}
            className="rounded-2xl shadow-xl object-cover w-full aspect-[16/9] order-1 lg:order-2"
          />
        </div>
      </section>

      {/* RESEARCH PILOT STATS */}
      <section className="py-14 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">{PILOT_LABEL}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((item, i) => (
              <Card key={i} className="bg-card/90 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-1">{item.stat}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground mt-6">{PILOT_SOURCE}</p>

          <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto mt-8" aria-label="Context figure, not a pilot result">
            {contextFigures.map((item, i) => (
              <Card key={i} className="bg-card/90 backdrop-blur-sm border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-1">{item.stat}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRIMARY CARE FAQ */}
      <PrimaryCareFAQ />

      {/* USSD HERO IMAGE BAND */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={heroUssdPhone}
          alt="Illustration of a person using a basic feature phone"
          loading="lazy"
          decoding="async"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Where you live shouldn't decide if you live.</h2>
            <Button asChild size="lg"><Link to="/services">Learn more</Link></Button>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-card/10 backdrop-blur-sm" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl font-bold text-primary">HealthDrive</p>
          <p className="text-sm text-muted-foreground">A planned primary healthcare model for refugee and rural communities, starting in Rwanda.</p>
          <p className="text-xs text-muted-foreground mt-2">
            HealthDrive Technologies LTD · Registered in Rwanda · Company Code / TIN 156795747 · Kigali
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
