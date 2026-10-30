import ayomideImage from "@/assets/ayomide-agbaje.jpg";
import florenceImage from "@/assets/florence-kabeya.jpg";
import nadiaImage from "@/assets/nadia-gikundiro.jpg";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "ayomide-agbaje",
    name: "Ayomide Agbaje",
    role: "Co-Founder & CEO",
    image: ayomideImage,
    specialties: ["Primary Healthcare", "Rural Health", "Community Health"],
    bio: "Ayomide co-founded HealthDrive in December 2023 after a personal cardiac journey with his grandmother from Ado-Ekiti to Lagos in 2019, and a 2020 road accident that placed him in a rural clinic with no diagnostic equipment. His conviction: where a person lives should not determine whether they will live.",
  },
  {
    slug: "florence-kabeya",
    name: "Florence Kabeya",
    role: "Co-Founder & Web Manager",
    image: florenceImage,
    specialties: ["Digital Health", "Web Platform", "Product"],
    bio: "Florence leads HealthDrive's web platform and digital experience. She is building the web tools for HealthDrive's planned USSD service, mobile clinics and community Health Hubs, with a focus on keeping the technology accessible to people on basic feature phones.",
  },
  {
    slug: "nadia-gikundiro",
    name: "Nadia Gikundiro",
    role: "Co-Founder & Clinical Health Specialist",
    image: nadiaImage,
    specialties: ["Physiotherapy", "Community Health"],
    bio: "Nadia is HealthDrive's Clinical Health Specialist, with a background in physiotherapy and community health engagement. She studies at Amref International University (AMIU) in Nairobi, where she also serves as the International Students Representative. Nadia leads the design of clinical protocols for HealthDrive's planned mobile clinic visits and Health Hub follow-up.",
  },
];
