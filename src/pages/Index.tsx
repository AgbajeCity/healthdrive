import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cross, ArrowRight, Truck, Stethoscope, Calendar, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  const features = [
    {
      icon: Phone,
      text: "Connects doctors & rural patients via video calls"
    },
    {
      icon: Truck,
      text: "Accessible at local mobile clinics"
    },
    {
      icon: Calendar,
      text: "Online appointment scheduling feature"
    },
    {
      icon: Phone,
      text: "Accessible via Safaricom USSD code for feature phones via *182#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                BRINGING HEALTHCARE
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                CLOSER TO UNDERSERVED
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                AREAS IN KENYA
              </h3>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                asChild
              >
                <Link to="/login">Register/Log In</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                asChild
              >
                <Link to="/services">Our Services</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                asChild
              >
                <Link to="/team">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Solution Section */}
      <section className="py-16 bg-card/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Our Tech Solution: HealthDrive
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our interactive telehealth Web App:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{feature.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Find Mobile Clinic Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <MapPin className="w-12 h-12 text-foreground" />
                <Truck className="w-12 h-12 text-foreground" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                FIND A MOBILE
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold text-foreground">
                CLINIC NEAR YOU
              </h3>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Use your location to view HealthDrive mobile clinics in your area.
            </p>

            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-healthcare"
              asChild
            >
              <Link to="/services">
                VIEW MAP
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Cross className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">HealthDrive</span>
          </div>
          <p className="text-muted-foreground">
            Bringing healthcare closer to underserved areas in Kenya
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
