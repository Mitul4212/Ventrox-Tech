import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function CookiePolicy() {
    return (
        <>
            <SEO
                title="Cookie Policy"
                description="Cookie Policy for VentroX Tech. Understand how we use cookies to improve your experience."
                canonical="/cookie-policy"
            />
            <div className="min-h-screen pt-20 pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <AnimatedSection>
                        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-muted-foreground mb-6">Last updated: January 2025</p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                    <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
                                    <li><strong>Analytics Cookies:</strong> We use these to understand how visitors interact with our website.</li>
                                    <li><strong>Functionality Cookies:</strong> These allow the website to remember choices you make.</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">3. Disabling Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">4. More Information</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Hopefully that has clarified things for you. If there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
                                </p>
                            </section>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </>
    );
}
