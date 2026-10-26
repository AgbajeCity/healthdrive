import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { teamMembers } from "@/data/team";

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <Seo title="Our Team" description="Meet the HealthDrive co-founders building a planned primary healthcare model for refugee and rural communities, starting in Rwanda." path="/team" />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>
      
      <div className="pt-20">
        {/* Header Section */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-4">
            <Users className="w-10 h-10 text-primary mx-auto mb-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Meet the team</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The co-founders of HealthDrive Technologies LTD, Rwanda.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card 
                  key={member.slug}
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
                    {/* Bio */}
                    <p className="text-sm text-primary-foreground/90 leading-relaxed">
                      {member.bio}
                    </p>

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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;
