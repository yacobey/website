import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth, getAdminAuthHeader } from "@/hooks/useAuth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface PageStatus {
  page: string;
  metaRobots: string;
  isIndexable: boolean;
  httpHeader: string;
}

export default function IndexingControl() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation('/admin-login');
    }
  }, [isAuthenticated, authLoading, setLocation]);

  const { data: seoData, isLoading } = useQuery<Array<{ page: string; metaRobots: string | null }>>({
    queryKey: ["/api/seo-data"],
    enabled: isAuthenticated,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ page, metaRobots }: { page: string; metaRobots: string }) => {
      const response = await fetch(`/api/seo-data/${page}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAdminAuthHeader() },
        body: JSON.stringify({ metaRobots }),
      });
      if (!response.ok) throw new Error("Failed to update");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo-data"] });
      toast({
        title: "Success",
        description: "Page indexing settings updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update indexing settings",
        variant: "destructive",
      });
    },
  });

  const bulkUpdateMutation = useMutation({
    mutationFn: async (action: 'index' | 'noindex') => {
      const updates = seoData?.map((page: any) => ({
        page: page.page,
        metaRobots: action === 'index' ? 'index, follow' : 'noindex, nofollow'
      }));

      for (const update of updates || []) {
        const response = await fetch(`/api/seo-data/${update.page}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAdminAuthHeader() },
          body: JSON.stringify({ metaRobots: update.metaRobots }),
        });
        if (!response.ok) throw new Error("Failed to update page " + update.page);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo-data"] });
      toast({
        title: "Success",
        description: "All pages updated successfully!",
      });
    },
  });

  const getPageStatus = (page: any): PageStatus => {
    const metaRobots = page.metaRobots || 'index, follow';
    const isIndexable = !metaRobots.includes('noindex');
    
    return {
      page: page.page,
      metaRobots,
      isIndexable,
      httpHeader: metaRobots,
    };
  };

  const getStatusIcon = (isIndexable: boolean) => {
    return isIndexable ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    );
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Checking authentication...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading indexing control...</div>
      </div>
    );
  }

  const pageStatuses = seoData?.map(getPageStatus) || [];
  const indexablePages = pageStatuses.filter(p => p.isIndexable).length;
  const totalPages = pageStatuses.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Google Indexing Control Center
            </h1>
            <p className="text-gray-600">
              Control which pages are visible in Google search results
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pages</p>
                    <p className="text-2xl font-bold text-gray-900">{totalPages}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Indexable Pages</p>
                    <p className="text-2xl font-bold text-green-600">{indexablePages}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hidden Pages</p>
                    <p className="text-2xl font-bold text-red-600">{totalPages - indexablePages}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bulk Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Bulk Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  onClick={() => bulkUpdateMutation.mutate('index')}
                  disabled={bulkUpdateMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  ✅ Index All Pages (Make Visible in Google)
                </Button>
                <Button
                  onClick={() => bulkUpdateMutation.mutate('noindex')}
                  disabled={bulkUpdateMutation.isPending}
                  variant="destructive"
                >
                  ❌ Hide All Pages from Google
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Page Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageStatuses.map((status) => (
              <Card key={status.page} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg capitalize">
                      {status.page.replace('-', ' ')}
                    </CardTitle>
                    {getStatusIcon(status.isIndexable)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Badge 
                        variant={status.isIndexable ? "default" : "destructive"}
                        className="mb-2"
                      >
                        {status.isIndexable ? "Visible in Google" : "Hidden from Google"}
                      </Badge>
                    </div>

                    <div className="text-sm space-y-2">
                      <div>
                        <span className="font-medium">Meta Robots:</span>
                        <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                          {status.metaRobots}
                        </code>
                      </div>
                      <div>
                        <span className="font-medium">HTTP Header:</span>
                        <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                          X-Robots-Tag: {status.httpHeader}
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!status.isIndexable && (
                        <Button
                          size="sm"
                          onClick={() => updateMutation.mutate({
                            page: status.page,
                            metaRobots: 'index, follow'
                          })}
                          disabled={updateMutation.isPending}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Make Visible
                        </Button>
                      )}
                      {status.isIndexable && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateMutation.mutate({
                            page: status.page,
                            metaRobots: 'noindex, nofollow'
                          })}
                          disabled={updateMutation.isPending}
                        >
                          Hide from Google
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Changes take effect immediately on your website. 
              However, it may take Google several days to weeks to update their search index. 
              Use Google Search Console to request faster re-indexing of important pages.
            </AlertDescription>
          </Alert>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}