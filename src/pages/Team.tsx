import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Star, Users, Calendar, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ayomideImage from "@/assets/ayomide-agbaje.jpg";
import florenceImage from "@/assets/florence-kabeya.jpg";
import nadiaImage from "@/assets/nadia-gikundiro.jpg";

const Team = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: "AYOMIDE AGBAJE",
      role: "Co-Founder & CEO",
      image: ayomideImage,
      specialties: ["Primary Healthcare", "Rural Health", "Community Health"],
      rating: 4.9,
      consultations: 150,
      bio: "Ayomide co-founded HealthDrive in December 2023 after a personal cardiac journey with his grandmother from Ado-Ekiti to Lagos in 2019, and a 2020 road accident that placed him in a rural clinic with no diagnostic equipment. He currently serves as a Rural Health Intern at Society for Family Health Rwanda, applying pilot insights directly to primary care operations. His conviction: where a person lives should not determine whether they will live."
    },
    {
      name: "FLORENCE KABEYA",
      role: "Co-Founder & Web Manager",
      image: florenceImage,
      specialties: ["Digital Health", "Web Platform", "Product"],
      rating: 4.8,
      consultations: 120,
      bio: "Florence leads HealthDrive's web platform and digital experience. She builds the patient-facing tools that connect refugee and rural communities to USSD telehealth, mobile clinic schedules, and community Health Hubs — making sure the technology stays accessible to people on basic feature phones."
    },
    {
      name: "NADIA GIKUNDIRO",
      role: "Clinical Health Specialist",
      image: nadiaImage,
      specialties: ["Physiotherapy", "Community Health", "Amref International University"],
      rating: 4.9,
      consultations: 200,
      bio: "Nadia is HealthDrive's Clinical Health Specialist, with a background in physiotherapy and community health engagement. She studies at Amref International University (AMIU) in Nairobi, where she also serves as the International Students Representative. Nadia leads clinical protocols for mobile clinic visits and community Health Hub follow-up."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20">
        {/* Header Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              BOOK A CONSULTATION
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              WITH OUR TEAM
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with our experienced healthcare professionals who are dedicated 
              to providing quality care and support to underserved communities.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index}
                  className="bg-primary/90 border-primary text-primary-foreground shadow-card-healthcare hover:shadow-healthcare transition-all duration-300 group overflow-hidden"
                >
                  <CardHeader className="text-center pb-4">
                    {/* Profile Image */}
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary-foreground/20">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-primary-foreground mb-2">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80 text-lg">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Specialties */}
                    <div>
                      <h4 className="font-semibold text-primary-foreground/90 mb-2 text-sm">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-primary-foreground/20 text-primary-foreground px-2 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{member.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{member.consultations}+ consultations</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 space-y-3">
                      <Button 
                        onClick={() => navigate(`/chat?doctor=${encodeURIComponent(member.name)}`)}
                        className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold relative overflow-hidden group"
                        size="lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Chat
                      </Button>
                      
                      <Button 
                        onClick={() => navigate(`/book-consultation?doctor=${encodeURIComponent(member.name)}`)}
                        variant="outline"
                        className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold"
                        size="lg"
                      >
                        <Stethoscope className="w-5 h-5 mr-2" />
                        Book Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our team is available 24/7 to provide support and answer your healthcare questions.
                </p>
                <Button 
                  onClick={() => navigate('/chat?doctor=Support%20Team')}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 shadow-healthcare"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;