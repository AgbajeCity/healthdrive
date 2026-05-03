export interface Visit {
  date: string;
  country: "Rwanda" | "Nigeria";
  location: string;
  type: "Refugee settlement" | "Rural community";
  van: string;
  services: string[];
  time: string;
  coords: [number, number];
}

export const visits: Visit[] = [
  { date: "2026-05-12", country: "Rwanda", location: "Mahama Refugee Camp, Kirehe", type: "Refugee settlement", van: "Van 01 — Solar", services: ["NCD screening", "Antenatal care", "Triage"], time: "08:00 – 16:00", coords: [-2.2167, 30.7833] },
  { date: "2026-05-14", country: "Rwanda", location: "Kayonza District", type: "Rural community", van: "Van 02 — Solar", services: ["General consultation", "Hypertension monitoring"], time: "09:00 – 17:00", coords: [-1.8833, 30.6167] },
  { date: "2026-05-16", country: "Rwanda", location: "Bugesera District", type: "Rural community", van: "Van 02 — Solar", services: ["Diabetes follow-up", "Child immunization"], time: "08:30 – 15:30", coords: [-2.2056, 30.1764] },
  { date: "2026-05-19", country: "Rwanda", location: "Kigeme Refugee Camp, Nyamagabe", type: "Refugee settlement", van: "Van 01 — Solar", services: ["Mental health screening", "Medicine refills"], time: "09:00 – 17:00", coords: [-2.4667, 29.5333] },
  { date: "2026-05-21", country: "Nigeria", location: "Ado-Ekiti outskirts, Ekiti State", type: "Rural community", van: "Van 03 — Solar", services: ["Cardiovascular screening", "Health education"], time: "09:00 – 16:00", coords: [7.6, 5.2] },
  { date: "2026-05-24", country: "Nigeria", location: "Ogoja Refugee Settlement, Cross River", type: "Refugee settlement", van: "Van 03 — Solar", services: ["Primary care", "Maternal health", "Triage"], time: "08:00 – 16:00", coords: [6.6553, 8.7969] },
  { date: "2026-05-27", country: "Rwanda", location: "Mahama Refugee Camp, Kirehe", type: "Refugee settlement", van: "Van 01 — Solar", services: ["Follow-up day", "NCD review"], time: "08:00 – 14:00", coords: [-2.2167, 30.7833] },
];
