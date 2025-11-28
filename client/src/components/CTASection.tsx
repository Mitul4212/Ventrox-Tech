import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export function CTASection({
  title = "Ready to Transform Your Business?",
  description = "Let's discuss how Ventrox Tech can help you achieve your digital goals. Get a free consultation with our experts.",
  primaryCta = "Get Started",
  primaryHref = "/contact",
  secondaryCta = "View Our Work",
  secondaryHref = "/portfolio",
}: CTASectionProps) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      data-testid="section-cta"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-chart-3/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Let's Build Something Amazing</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {title}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryHref}>
              <Button size="lg" className="min-w-[180px] group" data-testid="button-cta-primary">
                {primaryCta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={secondaryHref}>
              <Button size="lg" variant="outline" className="min-w-[180px]" data-testid="button-cta-secondary">
                {secondaryCta}
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
