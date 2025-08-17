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
        <h1 className="text-3xl font-bold text-primary mb-2">USSD Services</h1>
        <p className="text-lg text-foreground">Access healthcare services instantly via USSD on any mobile device</p>
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
          <h1 className="text-2xl font-bold text-primary">Emergency Services</h1>
          <p className="text-lg text-foreground">Immediate healthcare assistance</p>
        </div>
      </div>

      <div className="grid gap-4">
        <Card className="bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-300 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Medical Emergency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-400 mb-4">For life-threatening emergencies</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-mono text-red-700 dark:text-red-300">*911#</span>
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
            <CardTitle className="text-foreground">Emergency Menu Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 font-mono text-sm p-4 rounded leading-relaxed">
              <div className="font-bold">Emergency Services *911#</div>
              <div className="mt-2">1. Ambulance</div>
              <div>2. Fire Department</div>
              <div>3. Police</div>
              <div>4. Poison Control</div>
              <div>5. Mental Health Crisis</div>
              <div>6. Nearest Hospital</div>
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
          <h1 className="text-2xl font-bold text-primary">Dialing USSD</h1>
          <p className="text-lg text-foreground">Please wait...</p>
        </div>
      </div>

      <Card className="bg-card/90 backdrop-blur-sm border-border/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Connecting...</h3>
            <p className="text-lg text-foreground">Dialing {ussdCode}</p>
            
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

  const renderClinicsScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => setCurrentScreen("main")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Find Nearby Clinics</h1>
          <p className="text-lg text-foreground">Locate healthcare facilities in your area</p>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Find Clinics Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-600 dark:text-blue-400 mb-4">Get locations and contact information for nearby healthcare facilities</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono text-blue-700 dark:text-blue-300">*123#</span>
            <div className="space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => copyToClipboard("*123#")}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button 
                size="sm"
                onClick={() => dialUSSD("*123#")}
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
          <CardTitle className="text-foreground">Clinic Services Menu Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded leading-relaxed">
            <div className="font-bold">Find Clinics *123#</div>
            <div className="mt-2">1. Nearest Hospital</div>
            <div>2. Primary Health Center</div>
            <div>3. Specialist Clinics</div>
            <div>4. Pharmacy Locations</div>
            <div>5. Mobile Clinic Schedule</div>
            <div>6. 24/7 Emergency Centers</div>
            <div>0. Main Menu</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHealthInfoScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => setCurrentScreen("main")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Health Information</h1>
          <p className="text-lg text-foreground">Get health tips and disease prevention information</p>
        </div>
      </div>

      <Card className="bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-300 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Health Information Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 dark:text-green-400 mb-4">Access health tips, disease prevention, and wellness information</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono text-green-700 dark:text-green-300">*456#</span>
            <div className="space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => copyToClipboard("*456#")}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button 
                size="sm"
                onClick={() => dialUSSD("*456#")}
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
          <CardTitle className="text-foreground">Health Info Menu Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded leading-relaxed">
            <div className="font-bold">Health Information *456#</div>
            <div className="mt-2">1. Disease Prevention</div>
            <div>2. Vaccination Schedule</div>
            <div>3. Nutrition Tips</div>
            <div>4. Mental Health</div>
            <div>5. Child Health</div>
            <div>6. Women's Health</div>
            <div>7. COVID-19 Updates</div>
            <div>0. Main Menu</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCommunityScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => setCurrentScreen("main")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Community Health</h1>
          <p className="text-lg text-foreground">Connect with local health workers and programs</p>
        </div>
      </div>

      <Card className="bg-purple-50 border-purple-200 dark:bg-purple-950/50 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Community Health Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-600 dark:text-purple-400 mb-4">Connect with community health workers and local health programs</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono text-purple-700 dark:text-purple-300">*789#</span>
            <div className="space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => copyToClipboard("*789#")}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button 
                size="sm"
                onClick={() => dialUSSD("*789#")}
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
          <CardTitle className="text-foreground">Community Health Menu Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded leading-relaxed">
            <div className="font-bold">Community Health *789#</div>
            <div className="mt-2">1. Find Health Worker</div>
            <div>2. Community Programs</div>
            <div>3. Health Education</div>
            <div>4. Support Groups</div>
            <div>5. Volunteer Programs</div>
            <div>6. Health Campaigns</div>
            <div>7. Report Health Issues</div>
            <div>0. Main Menu</div>
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
          
          {currentScreen === "clinics" && renderClinicsScreen()}
          {currentScreen === "health-info" && renderHealthInfoScreen()}
          {currentScreen === "community" && renderCommunityScreen()}
        </div>
      </div>
    </div>
  );
};

export default USSD;