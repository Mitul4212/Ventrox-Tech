import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Ventrox Tech transformed our digital presence completely. Their expertise in AI automation saved us countless hours and significantly improved our customer experience.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechStart Inc.",
  },
  {
    id: "2",
    quote: "The team delivered our mobile app ahead of schedule with exceptional quality. Their attention to detail and understanding of our vision was remarkable.",
    author: "Michael Torres",
    role: "CEO",
    company: "HealthPlus",
  },
  {
    id: "3",
    quote: "Working with Ventrox was a game-changer for our e-commerce platform. Sales increased by 200% within the first quarter after launch.",
    author: "Emily Johnson",
    role: "Director of Digital",
    company: "LuxeRetail",
  },
];

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card
      className="group relative overflow-visible border-border/50"
      data-testid={`card-testimonial-${testimonial.id}`}
    >
      <CardContent className="p-6 relative">
        <Quote className="w-8 h-8 text-primary/20 mb-4" />
        
        <p className="text-muted-foreground leading-relaxed mb-6 italic">
          "{testimonial.quote}"
        </p>
        
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-border">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-foreground">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Ventrox Tech.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
