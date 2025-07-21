import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cross, Phone, MessageSquare, Heart, Users, MapPin, Clock, ArrowLeft, Copy, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const USSD = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [ussdCode, setUssdCode] = useState("*123#");
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard`,
    });
  };

  const dialUSSD = (code: string) => {
    // Simulate dialing USSD code
    toast({
      title: "Dialing USSD",
      description: `Please dial ${code} on your mobile device`,
    });
    
    // Show simulation screen
    setCurrentScreen("dialing");
    setUssdCode(code);
  };

  const renderMainMenu = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">USSD Services</h1>
        <p className="text-foreground/80">Access healthcare services instantly via USSD on any mobile device</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Emergency Services */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("emergency")}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-red-500" />
                <CardTitle className="text-lg">Emergency Services</CardTitle>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
            <CardDescription>Quick access to emergency healthcare services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*911#</span>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  dialUSSD("*911#");
                }}
              >
                <Phone className="w-4 h-4 mr-1" />
                Dial Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Find Clinics */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("clinics")}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-blue-500" />
                <CardTitle className="text-lg">Find Nearby Clinics</CardTitle>
              </div>
              <Badge variant="secondary">Popular</Badge>
            </div>
            <CardDescription>Locate healthcare facilities in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*123#</span>
              <Button 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  dialUSSD("*123#");
                }}
              >
                <Phone className="w-4 h-4 mr-1" />
                Dial Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("health-info")}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-green-500" />
              <CardTitle className="text-lg">Health Information</CardTitle>
            </div>
            <CardDescription>Get health tips and disease prevention info</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*456#</span>
              <Button 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  dialUSSD("*456#");
                }}
              >
                <Phone className="w-4 h-4 mr-1" />
                Dial Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Community Health */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentScreen("community")}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-500" />
              <CardTitle className="text-lg">Community Health</CardTitle>
            </div>
            <CardDescription>Connect with local health workers and programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono">*789#</span>
              <Button 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  dialUSSD("*789#");
                }}
              >
                <Phone className="w-4 h-4 mr-1" />
                Dial Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            How to Use USSD Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
            <p className="text-foreground">Dial the USSD code on your mobile phone</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
            <p className="text-foreground">Follow the menu options displayed on your screen</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
            <p className="text-foreground">Press the corresponding number for your choice</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">4</div>
            <p className="text-foreground">Receive instant information or assistance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmergencyScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => setCurrentScreen("main")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Emergency Services</h1>
          <p className="text-foreground/80">Immediate healthcare assistance</p>
        </div>
      </div>

      <div className="grid gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Medical Emergency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">For life-threatening emergencies</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono text-red-700">*911#</span>
              <div className="space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard("*911#")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => dialUSSD("*911#")}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Dial
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Emergency Menu Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 font-mono text-sm p-4 rounded">
              <div>Emergency Services</div>
              <div>1. Ambulance</div>
              <div>2. Fire Department</div>
              <div>3. Police</div>
              <div>4. Poison Control</div>
              <div>5. Mental Health Crisis</div>
              <div>0. Main Menu</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDialingScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => setCurrentScreen("main")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dialing USSD</h1>
          <p className="text-foreground/80">Please wait...</p>
        </div>
      </div>

      <Card className="bg-card/90 backdrop-blur-sm border-border/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Connecting...</h3>
            <p className="text-muted-foreground">Dialing {ussdCode}</p>
            
            <div className="bg-black text-green-400 font-mono text-sm p-4 rounded mt-4">
              <div className="animate-pulse">Please wait...</div>
              <div className="mt-2">Connecting to HealthDrive</div>
              <div className="mt-1">USSD Service</div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => toast({ title: "Connection Established", description: "USSD service is now active on your mobile device" })}
              >
                Simulate Connection
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open(`tel:${ussdCode}`, '_self')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Phone Dialer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Cross className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">HealthDrive</span>
            </div>
          </div>

          {currentScreen === "main" && renderMainMenu()}
          {currentScreen === "emergency" && renderEmergencyScreen()}
          {currentScreen === "dialing" && renderDialingScreen()}
          
          {/* Add other screens similarly */}
          {currentScreen === "clinics" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <Button variant="ghost" onClick={() => setCurrentScreen("main")}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Find Nearby Clinics</h1>
                  <p className="text-foreground/80">Locate healthcare facilities</p>
                </div>
              </div>
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6">
                  <div className="bg-black text-green-400 font-mono text-sm p-4 rounded">
                    <div>Find Clinics</div>
                    <div>1. Nearest Hospital</div>
                    <div>2. Primary Health Center</div>
                    <div>3. Specialist Clinics</div>
                    <div>4. Pharmacy</div>
                    <div>5. Mobile Clinic Schedule</div>
                    <div>0. Main Menu</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default USSD;