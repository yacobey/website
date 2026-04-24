import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { BlogPost } from "@shared/schema";

export default function BlogPreview() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const handleViewAllPosts = () => {
    trackEvent('click', { action: 'view_all_posts', section: 'blog_preview' });
  };

  const handleReadArticle = (slug: string) => {
    trackEvent('click', { action: 'read_article', section: 'blog_preview', article: slug });
  };

  const latestPosts = posts?.slice(0, 3) || [];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-xl text-slate-gray">Stay informed with expert tax and financial advice</p>
          </div>
          <Link href="/blog">
            <Button 
              variant="link"
              onClick={handleViewAllPosts}
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              View All Posts <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 animate-pulse mb-3" />
                  <div className="h-6 bg-gray-200 animate-pulse mb-3" />
                  <div className="h-16 bg-gray-200 animate-pulse mb-4" />
                  <div className="h-4 bg-gray-200 animate-pulse w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : latestPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
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
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                    <Link 
                      href={`/blog/${post.slug}`}
                      onClick={() => handleReadArticle(post.slug)}
                      className="line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-gray mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => handleReadArticle(post.slug)}
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
  );
}
