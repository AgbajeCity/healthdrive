import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Phone, Users, Activity, Calendar, Truck } from "lucide-react";
import { getHub } from "@/data/hubs";
import ReferralForm from "@/components/ReferralForm";
import RouteMap from "@/components/RouteMap";
import { visits } from "@/data/schedule";
import { findNearestHubSlug } from "@/lib/geo";
import { useMatchRadiusKm } from "@/hooks/use-match-radius";
import { useMemo } from "react";

const HubDetail = () => {
  const { slug = "" } = useParams();
  const hub = getHub(slug);
  const radius = useMatchRadiusKm();

  const upcomingVisits = useMemo(() => {
    if (!hub) return [];
    const today = new Date().toISOString().slice(0, 10);
    return visits
      .filter((v) => findNearestHubSlug(v.coords, radius) === hub.slug && v.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [hub, radius]);

  // Aggregate likely services across upcoming visits
  const upcomingServices = useMemo(() => {
    const set = new Set<string>();
    upcomingVisits.forEach((v) => v.services.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [upcomingVisits]);

  if (!hub) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
      <Seo title="Health Hub Details" description="Hub services, CHV contact, upcoming mobile clinic visits and how to request assistance." path="/health-hubs" />
        <div className="pt-24 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Hub not found</h1>
          <Button asChild variant="outline">
            <Link to="/health-hubs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Health Hubs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/health-hubs"><ArrowLeft className="w-4 h-4 mr-2" /> All Health Hubs</Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-2xl">{hub.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {hub.district}, {hub.country}
                      </CardDescription>
                    </div>
                    <Badge variant={hub.type === "Refugee settlement" ? "destructive" : "secondary"}>
                      {hub.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/90 leading-relaxed">{hub.description}</p>

                  <div>
                    <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                      <Activity className="w-4 h-4" /> Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {hub.services.map((s, i) => (
                        <span key={i} className="text-sm bg-muted px-3 py-1 rounded-full text-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" /> Upcoming mobile clinic visits
                  </CardTitle>
                  <CardDescription>
                    Estimated services available at this hub during the next solar van stops.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingVisits.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No upcoming visits scheduled. Check the <Link to="/schedule" className="text-primary underline">full schedule</Link>.
                    </p>
                  ) : (
                    <>
                      <ul className="space-y-3">
                        {upcomingVisits.map((v, i) => (
                          <li key={i} className="flex items-start gap-3 border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
                            <Calendar className="w-4 h-4 text-primary mt-1 shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">
                                {new Date(v.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} • {v.time}
                              </p>
                              <p className="text-xs text-muted-foreground">{v.van}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {v.services.map((s, idx) => (
                                  <span key={idx} className="text-xs bg-muted px-2 py-0.5 rounded-full">{s}</span>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {upcomingServices.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase font-semibold text-muted-foreground mb-2">
                            Estimated service availability
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {upcomingServices.map((s) => (
                              <Badge key={s} variant="secondary">{s}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <RouteMap stops={[{ name: hub.name, coords: hub.coords }]} country={hub.country} highlightIndex={0} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" /> Community Health Volunteer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-semibold text-foreground">{hub.chv}</p>
                  <p className="text-sm text-muted-foreground">{hub.chvPhone}</p>
                  <div className="flex flex-col gap-2">
                    <Button asChild size="sm">
                      <a href={`tel:${hub.chvPhone.replace(/\s/g, "")}`}>
                        <Phone className="w-3 h-3 mr-1" /> Call CHV
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a href={`tel:${encodeURIComponent(hub.ussd)}`}>Dial {hub.ussd}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Request assistance</CardTitle>
                  <CardDescription>The CHV at this hub will follow up with you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReferralForm defaultHub={hub} compact />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubDetail;
