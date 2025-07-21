import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ayomideImage from "@/assets/ayomide-agbaje.jpg";
import jadeImage from "@/assets/jade-tuzinde.jpg";
import inezaImage from "@/assets/ineza-agape.jpg";

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorName = searchParams.get('doctor') || 'Health Specialist';
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      text: `Hello! I'm ${doctorName}. How can I help you today?`,
      time: '10:30 AM'
    }
  ]);

  const getDoctorImage = (name: string) => {
    if (name.includes('AYOMIDE')) return ayomideImage;
    if (name.includes('JADE')) return jadeImage;
    if (name.includes('INEZA')) return inezaImage;
    return ayomideImage;
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that. Can you tell me more about your symptoms?",
        "I understand your concern. Let me help you with that.",
        "Based on what you've described, I'd recommend the following steps...",
        "That's a great question. Here's what I suggest..."
      ];
      
      const doctorResponse = {
        id: messages.length + 2,
        sender: 'doctor',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, doctorResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Chat Header */}
          <Card className="mb-6 bg-card/90 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/team')}
                  className="h-10 w-10"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={getDoctorImage(doctorName)} alt={doctorName} />
                  <AvatarFallback>{doctorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{doctorName}</CardTitle>
                  <p className="text-sm text-green-500 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Messages */}
          <Card className="mb-6 bg-card/90 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="h-96 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="text-xs">Book</span>
                  <span className="text-xs">Appointment</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="text-xs">Emergency</span>
                  <span className="text-xs">Contact</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="text-xs">Health</span>
                  <span className="text-xs">Records</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col">
                  <span className="text-xs">Medication</span>
                  <span className="text-xs">Reminder</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;