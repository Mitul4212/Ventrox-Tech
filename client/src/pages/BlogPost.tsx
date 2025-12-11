import { useParams, Link } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function BlogPost() {
    const params = useParams();
    const slug = params.slug;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
                <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
                <Link href="/blog">
                    <Button>Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={post.title}
                description={post.description}
                keywords={post.tags}
                image={post.image}
                type="article"
                canonical={`/blog/${post.slug}`}
            />

            <article className="min-h-screen pt-24 pb-20">
                {/* Hero Header */}
                <div className="bg-muted/30 border-b border-border/50 py-12 md:py-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        <div className="flex gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 mt-12">
                    {/* Featured Image */}
                    <AnimatedSection>
                        <div className="rounded-2xl overflow-hidden mb-12 shadow-2xl border border-border/50 aspect-video">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"; // Fallback image
                                }}
                            />
                        </div>
                    </AnimatedSection>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Share / Footer */}
                    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                        <p className="text-muted-foreground font-medium">Share this article:</p>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: post.title,
                                        text: post.description,
                                        url: window.location.href,
                                    });
                                }
                            }}>
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
