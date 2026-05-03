export interface Hub {
  slug: string;
  name: string;
  country: "Rwanda" | "Nigeria";
  district: string;
  type: "Refugee settlement" | "Rural community";
  chv: string;
  chvPhone: string;
  ussd: string;
  services: string[];
  /** Approximate map coordinates [lat, lng] */
  coords: [number, number];
  description: string;
}

export const hubs: Hub[] = [
  {
    slug: "mahama",
    name: "Mahama Health Hub",
    country: "Rwanda",
    district: "Kirehe District — Mahama Refugee Camp",
    type: "Refugee settlement",
    chv: "Esperance Mukamana",
    chvPhone: "+250 788 123 456",
    ussd: "*789#",
    services: ["NCD follow-up", "Maternal health", "USSD triage support"],
    coords: [-2.2167, 30.7833],
    description:
      "Serves Mahama Refugee Camp, Rwanda's largest refugee settlement. Focused on continuity of care for chronic conditions and maternal health, with USSD-based triage support between mobile clinic visits.",
  },
  {
    slug: "kayonza",
    name: "Kayonza Community Hub",
    country: "Rwanda",
    district: "Kayonza District",
    type: "Rural community",
    chv: "Jean-Paul Habimana",
    chvPhone: "+250 788 234 567",
    ussd: "*789#",
    services: ["Mobile clinic coordination", "Hypertension monitoring", "Referral routing"],
    coords: [-1.8833, 30.6167],
    description:
      "A rural hub anchoring HealthDrive's pilot in Eastern Province. Coordinates mobile clinic visits and routes referrals into Mutuelle de Santé reimbursement.",
  },
  {
    slug: "bugesera",
    name: "Bugesera Community Hub",
    country: "Rwanda",
    district: "Bugesera District",
    type: "Rural community",
    chv: "Claudine Uwimana",
    chvPhone: "+250 788 345 678",
    ussd: "*789#",
    services: ["Diabetes follow-up", "Child immunization", "Mutuelle de Santé support"],
    coords: [-2.2056, 30.1764],
    description:
      "Rural hub in Bugesera supporting NCD follow-up and child immunization, with strong CHW coverage across the district.",
  },
  {
    slug: "kigeme",
    name: "Kigeme Health Hub",
    country: "Rwanda",
    district: "Nyamagabe — Kigeme Refugee Camp",
    type: "Refugee settlement",
    chv: "Aline Ingabire",
    chvPhone: "+250 788 456 789",
    ussd: "*789#",
    services: ["Medicine continuity", "Mental health screening", "Antenatal care"],
    coords: [-2.4667, 29.5333],
    description:
      "Serving Kigeme Refugee Camp in Nyamagabe District, focused on medicine continuity and mental health screening for displaced families.",
  },
  {
    slug: "ado-ekiti",
    name: "Ado-Ekiti Rural Hub",
    country: "Nigeria",
    district: "Ekiti State — Ado-Ekiti outskirts",
    type: "Rural community",
    chv: "Folake Adeyemi",
    chvPhone: "+234 803 123 4567",
    ussd: "*789#",
    services: ["Cardiovascular screening", "Health education", "Emergency referral"],
    coords: [7.6, 5.2],
    description:
      "Inspired by HealthDrive's founding story, this hub serves the rural communities around Ado-Ekiti with cardiovascular screening and emergency referral coordination.",
  },
  {
    slug: "ogoja",
    name: "Ogoja Refugee Hub",
    country: "Nigeria",
    district: "Cross River — Ogoja Settlement",
    type: "Refugee settlement",
    chv: "Emeka Obi",
    chvPhone: "+234 803 234 5678",
    ussd: "*789#",
    services: ["Primary care", "Supply chain coordination", "CHW dispatch"],
    coords: [6.6553, 8.7969],
    description:
      "Supports refugee families in the Ogoja settlement with primary care, medicine supply coordination, and CHW dispatch to remote sub-camps.",
  },
];

export const getHub = (slug: string) => hubs.find((h) => h.slug === slug);
