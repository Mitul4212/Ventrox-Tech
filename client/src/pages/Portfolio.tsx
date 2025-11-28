import { AnimatedSection } from "@/components/AnimatedSection";
import { PortfolioCard } from "@/components/PortfolioCard";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PortfolioProject } from "@shared/schema";
import { Loader2 } from "lucide-react";

const industries = ["All", "FinTech", "Healthcare", "E-commerce", "Logistics", "EdTech"];

export default function Portfolio() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const { data: projectsData, isLoading } = useQuery<{ success: boolean; data: PortfolioProject[] }>({
    queryKey: ["/api/portfolio"],
  });

  const projects = projectsData?.data || [];
  const filteredProjects = selectedIndustry === "All"
    ? projects
    : projects.filter((p) => p.industry === selectedIndustry);

  return (
    <div className="min-h-screen pt-20" data-testid="page-portfolio">
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground">
              Success Stories
              <span className="text-gradient"> & Case Studies</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Explore our portfolio of successful projects across various industries. 
              Each case study showcases our expertise in delivering impactful digital solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-card border-b border-border" data-testid="section-portfolio-filter">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(industry)}
                data-testid={`button-filter-${industry.toLowerCase()}`}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background" data-testid="section-portfolio-grid">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-12">
              {filteredProjects.map((project, index) => (
                <AnimatedSection key={project.id} delay={index * 100}>
                  <PortfolioCard project={project} variant="default" />
                </AnimatedSection>
              ))}
            </div>
          )}

          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-muted/30" data-testid="section-industries">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Industries We Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Cross-Industry Expertise
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We've delivered successful projects across diverse industries, each with unique challenges and requirements.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "FinTech", count: 12 },
              { name: "Healthcare", count: 8 },
              { name: "E-commerce", count: 15 },
              { name: "Logistics", count: 6 },
              { name: "EdTech", count: 9 },
              { name: "Real Estate", count: 5 },
              { name: "Manufacturing", count: 4 },
              { name: "Hospitality", count: 7 },
              { name: "Insurance", count: 3 },
              { name: "Non-Profit", count: 6 },
            ].map((industry, index) => (
              <AnimatedSection key={industry.name} delay={index * 50}>
                <div className="p-6 rounded-xl bg-card border border-border/50 text-center hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.count} projects</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "35+", label: "Happy Clients" },
              { value: "12", label: "Countries" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a Project in Mind?"
        description="Let's discuss how we can help you achieve similar results for your business."
        primaryCta="Start a Project"
        primaryHref="/contact"
        secondaryCta="Learn About Services"
        secondaryHref="/services"
      />
    </div>
  );
}
