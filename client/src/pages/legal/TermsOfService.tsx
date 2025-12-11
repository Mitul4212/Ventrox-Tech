import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function TermsOfService() {
    return (
        <>
            <SEO
                title="Terms of Service"
                description="Terms of Service for VentroX Tech. Please read these terms carefully before using our services."
                canonical="/terms-of-service"
            />
            <div className="min-h-screen pt-20 pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <AnimatedSection>
                        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-muted-foreground mb-6">Last updated: January 2025</p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and VentroX Tech ("we," "us" or "our"), concerning your access to and use of our website and services.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">3. User Representations</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    By using the Site, you represent and warrant that:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li>All registration information you submit will be true, accurate, current, and complete.</li>
                                    <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                                    <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                                    <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms shall be governed by and defined following the laws of India. VentroX Tech and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                                </p>
                            </section>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </>
    );
}
