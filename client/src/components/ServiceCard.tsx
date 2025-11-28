import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Globe, Brain, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@shared/schema";

const iconMap: Record<string, typeof Smartphone> = {
  Smartphone,
  Globe,
  Brain,
};

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact";
}

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Globe;

  if (variant === "compact") {
    return (
      <Link href={`/services#${service.id}`}>
        <Card
          className="group relative overflow-visible hover:-translate-y-2 transition-all duration-400 cursor-pointer border-border/50"
          data-testid={`card-service-${service.id}`}
        >
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 border-2 border-primary/20" />
          
          <CardContent className="p-6 relative">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:glow-blue transition-shadow duration-400">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.shortDescription}
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card
      className="group relative overflow-visible hover:-translate-y-2 transition-all duration-400 border-border/50"
      data-testid={`card-service-full-${service.id}`}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 border-2 border-primary/20" />
      
      <CardContent className="p-8 relative">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:glow-blue transition-shadow duration-400">
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <h3 className="font-bold text-xl mb-3 text-foreground">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {service.fullDescription}
        </p>
        
        <div className="space-y-2 mb-6">
          {service.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <Link href={`/services#${service.id}`}>
          <Button variant="ghost" className="group/btn p-0 h-auto text-primary">
            Learn More
            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

interface ServiceDetailCardProps {
  service: Service;
}

export function ServiceDetailCard({ service }: ServiceDetailCardProps) {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <section
      id={service.id}
      className="scroll-mt-24"
      data-testid={`section-service-${service.id}`}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-blue">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {service.fullDescription}
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Features</h3>
            <div className="grid gap-3">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-xs font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-md bg-card border border-border text-sm font-mono text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-8 text-foreground text-center">Our Process</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {service.process.map((step) => (
            <div
              key={step.step}
              className="relative text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3 text-white font-bold">
                {step.step}
              </div>
              <h4 className="font-semibold text-sm mb-1 text-foreground">{step.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
