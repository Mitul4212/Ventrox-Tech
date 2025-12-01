import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Layers, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

export default function AppDevelopment() {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Custom Mobile App Development Services (iOS & Android)"
                description="Expert mobile app development company for iOS, Android, and React Native. We build scalable, secure, and user-centric mobile solutions for global enterprises."
                keywords={["Mobile App Development India", "iOS App Developers", "Android App Development", "React Native Agency", "Enterprise Mobility Solutions"]}
                canonical="/services/app-development"
            />

            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            End-to-End Mobile Application Development Services
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Transform your business ideas into powerful mobile experiences. We build native and cross-platform apps that users love and businesses rely on.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="text-lg px-8">Start Your Project</Button>
                            </Link>
                            <Link href="/portfolio">
                                <Button size="lg" variant="outline" className="text-lg px-8">View Our Work</Button>
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
                                <Smartphone className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>Native & Cross-Platform</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Expertise in Swift, Kotlin, React Native, and Flutter for optimal performance across all devices.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Layers className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>Scalable Architecture</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Built to grow with your user base, ensuring consistent performance under high load.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Shield className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>Enterprise Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Bank-grade security protocols to protect sensitive user data and ensure compliance.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Zap className="w-10 h-10 text-primary mb-2" />
                                <CardTitle>High Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Optimized for speed and responsiveness to provide the best possible user experience.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2>Why Choose VentroX Tech for Mobile App Development?</h2>
                    <p>
                        In today's mobile-first world, having a robust mobile application is crucial for business success. At VentroX Tech, we combine technical expertise with creative design to deliver apps that stand out in the crowded marketplace.
                    </p>
                    <p>
                        Our team of seasoned developers in Gujarat, India, works with global clients to deliver cost-effective, high-quality mobile solutions. Whether you need a complex enterprise app or a consumer-facing startup MVP, we have the skills and experience to bring your vision to life.
                    </p>
                    <h3>Our Development Process</h3>
                    <ul>
                        <li><strong>Discovery & Strategy:</strong> We understand your goals and target audience.</li>
                        <li><strong>UI/UX Design:</strong> Creating intuitive and engaging interfaces.</li>
                        <li><strong>Development:</strong> Agile development with regular updates.</li>
                        <li><strong>Testing & QA:</strong> Rigorous testing on multiple devices.</li>
                        <li><strong>Deployment & Support:</strong> Smooth launch and ongoing maintenance.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
