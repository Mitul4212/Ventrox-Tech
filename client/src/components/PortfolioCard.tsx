import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@shared/schema";

interface PortfolioCardProps {
  project: PortfolioProject;
  variant?: "default" | "featured";
}

const projectColors: Record<string, { gradient: string; accent: string }> = {
  fintech: { gradient: "from-blue-500/20 to-cyan-500/20", accent: "border-blue-500/30" },
  healthcare: { gradient: "from-emerald-500/20 to-teal-500/20", accent: "border-emerald-500/30" },
  ecommerce: { gradient: "from-purple-500/20 to-pink-500/20", accent: "border-purple-500/30" },
  logistics: { gradient: "from-orange-500/20 to-amber-500/20", accent: "border-orange-500/30" },
  education: { gradient: "from-indigo-500/20 to-violet-500/20", accent: "border-indigo-500/30" },
};

export function PortfolioCard({ project, variant = "default" }: PortfolioCardProps) {
  const colors = projectColors[project.image || "fintech"] || projectColors.fintech;

  if (variant === "featured") {
    return (
      <Card
        className="group relative overflow-visible hover:-translate-y-2 transition-all duration-400 border-border/50"
        data-testid={`card-portfolio-${project.id}`}
      >
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br",
          colors.gradient
        )} />
        <div className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 border-2",
          colors.accent
        )} />
        
        <CardContent className="p-0 relative">
          <div className={cn(
            "h-48 rounded-t-xl bg-gradient-to-br flex items-center justify-center",
            colors.gradient
          )}>
            <div className="w-32 h-24 rounded-lg bg-card/80 backdrop-blur border border-border flex items-center justify-center">
              <span className="font-mono text-xs text-muted-foreground">Preview</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="text-xs">
                {project.industry}
              </Badge>
              <Button variant="ghost" size="icon" className="w-8 h-8" data-testid={`button-view-${project.id}`}>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            
            <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {project.problem}
            </p>
            
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-muted text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-muted text-muted-foreground">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="group relative overflow-visible border-border/50"
      data-testid={`card-portfolio-full-${project.id}`}
    >
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          <div className={cn(
            "h-64 md:h-auto md:min-h-[300px] rounded-t-xl md:rounded-l-xl md:rounded-tr-none bg-gradient-to-br flex items-center justify-center",
            colors.gradient
          )}>
            <div className="w-48 h-32 rounded-lg bg-card/80 backdrop-blur border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">Project Preview</span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <Badge variant="secondary" className="mb-4">
              {project.industry}
            </Badge>
            
            <h3 className="font-bold text-2xl mb-4 text-foreground">
              {project.title}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Challenge</h4>
                <p className="text-sm text-muted-foreground">{project.problem}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Solution</h4>
                <p className="text-sm text-muted-foreground">{project.solution}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Results</h4>
                <p className="text-sm text-primary font-medium">{project.outcome}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <Button variant="ghost" className="group/btn p-0 h-auto text-primary">
              View Case Study
              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
