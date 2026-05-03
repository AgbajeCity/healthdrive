import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { hubs } from "@/data/hubs";
import { useToast } from "@/hooks/use-toast";
import { Lock, Search, ChevronLeft, ChevronRight, RefreshCw, Save, Download, Settings as SettingsIcon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { getMatchRadiusKm, setMatchRadiusKm, DEFAULT_MATCH_RADIUS_KM } from "@/lib/settings";

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

const escapeCsv = (v: unknown) => {
  const s = v == null ? "" : Array.isArray(v) ? v.join("; ") : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const Admin = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

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
  const [exporting, setExporting] = useState(false);

  // Settings
  const [radiusInput, setRadiusInput] = useState<number>(getMatchRadiusKm());
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [changingPass, setChangingPass] = useState(false);

  const eligibleHubs = countryFilter === "all"
    ? hubs
    : hubs.filter((h) => h.country === countryFilter);

  // Auth bootstrap
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleAuth = async () => {
    setAuthBusy(true);
    const fn = authMode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password });
    setAuthBusy(false);
    if (error) {
      toast({ title: authMode === "signin" ? "Sign in failed" : "Sign up failed", description: error.message, variant: "destructive" });
      return;
    }
    if (authMode === "signup") {
      toast({ title: "Account created", description: "You can now enter the admin passcode." });
    }
  };

  const fetchRows = async (overrides?: { offsetPage?: number }) => {
    setLoading(true);
    const targetPage = overrides?.offsetPage ?? page;
    const { data, error } = await supabase.rpc("list_referrals", {
      _passcode: passcode,
      _search: search || null,
      _status: statusFilter === "all" ? null : statusFilter,
      _hub_slug: hubFilter === "all" ? null : hubFilter,
      _limit: PAGE_SIZE,
      _offset: targetPage * PAGE_SIZE,
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
    if (countryFilter !== "all") {
      const allowed = new Set(eligibleHubs.map((h) => h.slug));
      result = result.filter((r) => allowed.has(r.hub_slug));
    }
    setRows(result);
    setTotal(result[0]?.total_count ?? 0);
  };

  useEffect(() => {
    if (session && authed) fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, authed, page, statusFilter, hubFilter, countryFilter]);

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

  const exportCsv = async () => {
    setExporting(true);
    // Pull all matching rows in pages of 500
    const all: Row[] = [];
    let offset = 0;
    const PAGE = 500;
    while (true) {
      const { data, error } = await supabase.rpc("list_referrals", {
        _passcode: passcode,
        _search: search || null,
        _status: statusFilter === "all" ? null : statusFilter,
        _hub_slug: hubFilter === "all" ? null : hubFilter,
        _limit: PAGE,
        _offset: offset,
      });
      if (error) {
        toast({ title: "Export failed", description: error.message, variant: "destructive" });
        setExporting(false);
        return;
      }
      const chunk = (data as Row[]) ?? [];
      all.push(...chunk);
      if (chunk.length < PAGE) break;
      offset += PAGE;
    }
    const filtered = countryFilter === "all"
      ? all
      : all.filter((r) => eligibleHubs.some((h) => h.slug === r.hub_slug));

    const headers = ["reference_code","full_name","phone","location","hub_slug","services","notes","status","assigned_chv","created_at","updated_at"];
    const csv = [
      headers.join(","),
      ...filtered.map((r) => headers.map((h) => escapeCsv((r as any)[h])).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `referrals-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
    toast({ title: "Export ready", description: `${filtered.length} referrals downloaded.` });
  };

  const saveRadius = () => {
    const n = Number(radiusInput);
    if (!Number.isFinite(n) || n <= 0 || n > 1000) {
      toast({ title: "Invalid radius", description: "Enter a number between 1 and 1000 km.", variant: "destructive" });
      return;
    }
    setMatchRadiusKm(n);
    toast({ title: "Radius updated", description: `Stop-to-hub matching now uses ${n} km.` });
  };

  const changePasscode = async () => {
    if (newPass !== confirmPass) {
      toast({ title: "Passcodes don't match", variant: "destructive" });
      return;
    }
    setChangingPass(true);
    const { error } = await supabase.rpc("update_admin_passcode", {
      _current_passcode: currentPass,
      _new_passcode: newPass,
    });
    setChangingPass(false);
    if (error) {
      toast({ title: "Could not change passcode", description: error.message, variant: "destructive" });
      return;
    }
    sessionStorage.setItem(PASSCODE_KEY, newPass);
    setPasscode(newPass);
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
    toast({ title: "Passcode updated" });
  };

  // ---------- Render: auth gate ----------
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="pt-24 container mx-auto px-4 max-w-md">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" /> Admin sign in</CardTitle>
              <CardDescription>Admin access requires a registered account plus the admin passcode.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button onClick={handleAuth} className="w-full" disabled={authBusy}>
                {authBusy ? "..." : authMode === "signin" ? "Sign in" : "Create account"}
              </Button>
              <Button variant="ghost" size="sm" className="w-full"
                onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}>
                {authMode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ---------- Render: passcode gate ----------
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="pt-24 container mx-auto px-4 max-w-md">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" /> Admin passcode</CardTitle>
              <CardDescription>Signed in as {session.user.email}. Enter the admin passcode to continue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input type="password" placeholder="Admin passcode" value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryUnlock()} />
              <Button onClick={tryUnlock} className="w-full">Unlock</Button>
              <Button variant="ghost" size="sm" className="w-full"
                onClick={() => supabase.auth.signOut()}>
                <LogOut className="w-3 h-3 mr-1" /> Sign out
              </Button>
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
              <h1 className="text-3xl font-bold text-foreground">Admin</h1>
              <p className="text-sm text-muted-foreground">Signed in as {session.user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => {
              sessionStorage.removeItem(PASSCODE_KEY);
              setAuthed(false);
              supabase.auth.signOut();
            }}>
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>

          <Tabs defaultValue="referrals">
            <TabsList>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="settings"><SettingsIcon className="w-3 h-3 mr-1" /> Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="referrals" className="space-y-4 mt-4">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6 grid md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-4">
                    <Label className="text-xs uppercase">Search</Label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input className="pl-8" placeholder="Name, phone, or HD-…" value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (setPage(0), fetchRows({ offsetPage: 0 }))} />
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
                  <div className="md:col-span-2">
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
                  <div className="md:col-span-2 flex gap-2">
                    <Button onClick={() => { setPage(0); fetchRows({ offsetPage: 0 }); }} disabled={loading} className="flex-1">
                      <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button variant="outline" onClick={exportCsv} disabled={exporting} className="flex-1">
                      <Download className="w-4 h-4 mr-1" /> {exporting ? "..." : "CSV"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <p className="text-sm text-muted-foreground">
                {total} referral{total === 1 ? "" : "s"} match your filters
              </p>

              <div className="space-y-3">
                {rows.length === 0 && !loading && (
                  <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                    <CardContent className="py-12 text-center text-muted-foreground">
                      No referrals match your filters.
                    </CardContent>
                  </Card>
                )}
                {rows.map((r) => (
                  <ReferralRow key={r.reference_code} row={r}
                    saving={savingCode === r.reference_code} onSave={updateStatus} />
                ))}
              </div>

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
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Stop-to-hub matching radius</CardTitle>
                  <CardDescription>
                    How far (km) a mobile clinic stop can be from a Health Hub before it's still considered the same area.
                    Default: {DEFAULT_MATCH_RADIUS_KM} km. Stored locally in this browser.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-end gap-3">
                  <div className="flex-1 max-w-xs">
                    <Label>Radius (km)</Label>
                    <Input type="number" min={1} max={1000} value={radiusInput}
                      onChange={(e) => setRadiusInput(Number(e.target.value))} />
                  </div>
                  <Button onClick={saveRadius}><Save className="w-4 h-4 mr-1" /> Save</Button>
                  <Button variant="ghost" onClick={() => { setRadiusInput(DEFAULT_MATCH_RADIUS_KM); setMatchRadiusKm(DEFAULT_MATCH_RADIUS_KM); }}>
                    Reset
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Change admin passcode</CardTitle>
                  <CardDescription>Minimum 8 characters. Requires the current passcode.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-w-md">
                  <div>
                    <Label>Current passcode</Label>
                    <Input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
                  </div>
                  <div>
                    <Label>New passcode</Label>
                    <Input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                  </div>
                  <div>
                    <Label>Confirm new passcode</Label>
                    <Input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                  </div>
                  <Button onClick={changePasscode} disabled={changingPass || !currentPass || !newPass}>
                    <Save className="w-4 h-4 mr-1" /> {changingPass ? "Updating…" : "Update passcode"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
            <CardDescription>{row.full_name} • {row.phone} • {row.location}</CardDescription>
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
          <Button size="sm" disabled={!dirty || saving}
            onClick={() => onSave(row.reference_code, status, chv.trim() || null)}>
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
