import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { useBusinessConfig } from "@/hooks/useBusinessConfig";
import type { BlogPost } from "@shared/schema";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: businessConfig } = useBusinessConfig();
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
  });

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-16 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-slate-gray mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-16">
        {isLoading ? (
          <div className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="h-8 bg-gray-200 animate-pulse mb-4" />
              <div className="h-12 bg-gray-200 animate-pulse mb-6" />
              <div className="h-4 bg-gray-200 animate-pulse mb-8" />
              <div className="h-64 bg-gray-200 animate-pulse mb-8" />
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        ) : post ? (
          <>
            <Helmet>
              <title>{post.title} | Selam CPA Financial Insights</title>
              <meta name="description" content={post.excerpt} />
              <link rel="canonical" href={`${businessConfig?.seo.domain}/blog/${post.slug}`} />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={post.title} />
              <meta property="og:description" content={post.excerpt} />
              <meta property="og:url" content={`${businessConfig?.seo.domain}/blog/${post.slug}`} />
              <meta property="og:image" content={businessConfig?.seo.socialImage} />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:title" content={post.title} />
              <meta name="twitter:description" content={post.excerpt} />
            </Helmet>
            <article className="py-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <Link href="/blog">
                <Button variant="outline" className="mb-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              
              <div className="mb-8">
                <Badge variant="secondary" className="mb-4">
                  {post.category}
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-charcoal">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-6 text-slate-gray">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </div>
              
              <img
                src={`https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600`}
                alt={post.title}
                className="w-full h-64 lg:h-96 object-cover rounded-xl mb-8"
              />
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-gray mb-8 font-medium">
                  {post.excerpt}
                </p>
                
                <div className="text-charcoal whitespace-pre-line">
                  {post.content}
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark">
                    Schedule a Consultation
                  </Button>
                </Link>
              </div>
              </div>
            </article>
          </>
        ) : null}
      </div>
      
      <Footer />
    </div>
  );
}
