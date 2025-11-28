import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const inquiryTypes = [
  { value: "app-development", label: "App Development" },
  { value: "web-development", label: "Web Development" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "consulting", label: "Consulting" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@ventrox.tech",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri 9am-6pm PST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 Innovation Drive",
    description: "San Francisco, CA 94105",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Fri: 9AM - 6PM",
    description: "Weekend by appointment",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      inquiryType: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-20" data-testid="page-contact">
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground">
              Let's Build Something
              <span className="text-gradient"> Amazing Together</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Have a project in mind? We'd love to hear about it. 
              Get in touch and let's start the conversation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-background" data-testid="section-contact-form">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <Card className="border-border/50">
                  <CardContent className="p-8">
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">
                          Thank You!
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Your message has been sent successfully. We'll get back to you within 24 hours.
                        </p>
                        <Button onClick={() => setIsSubmitted(false)} data-testid="button-send-another">
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="John Doe"
                                      {...field}
                                      data-testid="input-name"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="john@company.com"
                                      {...field}
                                      data-testid="input-email"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Your Company"
                                      {...field}
                                      data-testid="input-company"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="inquiryType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Inquiry Type *</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger data-testid="select-inquiry-type">
                                        <SelectValue placeholder="Select a service" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {inquiryTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Message *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us about your project..."
                                    className="min-h-[150px] resize-none"
                                    {...field}
                                    data-testid="input-message"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={mutation.isPending}
                            data-testid="button-submit-contact"
                          >
                            {mutation.isPending ? (
                              "Sending..."
                            ) : (
                              <>
                                Send Message
                                <Send className="w-4 h-4 ml-2" />
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, index) => (
                <AnimatedSection key={info.title} delay={index * 100}>
                  <Card className="border-border/50" data-testid={`card-contact-${index}`}>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="text-primary font-medium mt-1">{info.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {info.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={400}>
                <Card className="border-border/50 overflow-hidden" data-testid="card-map">
                  <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Interactive map placeholder
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card" data-testid="section-faq">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity. A simple website might take 4-6 weeks, while a full-scale application could take 3-6 months. We provide detailed timelines during our discovery phase.",
              },
              {
                question: "What is your development process?",
                answer: "We follow an agile methodology with regular sprints and client check-ins. This ensures transparency, flexibility, and alignment with your evolving needs throughout the project.",
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes! We offer various support and maintenance packages to ensure your solution continues to perform optimally after launch. This includes bug fixes, updates, and feature enhancements.",
              },
              {
                question: "What technologies do you work with?",
                answer: "We work with a wide range of modern technologies including React, Node.js, Python, TensorFlow, AWS, and more. We select the best tech stack based on your specific requirements.",
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
