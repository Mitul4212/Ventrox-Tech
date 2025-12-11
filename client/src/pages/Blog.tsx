import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "wouter";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { blogPosts } from "@/lib/blog-data";

export default function Blog() {
  return (
    <>
      <SEO
        title="Tech Insights & Industry Trends"
        description="Explore the latest insights on software development, AI automation, and tech trends from the VentroX Tech team. Expert guides and case studies."
        keywords={["tech blog", "software development blog", "AI trends", "VentroX Tech Blog"]}
        canonical="/blog"
      />

      <div className="min-h-screen pt-20">
        <section className="py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <AnimatedSection className="max-w-3xl mx-auto text-center">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Our Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground">
                Insights & <span className="text-gradient">Tech Trends</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed max-w-2xl mx-auto">
                Deep dives into software architecture, AI automation, and the future of technology from our engineering team.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <AnimatedSection key={post.slug} delay={index * 100}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <article className="group h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col relative z-0">
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <picture className="w-full h-full">
                          {post.image?.match(/\.(png|jpg|jpeg)$/) && (
                            <source srcSet={post.image.replace(/\.(png|jpg|jpeg)$/, ".webp")} type="image/webp" />
                          )}
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"; // Fallback image
                            }}
                          />
                        </picture>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                          {post.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                              <User className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-xs font-medium">{post.author}</span>
                          </div>

                          <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
