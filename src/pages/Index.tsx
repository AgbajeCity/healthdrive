import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cross, ArrowLeft, ArrowRight, Truck, Stethoscope, Calendar, MapPin, Phone, Heart, MessageSquare, Users, Copy, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [ussdCode, setUssdCode] = useState("*123#");
  const [currentService, setCurrentService] = useState("");
  const [mobileScreenStack, setMobileScreenStack] = useState([]);
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
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="pt-20 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
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
          </div>
        </div>
      </div>
    );
  };

  const renderMobileEmergencyMain = () => (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
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
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on current screen
  if (currentScreen === "mobile-connecting") {
    return renderMobileConnecting();
  }
  
  if (currentScreen === "mobile-emergency-main") {
    return renderMobileEmergencyMain();
  }

  // Add other mobile screens as needed
  if (currentScreen.includes('mobile-')) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="pt-20 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <Button variant="ghost" onClick={goBackMobile}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-primary">USSD Service</h1>
                  <p className="text-lg text-foreground">Active: {ussdCode}</p>
                </div>
              </div>

              <FeaturePhone showKeypad={false}>
                <div>
                  <div className="text-center mb-1">SERVICE ACTIVE</div>
                  <div className="border-t border-green-600 pt-1 mt-1">
                    <div>Service connected successfully</div>
                    <div className="mt-2">Press any key to continue</div>
                  </div>
                </div>
              </FeaturePhone>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section - USSD Focus */}
      <section className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            {/* Main USSD Heading */}
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-8">
                <Phone className="w-16 h-16 text-primary mr-4" />
                <div className="text-6xl md:text-8xl font-mono font-bold text-primary">*</div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                PRIMARY HEALTHCARE ACCESS
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                FOR RURAL COMMUNITIES
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                No internet required • Works on any phone • Immediate assistance
              </p>
            </div>

            {/* Featured USSD Codes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <div className="bg-card/90 backdrop-blur-sm border border-red-500/30 rounded-lg p-4">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-mono font-bold text-red-600">*911#</div>
                <p className="text-xs text-muted-foreground mb-2">Emergency Services</p>
                <Button 
                  size="sm" 
                  variant="destructive"
                  className="w-full text-xs"
                  onClick={() => dialUSSD("*911#")}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Dial Now
                </Button>
              </div>
              <div className="bg-card/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4">
                <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-mono font-bold text-blue-600">*123#</div>
                <p className="text-xs text-muted-foreground mb-2">Find Nearby Clinics</p>
                <Button 
                  size="sm"
                  className="w-full text-xs bg-blue-600 hover:bg-blue-700"
                  onClick={() => dialUSSD("*123#")}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Dial Now
                </Button>
              </div>
              <div className="bg-card/90 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
                <MessageSquare className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-mono font-bold text-green-600">*456#</div>
                <p className="text-xs text-muted-foreground mb-2">Health Information</p>
                <Button 
                  size="sm"
                  className="w-full text-xs bg-green-600 hover:bg-green-700"
                  onClick={() => dialUSSD("*456#")}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Dial Now
                </Button>
              </div>
              <div className="bg-card/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
                <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-mono font-bold text-purple-600">*789#</div>
                <p className="text-xs text-muted-foreground mb-2">Community Health</p>
                <Button 
                  size="sm"
                  className="w-full text-xs bg-purple-600 hover:bg-purple-700"
                  onClick={() => dialUSSD("*789#")}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Dial Now
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link to="/ussd">Try USSD Services</Link>
              </Button>
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
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
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
                    <CardTitle className="text-base">Emergency Services</CardTitle>
                  </div>
                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                </div>
                <CardDescription className="text-sm">Quick access to emergency healthcare services</CardDescription>
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
                    <CardTitle className="text-base">Find Nearby Clinics</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">Popular</Badge>
                </div>
                <CardDescription className="text-sm">Locate healthcare facilities in your area</CardDescription>
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
                  <CardTitle className="text-base">Health Information</CardTitle>
                </div>
                <CardDescription className="text-sm">Get health tips and disease prevention info</CardDescription>
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
                  <CardTitle className="text-base">Community Health</CardTitle>
                </div>
                <CardDescription className="text-sm">Connect with local health workers and programs</CardDescription>
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
