import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cross, Phone, MessageSquare, Heart, Users, MapPin, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { USSD_SHORTCUTS } from "@/data/ussd-shortcuts";
import { PLANNED_LABEL, SANDBOX_NOTICE } from "@/data/pilot";

// Information page for the planned USSD service. The phone simulator screens
// were removed: the codes are not live and no simulated flow may be shown.
const USSD = () => {
  const renderMainMenu = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Primary Care via USSD</h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">The four codes below are the planned design and are not live. {SANDBOX_NOTICE} No telecom operator agreement exists and the service is not open to the public.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Emergency Services */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-red-500" />
                <CardTitle className="text-lg">Emergency Services</CardTitle>
              </div>
              <Badge variant="outline">{PLANNED_LABEL}</Badge>
            </div>
            <CardDescription>Planned: emergency triage. Not live.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*911#</span>
              <Badge variant="outline">{PLANNED_LABEL}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Find Clinics */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-lg">Find Nearby Clinics</CardTitle>
              </div>
              <Badge variant="outline">{PLANNED_LABEL}</Badge>
            </div>
            <CardDescription>Planned: help finding a health facility. Not live.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*123#</span>
              <Badge variant="outline">{PLANNED_LABEL}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-green-500" />
              <CardTitle className="text-lg">Health Information</CardTitle>
            </div>
            <CardDescription>Planned: AI-assisted symptom guidance. Not live.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*456#</span>
              <Badge variant="outline">{PLANNED_LABEL}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Community Health */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-500" />
              <CardTitle className="text-lg">Community Health</CardTitle>
            </div>
            <CardDescription>Planned: community health worker coordination. Not live.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*789#</span>
              <Badge variant="outline">{PLANNED_LABEL}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            How the planned USSD service would work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
            <p className="text-foreground">A patient would dial a code on a basic mobile phone</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
            <p className="text-foreground">Menu options would appear on screen</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
            <p className="text-foreground">The patient would press a number to choose</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">4</div>
            <p className="text-foreground">Information or next steps would be shown</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo
        title="Planned USSD Primary Healthcare"
        description="Planned USSD primary healthcare service for basic feature phones. Codes *911#, *123#, *456#, *789# are planned and not live; a sandbox test build is running for development only."
        path="/ussd"
      />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>

      <div className="pt-20 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Cross className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">HealthDrive USSD</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Planned primary healthcare service for any basic feature phone — not live. {SANDBOX_NOTICE}
            </p>
          </div>

          {/* Shortcuts at-a-glance */}
          <>
              <Card className="bg-card/90 backdrop-blur-sm border-border/50 mb-4" data-testid="ussd-shortcuts">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    {USSD_SHORTCUTS.map((s) => {
                      const iconMap: Record<string, any> = { emergency: Heart, clinics: MapPin, "health-info": MessageSquare, community: Users };
                      const colorMap: Record<string, string> = { emergency: "text-red-500", clinics: "text-blue-500", "health-info": "text-green-500", community: "text-purple-500" };
                      const Icon = iconMap[s.service];
                      return (
                        <div
                          key={s.code}
                          data-testid={`ussd-shortcut-${s.service}`}
                          data-code={s.code}
                          className="rounded-lg border border-border/50 p-3"
                        >
                          <Icon className={`w-5 h-5 mx-auto mb-1 ${colorMap[s.service]}`} />
                          <div className="font-mono font-bold text-foreground text-sm">{s.code}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                          <Badge variant="outline" className="mt-1 text-[10px]">{PLANNED_LABEL}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center mb-6">
                <Button asChild size="sm" variant="outline">
                  <Link to="/schedule" aria-label="See the mobile clinic schedule">
                    <CalendarDays className="w-4 h-4 mr-2" /> See the schedule
                  </Link>
                </Button>
              </div>
          </>

          {renderMainMenu()}
        </div>
      </div>
    </div>
  );
};

export default USSD;
