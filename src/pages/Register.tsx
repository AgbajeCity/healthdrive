import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cross, User, Lock, Mail, Eye, EyeOff, Loader2, Shield, CheckCircle, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign up with Google",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateStep1 = () => {
    if (!fullName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return false;
    }
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handleEmailSignUp = async () => {
    if (!agreed) {
      toast({
        title: "Error",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
          data: {
            full_name: fullName,
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account",
        });
        setStep(4); // Success step
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Let's get started</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      {/* Google Sign Up */}
      <Button 
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-10 h-12 bg-muted/50 border-border/50 focus:border-primary"
            required
          />
        </div>
        
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-muted/50 border-border/50 focus:border-primary"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create a secure password</h2>
        <p className="text-muted-foreground">Keep your account safe</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-12 bg-muted/50 border-border/50 focus:border-primary"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 pr-10 h-12 bg-muted/50 border-border/50 focus:border-primary"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CheckCircle className={`w-3 h-3 ${password.length >= 6 ? 'text-green-500' : 'text-muted-foreground'}`} />
            <span>At least 6 characters</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className={`w-3 h-3 ${password === confirmPassword && password.length > 0 ? 'text-green-500' : 'text-muted-foreground'}`} />
            <span>Passwords match</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Terms & Conditions</h2>
        <p className="text-muted-foreground">Please review and accept our terms</p>
      </div>

      <div className="bg-muted/30 rounded-lg p-4 max-h-48 overflow-y-auto">
        <h4 className="font-medium mb-2">HealthDrive Terms of Service</h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>By creating an account, you agree to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Provide accurate and truthful information</li>
            <li>Use the platform responsibly for healthcare purposes</li>
            <li>Respect other users and healthcare providers</li>
            <li>Keep your account credentials secure</li>
            <li>Follow all applicable laws and regulations</li>
          </ul>
          <p className="mt-3">
            <strong>Privacy:</strong> We protect your health information according to applicable privacy laws. 
            Your data will only be shared with authorized healthcare providers as needed for your care.
          </p>
          <p>
            <strong>Medical Disclaimer:</strong> This platform provides healthcare access tools but does not 
            replace professional medical judgment. Always consult qualified healthcare providers for medical decisions.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm text-foreground">
          I have read and agree to the Terms of Service and Privacy Policy
        </label>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Account Created Successfully!</h2>
        <p className="text-muted-foreground">
          We've sent a verification email to <strong>{email}</strong>
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-blue-700">
          <Mail className="w-5 h-5" />
          <span className="font-medium">Check Your Email</span>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          Click the verification link in your email to activate your account and continue to onboarding.
        </p>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={() => navigate('/auth')}
          className="w-full"
        >
          Go to Sign In
        </Button>
        
        <Button 
          onClick={() => {
            setStep(1);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setFullName("");
            setAgreed(false);
          }}
          variant="outline"
          className="w-full"
        >
          Create Another Account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Cross className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">HealthDrive</span>
          </div>
          
          {step < 4 && (
            <>
              <h1 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h1>
              <p className="text-foreground/80">Join thousands getting better healthcare access</p>
            </>
          )}
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > num ? <CheckCircle className="w-4 h-4" /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > num ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Registration Form */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
          <CardContent className="p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between pt-6">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="w-24"
                  >
                    Back
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button variant="outline" className="w-24">
                      Sign In
                    </Button>
                  </Link>
                )}
                
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="w-24"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleEmailSignUp}
                    disabled={loading || !agreed}
                    className="w-32"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Home */}
        {step < 4 && (
          <div className="text-center pt-4">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;