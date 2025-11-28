import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Target, Eye, Heart, Lightbulb, Users, Award, Rocket, Code } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We push boundaries and embrace new technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "Your success is our success. We work as an extension of your team.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards in everything we create and deliver.",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "We love what we do, and it shows in every project we undertake.",
  },
];

const team = [
  { name: "Alex Rivera", role: "CEO & Founder", initials: "AR" },
  { name: "Jordan Lee", role: "CTO", initials: "JL" },
  { name: "Sam Patel", role: "Design Director", initials: "SP" },
  { name: "Morgan Chen", role: "Lead Developer", initials: "MC" },
  { name: "Taylor Kim", role: "AI Specialist", initials: "TK" },
  { name: "Casey Brooks", role: "Project Manager", initials: "CB" },
];

const milestones = [
  { year: "2019", title: "Founded", description: "Ventrox Tech was born from a vision to transform digital experiences." },
  { year: "2020", title: "First Major Client", description: "Partnered with Fortune 500 company for enterprise solution." },
  { year: "2021", title: "AI Division Launch", description: "Expanded services to include AI and machine learning solutions." },
  { year: "2022", title: "Global Expansion", description: "Opened offices in Europe and Asia to serve clients worldwide." },
  { year: "2023", title: "50+ Projects", description: "Reached milestone of 50+ successful project deliveries." },
  { year: "2024", title: "Innovation Award", description: "Recognized as Top Tech Innovator by Industry Leaders." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20" data-testid="page-about">
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground">
              Building Tomorrow's
              <span className="text-gradient"> Digital World</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Ventrox Tech is a team of passionate technologists, designers, and strategists 
              dedicated to transforming businesses through innovative digital solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-background" data-testid="section-mission-vision">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <Card className="h-full border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />
                <CardContent className="p-8 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower businesses of all sizes with cutting-edge technology solutions that drive 
                    growth, efficiency, and competitive advantage. We believe in making advanced technology 
                    accessible and impactful for every organization we partner with.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <Card className="h-full border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent" />
                <CardContent className="p-8 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the global leader in digital transformation, recognized for our innovative 
                    solutions, exceptional talent, and unwavering commitment to client success. We 
                    envision a world where technology seamlessly enhances every aspect of business.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card" data-testid="section-story">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
                From Vision to Reality
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ventrox Tech was founded in 2019 with a simple yet powerful belief: technology 
                  should be a catalyst for growth, not a barrier. Our founders, experienced 
                  technologists with decades of combined experience, saw an opportunity to bridge 
                  the gap between innovative technology and practical business solutions.
                </p>
                <p>
                  What started as a small team of five passionate developers has grown into a 
                  thriving company with experts across application development, web technologies, 
                  and artificial intelligence. We've helped startups launch their first products 
                  and enterprises transform their digital infrastructure.
                </p>
                <p>
                  Today, we continue to push the boundaries of what's possible, always with our 
                  clients' success at the heart of everything we do.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-gradient mb-2">50+</div>
                    <p className="text-sm text-muted-foreground">Projects Completed</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-gradient mb-2">98%</div>
                    <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-gradient mb-2">25+</div>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-gradient mb-2">12</div>
                    <p className="text-sm text-muted-foreground">Countries Served</p>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              What Drives Us
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our core values shape every decision we make and every solution we deliver.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <Card className="text-center border-border/50 h-full" data-testid={`card-value-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30" id="team" data-testid="section-team">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Meet the Experts
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              A talented team of developers, designers, and strategists passionate about technology.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 50}>
                <Card className="border-border/50 text-center" data-testid={`card-team-${index}`}>
                  <CardContent className="p-6">
                    <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-medium">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-sm text-foreground">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background" data-testid="section-timeline">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Key Milestones
            </h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection
                  key={milestone.year}
                  delay={index * 100}
                  animation={index % 2 === 0 ? "slide-left" : "slide-right"}
                >
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <Card className="inline-block border-border/50">
                        <CardContent className="p-6">
                          <span className="text-primary font-mono text-sm">{milestone.year}</span>
                          <h3 className="font-bold text-lg mt-1 text-foreground">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground mt-2">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    
                    <div className="flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Join Our Journey"
        description="Want to be part of something extraordinary? We're always looking for talented individuals to join our team."
        primaryCta="Get in Touch"
        primaryHref="/contact"
        secondaryCta="View Careers"
        secondaryHref="/contact"
      />
    </div>
  );
}
