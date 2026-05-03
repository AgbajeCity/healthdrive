import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Phone, Users, Heart, Cross, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Phone,
      title: "USSD-Based Telehealth",
      description: "Healthcare on any basic feature phone — no smartphone, no internet, no data plan required. Free for the patient.",
      features: [
        "*911# — Emergency triage",
        "*123# — Clinic navigation",
        "*456# — AI-assisted symptom classification",
        "*789# — CHW coordination"
      ]
    },
    {
      icon: Truck,
      title: "Solar-Powered Mobile Clinics",
      description: "Vans equipped with diagnostic tools and staffed by medical professionals, travelling to refugee settlements and remote rural areas.",
      features: [
        "On-site consultations & screenings",
        "Treatment close to where people live",
        "Diagnostics where facilities are scarce",
        "Powered entirely by solar"
      ]
    },
    {
      icon: Users,
      title: "Community Health Hubs",
      description: "Community health volunteers and telehealth services sustain follow-up care after the mobile clinic leaves.",
      features: [
        "Continuity of care between visits",
        "Locally trusted CHWs",
        "Chronic disease (NCD) follow-up",
        "Refugee settlement support"
      ]
    },
    {
      icon: Activity,
      title: "AI-Assisted Triage",
      description: "Symptom classification fine-tuned on Meta Llama-3-8B — BLEU 36.55, a 319% improvement over baseline.",
      features: [
        "Triage and referral routing",
        "Mutuelle de Santé integration",
        "Patient records across touchpoints",
        "Open-source on GitHub"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20">
        {/* Header Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              OUR SERVICES
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed to bridge the gap between 
              medical professionals and underserved communities across Kenya.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index} 
                  className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-healthcare transition-all duration-300 group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-border/30">
                      <div className="flex items-center justify-center">
                        <Cross className="w-6 h-6 text-primary/50" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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