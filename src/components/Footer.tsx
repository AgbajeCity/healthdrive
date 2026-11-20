import { Link } from "react-router-dom";

/**
 * Site footer. Kept identical to the markup that was inline on the home page,
 * plus the Privacy Notice link.
 */
const Footer = () => (
  <footer className="py-8 bg-card/10 backdrop-blur-sm" role="contentinfo">
    <div className="container mx-auto px-4 text-center">
      <p className="text-xl font-bold text-primary">HealthDrive</p>
      <p className="text-sm text-muted-foreground">
        A planned primary healthcare model for refugee and rural communities, starting in Rwanda.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        HealthDrive Technologies LTD · Registered in Rwanda · Company Code / TIN 156795747 · Kigali
      </p>
      <p className="text-xs mt-3">
        <Link
          to="/privacy"
          className="text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          Privacy Notice
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
