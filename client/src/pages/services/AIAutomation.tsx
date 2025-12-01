import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Cpu, Network, BarChart } from "lucide-react";
import { Link } from "wouter";

export default function AIAutomation() {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="AI Automation & Machine Learning Solutions | VentroX Tech"
                description="Leverage the power of Artificial Intelligence. We provide custom AI automation, machine learning integration, and workflow optimization services."
                keywords={["AI Automation Agency", "Machine Learning Services", "Business Process Automation", "AI Consulting", "Custom AI Solutions"]}
                canonical="/services/ai-automation"
            />

            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-purple-500/10 to-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                            Future-Proof Your Business with AI Automation
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Unlock new levels of efficiency and innovation with our custom AI and Machine Learning solutions. Automate repetitive tasks and gain intelligent insights.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="text-lg px-8">Consult with AI Experts</Button>
                            </Link>
                            <Link href="/portfolio">
                                <Button size="lg" variant="outline" className="text-lg px-8">View Case Studies</Button>
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
                                <Bot className="w-10 h-10 text-purple-500 mb-2" />
                                <CardTitle>Intelligent Chatbots</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Custom AI chatbots powered by LLMs to enhance customer support and engagement.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Cpu className="w-10 h-10 text-purple-500 mb-2" />
                                <CardTitle>Process Automation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Automate complex workflows and reduce manual errors with intelligent agents.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Network className="w-10 h-10 text-purple-500 mb-2" />
                                <CardTitle>Predictive Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Use historical data to predict trends and make data-driven business decisions.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <BarChart className="w-10 h-10 text-purple-500 mb-2" />
                                <CardTitle>Data Processing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Automated extraction and processing of data from documents, images, and more.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2>Transform Operations with Artificial Intelligence</h2>
                    <p>
                        AI is no longer just a buzzword; it's a competitive necessity. VentroX Tech helps businesses integrate AI into their existing workflows to drive efficiency and innovation. We specialize in practical AI applications that deliver measurable ROI.
                    </p>
                    <p>
                        From automating customer service with advanced chatbots to optimizing supply chains with predictive models, our team of AI engineers builds solutions tailored to your specific challenges.
                    </p>
                    <h3>Our AI Capabilities</h3>
                    <ul>
                        <li><strong>Generative AI Solutions:</strong> Leveraging GPT and other LLMs for content generation and analysis.</li>
                        <li><strong>Computer Vision:</strong> Image and video analysis for quality control and security.</li>
                        <li><strong>NLP Services:</strong> Sentiment analysis, text classification, and language translation.</li>
                        <li><strong>Custom Model Training:</strong> Fine-tuning models on your proprietary data for specific tasks.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
