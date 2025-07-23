import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cross, Heart, Truck, Phone, MapPin, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const OnboardingWelcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const slides = [
    {
      icon: Heart,
      title: "Welcome to HealthDrive",
      subtitle: "Your Healthcare Journey Starts Here",
      description: "Access quality healthcare services, find mobile clinics, book consultations, and use USSD services from any mobile device.",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: Phone,
      title: "Get Started Now",
      subtitle: "Ready to Access Healthcare?",
      description: "Complete your quick profile setup to access all features including emergency services, clinic locations, and health consultations.",
      color: "text-green-500",
      bgColor: "bg-green-50"
    }
  ];

  const benefits = [
    "Find healthcare facilities instantly",
    "Emergency USSD access (*911#)", 
    "Video consultations with doctors",
    "Mobile clinic locations",
    "Book appointments easily",
    "Secure health data"
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/onboarding');
    }
  };

  const handleSkip = () => {
    navigate('/onboarding');
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Cross className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">HealthDrive</span>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary w-8' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Main Content */}
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className={`w-20 h-20 ${currentSlideData.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                  <currentSlideData.icon className={`w-10 h-10 ${currentSlideData.color}`} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {currentSlideData.title}
                    </h1>
                    <h2 className="text-xl text-primary font-semibold">
                      {currentSlideData.subtitle}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    {currentSlideData.description}
                  </p>
                </div>

                {/* Benefits (show on last slide) */}
                {currentSlide === slides.length - 1 && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">What you can do with HealthDrive:</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* User Info */}
                {user && (
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Badge variant="secondary" className="text-primary">
                        Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip Introduction
            </Button>
            
            <div className="flex space-x-3">
              {currentSlide > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(currentSlide - 1)}
                >
                  Previous
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                className="min-w-[120px]"
              >
                {currentSlide === slides.length - 1 ? (
                  <>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;