import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTASection } from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Loader2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

function BlogList() {
  const { data, isLoading } = useQuery<{ success: boolean; data: BlogPost[] }>({
    queryKey: ["/api/blog"],
  });

  const posts = data?.data || [];

  return (
    <div className="min-h-screen pt-20" data-testid="page-blog">
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground">
              Tech Insights
              <span className="text-gradient"> & Updates</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Stay up to date with the latest trends in technology, digital innovation, 
              and insights from our team of experts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 100}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group cursor-pointer hover:-translate-y-2 transition-all duration-300 border-border/50 h-full" data-testid={`card-blog-${post.id}`}>
                      <CardContent className="p-0">
                        <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-xl flex items-center justify-center">
                          <div className="w-24 h-16 rounded-lg bg-card/80 backdrop-blur border border-border flex items-center justify-center">
                            <span className="font-mono text-xs text-muted-foreground">{post.category}</span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                          
                          <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Want to Learn More?"
        description="Subscribe to our newsletter for the latest tech insights and updates."
        primaryCta="Contact Us"
        primaryHref="/contact"
        secondaryCta="View Services"
        secondaryHref="/services"
      />
    </div>
  );
}

function BlogPostPage({ slug }: { slug: string }) {
  const { data, isLoading } = useQuery<{ success: boolean; data: BlogPost }>({
    queryKey: ["/api/blog", slug],
  });

  const post = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="page-blog-notfound">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" data-testid="page-blog-post">
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Recent"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{Math.ceil(post.content.length / 1000)} min read</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {post.content}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        title="Interested in Our Services?"
        description="Let's discuss how Ventrox Tech can help bring your ideas to life."
        primaryCta="Get in Touch"
        primaryHref="/contact"
        secondaryCta="Explore Services"
        secondaryHref="/services"
      />
    </div>
  );
}

export default function Blog() {
  const params = useParams();
  const slug = params.slug;

  if (slug) {
    return <BlogPostPage slug={slug} />;
  }

  return <BlogList />;
}
