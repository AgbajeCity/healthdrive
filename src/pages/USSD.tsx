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

  // Authentic Feature Phone Component
  const FeaturePhone = ({ children, showKeypad = false }) => (
    <div className="mx-auto max-w-sm">
      {/* Phone Frame */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-3xl shadow-2xl border-2 border-gray-700 relative">
        {/* Antenna */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gray-600 rounded-full"></div>
        
        {/* Phone Header */}
        <div className="bg-black rounded-2xl mb-2 p-2">
          {/* Speaker */}
          <div className="w-16 h-2 bg-gray-700 rounded-full mx-auto mb-2"></div>
          
          {/* Screen */}
          <div className="bg-black border border-gray-700 rounded-lg p-3 min-h-48 relative">
            {/* Screen content with authentic USSD styling */}
            <div className="text-green-400 font-mono text-xs leading-relaxed">
              {children}
            </div>
            
            {/* Screen reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none"></div>
          </div>
          
          {/* Navigation keys */}
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-8 h-2 bg-gray-600 rounded"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="w-8 h-2 bg-gray-600 rounded"></div>
          </div>
        </div>
        
        {/* Keypad */}
        {showKeypad && (
          <div className="grid grid-cols-3 gap-1 mt-3">
            {[
              { key: '1', sub: '' }, { key: '2', sub: 'ABC' }, { key: '3', sub: 'DEF' },
              { key: '4', sub: 'GHI' }, { key: '5', sub: 'JKL' }, { key: '6', sub: 'MNO' },
              { key: '7', sub: 'PQRS' }, { key: '8', sub: 'TUV' }, { key: '9', sub: 'WXYZ' },
              { key: '*', sub: '+' }, { key: '0', sub: ' ' }, { key: '#', sub: '' }
            ].map(({ key, sub }) => (
              <button
                key={key}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-2 rounded text-sm transition-colors relative group"
              >
                <div className="text-base">{key}</div>
                {sub && <div className="text-xs text-gray-300">{sub}</div>}
              </button>
            ))}
          </div>
        )}
        
        {/* Control Buttons */}
        <div className="flex justify-between items-center mt-3 px-2">
          <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded-full text-xs flex items-center">
            ☎ CALL
          </button>
          <div className="flex space-x-2">
            <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded text-xs">
              ↑
            </button>
            <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded text-xs">
              OK
            </button>
            <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded text-xs">
              ↓
            </button>
          </div>
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-full text-xs">
            ✖ END
          </button>
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
          <h1 className="text-2xl font-bold text-primary">USSD Connection</h1>
          <p className="text-lg text-foreground">Connecting to {ussdCode}</p>
        </div>
      </div>

      <FeaturePhone showKeypad={false}>
        <div>
          <div className="text-center mb-1">DIALING...</div>
          <div className="text-center text-sm">{ussdCode}</div>
          <div className="mt-2 text-xs">
            <div className="animate-pulse">••• Connecting •••</div>
            <div className="mt-1">HealthDrive Network</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="text-center space-y-4">
        <Button 
          onClick={() => {
            setTimeout(() => {
              setCurrentScreen(`mobile-${currentService}-main`);
            }, 1500);
          }}
          className="w-full max-w-sm"
        >
          ⚡ Establish Connection
        </Button>
      </div>
    </div>
  );

  const renderMobileEmergencyMain = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Emergency Services</h1>
          <p className="text-lg text-foreground">USSD *911# Active</p>
        </div>
      </div>

      <FeaturePhone showKeypad={false}>
        <div>
          <div className="text-center mb-1">EMERGENCY SERVICES</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>1 Ambulance</div>
            <div>2 Fire Department</div>
            <div>3 Police</div>
            <div>4 Poison Control</div>
            <div>5 Mental Health</div>
            <div>6 Nearest Hospital</div>
            <div>0 Main Menu</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Reply with option number</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-sm">
        <Button onClick={() => navigateToMobileScreen("mobile-emergency-ambulance")} variant="destructive" size="sm">
          1. Ambulance
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-emergency-fire")} variant="destructive" size="sm">
          2. Fire Dept
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-emergency-police")} variant="destructive" size="sm">
          3. Police
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-emergency-hospital")} variant="destructive" size="sm">
          6. Hospital
        </Button>
      </div>
    </div>
  );

  const renderMobileEmergencyAmbulance = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Ambulance Service</h1>
          <p className="text-lg text-foreground">Emergency Response Active</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">AMBULANCE DISPATCH</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>Location: Kigali Central</div>
            <div>Status: DISPATCHED</div>
            <div>ETA: 8 minutes</div>
            <div className="mt-1">Contact: 0788123456</div>
            <div className="mt-1">Ref: AMB2024001</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Stay calm. Help is coming.</div>
            <div>Call if critical.</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Call Emergency Line
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Emergency Menu
        </Button>
      </div>
    </div>
  );

  const renderMobileClinicsMain = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Find Clinics</h1>
          <p className="text-lg text-foreground">USSD *123# Active</p>
        </div>
      </div>

      <FeaturePhone showKeypad={false}>
        <div>
          <div className="text-center mb-1">HEALTHDRIVE CLINICS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>1 Nearest Hospital</div>
            <div>2 Health Centers</div>
            <div>3 Specialist Clinics</div>
            <div>4 Pharmacies</div>
            <div>5 Mobile Clinics</div>
            <div>6 Emergency Centers</div>
            <div>0 Main Menu</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Choose an option</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-sm">
        <Button onClick={() => navigateToMobileScreen("mobile-clinics-hospital")} size="sm">
          1. Hospital
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-clinics-centers")} size="sm">
          2. Health Centers
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-clinics-pharmacy")} size="sm">
          4. Pharmacies
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-clinics-mobile")} size="sm">
          5. Mobile Clinics
        </Button>
      </div>
    </div>
  );

  const renderMobileClinicsHospital = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Nearest Hospital</h1>
          <p className="text-lg text-foreground">Healthcare Facilities</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">NEAREST HOSPITALS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>KIGALI UNIVERSITY HOSPITAL</div>
            <div>Distance: 2.3km</div>
            <div>Phone: 0788112233</div>
            <div>Emergency: 24/7</div>
            <div className="mt-1">KIBAGABAGA HOSPITAL</div>
            <div>Distance: 4.1km</div>
            <div>Phone: 0788445566</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Press * for directions</div>
            <div>Press 0 for main menu</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Call Hospital
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Clinics
        </Button>
      </div>
    </div>
  );

  const renderMobileHealthInfoMain = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Health Information</h1>
          <p className="text-lg text-foreground">USSD *456# Active</p>
        </div>
      </div>

      <FeaturePhone showKeypad={false}>
        <div>
          <div className="text-center mb-1">HEALTH INFORMATION</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>1 Disease Prevention</div>
            <div>2 Vaccination Schedule</div>
            <div>3 Nutrition Tips</div>
            <div>4 Mental Health</div>
            <div>5 Child Health</div>
            <div>6 Women's Health</div>
            <div>0 Main Menu</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Select topic</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-sm">
        <Button onClick={() => navigateToMobileScreen("mobile-health-prevention")} size="sm">
          1. Prevention
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-health-vaccination")} size="sm">
          2. Vaccination
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-health-nutrition")} size="sm">
          3. Nutrition
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-health-mental")} size="sm">
          4. Mental Health
        </Button>
      </div>
    </div>
  );

  const renderMobileHealthPrevention = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Disease Prevention</h1>
          <p className="text-lg text-foreground">Health Tips</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">DISEASE PREVENTION</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>BASIC PREVENTION TIPS:</div>
            <div className="mt-1">• Wash hands regularly</div>
            <div>• Drink clean water</div>
            <div>• Eat balanced meals</div>
            <div>• Exercise regularly</div>
            <div>• Get enough sleep</div>
            <div>• Regular checkups</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Stay healthy!</div>
            <div>Press 0 for main menu</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Health Info
        </Button>
      </div>
    </div>
  );

  const renderMobileCommunityMain = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Community Health</h1>
          <p className="text-lg text-foreground">USSD *789# Active</p>
        </div>
      </div>

      <FeaturePhone showKeypad={false}>
        <div>
          <div className="text-center mb-1">COMMUNITY HEALTH</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>1 Find Health Worker</div>
            <div>2 Community Programs</div>
            <div>3 Health Education</div>
            <div>4 Support Groups</div>
            <div>5 Health Campaigns</div>
            <div>6 Report Issues</div>
            <div>0 Main Menu</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Choose service</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto text-sm">
        <Button onClick={() => navigateToMobileScreen("mobile-community-worker")} size="sm">
          1. Health Worker
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-community-programs")} size="sm">
          2. Programs
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-community-education")} size="sm">
          3. Education
        </Button>
        <Button onClick={() => navigateToMobileScreen("mobile-community-support")} size="sm">
          4. Support Groups
        </Button>
      </div>
    </div>
  );

  const renderMobileCommunityWorker = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Health Workers</h1>
          <p className="text-lg text-foreground">Community Support</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">HEALTH WORKERS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>MARIE UWIMANA</div>
            <div>Community Health Worker</div>
            <div>Area: Gasabo District</div>
            <div>Phone: 0788998877</div>
            <div className="mt-1">JEAN CLAUDE</div>
            <div>Maternal Health Specialist</div>
            <div>Phone: 0788776655</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Available for consultations</div>
            <div>Press 0 for main menu</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Contact Worker
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Community
        </Button>
      </div>
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
      </div>
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
          {currentScreen === "clinics" && renderClinicsScreen()}
          {currentScreen === "health-info" && renderHealthInfoScreen()}
          {currentScreen === "community" && renderCommunityScreen()}
          
          {/* Mobile Screen Simulations */}
          {currentScreen === "mobile-connecting" && renderMobileConnecting()}
          
          {/* Emergency Service Screens */}
          {currentScreen === "mobile-emergency-main" && renderMobileEmergencyMain()}
          {currentScreen === "mobile-emergency-ambulance" && renderMobileEmergencyAmbulance()}
          
          {/* Clinics Service Screens */}
          {currentScreen === "mobile-clinics-main" && renderMobileClinicsMain()}
          {currentScreen === "mobile-clinics-hospital" && renderMobileClinicsHospital()}
          
          {/* Health Info Service Screens */}
          {currentScreen === "mobile-health-info-main" && renderMobileHealthInfoMain()}
          {currentScreen === "mobile-health-prevention" && renderMobileHealthPrevention()}
          
          {/* Community Service Screens */}
          {currentScreen === "mobile-community-main" && renderMobileCommunityMain()}
          {currentScreen === "mobile-community-worker" && renderMobileCommunityWorker()}
        </div>
      </div>
    </div>
  );
};

export default USSD;
