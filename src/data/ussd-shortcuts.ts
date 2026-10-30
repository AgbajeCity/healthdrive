// Source of truth for the four PLANNED USSD short codes.
// None of these codes is live: a sandbox test build runs for development only,
// and no telecom operator agreement exists. Copy must describe them as planned.

export type UssdService = "emergency" | "clinics" | "health-info" | "community";

export interface UssdShortcut {
  code: string;
  service: UssdService;
  /** Short label users see in the at-a-glance grid. */
  label: string;
  /** One-line description of the planned service. */
  description: string;
}

export const USSD_SHORTCUTS: UssdShortcut[] = [
  {
    code: "*911#",
    service: "emergency",
    label: "Emergency triage",
    description: "Planned: urgent care triage. Not live.",
  },
  {
    code: "*123#",
    service: "clinics",
    label: "Find a clinic",
    description: "Planned: help finding the nearest health facility. Not live.",
  },
  {
    code: "*456#",
    service: "health-info",
    label: "AI symptom guidance",
    description: "Planned: AI-assisted symptom classification. Not live.",
  },
  {
    code: "*789#",
    service: "community",
    label: "Community health worker",
    description: "Planned: coordination with community health workers. Not live.",
  },
];

export const ussdServiceMap: Record<string, UssdService> = Object.fromEntries(
  USSD_SHORTCUTS.map((s) => [s.code, s.service]),
);
