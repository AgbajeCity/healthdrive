import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Sun } from "lucide-react";
import { PLANNED_FIRST_DEPLOYMENT } from "@/data/schedule";
import { PLANNED_LABEL } from "@/data/pilot";
import heroRouteMap from "@/assets/hero-route-map.jpg";

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo
        title="Clinic Schedule — Planned First Deployment"
        description="HealthDrive's planned first mobile clinic deployment is Mahama Refugee Camp, Kirehe District, Rwanda. No date is set and no vehicle is in service."
        path="/schedule"
      />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Truck className="w-10 h-10 text-primary" />
                <Sun className="w-8 h-8 text-yellow-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Clinic Schedule</h1>
              <p className="text-lg text-muted-foreground">No visits are scheduled. Mobile clinics are planned, not operating.</p>
            </div>
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
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-2">
                <Badge variant="outline">{PLANNED_LABEL}</Badge>
                <p className="text-lg text-foreground">{PLANNED_FIRST_DEPLOYMENT}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
