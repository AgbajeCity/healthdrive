import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cross, Phone, MessageSquare, Heart, Users, MapPin, Clock, ArrowLeft, Copy, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { useToast } from "@/hooks/use-toast";

const USSD = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [ussdCode, setUssdCode] = useState("*123#");
  const [currentService, setCurrentService] = useState("");
  const [mobileScreenStack, setMobileScreenStack] = useState([]);
  const { toast } = useToast();

  // Listen for dial events from homepage
  useEffect(() => {
    const handleDialUSSD = (event) => {
      const { code } = event.detail;
      dialUSSD(code);
    };

    window.addEventListener('dialUSSD', handleDialUSSD);
    return () => window.removeEventListener('dialUSSD', handleDialUSSD);
  }, []);

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

  // Authentic Feature Phone Component with Functional Keypad
  const FeaturePhone = ({ children, showKeypad = true, onKeyPress = null }) => {
    const [input, setInput] = useState("");

    const handleKeyPress = (key) => {
      if (key === '*' || key === '#') {
        setInput(prev => prev + key);
      } else if (key >= '0' && key <= '9') {
        setInput(prev => prev + key);
      }
      
      if (onKeyPress) {
        onKeyPress(key, input + key);
      }
    };

    const handleCall = () => {
      if (input.includes('*') && input.includes('#')) {
        dialUSSD(input);
        setInput("");
      }
    };

    const handleClear = () => {
      setInput(prev => prev.slice(0, -1));
    };

    return (
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
              {/* Input display */}
              {showKeypad && input && (
                <div className="text-yellow-400 font-mono text-sm mb-2 text-center border-b border-gray-600 pb-1">
                  {input}
                </div>
              )}
              
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
          
          {/* Functional Keypad */}
          {showKeypad && (
            <div className="grid grid-cols-3 gap-1 mt-3">
              {[
                { key: '1', sub: '' }, 
                { key: '2', sub: 'ABC' }, 
                { key: '3', sub: 'DEF' },
                { key: '4', sub: 'GHI' }, 
                { key: '5', sub: 'JKL' }, 
                { key: '6', sub: 'MNO' },
                { key: '7', sub: 'PQRS' }, 
                { key: '8', sub: 'TUV' }, 
                { key: '9', sub: 'WXYZ' },
                { key: '*', sub: '+' }, 
                { key: '0', sub: ' ' }, 
                { key: '#', sub: '' }
              ].map(({ key, sub }) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className="bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white font-bold py-3 px-2 rounded text-sm transition-all duration-100 relative group shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  <div className="text-base font-bold">{key}</div>
                  {sub && <div className="text-xs text-gray-300 font-normal">{sub}</div>}
                </button>
              ))}
            </div>
          )}
          
          {/* Control Buttons */}
          <div className="flex justify-between items-center mt-3 px-2">
            <button 
              onClick={handleCall}
              className="bg-green-600 hover:bg-green-500 active:bg-green-400 text-white font-bold py-2 px-4 rounded-full text-xs flex items-center shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-100"
            >
              <Phone className="w-3 h-3 mr-1" />
              CALL
            </button>
            <div className="flex space-x-1">
              <button 
                onClick={() => navigateToMobileScreen("mobile-connecting")}
                className="bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white font-bold py-2 px-3 rounded text-xs transition-all duration-100 transform hover:scale-105 active:scale-95"
              >
                ↑
              </button>
              <button 
                onClick={() => {
                  if (currentScreen.includes('mobile-')) {
                    // Select current highlighted option
                    const screens = {
                      'mobile-emergency-main': () => navigateToMobileScreen("mobile-emergency-ambulance"),
                      'mobile-clinics-main': () => navigateToMobileScreen("mobile-clinics-hospital"),
                      'mobile-health-info-main': () => navigateToMobileScreen("mobile-health-info-topics"),
                      'mobile-community-main': () => navigateToMobileScreen("mobile-community-workers")
                    };
                    screens[currentScreen]?.();
                  }
                }}
                className="bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white font-bold py-2 px-3 rounded text-xs transition-all duration-100 transform hover:scale-105 active:scale-95"
              >
                OK
              </button>
              <button 
                onClick={goBackMobile}
                className="bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white font-bold py-2 px-3 rounded text-xs transition-all duration-100 transform hover:scale-105 active:scale-95"
              >
                ↓
              </button>
            </div>
            <button 
              onClick={handleClear}
              className="bg-red-600 hover:bg-red-500 active:bg-red-400 text-white font-bold py-2 px-4 rounded-full text-xs shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-100"
            >
              <Cross className="w-3 h-3 mr-1" />
              END
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileConnecting = () => {
    // Auto-connect after 2 seconds
    setTimeout(() => {
      setCurrentScreen(`mobile-${currentService}-main`);
    }, 2000);

    return (
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
              <div className="mt-1 text-center">Auto-connecting...</div>
            </div>
          </div>
        </FeaturePhone>
      </div>
    );
  };

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

      <FeaturePhone showKeypad={false} onKeyPress={(key) => {
        if (key === '1') navigateToMobileScreen("mobile-emergency-ambulance");
        else if (key === '2') navigateToMobileScreen("mobile-emergency-fire");
        else if (key === '3') navigateToMobileScreen("mobile-emergency-police");
        else if (key === '6') navigateToMobileScreen("mobile-emergency-hospital");
      }}>
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

      {/* Feature Phone Keypad for Options */}
      <div className="max-w-sm mx-auto">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-2xl shadow-xl border border-gray-700">
          <div className="text-center text-white text-sm mb-3 font-mono">Select Emergency Service</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: '1', sub: 'Ambulance', action: () => navigateToMobileScreen("mobile-emergency-ambulance") }, 
              { key: '2', sub: 'Fire Dept', action: () => navigateToMobileScreen("mobile-emergency-fire") }, 
              { key: '3', sub: 'Police', action: () => navigateToMobileScreen("mobile-emergency-police") },
              { key: '4', sub: 'Poison', action: () => navigateToMobileScreen("mobile-emergency-poison") }, 
              { key: '5', sub: 'Mental', action: () => navigateToMobileScreen("mobile-emergency-mental") },
              { key: '6', sub: 'Hospital', action: () => navigateToMobileScreen("mobile-emergency-hospital") },
              { key: '7', sub: '', action: () => {} }, 
              { key: '8', sub: '', action: () => {} }, 
              { key: '9', sub: '', action: () => {} },
              { key: '*', sub: '', action: () => {} }, 
              { key: '0', sub: 'Main Menu', action: () => setCurrentScreen("main") }, 
              { key: '#', sub: '', action: () => {} }
            ].map(({ key, sub, action }) => (
              <button
                key={key}
                onClick={action}
                className="bg-gray-600 hover:bg-red-500 active:bg-red-400 text-white font-bold py-4 px-2 rounded-lg text-sm transition-all duration-100 relative shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-gray-500"
              >
                <div className="text-lg font-bold">{key}</div>
                {sub && <div className="text-xs text-gray-200 font-normal mt-1">{sub}</div>}
              </button>
            ))}
          </div>
        </div>
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

  const renderMobileEmergencyFire = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Fire Department</h1>
          <p className="text-lg text-foreground">Fire Emergency Response</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">FIRE DEPARTMENT</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>KIGALI FIRE BRIGADE</div>
            <div>Status: DISPATCHED</div>
            <div>Units: 2 Fire Trucks</div>
            <div>ETA: 6 minutes</div>
            <div className="mt-1">Emergency: 112</div>
            <div className="mt-1">Ref: FIRE2024001</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Evacuate if needed</div>
            <div>Fire crew en route</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Call Fire Emergency
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Emergency Menu
        </Button>
      </div>
    </div>
  );

  const renderMobileEmergencyPolice = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Police Service</h1>
          <p className="text-lg text-foreground">Police Emergency Response</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">POLICE DISPATCH</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>KIGALI POLICE</div>
            <div>Status: DISPATCHED</div>
            <div>Unit: Patrol Car 245</div>
            <div>ETA: 5 minutes</div>
            <div className="mt-1">Emergency: 112</div>
            <div className="mt-1">Ref: POL2024001</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Stay safe. Help coming</div>
            <div>Call if urgent</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Call Police Emergency
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Emergency Menu
        </Button>
      </div>
    </div>
  );

  const renderMobileEmergencyHospital = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Emergency Hospital</h1>
          <p className="text-lg text-foreground">Hospital Emergency Info</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">EMERGENCY HOSPITALS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>KIGALI UNIVERSITY HOSPITAL</div>
            <div>Emergency: 24/7 Open</div>
            <div>Distance: 2.3km</div>
            <div>Phone: 0788112233</div>
            <div className="mt-1">KING FAISAL HOSPITAL</div>
            <div>Emergency: 24/7 Open</div>
            <div>Distance: 3.1km</div>
            <div>Phone: 0788445566</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Call for directions</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Call Hospital
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

      {/* Feature Phone Keypad for Clinic Options */}
      <div className="max-w-sm mx-auto">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-2xl shadow-xl border border-gray-700">
          <div className="text-center text-white text-sm mb-3 font-mono">Select Clinic Service</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: '1', sub: 'Hospital', action: () => navigateToMobileScreen("mobile-clinics-hospital") }, 
              { key: '2', sub: 'Health Center', action: () => navigateToMobileScreen("mobile-clinics-centers") }, 
              { key: '3', sub: 'Specialist', action: () => navigateToMobileScreen("mobile-clinics-specialist") },
              { key: '4', sub: 'Pharmacy', action: () => navigateToMobileScreen("mobile-clinics-pharmacy") }, 
              { key: '5', sub: 'Mobile Clinic', action: () => navigateToMobileScreen("mobile-clinics-mobile") }, 
              { key: '6', sub: 'Emergency', action: () => navigateToMobileScreen("mobile-clinics-emergency") },
              { key: '7', sub: '', action: () => {} }, 
              { key: '8', sub: '', action: () => {} }, 
              { key: '9', sub: '', action: () => {} },
              { key: '*', sub: '', action: () => {} }, 
              { key: '0', sub: 'Main Menu', action: () => setCurrentScreen("main") }, 
              { key: '#', sub: '', action: () => {} }
            ].map(({ key, sub, action }) => (
              <button
                key={key}
                onClick={action}
                className="bg-gray-600 hover:bg-blue-500 active:bg-blue-400 text-white font-bold py-4 px-2 rounded-lg text-sm transition-all duration-100 relative shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-gray-500"
              >
                <div className="text-lg font-bold">{key}</div>
                {sub && <div className="text-xs text-gray-200 font-normal mt-1">{sub}</div>}
              </button>
            ))}
          </div>
        </div>
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

      {/* Feature Phone Keypad for Health Info Options */}
      <div className="max-w-sm mx-auto">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-2xl shadow-xl border border-gray-700">
          <div className="text-center text-white text-sm mb-3 font-mono">Select Health Topic</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: '1', sub: 'Prevention', action: () => navigateToMobileScreen("mobile-health-prevention") }, 
              { key: '2', sub: 'Vaccination', action: () => navigateToMobileScreen("mobile-health-vaccination") }, 
              { key: '3', sub: 'Nutrition', action: () => navigateToMobileScreen("mobile-health-nutrition") },
              { key: '4', sub: 'Mental Health', action: () => navigateToMobileScreen("mobile-health-mental") }, 
              { key: '5', sub: 'Child Health', action: () => navigateToMobileScreen("mobile-health-child") }, 
              { key: '6', sub: 'Women Health', action: () => navigateToMobileScreen("mobile-health-women") },
              { key: '7', sub: '', action: () => {} }, 
              { key: '8', sub: '', action: () => {} }, 
              { key: '9', sub: '', action: () => {} },
              { key: '*', sub: '', action: () => {} }, 
              { key: '0', sub: 'Main Menu', action: () => setCurrentScreen("main") }, 
              { key: '#', sub: '', action: () => {} }
            ].map(({ key, sub, action }) => (
              <button
                key={key}
                onClick={action}
                className="bg-gray-600 hover:bg-green-500 active:bg-green-400 text-white font-bold py-4 px-2 rounded-lg text-sm transition-all duration-100 relative shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-gray-500"
              >
                <div className="text-lg font-bold">{key}</div>
                {sub && <div className="text-xs text-gray-200 font-normal mt-1">{sub}</div>}
              </button>
            ))}
          </div>
        </div>
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

      {/* Feature Phone Keypad for Community Options */}
      <div className="max-w-sm mx-auto">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-2xl shadow-xl border border-gray-700">
          <div className="text-center text-white text-sm mb-3 font-mono">Select Community Service</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: '1', sub: 'Health Worker', action: () => navigateToMobileScreen("mobile-community-worker") }, 
              { key: '2', sub: 'Programs', action: () => navigateToMobileScreen("mobile-community-programs") }, 
              { key: '3', sub: 'Education', action: () => navigateToMobileScreen("mobile-community-education") },
              { key: '4', sub: 'Support Groups', action: () => navigateToMobileScreen("mobile-community-support") }, 
              { key: '5', sub: 'Campaigns', action: () => navigateToMobileScreen("mobile-community-campaigns") }, 
              { key: '6', sub: 'Report Issues', action: () => navigateToMobileScreen("mobile-community-report") },
              { key: '7', sub: '', action: () => {} }, 
              { key: '8', sub: '', action: () => {} }, 
              { key: '9', sub: '', action: () => {} },
              { key: '*', sub: '', action: () => {} }, 
              { key: '0', sub: 'Main Menu', action: () => setCurrentScreen("main") }, 
              { key: '#', sub: '', action: () => {} }
            ].map(({ key, sub, action }) => (
              <button
                key={key}
                onClick={action}
                className="bg-gray-600 hover:bg-purple-500 active:bg-purple-400 text-white font-bold py-4 px-2 rounded-lg text-sm transition-all duration-100 relative shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border border-gray-500"
              >
                <div className="text-lg font-bold">{key}</div>
                {sub && <div className="text-xs text-gray-200 font-normal mt-1">{sub}</div>}
              </button>
            ))}
          </div>
        </div>
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

  // Additional missing screens for complete functionality
  
  const renderMobileClinicsPharmacy = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Pharmacies</h1>
          <p className="text-lg text-foreground">Medicine & Supplies</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">NEARBY PHARMACIES</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>KIGALI PHARMACY</div>
            <div>Distance: 0.8km</div>
            <div>Phone: 0788334455</div>
            <div>Hours: 24/7</div>
            <div className="mt-1">HEALTH PLUS PHARMACY</div>
            <div>Distance: 1.2km</div>
            <div>Phone: 0788667788</div>
            <div>Hours: 8AM-10PM</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Medicine delivery available</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Call Pharmacy
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Clinics
        </Button>
      </div>
    </div>
  );

  const renderMobileClinicsCenters = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Health Centers</h1>
          <p className="text-lg text-foreground">Primary Healthcare</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">HEALTH CENTERS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>GASABO HEALTH CENTER</div>
            <div>Distance: 1.5km</div>
            <div>Phone: 0788556677</div>
            <div>Services: General Care</div>
            <div className="mt-1">KIMISAGARA HC</div>
            <div>Distance: 2.8km</div>
            <div>Phone: 0788998811</div>
            <div>Services: Maternal Care</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Walk-ins welcome</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Call Health Center
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Clinics
        </Button>
      </div>
    </div>
  );

  const renderMobileClinicsMobile = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Mobile Clinics</h1>
          <p className="text-lg text-foreground">Mobile Healthcare</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">MOBILE CLINICS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>TODAY'S SCHEDULE:</div>
            <div className="mt-1">KACYIRU MARKET</div>
            <div>Time: 9AM - 12PM</div>
            <div>Services: Checkups, Vaccines</div>
            <div className="mt-1">KIMIRONKO</div>
            <div>Time: 2PM - 5PM</div>
            <div>Services: General Care</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Free basic health services</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📍 Get Location
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Clinics
        </Button>
      </div>
    </div>
  );

  const renderMobileHealthVaccination = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Vaccination</h1>
          <p className="text-lg text-foreground">Immunization Schedule</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">VACCINATION SCHEDULE</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>CHILDREN (0-5 years):</div>
            <div className="mt-1">• BCG - At birth</div>
            <div>• Polio - 6, 10, 14 weeks</div>
            <div>• DPT - 6, 10, 14 weeks</div>
            <div>• Measles - 9 months</div>
            <div className="mt-1">ADULTS:</div>
            <div>• COVID-19 - Every 6 months</div>
            <div>• Flu - Annually</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Free at all health centers</div>
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

  const renderMobileHealthNutrition = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Nutrition Tips</h1>
          <p className="text-lg text-foreground">Healthy Eating</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">NUTRITION GUIDELINES</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>DAILY ESSENTIALS:</div>
            <div className="mt-1">• 5 servings fruits/vegetables</div>
            <div>• Whole grains (rice, bread)</div>
            <div>• Lean proteins (beans, fish)</div>
            <div>• 8 glasses of water</div>
            <div>• Limit sugar & salt</div>
            <div>• Eat breakfast daily</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Balanced diet = healthy life</div>
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

  const renderMobileHealthMental = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Mental Health</h1>
          <p className="text-lg text-foreground">Emotional Wellbeing</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">MENTAL HEALTH TIPS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>DAILY PRACTICES:</div>
            <div className="mt-1">• Talk to someone you trust</div>
            <div>• Exercise regularly</div>
            <div>• Get enough sleep</div>
            <div>• Practice deep breathing</div>
            <div>• Limit alcohol/drugs</div>
            <div className="mt-1">CRISIS HELPLINE: 114</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>You are not alone</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Crisis Helpline
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Health Info
        </Button>
      </div>
    </div>
  );

  const renderMobileCommunityPrograms = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Health Programs</h1>
          <p className="text-lg text-foreground">Community Initiatives</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">HEALTH PROGRAMS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>MATERNAL HEALTH PROGRAM</div>
            <div>Free prenatal care</div>
            <div>Contact: 0788111222</div>
            <div className="mt-1">CHILD NUTRITION</div>
            <div>Growth monitoring</div>
            <div>Contact: 0788333444</div>
            <div className="mt-1">MALARIA PREVENTION</div>
            <div>Free bed nets</div>
            <div>Contact: 0788555666</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Community-driven healthcare</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Join Program
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Community
        </Button>
      </div>
    </div>
  );

  const renderMobileCommunityEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Health Education</h1>
          <p className="text-lg text-foreground">Learn & Share</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">HEALTH EDUCATION</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>UPCOMING SESSIONS:</div>
            <div className="mt-1">DIABETES AWARENESS</div>
            <div>Date: Every Tuesday</div>
            <div>Time: 2PM - 4PM</div>
            <div className="mt-1">HIV PREVENTION</div>
            <div>Date: Every Friday</div>
            <div>Time: 10AM - 12PM</div>
            <div className="mt-1">Venue: Community Center</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Free attendance</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📅 Register for Session
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Community
        </Button>
      </div>
    </div>
  );

  const renderMobileCommunitySuppport = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Support Groups</h1>
          <p className="text-lg text-foreground">Peer Support</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">SUPPORT GROUPS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>DIABETES SUPPORT</div>
            <div>Meets: Wednesdays 3PM</div>
            <div>Contact: 0788777888</div>
            <div className="mt-1">CANCER SURVIVORS</div>
            <div>Meets: Saturdays 10AM</div>
            <div>Contact: 0788999000</div>
            <div className="mt-1">NEW MOTHERS</div>
            <div>Meets: Mondays 2PM</div>
            <div>Contact: 0788111000</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>You are not alone</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Join Support Group
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Community
        </Button>
      </div>
    </div>
  );

  // Additional missing emergency screens
  const renderMobileEmergencyPoison = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Poison Control</h1>
          <p className="text-lg text-foreground">Emergency Poisoning Response</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">POISON CONTROL CENTER</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>IMMEDIATE STEPS:</div>
            <div>1. Call 911 if unconscious</div>
            <div>2. Do NOT induce vomiting</div>
            <div>3. Keep poison container</div>
            <div className="mt-1">HOTLINE: 0788-POISON</div>
            <div>KIGALI UNIVERSITY HOSPITAL</div>
            <div>Emergency Room: 24/7</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Time is critical</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Call Poison Hotline
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Emergency Menu
        </Button>
      </div>
    </div>
  );

  const renderMobileEmergencyMental = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Mental Health Crisis</h1>
          <p className="text-lg text-foreground">Mental Health Emergency</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">MENTAL HEALTH CRISIS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>IMMEDIATE SUPPORT:</div>
            <div>Crisis Hotline: 114</div>
            <div>Available: 24/7</div>
            <div>Confidential & Free</div>
            <div className="mt-1">NDERA HOSPITAL</div>
            <div>Mental Health Unit</div>
            <div>Emergency: 0788123789</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>You matter. Help is available.</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Crisis Hotline 114
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Emergency Menu
        </Button>
      </div>
    </div>
  );

  // Additional missing clinic screens
  const renderMobileClinicsSpecialist = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Specialist Clinics</h1>
          <p className="text-lg text-foreground">Specialized Care</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">SPECIALIST CLINICS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>CARDIOLOGY CLINIC</div>
            <div>Location: King Faisal Hospital</div>
            <div>Phone: 0788111333</div>
            <div className="mt-1">DIABETES CENTER</div>
            <div>Location: Rwanda Military Hospital</div>
            <div>Phone: 0788222444</div>
            <div className="mt-1">CANCER CENTER</div>
            <div>Location: Butaro Hospital</div>
            <div>Phone: 0788333555</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Appointments required</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Book Appointment
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Clinics
        </Button>
      </div>
    </div>
  );

  const renderMobileClinicsEmergency = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Emergency Centers</h1>
          <p className="text-lg text-foreground">Emergency Care</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">EMERGENCY CENTERS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>KIGALI UNIVERSITY HOSPITAL</div>
            <div>Emergency: 24/7</div>
            <div>Phone: 0788112233</div>
            <div className="mt-1">KING FAISAL HOSPITAL</div>
            <div>Emergency: 24/7</div>
            <div>Phone: 0788445566</div>
            <div className="mt-1">RWANDA MILITARY HOSPITAL</div>
            <div>Emergency: 24/7</div>
            <div>Phone: 0788778899</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>No appointment needed</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="destructive" size="sm">
          📞 Call Emergency
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Clinics
        </Button>
      </div>
    </div>
  );

  // Additional missing health info screens
  const renderMobileHealthChild = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Child Health</h1>
          <p className="text-lg text-foreground">Children's Wellbeing</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">CHILD HEALTH TIPS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>KEY MILESTONES:</div>
            <div className="mt-1">• Monthly weight checks</div>
            <div>• Complete vaccinations</div>
            <div>• Balanced nutrition</div>
            <div>• Clean water & hygiene</div>
            <div>• Regular play & exercise</div>
            <div>• Adequate sleep</div>
            <div className="mt-1">WARNING SIGNS: Fever, poor feeding, lethargy</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Visit health center monthly</div>
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

  const renderMobileHealthWomen = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Women's Health</h1>
          <p className="text-lg text-foreground">Women's Wellbeing</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">WOMEN'S HEALTH</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>REPRODUCTIVE HEALTH:</div>
            <div className="mt-1">• Regular checkups</div>
            <div>• Cervical cancer screening</div>
            <div>• Family planning services</div>
            <div>• Prenatal care</div>
            <div>• Safe delivery</div>
            <div>• Postnatal care</div>
            <div className="mt-1">FREE at health centers</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Your health matters</div>
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

  // Missing render functions for complete functionality
  const renderMobileHealthInfoTopics = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Health Topics</h1>
          <p className="text-lg text-foreground">Health Information</p>
        </div>
      </div>

      <FeaturePhone onKeyPress={(key) => {
        if (key === '1') navigateToMobileScreen("mobile-health-prevention");
        else if (key === '2') navigateToMobileScreen("mobile-health-vaccination");
        else if (key === '3') navigateToMobileScreen("mobile-health-nutrition");
        else if (key === '4') navigateToMobileScreen("mobile-health-mental");
        else if (key === '5') navigateToMobileScreen("mobile-health-maternal");
        else if (key === '6') navigateToMobileScreen("mobile-health-children");
      }}>
        <div>
          <div className="text-center mb-1">HEALTH TOPICS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>1 Disease Prevention</div>
            <div>2 Vaccination Info</div>
            <div>3 Nutrition Tips</div>
            <div>4 Mental Health</div>
            <div>5 Maternal Health</div>
            <div>6 Child Health</div>
            <div>0 Main Menu</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Select a topic</div>
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

  const renderMobileCommunityWorkers = () => (
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

      <FeaturePhone onKeyPress={(key) => {
        if (key === '1') navigateToMobileScreen("mobile-community-worker");
        else if (key === '2') navigateToMobileScreen("mobile-community-programs");
        else if (key === '3') navigateToMobileScreen("mobile-community-education");
        else if (key === '4') navigateToMobileScreen("mobile-community-support");
        else if (key === '5') navigateToMobileScreen("mobile-community-campaigns");
        else if (key === '6') navigateToMobileScreen("mobile-community-report");
      }}>
        <div>
          <div className="text-center mb-1">COMMUNITY HEALTH</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>1 Find Health Worker</div>
            <div>2 Health Programs</div>
            <div>3 Health Education</div>
            <div>4 Support Groups</div>
            <div>5 Health Campaigns</div>
            <div>6 Report Issues</div>
            <div>0 Main Menu</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Community care services</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Community
        </Button>
      </div>
    </div>
  );

  const renderMobileHealthMaternal = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Maternal Health</h1>
          <p className="text-lg text-foreground">Pregnancy & Birth</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">MATERNAL HEALTH</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>PREGNANCY CARE:</div>
            <div className="mt-1">• Start care early</div>
            <div>• Regular checkups</div>
            <div>• Take folic acid</div>
            <div>• Healthy diet</div>
            <div>• Avoid alcohol/smoking</div>
            <div>• Birth plan preparation</div>
            <div className="mt-1">FREE prenatal services</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Healthy mother, healthy baby</div>
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

  const renderMobileHealthChildren = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-green-600">Child Health</h1>
          <p className="text-lg text-foreground">Children's Wellbeing</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">CHILD HEALTH (0-5)</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>ESSENTIALS:</div>
            <div className="mt-1">• Breastfeeding 0-6 months</div>
            <div>• Balanced nutrition</div>
            <div>• Clean water & hygiene</div>
            <div>• Regular play & exercise</div>
            <div>• Adequate sleep</div>
            <div className="mt-1">WARNING SIGNS: Fever, poor feeding, lethargy</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Visit health center monthly</div>
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

  // Additional missing community screens
  const renderMobileCommunityCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Health Campaigns</h1>
          <p className="text-lg text-foreground">Community Campaigns</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">HEALTH CAMPAIGNS</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>CURRENT CAMPAIGNS:</div>
            <div className="mt-1">MALARIA PREVENTION</div>
            <div>Free bed nets distribution</div>
            <div>Date: This weekend</div>
            <div className="mt-1">VACCINATION DRIVE</div>
            <div>COVID-19 boosters</div>
            <div>Location: All health centers</div>
            <div className="mt-1">NUTRITION AWARENESS</div>
            <div>Cooking demonstrations</div>
            <div>Every Friday</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Free participation</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📅 Register for Campaign
        </Button>
        <Button className="w-full" variant="outline" onClick={goBackMobile} size="sm">
          ← Back to Community
        </Button>
      </div>
    </div>
  );

  const renderMobileCommunityReport = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" onClick={goBackMobile}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Report Issues</h1>
          <p className="text-lg text-foreground">Community Feedback</p>
        </div>
      </div>

      <FeaturePhone>
        <div>
          <div className="text-center mb-1">REPORT HEALTH ISSUES</div>
          <div className="border-t border-green-600 pt-1 mt-1">
            <div>REPORT TYPES:</div>
            <div className="mt-1">1. Disease outbreak</div>
            <div>2. Water contamination</div>
            <div>3. Facility problems</div>
            <div>4. Staff misconduct</div>
            <div>5. Drug shortage</div>
            <div className="mt-1">HOTLINE: 114</div>
            <div>Anonymous reporting available</div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Your voice matters</div>
          </div>
        </div>
      </FeaturePhone>

      <div className="space-y-2 max-w-md mx-auto">
        <Button className="w-full" size="sm">
          📞 Report Issue
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
      <Seo
        title="USSD Primary Healthcare"
        description="Primary healthcare on any feature phone. Dial *911# emergencies, *123# clinics, *456# AI symptom guidance, *789# CHV — no internet required."
        path="/ussd"
      />
      <a id="main" tabIndex={-1} className="sr-only">Main content</a>

      <div className="pt-20 min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Cross className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">HealthDrive USSD</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Primary healthcare on any feature phone — screening, treatment guidance and CHV referrals. No smartphone, no internet, free for the patient.
            </p>
          </div>

          {/* Shortcuts at-a-glance */}
          {currentScreen === "main" && (
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  {[
                    { code: "*911#", label: "Emergency triage", icon: Heart, color: "text-red-500" },
                    { code: "*123#", label: "Find a clinic / van stop", icon: MapPin, color: "text-blue-500" },
                    { code: "*456#", label: "AI symptom guidance", icon: MessageSquare, color: "text-green-500" },
                    { code: "*789#", label: "Reach a CHV", icon: Users, color: "text-purple-500" },
                  ].map((s) => (
                    <button
                      key={s.code}
                      onClick={() => dialUSSD(s.code)}
                      className="rounded-lg border border-border/50 p-3 hover:ring-2 hover:ring-primary/30 transition"
                    >
                      <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
                      <div className="font-mono font-bold text-foreground text-sm">{s.code}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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
          {currentScreen === "mobile-emergency-fire" && renderMobileEmergencyFire()}
          {currentScreen === "mobile-emergency-police" && renderMobileEmergencyPolice()}
          {currentScreen === "mobile-emergency-hospital" && renderMobileEmergencyHospital()}
          {currentScreen === "mobile-emergency-poison" && renderMobileEmergencyPoison()}
          {currentScreen === "mobile-emergency-mental" && renderMobileEmergencyMental()}
          
          {/* Clinics Service Screens */}
          {currentScreen === "mobile-clinics-main" && renderMobileClinicsMain()}
          {currentScreen === "mobile-clinics-hospital" && renderMobileClinicsHospital()}
          {currentScreen === "mobile-clinics-centers" && renderMobileClinicsCenters()}
          {currentScreen === "mobile-clinics-pharmacy" && renderMobileClinicsPharmacy()}
          {currentScreen === "mobile-clinics-mobile" && renderMobileClinicsMobile()}
          
          {/* Health Info Service Screens */}
          {currentScreen === "mobile-health-info-main" && renderMobileHealthInfoMain()}
          {currentScreen === "mobile-health-info-topics" && renderMobileHealthInfoTopics()}
          {currentScreen === "mobile-health-prevention" && renderMobileHealthPrevention()}
          {currentScreen === "mobile-health-vaccination" && renderMobileHealthVaccination()}
          {currentScreen === "mobile-health-nutrition" && renderMobileHealthNutrition()}
          {currentScreen === "mobile-health-mental" && renderMobileHealthMental()}
          {currentScreen === "mobile-health-maternal" && renderMobileHealthMaternal()}
          {currentScreen === "mobile-health-children" && renderMobileHealthChildren()}
          {currentScreen === "mobile-health-women" && renderMobileHealthWomen()}
          
          {/* Community Service Screens */}
          {currentScreen === "mobile-community-main" && renderMobileCommunityMain()}
          {currentScreen === "mobile-community-workers" && renderMobileCommunityWorkers()}
          {currentScreen === "mobile-community-worker" && renderMobileCommunityWorker()}
          {currentScreen === "mobile-community-programs" && renderMobileCommunityPrograms()}
          {currentScreen === "mobile-community-education" && renderMobileCommunityEducation()}
          {currentScreen === "mobile-community-support" && renderMobileCommunitySuppport()}
          {currentScreen === "mobile-community-campaigns" && renderMobileCommunityCampaigns()}
          {currentScreen === "mobile-community-report" && renderMobileCommunityReport()}
        </div>
      </div>
    </div>
  );
};

export default USSD;
