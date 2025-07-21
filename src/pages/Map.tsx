import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Cross, MapPin, Navigation as NavIcon, Search, Phone, Clock, Star, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface HealthcareFacility {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  distance: string;
  rating: number;
  services: string[];
  hours: string;
  latitude: number;
  longitude: number;
}

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          loadNearbyFacilities();
        },
        (error) => {
          console.error("Error getting location:", error);
          loadMockFacilities();
        }
      );
    } else {
      loadMockFacilities();
    }
  }, []);

  const loadMockFacilities = () => {
    // Mock data for demonstration
    const mockFacilities: HealthcareFacility[] = [
      {
        id: "1",
        name: "Kenyatta National Hospital",
        type: "Hospital",
        address: "Hospital Rd, Nairobi",
        phone: "+254 20 2726300",
        distance: "2.5 km",
        rating: 4.2,
        services: ["Emergency", "Surgery", "Maternity", "Pediatrics"],
        hours: "24/7",
        latitude: -1.2966,
        longitude: 36.8083
      },
      {
        id: "2",
        name: "Nairobi West Health Centre",
        type: "Health Centre",
        address: "Nairobi West, Nairobi",
        phone: "+254 20 2726301",
        distance: "1.2 km",
        rating: 3.8,
        services: ["General Practice", "Vaccination", "Pharmacy"],
        hours: "8:00 AM - 6:00 PM",
        latitude: -1.3066,
        longitude: 36.7983
      },
      {
        id: "3",
        name: "Aga Khan University Hospital",
        type: "Hospital",
        address: "3rd Parklands Ave, Nairobi",
        phone: "+254 20 3662000",
        distance: "4.1 km",
        rating: 4.7,
        services: ["Specialized Care", "Diagnostics", "Emergency", "Pharmacy"],
        hours: "24/7",
        latitude: -1.2526,
        longitude: 36.8056
      },
      {
        id: "4",
        name: "Mobile Clinic - Kibera",
        type: "Mobile Clinic",
        address: "Kibera, Nairobi",
        phone: "+254 722 123456",
        distance: "3.8 km",
        rating: 4.0,
        services: ["Basic Care", "Vaccination", "Health Education"],
        hours: "9:00 AM - 4:00 PM (Weekdays)",
        latitude: -1.3133,
        longitude: 36.7906
      }
    ];
    setFacilities(mockFacilities);
  };

  const loadNearbyFacilities = () => {
    // In a real app, this would fetch from your database based on user location
    loadMockFacilities();
  };

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         facility.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || facility.type.toLowerCase().includes(selectedFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const getDirections = (facility: HealthcareFacility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const callFacility = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Access Granted",
            description: "We can now show you nearby healthcare facilities",
          });
          loadNearbyFacilities();
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location services for better results",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Cross className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">HealthDrive</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Healthcare Map</h1>
            <p className="text-foreground/80">Find nearby healthcare facilities and services</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Search and Filters */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    Search & Filter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search facilities, services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Filter by Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["all", "hospital", "health centre", "mobile clinic", "pharmacy"].map((filter) => (
                        <Badge
                          key={filter}
                          variant={selectedFilter === filter ? "default" : "outline"}
                          className="cursor-pointer capitalize"
                          onClick={() => setSelectedFilter(filter)}
                        >
                          {filter}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {!userLocation && (
                    <Button 
                      onClick={getLocationPermission}
                      className="w-full"
                      variant="outline"
                    >
                      <NavIcon className="w-4 h-4 mr-2" />
                      Enable Location
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Facilities List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredFacilities.map((facility) => (
                  <Card key={facility.id} className="bg-card/90 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{facility.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="text-xs">
                                {facility.type}
                              </Badge>
                              <span>{facility.distance}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{facility.rating}</span>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1 mb-1">
                            <MapPin className="w-3 h-3" />
                            <span>{facility.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{facility.hours}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {facility.services.slice(0, 3).map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {facility.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{facility.services.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => getDirections(facility)}
                          >
                            <NavIcon className="w-3 h-3 mr-1" />
                            Directions
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => callFacility(facility.phone)}
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-2">
              <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Interactive Map
                  </CardTitle>
                  <CardDescription>
                    Click on markers to view facility details
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                  <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Simulated Map */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
                    <div className="relative z-10 text-center space-y-4">
                      <MapPin className="w-16 h-16 text-primary mx-auto" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
                        <p className="text-muted-foreground">Healthcare facilities in your area</p>
                      </div>
                      
                      {/* Simulated Map Markers */}
                      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-bounce">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap shadow">
                          Hospital
                        </div>
                      </div>
                      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-100">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap shadow">
                          Health Centre
                        </div>
                      </div>
                      <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-green-500 rounded-full animate-bounce delay-200">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap shadow">
                          Mobile Clinic
                        </div>
                      </div>

                      <Button 
                        onClick={() => window.open('https://maps.google.com', '_blank')}
                        className="mt-4"
                      >
                        Open Full Map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;