
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import type { PortfolioProject } from "@shared/schema";

export default function CaseStudy() {
    const params = useParams();
    const id = params.id;

    // Since we don't have a specific API for getting a single project by ID yet (except getPortfolioProject in storage),
    // we might need to fetch all and filter, or ensure the API supports /api/portfolio/:id.
    // Checking routes.ts, we don't have GET /api/portfolio/:id.
    // Wait, let me check routes.ts again.
    // I recall seeing GET /api/portfolio but not /:id.
    // Actually, I should check routes.ts to be sure.
    // If not, I'll add it or just fetch all and find. Fetching all is fine for now as there are few projects.

    const { data: projectsData, isLoading } = useQuery<any>({
        queryKey: ["/api/portfolio"],
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const projects = projectsData?.data || [];
    const project = projects.find((p: PortfolioProject) => p.id.toString() === id);

    if (!project) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
                    <Link href="/portfolio">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Portfolio
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            <section className="py-20 bg-gradient-hero relative overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <AnimatedSection>
                        <Link href="/portfolio">
                            <Button variant="ghost" size="sm" className="mb-6">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Portfolio
                            </Button>
                        </Link>

                        <Badge variant="secondary" className="mb-4">
                            {project.industry}
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            {project.title}
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                            {project.problem}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            <AnimatedSection delay={100}>
                                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {project.problem}
                                </p>
                            </AnimatedSection>

                            <AnimatedSection delay={200}>
                                <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {project.solution}
                                </p>
                            </AnimatedSection>

                            <AnimatedSection delay={300}>
                                <h2 className="text-2xl font-bold mb-4">Key Results</h2>
                                <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
                                    <p className="text-xl font-medium text-primary">
                                        {project.outcome}
                                    </p>
                                </div>
                            </AnimatedSection>
                        </div>

                        <div className="space-y-8">
                            <AnimatedSection delay={400}>
                                <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="font-semibold mb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech: string) => (
                                            <Badge key={tech} variant="outline" className="font-mono">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={500}>
                                <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="font-semibold mb-4">Services Delivered</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                                            <span>Custom Development</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                                            <span>UI/UX Design</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                                            <span>Quality Assurance</span>
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection
                title="Ready to Build Your Success Story?"
                description="Let's collaborate to create a solution that drives real results for your business."
                primaryCta="Start a Project"
                primaryHref="/contact"
                secondaryCta="View More Work"
                secondaryHref="/portfolio"
            />
        </div>
    );
}
