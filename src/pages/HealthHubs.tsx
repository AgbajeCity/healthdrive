import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Users, Heart } from "lucide-react";

interface Hub {
  name: string;
  country: "Rwanda" | "Nigeria";
  district: string;
  type: "Refugee settlement" | "Rural community";
  chv: string;
  chvPhone: string;
  ussd: string;
  services: string[];
}

const hubs: Hub[] = [
  {
    name: "Mahama Health Hub",
    country: "Rwanda",
    district: "Kirehe District — Mahama Refugee Camp",
    type: "Refugee settlement",
    chv: "Esperance Mukamana",
    chvPhone: "+250 788 123 456",
    ussd: "*789#",
    services: ["NCD follow-up", "Maternal health", "USSD triage support"],
  },
  {
    name: "Kayonza Community Hub",
    country: "Rwanda",
    district: "Kayonza District",
    type: "Rural community",
    chv: "Jean-Paul Habimana",
    chvPhone: "+250 788 234 567",
    ussd: "*789#",
    services: ["Mobile clinic coordination", "Hypertension monitoring", "Referral routing"],
  },
  {
    name: "Bugesera Community Hub",
    country: "Rwanda",
    district: "Bugesera District",
    type: "Rural community",
    chv: "Claudine Uwimana",
    chvPhone: "+250 788 345 678",
    ussd: "*789#",
    services: ["Diabetes follow-up", "Child immunization", "Mutuelle de Santé support"],
  },
  {
    name: "Kigeme Health Hub",
    country: "Rwanda",
    district: "Nyamagabe — Kigeme Refugee Camp",
    type: "Refugee settlement",
    chv: "Aline Ingabire",
    chvPhone: "+250 788 456 789",
    ussd: "*789#",
    services: ["Medicine continuity", "Mental health screening", "Antenatal care"],
  },
  {
    name: "Ado-Ekiti Rural Hub",
    country: "Nigeria",
    district: "Ekiti State — Ado-Ekiti outskirts",
    type: "Rural community",
    chv: "Folake Adeyemi",
    chvPhone: "+234 803 123 4567",
    ussd: "*789#",
    services: ["Cardiovascular screening", "Health education", "Emergency referral"],
  },
  {
    name: "Ogoja Refugee Hub",
    country: "Nigeria",
    district: "Cross River — Ogoja Settlement",
    type: "Refugee settlement",
    chv: "Emeka Obi",
    chvPhone: "+234 803 234 5678",
    ussd: "*789#",
    services: ["Primary care", "Supply chain coordination", "CHW dispatch"],
  },
];

const HealthHubs = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Health Hubs Directory</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Community-based hubs in Rwanda and Nigeria where local Community Health Volunteers (CHVs)
              sustain care between mobile clinic visits. Tap a hub to call your local CHV directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub, i) => (
              <Card key={i} className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{hub.name}</CardTitle>
                    <Badge variant={hub.type === "Refugee settlement" ? "destructive" : "secondary"} className="text-xs whitespace-nowrap">
                      {hub.type}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" /> {hub.district}, {hub.country}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-foreground"><strong>CHV:</strong> {hub.chv}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Services</h4>
                    <div className="flex flex-wrap gap-1">
                      {hub.services.map((s, idx) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-full text-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button asChild size="sm" className="flex-1">
                      <a href={`tel:${hub.chvPhone.replace(/\s/g, "")}`}>
                        <Phone className="w-3 h-3 mr-1" /> Call CHV
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <a href={`tel:${encodeURIComponent(hub.ussd)}`}>
                        Dial {hub.ussd}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHubs;
