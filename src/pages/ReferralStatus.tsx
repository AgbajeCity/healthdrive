import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Clock, UserCheck, Search, ArrowRight } from "lucide-react";
import { getHub } from "@/data/hubs";

interface Referral {
  reference_code: string;
  full_name: string;
  location: string;
  hub_slug: string;
  services: string[];
  status: string;
  assigned_chv: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_STEPS = [
  { key: "received", label: "Received", icon: CheckCircle2 },
  { key: "assigned", label: "Assigned to CHV", icon: UserCheck },
  { key: "in_progress", label: "In progress", icon: Clock },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
];

const ReferralStatus = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [lookup, setLookup] = useState(code ?? "");
  const [referral, setReferral] = useState<Referral | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchStatus = async (c: string) => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.rpc("get_referral_status", { _code: c.trim() });
    setLoading(false);
    if (error) {
      setError(error.message);
      setReferral(null);
      return;
    }
    if (!data || data.length === 0) {
      setError("No referral found with that code.");
      setReferral(null);
      return;
    }
    setReferral(data[0] as Referral);
  };

  useEffect(() => {
    if (code) fetchStatus(code);
  }, [code]);

  const currentStep = referral
    ? Math.max(0, STATUS_STEPS.findIndex((s) => s.key === referral.status))
    : 0;
  const hub = referral ? getHub(referral.hub_slug) : null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo title="Track Your Referral" description="Enter your reference code to see the status of your CHV referral." path="/referrals" />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">Track your referral</h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter the reference code you received after submitting your referral.
          </p>

          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare mb-6">
            <CardContent className="pt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (lookup.trim()) navigate(`/referrals/${lookup.trim()}`);
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="HD-XXXXXX"
                  value={lookup}
                  onChange={(e) => setLookup(e.target.value.toUpperCase())}
                  maxLength={32}
                />
                <Button type="submit" disabled={loading}>
                  <Search className="w-4 h-4 mr-1" /> {loading ? "Searching..." : "Track"}
                </Button>
              </form>
              {error && <p className="text-sm text-destructive mt-3">{error}</p>}
            </CardContent>
          </Card>

          {referral && (
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">Referral {referral.reference_code}</CardTitle>
                    <CardDescription>
                      For {referral.full_name} • {referral.location}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{referral.status.replace("_", " ")}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status timeline */}
                <ol className="space-y-3">
                  {STATUS_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    const reached = i <= currentStep;
                    return (
                      <li key={step.key} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            reached ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={reached ? "text-foreground font-medium" : "text-muted-foreground"}>
                          {step.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Assigned CHV</p>
                    <p className="text-foreground">{referral.assigned_chv ?? "Pending assignment"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Health Hub</p>
                    <p className="text-foreground">{hub?.name ?? referral.hub_slug}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted-foreground uppercase">Services requested</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {referral.services.map((s) => (
                        <span key={s} className="text-xs bg-muted px-2 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2 text-xs text-muted-foreground">
                    Submitted {new Date(referral.created_at).toLocaleString()} • Last update{" "}
                    {new Date(referral.updated_at).toLocaleString()}
                  </div>
                </div>

                {hub && (
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/health-hubs/${hub.slug}`}>
                      View {hub.name} <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralStatus;
