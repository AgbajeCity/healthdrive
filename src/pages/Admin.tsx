import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { hubs } from "@/data/hubs";
import { useToast } from "@/hooks/use-toast";
import { Lock, Search, ChevronLeft, ChevronRight, RefreshCw, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface Row {
  reference_code: string;
  full_name: string;
  phone: string;
  location: string;
  hub_slug: string;
  services: string[];
  notes: string | null;
  status: string;
  assigned_chv: string | null;
  created_at: string;
  updated_at: string;
  total_count: number;
}

const STATUSES = ["received", "assigned", "in_progress", "completed"] as const;
const PAGE_SIZE = 10;

const PASSCODE_KEY = "hd-admin-passcode";

const Admin = () => {
  const { toast } = useToast();
  const [passcode, setPasscode] = useState(sessionStorage.getItem(PASSCODE_KEY) ?? "");
  const [authed, setAuthed] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hubFilter, setHubFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [savingCode, setSavingCode] = useState<string>("");

  const eligibleHubs = countryFilter === "all"
    ? hubs
    : hubs.filter((h) => h.country === countryFilter);

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("list_referrals", {
      _passcode: passcode,
      _search: search || null,
      _status: statusFilter === "all" ? null : statusFilter,
      _hub_slug: hubFilter === "all" ? null : hubFilter,
      _limit: PAGE_SIZE,
      _offset: page * PAGE_SIZE,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Could not load", description: error.message, variant: "destructive" });
      if (error.message.toLowerCase().includes("unauthorized")) {
        setAuthed(false);
        sessionStorage.removeItem(PASSCODE_KEY);
      }
      return;
    }
    let result = (data as Row[]) ?? [];
    // Apply country filter client-side via hub slug
    if (countryFilter !== "all") {
      const allowed = new Set(eligibleHubs.map((h) => h.slug));
      result = result.filter((r) => allowed.has(r.hub_slug));
    }
    setRows(result);
    setTotal(result[0]?.total_count ?? 0);
  };

  useEffect(() => {
    if (authed) fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, page, statusFilter, hubFilter, countryFilter]);

  const tryUnlock = async () => {
    if (!passcode.trim()) return;
    sessionStorage.setItem(PASSCODE_KEY, passcode);
    setAuthed(true);
    setPage(0);
  };

  const updateStatus = async (code: string, newStatus: string, assignedChv: string | null) => {
    setSavingCode(code);
    const { error } = await supabase.rpc("update_referral_status", {
      _passcode: passcode,
      _reference_code: code,
      _status: newStatus,
      _assigned_chv: assignedChv,
    });
    setSavingCode("");
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Referral updated", description: `${code} → ${newStatus.replace("_", " ")}` });
    fetchRows();
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="pt-24 container mx-auto px-4 max-w-md">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" /> Admin access
              </CardTitle>
              <CardDescription>
                Enter the admin passcode to view and manage referrals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                type="password"
                placeholder="Admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
              />
              <Button onClick={tryUnlock} className="w-full">Unlock</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Referrals admin</h1>
              <p className="text-sm text-muted-foreground">
                {total} referral{total === 1 ? "" : "s"} match your filters
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => { sessionStorage.removeItem(PASSCODE_KEY); setAuthed(false); }}>
              Sign out
            </Button>
          </div>

          {/* Filters */}
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 mb-6">
            <CardContent className="pt-6 grid md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-4">
                <Label className="text-xs uppercase">Search</Label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Name, phone, or HD-…" value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (setPage(0), fetchRows())} />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase">Status</Label>
                <Select value={statusFilter} onValueChange={(v) => { setPage(0); setStatusFilter(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs uppercase">Country</Label>
                <Select value={countryFilter} onValueChange={(v) => { setPage(0); setCountryFilter(v); setHubFilter("all"); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Rwanda">Rwanda</SelectItem>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Label className="text-xs uppercase">Hub</Label>
                <Select value={hubFilter} onValueChange={(v) => { setPage(0); setHubFilter(v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All hubs</SelectItem>
                    {eligibleHubs.map((h) => (
                      <SelectItem key={h.slug} value={h.slug}>{h.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Button onClick={() => { setPage(0); fetchRows(); }} className="w-full" disabled={loading}>
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rows */}
          <div className="space-y-3">
            {rows.length === 0 && !loading && (
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardContent className="py-12 text-center text-muted-foreground">
                  No referrals match your filters.
                </CardContent>
              </Card>
            )}

            {rows.map((r) => (
              <ReferralRow
                key={r.reference_code}
                row={r}
                saving={savingCode === r.reference_code}
                onSave={updateStatus}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
              <Button variant="outline" size="sm" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RowProps {
  row: Row;
  saving: boolean;
  onSave: (code: string, status: string, chv: string | null) => void;
}

const ReferralRow = ({ row, saving, onSave }: RowProps) => {
  const [status, setStatus] = useState(row.status);
  const [chv, setChv] = useState(row.assigned_chv ?? "");
  const hub = hubs.find((h) => h.slug === row.hub_slug);
  const dirty = status !== row.status || (chv || null) !== (row.assigned_chv ?? null);

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-mono">
              <Link to={`/referrals/${row.reference_code}`} className="hover:text-primary">
                {row.reference_code}
              </Link>
            </CardTitle>
            <CardDescription>
              {row.full_name} • {row.phone} • {row.location}
            </CardDescription>
          </div>
          <Badge variant="secondary">{row.status.replace("_", " ")}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">
          Hub: <span className="text-foreground">{hub?.name ?? row.hub_slug}</span> ({hub?.country})
        </div>
        <div className="flex flex-wrap gap-1">
          {row.services.map((s) => (
            <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded-full">{s}</span>
          ))}
        </div>
        {row.notes && (
          <p className="text-sm text-foreground/80 italic border-l-2 border-border pl-3">"{row.notes}"</p>
        )}
        <div className="grid sm:grid-cols-3 gap-2 items-end pt-2 border-t border-border/40">
          <div>
            <Label className="text-xs uppercase">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs uppercase">Assigned CHV</Label>
            <Input value={chv} placeholder={hub?.chv ?? "CHV name"} onChange={(e) => setChv(e.target.value)} maxLength={120} />
          </div>
          <Button
            size="sm"
            disabled={!dirty || saving}
            onClick={() => onSave(row.reference_code, status, chv.trim() || null)}
          >
            <Save className="w-3 h-3 mr-1" /> {saving ? "Saving…" : "Save"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Submitted {new Date(row.created_at).toLocaleString()} • Updated {new Date(row.updated_at).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default Admin;
