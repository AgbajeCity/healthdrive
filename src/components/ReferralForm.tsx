import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { hubs, type Hub } from "@/data/hubs";
import { Send, CheckCircle2, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SERVICE_OPTIONS = [
  "General consultation",
  "Emergency triage",
  "Maternal & antenatal care",
  "Child immunization",
  "Hypertension / NCD follow-up",
  "Diabetes follow-up",
  "Mental health support",
  "Medicine refill",
];

const referralSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  location: z.string().trim().min(2, "Please share your village or settlement").max(150),
  hubSlug: z.string().min(1, "Please choose a Health Hub"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  notes: z.string().trim().max(500).optional(),
});

interface Props {
  defaultHub?: Hub;
  compact?: boolean;
}

const generateCode = () => {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HD-${Date.now().toString(36).toUpperCase().slice(-4)}${rand}`;
};

const ReferralForm = ({ defaultHub, compact }: Props) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refCode, setRefCode] = useState<string>("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    location: "",
    hubSlug: defaultHub?.slug ?? "",
    services: [] as string[],
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = referralSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[i.path.join(".")] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const code = generateCode();
    const hub = hubs.find((h) => h.slug === result.data.hubSlug);

    const { error } = await supabase.from("referrals").insert({
      reference_code: code,
      full_name: result.data.fullName,
      phone: result.data.phone,
      location: result.data.location,
      hub_slug: result.data.hubSlug,
      services: result.data.services,
      notes: result.data.notes ?? null,
      assigned_chv: hub?.chv ?? null,
    });

    setSubmitting(false);

    if (error) {
      toast({
        title: "Could not send referral",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setRefCode(code);
    setSubmitted(true);
    toast({
      title: "Referral sent",
      description: `${hub?.chv ?? "A CHV"} at ${hub?.name ?? "your Health Hub"} will follow up shortly.`,
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Referral submitted</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
          Save your reference code to track this referral's status. In an emergency, dial <strong>*911#</strong> from any phone.
        </p>
        <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-md mb-4">
          <code className="font-mono font-semibold text-foreground">{refCode}</code>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => {
            navigator.clipboard.writeText(refCode);
            toast({ title: "Copied", description: "Reference code copied." });
          }}>
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        <div className="flex gap-2 justify-center">
          <Button asChild size="sm">
            <Link to={`/referrals/${refCode}`}>Track status</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setRefCode(""); }}>
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" value={form.fullName} maxLength={100}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" value={form.phone} maxLength={20} placeholder="+250 ..."
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="location">Your village or settlement</Label>
        <Input id="location" value={form.location} maxLength={150}
          onChange={(e) => setForm({ ...form, location: e.target.value })} />
        {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
      </div>

      {!defaultHub && (
        <div>
          <Label>Preferred Health Hub</Label>
          <Select value={form.hubSlug} onValueChange={(v) => setForm({ ...form, hubSlug: v })}>
            <SelectTrigger><SelectValue placeholder="Select a hub" /></SelectTrigger>
            <SelectContent>
              {hubs.map((h) => (
                <SelectItem key={h.slug} value={h.slug}>
                  {h.name} — {h.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.hubSlug && <p className="text-xs text-destructive mt-1">{errors.hubSlug}</p>}
        </div>
      )}

      <div>
        <Label>Preferred services</Label>
        <div className="grid sm:grid-cols-2 gap-2 mt-2">
          {SERVICE_OPTIONS.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={form.services.includes(s)} onCheckedChange={() => toggleService(s)} />
              <span className="text-foreground">{s}</span>
            </label>
          ))}
        </div>
        {errors.services && <p className="text-xs text-destructive mt-1">{errors.services}</p>}
      </div>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" value={form.notes} maxLength={500} rows={3}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Anything the CHW should know" />
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        <Send className="w-4 h-4 mr-2" /> {submitting ? "Sending..." : "Send referral to CHV"}
      </Button>
    </form>
  );
};

export default ReferralForm;
