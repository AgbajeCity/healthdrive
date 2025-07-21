import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cross, 
  CheckCircle, 
  Sparkles, 
  Heart, 
  Phone, 
  MapPin, 
  Users,
  ArrowRight,
  Gift,
  Star
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const OnboardingComplete = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const quickActions = [
    {
      icon: Phone,
      title: "Try USSD Services",
      description: "Access healthcare via *182#",
      action: () => navigate('/ussd'),
      color: "bg-green-500",
      textColor: "text-green-700"
    },
    {
      icon: MapPin,
      title: "Find Nearby Clinics",
      description: "Locate healthcare facilities",
      action: () => navigate('/map'),
      color: "bg-blue-500",
      textColor: "text-blue-700"
    },
    {
      icon: Heart,
      title: "View Dashboard",
      description: "Access your health dashboard",
      action: () => navigate('/dashboard'),
      color: "bg-red-500",
      textColor: "text-red-700"
    },
    {
      icon: Users,
      title: "Browse Services",
      description: "Explore available services",
      action: () => navigate('/services'),
      color: "bg-purple-500",
      textColor: "text-purple-700"
    }
  ];

  const achievements = [
    "Profile Setup Complete",
    "Location Configured",
    "Emergency Contact Added",
    "Healthcare Preferences Set"
  ];

  const handleGetStarted = () => {
    toast({
      title: "Welcome to HealthDrive! 🎉",
      description: "Your healthcare journey begins now",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 animate-bounce delay-100">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="absolute top-10 right-1/4 animate-bounce delay-300">
            <Star className="w-5 h-5 text-blue-400" />
          </div>
          <div className="absolute top-20 left-1/3 animate-bounce delay-500">
            <Heart className="w-4 h-4 text-red-400" />
          </div>
          <div className="absolute top-32 right-1/3 animate-bounce delay-700">
            <Gift className="w-5 h-5 text-green-400" />
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Cross className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">HealthDrive</span>
            </div>
          </div>

          {/* Main Content */}
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                {/* Main Message */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-foreground">
                    🎉 You're All Set!
                  </h1>
                  <h2 className="text-xl text-primary font-semibold">
                    Welcome to the HealthDrive Community
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                    Your profile is complete and you're ready to start accessing healthcare services. 
                    Let's explore what you can do!
                  </p>
                </div>

                {/* User Welcome */}
                {user && (
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-foreground">Hello,</span>
                      <Badge variant="default" className="text-lg px-4 py-1">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Achievements */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                    Setup Complete
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">What would you like to do first?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Card 
                        key={index}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white/50 border-border/30"
                        onClick={action.action}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                              <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <h4 className="font-medium text-foreground">{action.title}</h4>
                              <p className="text-sm text-muted-foreground">{action.description}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="w-full md:w-auto min-w-[200px] h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Quick Tips:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Bookmark *182# for quick USSD access</li>
                    <li>• Enable location services for better clinic recommendations</li>
                    <li>• Keep your emergency contact information updated</li>
                    <li>• Explore the map to find healthcare facilities near you</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our support team or visit our help center
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;