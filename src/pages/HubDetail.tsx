import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Activity, Truck, Info } from "lucide-react";
import { getHub, HUB_STATUS_LABEL } from "@/data/hubs";
import RouteMap from "@/components/RouteMap";

const HubDetail = () => {
  const { slug = "" } = useParams();
  const hub = getHub(slug);

  if (!hub) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <Seo title="Planned Health Hub" description="Planned HealthDrive Health Hub. No Health Hub is operating yet." path="/health-hubs" />
        <a id="main" tabIndex={-1} className="sr-only">Main content</a>
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
      <Seo
        title={`${hub.name} — Planned Health Hub`}
        description={`${hub.name}, ${hub.district}, ${hub.country}: planned HealthDrive Health Hub. Not operating.`}
        path={`/health-hubs/${hub.slug}`}
      />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>
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
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant={hub.type === "Refugee settlement" ? "destructive" : "secondary"}>
                        {hub.type}
                      </Badge>
                      <Badge variant="outline">{HUB_STATUS_LABEL}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/90 leading-relaxed">{hub.description}</p>

                  <div>
                    <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                      <Activity className="w-4 h-4" /> Planned services
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
                    <Truck className="w-5 h-5 text-primary" /> Mobile clinic visits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    No visits are scheduled and no vehicle is in service. See the <Link to="/schedule" className="text-primary underline">clinic schedule</Link> for the planned first deployment.
                  </p>
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
                <CardContent className="py-6 flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-foreground">Referral requests are not open yet.</p>
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
