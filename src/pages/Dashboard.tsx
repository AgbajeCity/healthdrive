import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cross, 
  Home, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Phone,
  Stethoscope,
  Truck,
  BarChart3,
  MapPin,
  Calendar,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import florenceKabeyaImage from "@/assets/florence-kabeya.jpg";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const sidebarItems = [
    { id: "ussd", label: "*182#", icon: Phone, highlight: true },
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "account", label: "Account", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const consultations = [
    {
      title: "Malaria drug prescription",
      time: "Yesterday at 10:00AM",
      icon: Stethoscope,
      color: "text-blue-400"
    },
    {
      title: "Mobile Clinic Visitation", 
      time: "2 weeks ago",
      icon: Truck,
      color: "text-green-400"
    },
    {
      title: "Call with Nadia",
      time: "1 month ago", 
      icon: Phone,
      color: "text-purple-400"
    }
  ];

  const chartData = [
    { month: "January", value: 5 },
    { month: "February", value: 8 },
    { month: "March", value: 15 },
    { month: "April", value: 20 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-72 bg-healthcare-dark border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Cross className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">HealthDrive</span>
          </div>
        </div>

        {/* USSD Code Highlight */}
        <div className="p-4">
          <Card className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors">
            <CardContent className="p-4" onClick={() => window.location.href = '/ussd'}>
              <div className="text-2xl font-bold">*182#</div>
              <div className="text-sm opacity-90">USSD code to dial on Safaricom</div>
              <div className="text-xs opacity-75 mt-1">Click to access USSD services</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                item.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
              }`}
              onClick={() => {
                if (item.id === "ussd") {
                  window.location.href = '/ussd';
                } else {
                  setActiveTab(item.id);
                }
              }}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 space-y-2 border-t border-border">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/profile">
              <User className="w-4 h-4 mr-3" />
              View Profile
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/map">
              <MapPin className="w-4 h-4 mr-3" />
              View Map
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive" asChild>
            <Link to="/profile">
              <LogOut className="w-4 h-4 mr-3" />
              Log Out
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">My Healthcare Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search your health records" 
                className="pl-10 w-64 bg-muted/50"
              />
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium">Florence Kabeya</div>
                <div className="text-xs text-muted-foreground">User</div>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={florenceKabeyaImage} 
                  alt="Florence Kabeya" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Consultations Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <span>My Saved Medical Consultations</span>
                </CardTitle>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {consultations.map((consultation, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Consultation Details",
                      description: `Viewing details for: ${consultation.title}`,
                    });
                  }}
                >
                  <div className={`w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center ${consultation.color}`}>
                    <consultation.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{consultation.title}</div>
                    <div className="text-sm text-muted-foreground">{consultation.time}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats and Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Number of mobile clinic visitation per month</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 text-sm text-muted-foreground">{data.month}</div>
                      <div className="flex-1 bg-muted/30 rounded-full h-4 relative">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${(data.value / 25) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm font-medium">{data.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Mobile Clinics visited</span>
                  </CardTitle>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent onClick={() => window.location.href = '/map'}>
                <div className="bg-muted/30 rounded-lg h-48 flex items-center justify-center hover:bg-muted/40 transition-colors">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm">Interactive Map</div>
                    <div className="text-xs">Click to view healthcare facilities near you</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;