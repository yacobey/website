import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle,
  Copy,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function IndexingStatus() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { data: sitemapData, refetch: refetchSitemap } = useQuery({
    queryKey: ['/api/sitemap'],
    refetchInterval: false,
  });

  const { data: robotsData, refetch: refetchRobots } = useQuery({
    queryKey: ['/api/robots'],
    refetchInterval: false,
  });

  const currentDomain = window.location.origin;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const checkIndexingSteps = [
    {
      title: "Domain Setup",
      status: currentDomain.includes('.replit.app') ? 'warning' : 'success',
      description: currentDomain.includes('.replit.app') 
        ? "You're on a Replit domain. For better SEO, consider getting a custom domain."
        : "You have a custom domain set up!",
      action: currentDomain.includes('.replit.app') 
        ? "Get a custom domain from GoDaddy, Namecheap, or similar providers"
        : null
    },
    {
      title: "Robots.txt",
      status: robotsData ? 'success' : 'error',
      description: robotsData 
        ? "Robots.txt is properly configured and accessible"
        : "Robots.txt not found or has errors",
      action: !robotsData ? "Check your robots.txt configuration" : null
    },
    {
      title: "Sitemap.xml", 
      status: sitemapData ? 'success' : 'error',
      description: sitemapData
        ? "Sitemap is generated and contains your pages"
        : "Sitemap not found or has errors",
      action: !sitemapData ? "Check your sitemap generation" : null
    },
    {
      title: "Search Console",
      status: 'warning',
      description: "Submit your sitemap to Google Search Console for faster indexing",
      action: "Add property in Google Search Console and submit sitemap"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Website Indexing Status
                </h1>
                <p className="text-xl text-gray-600">
                  Check your website's search engine visibility and indexing status
                </p>
              </div>

              {/* Current Domain Info */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Current Domain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-lg">{currentDomain}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {currentDomain.includes('.replit.app') 
                          ? "Replit development domain" 
                          : "Custom domain"}
                      </p>
                    </div>
                    <Badge variant={currentDomain.includes('.replit.app') ? 'secondary' : 'default'}>
                      {currentDomain.includes('.replit.app') ? 'Development' : 'Production'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Indexing Checklist */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Indexing Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {checkIndexingSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="mt-1">
                        {step.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {step.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                        {step.status === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        {step.action && (
                          <p className="text-sm text-blue-600 mt-2">
                            <strong>Action needed:</strong> {step.action}
                          </p>
                        )}
                      </div>
                      <Badge variant={
                        step.status === 'success' ? 'default' :
                        step.status === 'warning' ? 'secondary' : 'destructive'
                      }>
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* SEO Files */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Robots.txt</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchRobots()}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`${currentDomain}/robots.txt`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View File
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`${currentDomain}/robots.txt`)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copied ? 'Copied!' : 'Copy URL'}
                        </Button>
                      </div>
                      {robotsData && (
                        <div className="bg-gray-50 p-3 rounded text-sm font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                          {robotsData.content?.substring(0, 200)}...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Sitemap.xml</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchSitemap()}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`${currentDomain}/sitemap.xml`, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View File
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(`${currentDomain}/sitemap.xml`)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copied ? 'Copied!' : 'Copy URL'}
                        </Button>
                      </div>
                      {sitemapData && (
                        <div className="bg-gray-50 p-3 rounded text-sm font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                          {sitemapData.content?.substring(0, 200)}...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Next Steps */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Why your site might not be indexed:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Your sitemap points to selamcpa.com but you're on a Replit domain</li>
                    <li>Search engines need time (days to weeks) to discover and index new sites</li>
                    <li>You need to submit your sitemap to Google Search Console</li>
                    <li>A custom domain significantly improves indexing speed and SEO</li>
                  </ul>
                  
                  <div className="mt-4">
                    <strong>Immediate actions:</strong>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                      <li>Get a custom domain (optional but recommended)</li>
                      <li>Submit your sitemap to Google Search Console</li>
                      <li>Create quality content and internal links</li>
                      <li>Be patient - indexing takes time</li>
                    </ol>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}