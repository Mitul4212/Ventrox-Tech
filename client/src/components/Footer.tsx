import { Link } from "wouter";
import { VentroxLogo } from "./VentroxLogo";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/contact" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "App Development", href: "/services#app-development" },
    { label: "Web Development", href: "/services#web-development" },
    { label: "AI Automation", href: "/services#ai-automation" },
    { label: "All Services", href: "/services" },
  ],
  resources: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/portfolio" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <VentroxLogo size="lg" />
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              Transforming businesses through innovative technology solutions.
              We build the future, one pixel at a time.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <Button variant="ghost" size="icon" data-testid="link-social-linkedin" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-twitter" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-github" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4" data-testid="text-footer-company-title">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4" data-testid="text-footer-services-title">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4" data-testid="text-footer-contact-title">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span data-testid="text-footer-email">mitul@ventroxtech.in</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span data-testid="text-footer-phone">+91 6354243008</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span data-testid="text-footer-address">1103, White Palace<br />Utran, Surat, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {new Date().getFullYear()} Ventrox Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer" data-testid="link-privacy-policy">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer" data-testid="link-terms-of-service">Terms of Service</span>
            <span className="hover:text-primary transition-colors cursor-pointer" data-testid="link-cookie-policy">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
