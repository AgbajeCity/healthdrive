import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroRouteMap from "@/assets/hero-route-map.jpg";
import { hubs } from "@/data/hubs";

const Map = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <MapPin className="w-10 h-10 text-primary mb-3" aria-hidden="true" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Find care near you</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Browse Health Hubs across Rwanda and Nigeria, or check the next mobile clinic stop.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/health-hubs">All hubs <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" /></Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/schedule"><Truck className="w-4 h-4 mr-1" aria-hidden="true" /> Van schedule</Link>
                </Button>
              </div>
            </div>
            <img
              src={heroRouteMap}
              alt="Rwanda and Nigeria map with mobile clinic routes"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1600}
              height={900}
              className="rounded-2xl shadow-xl object-cover w-full aspect-[16/9]"
            />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4">Featured hubs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hubs.slice(0, 6).map((h) => (
              <Card key={h.slug} className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{h.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" aria-hidden="true" /> {h.district}, {h.country}
                      </p>
                    </div>
                    <Badge variant={h.type === "Refugee settlement" ? "destructive" : "secondary"} className="text-xs whitespace-nowrap">
                      {h.type}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link to={`/health-hubs/${h.slug}`}>Details</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a href={`tel:${h.chvPhone.replace(/\s/g, "")}`} aria-label={`Call CHV ${h.chv}`}>
                        <Phone className="w-3 h-3" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;
