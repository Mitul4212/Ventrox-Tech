import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { Globe, Clock, ShieldCheck, DollarSign } from "lucide-react";

const REGIONS = {
    usa: {
        title: "Software Development Partner for USA Businesses",
        description: "Trusted offshore software development partner for US startups and enterprises. High-quality code, time-zone aligned communication, and cost-effective solutions.",
        h1: "Premier Technology Partner for American Enterprises",
        currency: "USD",
        timezone: "EST/PST",
        flag: "🇺🇸"
    },
    uk: {
        title: "Software Development Company for UK Clients",
        description: "Leading software development agency serving UK businesses. GDPR compliant, London time-zone overlap, and British quality standards.",
        h1: "Digital Innovation Partner for UK Businesses",
        currency: "GBP",
        timezone: "GMT/BST",
        flag: "🇬🇧"
    },
    uae: {
        title: "IT Solutions & App Development in UAE",
        description: "Top-rated software company serving Dubai, Abu Dhabi, and UAE. Arabic localization support and on-site consultation available.",
        h1: "Transforming UAE Businesses with Digital Excellence",
        currency: "AED",
        timezone: "GST",
        flag: "🇦🇪"
    }
};

export default function GlobalLanding() {
    const [match, params] = useRoute("/global/:region");
    const regionKey = (params?.region || "usa").toLowerCase() as keyof typeof REGIONS;
    const content = REGIONS[regionKey] || REGIONS.usa;

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={`${content.title} | VentroX Tech`}
                description={content.description}
                keywords={[`Software Development ${content.flag}`, `Offshore Development ${regionKey.toUpperCase()}`, "Hire Developers India"]}
                canonical={`/global/${regionKey}`}
            />

            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-6xl mb-4 block">{content.flag}</span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            {content.h1}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            VentroX Tech bridges the gap between global ambition and technical execution. We provide world-class software development services tailored for the {regionKey.toUpperCase()} market.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="text-lg px-8">Schedule a Call ({content.timezone})</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 border rounded-lg bg-card">
                        <Clock className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Timezone Aligned</h3>
                        <p className="text-muted-foreground">We adjust our working hours to overlap with {content.timezone}, ensuring seamless communication and collaboration.</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card">
                        <DollarSign className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Cost Effective</h3>
                        <p className="text-muted-foreground">Save up to 60% on development costs compared to local hiring in {regionKey.toUpperCase()} without compromising on quality.</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card">
                        <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Global Standards</h3>
                        <p className="text-muted-foreground">We follow international coding standards, GDPR compliance, and rigorous QA processes.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
