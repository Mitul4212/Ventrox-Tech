import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HeroBackground, FloatingShapes } from "@/components/HeroBackground";
import { ServiceCard } from "@/components/ServiceCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { TestimonialsSection } from "@/components/TestimonialCard";
import { TechStackSection } from "@/components/TechStackSection";
import { CTASection } from "@/components/CTASection";
import { services, portfolioProjects } from "@shared/schema";
import { ArrowRight, CheckCircle2, Zap, Shield, Users, Rocket } from "lucide-react";

const whyChooseUs = [
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "We deliver projects on time without compromising quality, using agile methodologies.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your data is protected with industry-leading security practices and compliance.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Work with experienced professionals who are committed to your success.",
  },
  {
    icon: Rocket,
    title: "Scalable Solutions",
    description: "Build for today, scale for tomorrow with our future-proof architecture.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroBackground />
        <FloatingShapes />
        
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Digital Innovation Experts</span>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Build the </span>
                <span className="text-gradient">Future</span>
                <br />
                <span className="text-foreground">of Your Business</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                We transform ideas into powerful digital experiences. From cutting-edge applications 
                to intelligent AI solutions, Ventrox Tech delivers innovation that drives results.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="min-w-[180px] group" data-testid="button-hero-start">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="min-w-[180px]" data-testid="button-hero-portfolio">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>50+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>98% Client Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background" data-testid="section-services-overview">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              What We Do Best
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end digital solutions that 
              help businesses thrive in the modern era.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 100}>
                <ServiceCard service={service} variant="compact" />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" className="group" data-testid="button-view-services">
                Explore All Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-muted/30" data-testid="section-why-choose-us">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              The Ventrox Advantage
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We're not just developers – we're your technology partners committed to your success.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <Card className="text-center border-border/50 h-full" data-testid={`card-why-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <TechStackSection />

      <section className="py-24 bg-background" data-testid="section-portfolio-preview">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Featured Projects
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Explore some of our recent success stories and see how we've helped 
              businesses achieve their digital goals.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.slice(0, 3).map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 100}>
                <PortfolioCard project={project} variant="featured" />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="group" data-testid="button-view-portfolio">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <TestimonialsSection />

      <CTASection />
    </div>
  );
}
