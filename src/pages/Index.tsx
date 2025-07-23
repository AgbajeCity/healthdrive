import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cross, ArrowRight, Truck, Stethoscope, Calendar, MapPin, Phone, Heart, MessageSquare, Users, Copy } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard`,
    });
  };

  const dialUSSD = (code: string) => {
    toast({
      title: "Dialing USSD",
      description: `Please dial ${code} on your mobile device`,
    });
    // Open phone dialer
    window.open(`tel:${code}`, '_self');
  };

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
                BRINGING PRIMARY HEALTHCARE
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                CLOSER TO UNDERSERVED
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                COMMUNITIES
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
                <Link to="/register">Create Account</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                asChild
              >
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                asChild
              >
                <Link to="/services">Our Services</Link>
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

      {/* USSD Services Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Instant Access via USSD
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access healthcare services instantly from any mobile device. No internet or smartphone required.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {/* Emergency Services */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <CardTitle className="text-base">Emergency</CardTitle>
                  </div>
                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                </div>
                <CardDescription className="text-sm">Quick emergency healthcare access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xl font-mono font-bold text-center text-red-600">*911#</div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => copyToClipboard("*911#")}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      className="flex-1 text-xs"
                      onClick={() => dialUSSD("*911#")}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Dial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Find Clinics */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-base">Find Clinics</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">Popular</Badge>
                </div>
                <CardDescription className="text-sm">Locate nearby healthcare facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xl font-mono font-bold text-center text-blue-600">*123#</div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => copyToClipboard("*123#")}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => dialUSSD("*123#")}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Dial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Information */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <CardTitle className="text-base">Health Info</CardTitle>
                </div>
                <CardDescription className="text-sm">Get health tips and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xl font-mono font-bold text-center text-green-600">*456#</div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => copyToClipboard("*456#")}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => dialUSSD("*456#")}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Dial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Health */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <CardTitle className="text-base">Community</CardTitle>
                </div>
                <CardDescription className="text-sm">Connect with health workers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xl font-mono font-bold text-center text-purple-600">*789#</div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => copyToClipboard("*789#")}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => dialUSSD("*789#")}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Dial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* USSD Instructions */}
          <Card className="mt-8 bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                How to Use USSD Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                  <p className="text-sm text-foreground">Dial the USSD code on your mobile phone</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                  <p className="text-sm text-foreground">Follow the menu options displayed</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                  <p className="text-sm text-foreground">Press the number for your choice</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">4</div>
                  <p className="text-sm text-foreground">Receive instant assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link to="/ussd">
              <Button variant="outline" size="lg">
                View Full USSD Interface
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
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
              <Link to="/map">
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
            Bringing primary healthcare closer to underserved communities
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
