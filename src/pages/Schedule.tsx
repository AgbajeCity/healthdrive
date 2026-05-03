import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Calendar, MapPin, Sun } from "lucide-react";
import { useState } from "react";

interface Visit {
  date: string;
  country: "Rwanda" | "Nigeria";
  location: string;
  type: "Refugee settlement" | "Rural community";
  van: string;
  services: string[];
  time: string;
}

const visits: Visit[] = [
  { date: "2026-05-12", country: "Rwanda", location: "Mahama Refugee Camp, Kirehe", type: "Refugee settlement", van: "Van 01 — Solar", services: ["NCD screening", "Antenatal care", "Triage"], time: "08:00 – 16:00" },
  { date: "2026-05-14", country: "Rwanda", location: "Kayonza District", type: "Rural community", van: "Van 02 — Solar", services: ["General consultation", "Hypertension monitoring"], time: "09:00 – 17:00" },
  { date: "2026-05-16", country: "Rwanda", location: "Bugesera District", type: "Rural community", van: "Van 02 — Solar", services: ["Diabetes follow-up", "Child immunization"], time: "08:30 – 15:30" },
  { date: "2026-05-19", country: "Rwanda", location: "Kigeme Refugee Camp, Nyamagabe", type: "Refugee settlement", van: "Van 01 — Solar", services: ["Mental health screening", "Medicine refills"], time: "09:00 – 17:00" },
  { date: "2026-05-21", country: "Nigeria", location: "Ado-Ekiti outskirts, Ekiti State", type: "Rural community", van: "Van 03 — Solar", services: ["Cardiovascular screening", "Health education"], time: "09:00 – 16:00" },
  { date: "2026-05-24", country: "Nigeria", location: "Ogoja Refugee Settlement, Cross River", type: "Refugee settlement", van: "Van 03 — Solar", services: ["Primary care", "Maternal health", "Triage"], time: "08:00 – 16:00" },
  { date: "2026-05-27", country: "Rwanda", location: "Mahama Refugee Camp, Kirehe", type: "Refugee settlement", van: "Van 01 — Solar", services: ["Follow-up day", "NCD review"], time: "08:00 – 14:00" },
];

const Schedule = () => {
  const [filter, setFilter] = useState<"All" | "Rwanda" | "Nigeria">("All");
  const filtered = visits.filter((v) => filter === "All" || v.country === filter);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Truck className="w-10 h-10 text-primary" />
              <Sun className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Mobile Clinic Schedule</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Upcoming solar-powered mobile clinic visits to refugee settlements and rural communities across
              Rwanda and Nigeria. Each van is staffed by medical professionals and equipped with diagnostic tools.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {(["All", "Rwanda", "Nigeria"] as const).map((c) => (
              <Button key={c} size="sm" variant={filter === c ? "default" : "outline"} onClick={() => setFilter(c)}>
                {c}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((v, i) => (
              <Card key={i} className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                        {new Date(v.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {v.location} • {v.time}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={v.type === "Refugee settlement" ? "destructive" : "secondary"}>{v.type}</Badge>
                      <span className="text-xs text-muted-foreground">{v.country} • {v.van}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {v.services.map((s, idx) => (
                      <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-full text-foreground">{s}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-8">
            Schedule subject to change due to weather, road access, or community coordination. Dial *123# for the latest clinic visit near you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
