// Health Hubs listed on the public site.
// IMPORTANT: none of these hubs is operating. They are planned locations only.
// Do not add community health volunteer names or phone numbers here.

export const HUB_STATUS_LABEL = "Planned, not operating";

export interface Hub {
  slug: string;
  name: string;
  country: "Rwanda" | "Nigeria";
  district: string;
  type: "Refugee settlement" | "Rural community";
  /** Planned services — not currently available. */
  services: string[];
  /** Approximate map coordinates [lat, lng] */
  coords: [number, number];
  description: string;
}

export const hubs: Hub[] = [
  {
    slug: "mahama",
    name: "Mahama Refugee Camp",
    country: "Rwanda",
    district: "Kirehe District",
    type: "Refugee settlement",
    services: ["NCD follow-up", "Maternal health", "USSD triage support"],
    coords: [-2.2167, 30.7833],
    description:
      "Planned Health Hub for Mahama Refugee Camp, Kirehe District, Rwanda. This is the planned first deployment site. It is not operating: no date is set and no vehicle is in service.",
  },
  {
    slug: "ado-ekiti",
    name: "Ado-Ekiti",
    country: "Nigeria",
    district: "Ekiti State",
    type: "Rural community",
    services: ["Cardiovascular screening", "Health education", "Emergency referral"],
    coords: [7.6, 5.2],
    description:
      "Planned Health Hub for rural communities around Ado-Ekiti, Ekiti State, Nigeria. Nigeria is a later expansion market. This hub is not operating.",
  },
  {
    slug: "ogoja",
    name: "Ogoja",
    country: "Nigeria",
    district: "Cross River",
    type: "Refugee settlement",
    services: ["Primary care", "Supply chain coordination", "Community health worker visits"],
    coords: [6.6553, 8.7969],
    description:
      "Planned Health Hub for the Ogoja settlement, Cross River, Nigeria. Nigeria is a later expansion market. This hub is not operating.",
  },
];

export const getHub = (slug: string) => hubs.find((h) => h.slug === slug);
