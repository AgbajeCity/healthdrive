// Source of truth for USSD shortcut → primary-care flow mapping.
// Used by the USSD page and verified by tests in src/__tests__.

export type UssdService = "emergency" | "clinics" | "health-info" | "community";

export interface UssdShortcut {
  code: string;
  service: UssdService;
  /** Screen key to render after "connecting". Must match USSD page's render switch. */
  screen: `mobile-${UssdService}-main`;
  /** Short label users see in the at-a-glance grid. Reflects the actual care flow. */
  label: string;
  /** One-line description of the primary-care service delivered. */
  description: string;
}

export const USSD_SHORTCUTS: UssdShortcut[] = [
  {
    code: "*911#",
    service: "emergency",
    screen: "mobile-emergency-main",
    label: "Emergency triage",
    description: "Ambulance, hospital routing and urgent care triage.",
  },
  {
    code: "*123#",
    service: "clinics",
    screen: "mobile-clinics-main",
    label: "Find a clinic / van stop",
    description: "Locate the nearest health facility, pharmacy or mobile clinic stop.",
  },
  {
    code: "*456#",
    service: "health-info",
    screen: "mobile-health-info-main",
    label: "AI symptom guidance",
    description: "AI-assisted symptom classification, prevention and maternal/child info.",
  },
  {
    code: "*789#",
    service: "community",
    screen: "mobile-community-main",
    label: "Reach a CHV",
    description: "Connect with a Community Health Volunteer for follow-up and referrals.",
  },
];

export const ussdServiceMap: Record<string, UssdService> = Object.fromEntries(
  USSD_SHORTCUTS.map((s) => [s.code, s.service]),
);
