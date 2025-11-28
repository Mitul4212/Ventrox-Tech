import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceDetailCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { services } from "@shared/schema";
import { ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen pt-20" data-testid="page-services">
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground">
              Comprehensive
              <span className="text-gradient"> Digital Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              From concept to deployment, we provide end-to-end technology solutions 
              tailored to your unique business needs.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={200} className="flex justify-center mt-10">
            <div className="flex flex-wrap gap-4 justify-center">
              {services.map((service) => (
                <a key={service.id} href={`#${service.id}`}>
                  <Button variant="outline" size="sm" data-testid={`button-nav-${service.id}`}>
                    {service.title}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-background" data-testid="section-services-list">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 100}>
              <ServiceDetailCard service={service} />
              {index < services.length - 1 && (
                <div className="mt-16 border-b border-border" />
              )}
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-24 bg-card" data-testid="section-process-overview">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Our Development Process
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description: "We dive deep into understanding your business, goals, and challenges to create a tailored strategy.",
              },
              {
                step: "02",
                title: "Design & Architecture",
                description: "Our team crafts intuitive designs and robust technical architectures that scale with your business.",
              },
              {
                step: "03",
                title: "Development & Testing",
                description: "Agile development with continuous testing ensures high-quality, bug-free solutions.",
              },
              {
                step: "04",
                title: "Deployment & Launch",
                description: "Seamless deployment with thorough QA and performance optimization for a flawless launch.",
              },
              {
                step: "05",
                title: "Training & Handover",
                description: "Complete documentation and training to ensure your team can manage the solution effectively.",
              },
              {
                step: "06",
                title: "Support & Evolution",
                description: "Ongoing support and continuous improvements to keep your solution ahead of the curve.",
              },
            ].map((phase, index) => (
              <AnimatedSection key={phase.step} delay={index * 100}>
                <div className="relative p-6 rounded-xl bg-background border border-border/50">
                  <span className="text-5xl font-bold text-primary/10 absolute top-4 right-4">
                    {phase.step}
                  </span>
                  <h3 className="font-semibold text-lg mb-2 text-foreground relative">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative">
                    {phase.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Project?"
        description="Let's discuss how we can bring your vision to life with our comprehensive digital solutions."
        primaryCta="Get a Quote"
        primaryHref="/contact"
        secondaryCta="View Portfolio"
        secondaryHref="/portfolio"
      />
    </div>
  );
}
