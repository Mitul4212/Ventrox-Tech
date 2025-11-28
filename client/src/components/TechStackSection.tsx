import { AnimatedSection } from "./AnimatedSection";
import { SiReact, SiNodedotjs, SiTypescript, SiPython, SiTensorflow, SiAmazon, SiDocker, SiMongodb, SiPostgresql, SiFlutter, SiSwift, SiKotlin } from "react-icons/si";

const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "AWS", icon: SiAmazon, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Swift", icon: SiSwift, color: "#F05138" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
];

export function TechStackSection() {
  return (
    <section className="py-24 bg-card" data-testid="section-tech-stack">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Technology Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Built with Modern Technologies
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We leverage cutting-edge technologies to deliver robust, scalable, and future-proof solutions.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <AnimatedSection
              key={tech.name}
              delay={index * 50}
              className="group"
            >
              <div
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                data-testid={`tech-${tech.name.toLowerCase()}`}
              >
                <tech.icon
                  className="w-8 h-8 transition-colors duration-300"
                  style={{ color: tech.color }}
                />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
