import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, User, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const BookConsultation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorName = searchParams.get('doctor') || 'Health Specialist';
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    timeSlot: "",
    consultationType: ""
  });

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.timeSlot || !formData.name || !formData.phone || !formData.consultationType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Consultation Booked!",
      description: `Your appointment with ${doctorName} is confirmed for ${format(date, "PPP")} at ${formData.timeSlot}`,
    });

    // Navigate to confirmation page after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <Card className="mb-6 bg-card/90 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/team')}
                className="h-10 w-10 mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <CardTitle className="text-2xl">Book Consultation</CardTitle>
                <p className="text-muted-foreground">Schedule an appointment with {doctorName}</p>
              </div>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Booking Form */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+250 xxx xxx xxx"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="consultationType">Consultation Type *</Label>
                    <Select value={formData.consultationType} onValueChange={(value) => setFormData({...formData, consultationType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Consultation</SelectItem>
                        <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                        <SelectItem value="emergency">Emergency Consultation</SelectItem>
                        <SelectItem value="pediatric">Pediatric Care</SelectItem>
                        <SelectItem value="womens-health">Women's Health</SelectItem>
                        <SelectItem value="mental-health">Mental Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      placeholder="Briefly describe your symptoms or reason for consultation"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Book Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            <div className="space-y-6">
              {/* Calendar */}
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Time Slots */}
              <Card className="bg-card/90 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Available Time Slots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={formData.timeSlot === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData({...formData, timeSlot: time})}
                        className="text-xs"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Summary */}
              {date && formData.timeSlot && (
                <Card className="bg-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Appointment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Doctor:</strong> {doctorName}</p>
                      <p><strong>Date:</strong> {format(date, "PPP")}</p>
                      <p><strong>Time:</strong> {formData.timeSlot}</p>
                      <p><strong>Type:</strong> {formData.consultationType}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;