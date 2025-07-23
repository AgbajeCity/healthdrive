import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cross, MapPin, Phone, Heart, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Country {
  id: string;
  name: string;
  code: string;
}

interface Region {
  id: string;
  name: string;
  country_code: string;
}

interface District {
  id: string;
  name: string;
  region_id: string;
}

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    region: "",
    district: "",
    emergencyContact: "",
    medicalConditions: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetchRegions(formData.country);
      setFormData(prev => ({ ...prev, region: "", district: "" }));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.region) {
      fetchDistricts(formData.region);
      setFormData(prev => ({ ...prev, district: "" }));
    }
  }, [formData.region]);

  const fetchCountries = async () => {
    try {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCountries(data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchRegions = async (countryCode: string) => {
    try {
      const { data, error } = await supabase
        .from('regions')
        .select('*')
        .eq('country_code', countryCode)
        .order('name');
      
      if (error) throw error;
      setRegions(data || []);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const fetchDistricts = async (regionId: string) => {
    try {
      const { data, error } = await supabase
        .from('districts')
        .select('*')
        .eq('region_id', regionId)
        .order('name');
      
      if (error) throw error;
      setDistricts(data || []);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: formData.fullName,
          email: user.email,
          phone: formData.phone,
          country: formData.country,
          region: formData.region,
          district: formData.district,
          emergency_contact: formData.emergencyContact,
          medical_conditions: formData.medicalConditions,
        });

      if (error) throw error;

      toast({
        title: "Profile Complete!",
        description: "Welcome to HealthDrive. You can now access all features.",
      });

      navigate('/onboarding/complete');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.phone && formData.country && formData.region && formData.district;
      case 2:
        return formData.emergencyContact;
      default:
        return false;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Cross className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">HealthDrive</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-foreground/80">Help us provide you with the best healthcare experience</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > num ? <CheckCircle className="w-6 h-6" /> : num}
              </div>
              {num < 2 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > num ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
          <CardHeader>
            <CardTitle className="text-center">
              {step === 1 && "Personal & Location Information"}
              {step === 2 && "Emergency & Medical Info"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Info & Location */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                    <Input
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="+254 712 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Country</label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Region</label>
                    <Select 
                      value={formData.region} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
                      disabled={!formData.country}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">District</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Select 
                        value={formData.district} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                        disabled={!formData.region}
                      >
                        <SelectTrigger className="pl-10 h-12">
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.id} value={district.id}>
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Emergency & Medical */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Emergency Contact</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Emergency contact number"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Medical Conditions (Optional)</label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <textarea
                      placeholder="Any medical conditions, allergies, or special needs..."
                      value={formData.medicalConditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                      className="w-full pl-10 pt-3 pb-3 pr-3 min-h-[100px] rounded-md border border-border/50 bg-muted/50 focus:border-primary focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="w-24"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                className="w-32"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {step === 2 ? "Complete Setup" : "Next"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;