import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Users, Heart, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { hubs } from "@/data/hubs";
import ReferralForm from "@/components/ReferralForm";
import { useMemo, useState } from "react";
import heroHealthHub from "@/assets/hero-health-hub.jpg";

const HealthHubs = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [service, setService] = useState<string>("all");

  const allServices = useMemo(
    () => Array.from(new Set(hubs.flatMap((h) => h.services))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hubs.filter((h) => {
      if (country !== "all" && h.country !== country) return false;
      if (type !== "all" && h.type !== type) return false;
      if (service !== "all" && !h.services.includes(service)) return false;
      if (q) {
        const hay = `${h.name} ${h.district} ${h.chv} ${h.services.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, country, type, service]);

  const reset = () => {
    setQuery("");
    setCountry("all");
    setType("all");
    setService("all");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo title="Health Hubs Directory" description="Find community Health Hubs and CHVs across Rwanda and Nigeria. Submit a referral and track its status." path="/health-hubs" />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <Heart className="w-10 h-10 text-primary mb-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Health Hubs</h1>
              <p className="text-lg text-muted-foreground">
                Community-based hubs in Rwanda and Nigeria, run by local CHVs.
              </p>
            </div>
            <img
              src={heroHealthHub}
              alt="Community Health Volunteer with patients"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1600}
              height={900}
              className="rounded-2xl shadow-xl object-cover w-full aspect-[16/9]"
            />
          </div>

          {/* Search & filters */}
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 mb-6">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-12 gap-3 items-end">
                <div className="md:col-span-4">
                  <label className="text-xs text-muted-foreground uppercase">Search</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-8"
                      placeholder="Hub, district, CHV…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      maxLength={80}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-muted-foreground uppercase">Country</label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All countries</SelectItem>
                      <SelectItem value="Rwanda">Rwanda</SelectItem>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs text-muted-foreground uppercase">Hub type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="Refugee settlement">Refugee settlement</SelectItem>
                      <SelectItem value="Rural community">Rural community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs text-muted-foreground uppercase">Service</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All services</SelectItem>
                      {allServices.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filtered.length} of {hubs.length} hubs
                </p>
                <Button variant="ghost" size="sm" onClick={reset}>Reset filters</Button>
              </div>
            </CardContent>
          </Card>

          {filtered.length === 0 ? (
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 mb-16">
              <CardContent className="py-12 text-center text-muted-foreground">
                No hubs match your filters. Try clearing the search or selecting a different service.
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filtered.map((hub) => (
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
          )}

          {/* Patient → CHV referral */}
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Request a CHV referral</CardTitle>
              <CardDescription>
                Share your location and the services you need. The Community Health Volunteer at your nearest Health Hub will follow up.
                Already submitted? <Link to="/referrals" className="text-primary underline">Track your referral</Link>.
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
