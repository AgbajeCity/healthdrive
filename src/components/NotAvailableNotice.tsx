import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NotAvailableNoticeProps {
  /** Page heading. */
  title: string;
  /** Plain notice text. Must only state what HealthDrive can prove today. */
  notice: string;
  /** Route path, used for SEO canonical. */
  path: string;
}

/**
 * Plain "not available yet" page used for routes whose service does not exist.
 * Collects and submits nothing.
 */
const NotAvailableNotice = ({ title, notice, path }: NotAvailableNoticeProps) => (
  <div className="min-h-screen bg-gradient-hero">
    <Navigation />
    <Seo title={title} description={notice} path={path} />
    <a id="main" tabIndex={-1} className="sr-only">Main content</a>
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">{title}</h1>
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card-healthcare">
          <CardContent className="p-6 flex items-start gap-3" role="status">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-foreground">{notice}</p>
          </CardContent>
        </Card>
        <div className="flex justify-center mt-6">
          <Button asChild variant="outline">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default NotAvailableNotice;
