import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Financial Insights & Tax Tips Blog | Lenox CPA</title>
        <meta name="description" content="Expert financial insights, tax tips, and accounting strategies from certified CPAs. Stay informed with the latest tax law changes and financial planning advice." />
        <meta name="keywords" content="tax tips, financial insights, accounting blog, CPA advice, tax law changes, financial planning" />
        <meta property="og:title" content="Financial Insights & Tax Tips Blog | Lenox CPA" />
        <meta property="og:description" content="Expert financial insights and tax tips from certified CPAs. Latest tax law changes and financial planning strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lenoxcpa.com/blog" />
        <meta property="og:site_name" content="Lenox CPA" />
        <meta property="og:image" content="https://lenoxcpa.com/og-image-blog.jpg" />
        <meta property="og:image:alt" content="Lenox CPA Financial Insights Blog" />
        <meta name="twitter:image" content="https://lenoxcpa.com/og-image-blog.jpg" />
        <link rel="canonical" href="https://lenoxcpa.com/blog" />
      </Helmet>
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Expert Financial Insights
              </h1>
              <p className="text-xl text-blue-100">
                Stay informed with the latest tax tips, financial strategies, and industry insights from our CPA experts.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-48 bg-gray-200 animate-pulse" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 animate-pulse mb-4" />
                      <div className="h-6 bg-gray-200 animate-pulse mb-3" />
                      <div className="h-20 bg-gray-200 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={`https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300`}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-gray mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                      
                      <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`} className="line-clamp-2">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-slate-gray mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-gray text-lg">No blog posts available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
