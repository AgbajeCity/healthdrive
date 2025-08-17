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
  const [currentService, setCurrentService] = useState("");
  const [mobileScreenStack, setMobileScreenStack] = useState([]);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard`,
    });
  };

  const dialUSSD = (code: string) => {
    setUssdCode(code);
    setMobileScreenStack([]);
    
    // Determine service type
    const serviceMap = {
      "*911#": "emergency",
      "*123#": "clinics", 
      "*456#": "health-info",
      "*789#": "community"
    };
    
    setCurrentService(serviceMap[code] || "unknown");
    setCurrentScreen("mobile-connecting");
    
    toast({
      title: "Starting Mobile Simulation",
      description: `Simulating ${code} on mobile device`,
    });
  };

  const navigateToMobileScreen = (screen: string) => {
    setMobileScreenStack(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBackMobile = () => {
    if (mobileScreenStack.length > 0) {
      const previousScreen = mobileScreenStack[mobileScreenStack.length - 1];
      setMobileScreenStack(prev => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen("main");
    }
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

  // Feature Phone Screen Component
  const FeaturePhone = ({ children, title = "HealthDrive USSD" }) => (
    <div className="max-w-xs mx-auto">
      {/* Phone Body */}
      <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl">
        {/* Screen */}
        <div className="bg-gray-900 rounded-lg p-2 mb-4">
          <div className="bg-black border border-gray-600 rounded h-48 overflow-hidden">
            {/* Status Bar */}
            <div className="bg-blue-900 text-blue-200 text-xs px-2 py-1 flex justify-between">
              <span>Carrier</span>
              <span>●●●</span>
            </div>
            {/* Screen Content */}
            <div className="text-green-400 font-mono text-xs p-2 leading-tight h-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
        
        {/* Physical Keypad */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          {/* Number pad */}
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <div key={num} className="bg-gray-700 hover:bg-gray-600 rounded text-white text-xs h-8 flex items-center justify-center font-mono cursor-pointer transition-colors">
              {num}
            </div>
          ))}
          <div className="bg-gray-700 hover:bg-gray-600 rounded text-white text-xs h-8 flex items-center justify-center font-mono cursor-pointer">
            *
          </div>
          <div className="bg-gray-700 hover:bg-gray-600 rounded text-white text-xs h-8 flex items-center justify-center font-mono cursor-pointer">
            0
          </div>
          <div className="bg-gray-700 hover:bg-gray-600 rounded text-white text-xs h-8 flex items-center justify-center font-mono cursor-pointer">
            #
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="bg-red-600 hover:bg-red-500 rounded px-3 py-1 text-white text-xs cursor-pointer transition-colors">
            END
          </div>
          <div className="bg-green-600 hover:bg-green-500 rounded px-3 py-1 text-white text-xs cursor-pointer transition-colors">
            CALL
          </div>
        </div>
      </div>
    </div>
  );

  const renderMobileConnecting = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={() => setCurrentScreen("main")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Feature Phone USSD Simulation</h1>
          <p className="text-lg text-foreground">Connecting to {ussdCode}...</p>
        </div>
      </div>

      <FeaturePhone>
        <div className="text-center space-y-1">
          <div className="animate-pulse">Connecting...</div>
          <div>USSD Code Running</div>
          <div className="mt-2">{ussdCode}</div>
          <div className="mt-1">Please wait...</div>
        </div>
      </FeaturePhone>

      <div className="text-center space-y-4">
        <Button 
          onClick={() => navigateToMobileScreen(`mobile-${currentService}-menu`)}
          className="w-full max-w-sm"
        >
          Continue to Service Menu
        </Button>
        <p className="text-sm text-muted-foreground">
          This simulates what appears on your feature phone screen
        </p>
      </div>
    </div>
  );

  const renderMobileEmergencyMenu = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Emergency Services *911#</h1>
          <p className="text-lg text-foreground">Feature Phone View</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="font-bold text-red-400">EMERGENCY SERVICES</div>
          <div className="mt-1">*911#</div>
          <div className="mt-2">Select service:</div>
          <div className="mt-1">1. Ambulance</div>
          <div>2. Fire Department</div>
          <div>3. Police Emergency</div>
          <div>4. Poison Control</div>
          <div>5. Mental Health Crisis</div>
          <div>6. Nearest Hospital</div>
          <div className="mt-2">0. Main Menu</div>
          <div className="mt-2 text-yellow-400">Reply with option number</div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {[1,2,3,4,5,6].map(num => (
          <Button 
            key={num}
            variant="outline" 
            onClick={() => navigateToMobileScreen(`mobile-emergency-option-${num}`)}
            className="aspect-square"
          >
            {num}
          </Button>
        ))}
        <Button 
          variant="destructive" 
          onClick={goBackMobile}
          className="aspect-square"
        >
          0
        </Button>
      </div>
    </div>
  );

  const renderMobileClinicsMenu = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Find Clinics *123#</h1>
          <p className="text-lg text-foreground">Feature Phone View</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="font-bold">HEALTHDRIVE CLINICS</div>
          <div className="mt-1">*123#</div>
          <div className="mt-2">Find healthcare near you:</div>
          <div className="mt-1">1. Nearest Hospital</div>
          <div>2. Primary Health Center</div>
          <div>3. Specialist Clinics</div>
          <div>4. Pharmacy Locations</div>
          <div>5. Mobile Clinic Schedule</div>
          <div>6. 24/7 Emergency Centers</div>
          <div className="mt-2">0. Main Menu</div>
          <div className="mt-2 text-yellow-400">Choose an option:</div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {[1,2,3,4,5,6].map(num => (
          <Button 
            key={num}
            variant="outline" 
            onClick={() => navigateToMobileScreen(`mobile-clinics-option-${num}`)}
            className="aspect-square"
          >
            {num}
          </Button>
        ))}
        <Button 
          variant="secondary" 
          onClick={goBackMobile}
          className="aspect-square"
        >
          0
        </Button>
      </div>
    </div>
  );

  const renderMobileHealthInfoMenu = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Health Info *456#</h1>
          <p className="text-lg text-foreground">Feature Phone View</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="font-bold">HEALTH INFORMATION</div>
          <div className="mt-1">*456#</div>
          <div className="mt-2">Get health tips:</div>
          <div className="mt-1">1. Disease Prevention</div>
          <div>2. Vaccination Schedule</div>
          <div>3. Nutrition Tips</div>
          <div>4. Mental Health</div>
          <div>5. Child Health</div>
          <div>6. Women's Health</div>
          <div>7. COVID-19 Updates</div>
          <div className="mt-2">0. Main Menu</div>
          <div className="mt-2 text-yellow-400">Select topic:</div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {[1,2,3,4,5,6,7].map(num => (
          <Button 
            key={num}
            variant="outline" 
            onClick={() => navigateToMobileScreen(`mobile-health-info-option-${num}`)}
            className="aspect-square"
          >
            {num}
          </Button>
        ))}
        <Button 
          variant="secondary" 
          onClick={goBackMobile}
          className="aspect-square"
        >
          0
        </Button>
      </div>
    </div>
  );

  const renderMobileCommunityMenu = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Community Health *789#</h1>
          <p className="text-lg text-foreground">Feature Phone View</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="font-bold">COMMUNITY HEALTH</div>
          <div className="mt-1">*789#</div>
          <div className="mt-2">Connect with community:</div>
          <div className="mt-1">1. Find Health Worker</div>
          <div>2. Community Programs</div>
          <div>3. Health Education</div>
          <div>4. Support Groups</div>
          <div>5. Volunteer Programs</div>
          <div>6. Health Campaigns</div>
          <div>7. Report Health Issues</div>
          <div className="mt-2">0. Main Menu</div>
          <div className="mt-2 text-yellow-400">Choose service:</div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {[1,2,3,4,5,6,7].map(num => (
          <Button 
            key={num}
            variant="outline" 
            onClick={() => navigateToMobileScreen(`mobile-community-option-${num}`)}
            className="aspect-square"
          >
            {num}
          </Button>
        ))}
        <Button 
          variant="secondary" 
          onClick={goBackMobile}
          className="aspect-square"
        >
          0
        </Button>
      </div>
    </div>
  );

  // Sample detail screens for different options
  const renderMobileEmergencyOption = (option) => {
    const options = {
      1: { title: "AMBULANCE SERVICE", content: "Dispatching ambulance to your location.\n\nEstimated arrival: 8-12 mins\n\nAmbulance ID: AMB-2024-001\n\nDriver: John Doe\n\nContact: +1-555-EMERGENCY\n\nPlease stay on the line..." },
      2: { title: "FIRE DEPARTMENT", content: "Fire emergency reported.\n\nUnit dispatched: FIRE-001\n\nEstimated arrival: 5-8 mins\n\nCaptain: Sarah Smith\n\nFor safety:\n- Evacuate if possible\n- Stay low if smoke\n- Meet firefighters outside" },
      6: { title: "NEAREST HOSPITAL", content: "CENTRAL CITY HOSPITAL\n📍 123 Health St, City\n📞 +1-555-HOSPITAL\n🚗 2.3 km away\n\nEMERGENCY DEPT: Open 24/7\n\nOTHER NEARBY:\n• Metro General (3.1km)\n• St. Mary's (4.2km)\n\nPress * for directions" }
    };
    
    const optionData = options[option] || { title: "SERVICE", content: "Service information will be displayed here." };
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={goBackMobile}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">{optionData.title}</h1>
            <p className="text-lg text-foreground">Emergency Response</p>
          </div>
        </div>

        <FeaturePhone>
          <div>
            <div className="font-bold text-red-400">{optionData.title}</div>
            <div className="mt-2 whitespace-pre-line text-xs leading-tight">{optionData.content}</div>
            <div className="mt-3 text-yellow-400">Press 0 to return to menu</div>
          </div>
        </FeaturePhone>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={goBackMobile}>
            Back to Menu
          </Button>
          <Button variant="destructive" onClick={() => setCurrentScreen("main")}>
            End Session
          </Button>
        </div>
      </div>
    );
  };

  const renderMobileClinicsOption = (option) => {
    const options = {
      1: { title: "NEAREST HOSPITAL", content: "CENTRAL CITY HOSPITAL\n📍 123 Health St, Downtown\n📞 +1-555-HOSPITAL\n🚗 2.3 km from your location\n\nSERVICES:\n• Emergency 24/7\n• General Medicine\n• Surgery\n• Maternity\n\nWAIT TIME: ~30 mins\n\nPress 1 for directions\nPress 2 to call hospital" },
      4: { title: "PHARMACIES", content: "NEARBY PHARMACIES:\n\n1. HealthPlus Pharmacy\n   📍 45 Main St (1.2km)\n   ⏰ Open 8AM-10PM\n   📞 +1-555-PILLS\n\n2. City Drug Store\n   📍 67 Oak Ave (1.8km)\n   ⏰ 24/7 Service\n   📞 +1-555-DRUGS\n\n3. MediCare Corner\n   📍 89 Pine Rd (2.1km)\n   ⏰ Open 9AM-9PM" }
    };
    
    const optionData = options[option] || { title: "CLINIC INFO", content: "Healthcare facility information will be displayed here." };
    
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={goBackMobile}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">{optionData.title}</h1>
            <p className="text-lg text-foreground">Healthcare Facilities</p>
          </div>
        </div>

        <FeaturePhone>
          <div>
            <div className="font-bold text-blue-400">{optionData.title}</div>
            <div className="mt-2 whitespace-pre-line text-xs leading-tight">{optionData.content}</div>
            <div className="mt-3 text-yellow-400">Press 0 for main menu</div>
          </div>
        </FeaturePhone>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={goBackMobile}>
            Back to Menu
          </Button>
          <Button onClick={() => setCurrentScreen("main")}>
            End Session
          </Button>
        </div>
      </div>
    );
  };

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
          
          {/* Mobile Screen Simulations */}
          {currentScreen === "mobile-connecting" && renderMobileConnecting()}
          {currentScreen === "mobile-emergency-menu" && renderMobileEmergencyMenu()}
          {currentScreen === "mobile-clinics-menu" && renderMobileClinicsMenu()}
          {currentScreen === "mobile-health-info-menu" && renderMobileHealthInfoMenu()}
          {currentScreen === "mobile-community-menu" && renderMobileCommunityMenu()}
          
          {/* Mobile Option Screens */}
          {currentScreen.startsWith("mobile-emergency-option-") && 
            renderMobileEmergencyOption(parseInt(currentScreen.split("-")[3]))}
          {currentScreen.startsWith("mobile-clinics-option-") && 
            renderMobileClinicsOption(parseInt(currentScreen.split("-")[3]))}
        </div>
      </div>
    </div>
  );
};

export default USSD;