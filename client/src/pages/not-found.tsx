import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, Mail } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden pt-20" data-testid="page-not-found">
      <SEO
        title="Page Not Found | VentroX Tech"
        description="The page you are looking for does not exist. Explore our services or contact us for assistance."
        type="website"
      />

      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <div className="text-8xl font-bold text-primary/20 mb-6">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Here are some helpful links to get you back on track.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          <Link href="/services/app-development">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Search className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">App Development</div>
                  <div className="text-xs text-muted-foreground">Build mobile apps</div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/services/ai-automation">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Search className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">AI Automation</div>
                  <div className="text-xs text-muted-foreground">Automate workflows</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="min-w-[160px]" data-testid="button-go-home">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="min-w-[160px]">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
