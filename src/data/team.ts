import ayomideImage from "@/assets/ayomide-agbaje.jpg";
import florenceImage from "@/assets/florence-kabeya.jpg";
import nadiaImage from "@/assets/nadia-gikundiro.jpg";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
  rating: number;
  consultations: number;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "ayomide-agbaje",
    name: "AYOMIDE AGBAJE",
    role: "Co-Founder & CEO",
    image: ayomideImage,
    specialties: ["Primary Healthcare", "Rural Health", "Community Health"],
    rating: 4.9,
    consultations: 150,
    bio: "Ayomide co-founded HealthDrive in December 2023 after a personal cardiac journey with his grandmother from Ado-Ekiti to Lagos in 2019, and a 2020 road accident that placed him in a rural clinic with no diagnostic equipment. He currently serves as a Rural Health Intern at Society for Family Health Rwanda, applying pilot insights directly to primary care operations. His conviction: where a person lives should not determine whether they will live.",
  },
  {
    slug: "florence-kabeya",
    name: "FLORENCE KABEYA",
    role: "Co-Founder & Web Manager",
    image: florenceImage,
    specialties: ["Digital Health", "Web Platform", "Product"],
    rating: 4.8,
    consultations: 120,
    bio: "Florence leads HealthDrive's web platform and digital experience. She builds the patient-facing tools that connect refugee and rural communities to USSD telehealth, mobile clinic schedules, and community Health Hubs — making sure the technology stays accessible to people on basic feature phones.",
  },
  {
    slug: "nadia-gikundiro",
    name: "NADIA GIKUNDIRO",
    role: "Clinical Health Specialist",
    image: nadiaImage,
    specialties: ["Physiotherapy", "Community Health", "Amref International University"],
    rating: 4.9,
    consultations: 200,
    bio: "Nadia is HealthDrive's Clinical Health Specialist, with a background in physiotherapy and community health engagement. She studies at Amref International University (AMIU) in Nairobi, where she also serves as the International Students Representative. Nadia leads clinical protocols for mobile clinic visits and community Health Hub follow-up.",
  },
];
