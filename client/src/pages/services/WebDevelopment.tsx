import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Code, Database, Layout } from "lucide-react";
import { Link } from "wouter";

export default function WebDevelopment() {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Custom Web Development & SaaS Solutions | VentroX Tech"
                description="Professional web development services using React, Next.js, and Node.js. We build high-performance B2B websites, SaaS platforms, and e-commerce solutions."
                keywords={["Web Development Company", "Custom SaaS Development", "Next.js Developers", "B2B Website Design", "Full Stack Development"]}
                canonical="/services/web-development"
            />

            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-blue-500/10 to-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                            Scalable Web Development for Modern Businesses
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            We build high-performance, secure, and scalable web applications that drive business growth. From simple websites to complex SaaS platforms.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="text-lg px-8">Get a Quote</Button>
                            </Link>
                            <Link href="/portfolio">
                                <Button size="lg" variant="outline" className="text-lg px-8">Our Portfolio</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader>
                                <Globe className="w-10 h-10 text-blue-500 mb-2" />
                                <CardTitle>Modern Tech Stack</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Built with React, Next.js, TypeScript, and Node.js for future-proof solutions.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Code className="w-10 h-10 text-blue-500 mb-2" />
                                <CardTitle>Clean Code</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Maintainable, documented, and efficient code that is easy to scale and debug.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Database className="w-10 h-10 text-blue-500 mb-2" />
                                <CardTitle>Robust Backend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Secure and scalable backend solutions using Node.js, Python, and cloud databases.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Layout className="w-10 h-10 text-blue-500 mb-2" />
                                <CardTitle>Responsive Design</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Pixel-perfect experiences across all devices, from desktops to mobile phones.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2>Enterprise-Grade Web Solutions</h2>
                    <p>
                        VentroX Tech is a leading web development company delivering custom web solutions to businesses worldwide. We understand that your website is often the first point of contact for your customers, and we ensure it makes a lasting impression.
                    </p>
                    <p>
                        Our expertise spans across various industries including FinTech, Healthcare, E-commerce, and Education. We leverage the latest technologies to build websites that are not only visually stunning but also highly functional and SEO-friendly.
                    </p>
                    <h3>Our Web Development Services</h3>
                    <ul>
                        <li><strong>Custom Web Application Development:</strong> Tailored solutions for unique business needs.</li>
                        <li><strong>SaaS Product Development:</strong> End-to-end development of scalable software-as-a-service products.</li>
                        <li><strong>E-commerce Solutions:</strong> Robust online stores with secure payment gateways.</li>
                        <li><strong>API Development & Integration:</strong> Seamless connectivity between your systems.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
