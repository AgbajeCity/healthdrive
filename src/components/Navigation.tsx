import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cross, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Cross className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HealthDrive</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/services" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/services') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Our Services
            </Link>
            <Link 
              to="/ussd" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/ussd') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              USSD Services
            </Link>
            <Link
              to="/health-hubs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/health-hubs') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Health Hubs
            </Link>
            <Link
              to="/schedule"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/schedule') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Clinic Schedule
            </Link>
            <Link 
              to="/team" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/team') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Our Team
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Register/Log In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link 
              to="/services" 
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Services
            </Link>
            <Link 
              to="/ussd" 
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              USSD Services
            </Link>
            <Link
              to="/health-hubs"
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Health Hubs
            </Link>
            <Link
              to="/schedule"
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Clinic Schedule
            </Link>
            <Link 
              to="/team" 
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Team
            </Link>
            <Link 
              to="/contact" 
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Register/Log In</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;