import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Users, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { hubs } from "@/data/hubs";
import ReferralForm from "@/components/ReferralForm";

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
              sustain care between mobile clinic visits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {hubs.map((hub) => (
              <Card key={hub.slug} className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare flex flex-col">
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
                <CardContent className="space-y-4 flex-1 flex flex-col">
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
                  <div className="mt-auto space-y-2 pt-2">
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <a href={`tel:${hub.chvPhone.replace(/\s/g, "")}`}>
                          <Phone className="w-3 h-3 mr-1" /> Call CHV
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <Link to={`/health-hubs/${hub.slug}`}>
                          Details <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Patient → CHV referral */}
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Request a CHV referral</CardTitle>
              <CardDescription>
                Share your location and the services you need. The Community Health Volunteer at your nearest Health Hub will follow up.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReferralForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthHubs;
