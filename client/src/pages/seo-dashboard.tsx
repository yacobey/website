import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { 
  Search, 
  Globe, 
  FileText, 
  Image, 
  Link2, 
  CheckCircle, 
  AlertCircle,
  Save,
  Eye,
  Edit3,
  LogOut
} from "lucide-react";

interface SEOPageData {
  id: number;
  page: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonicalUrl: string;
  metaRobots: string;
  structuredData?: string;
  lastUpdated: string;
}

const defaultPages = [
  'home', 'blog', 'ai-tools', 'advisory', 'bookkeeping', 
  'tax', 'audit', 'partners', 'ai-tools-affiliate'
];

export default function SEODashboard() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<SEOPageData>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, logout } = useAuth();

  // Always call useQuery hook regardless of authentication state
  const { data: seoData, isLoading: isDataLoading, error } = useQuery<SEOPageData[]>({
    queryKey: ['/api/seo-data'],
    queryFn: async () => {
      const response = await fetch('/api/seo-data');
      if (!response.ok) {
        throw new Error('Failed to fetch SEO data');
      }
      return response.json();
    },
    enabled: isAuthenticated, // Only run query if authenticated
  });

  // Always call useMutation hook regardless of authentication state
  const { mutate: updateSEO, isPending } = useMutation({
    mutationFn: async (data: Partial<SEOPageData>) => {
      const response = await fetch(`/api/seo-data/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update SEO data');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      console.log('SEO update successful:', data);
      queryClient.invalidateQueries({ queryKey: ['/api/seo-data'] });
      setEditMode(false);
      toast({
        title: "SEO Updated",
        description: "Page SEO data has been successfully updated.",
      });
    },
    onError: (error) => {
      console.error('SEO update failed:', error);
      toast({
        title: "Update Failed",
        description: `Failed to update SEO data: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // All hooks called consistently, now handle authentication redirects
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation('/admin-login');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const currentPageData = seoData?.find(page => page.page === selectedPage);

  useEffect(() => {
    if (currentPageData && editMode) {
      setFormData(currentPageData);
    }
  }, [currentPageData, editMode]);

  const handleLogout = () => {
    logout();
    setLocation('/admin-login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleSave = () => {
    console.log('Saving SEO data for page:', selectedPage, formData);
    updateSEO(formData);
  };

  const handleInputChange = (field: keyof SEOPageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (render nothing while redirecting)
  if (!isAuthenticated) {
    return null;
  }

  const getPageStatus = (page: string) => {
    const pageData = seoData?.find(p => p.page === page);
    if (!pageData) return { status: 'missing', color: 'destructive' };
    
    const hasBasicSEO = pageData.title && pageData.description;
    const hasOGTags = pageData.ogTitle && pageData.ogDescription;
    const hasTwitter = pageData.twitterTitle && pageData.twitterDescription;
    
    if (hasBasicSEO && hasOGTags && hasTwitter) {
      return { status: 'complete', color: 'default' };
    } else if (hasBasicSEO) {
      return { status: 'partial', color: 'secondary' };
    } else {
      return { status: 'incomplete', color: 'destructive' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>SEO Management Dashboard | Selam CPA</title>
        <meta name="description" content="Manage SEO metadata, Open Graph tags, and Twitter cards for all website pages." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Search className="w-8 h-8 text-blue-600" />
                SEO Management Dashboard
              </h1>
              <p className="text-gray-600">
                Manage meta titles, descriptions, Open Graph tags, and other SEO metadata for all website pages.
              </p>
            </div>
            <Button
              onClick={() => {
                logout();
                setLocation('/admin-login');
                toast({
                  title: "Logged out",
                  description: "You have been successfully logged out.",
                });
              }}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Google Indexing Quick Actions */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Google Indexing Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {seoData && (
                    <>
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-green-600">
                          {seoData.filter((page: any) => !page.metaRobots?.includes('noindex')).length}
                        </div>
                        <div className="text-sm text-gray-600">Pages Visible in Google</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-red-600">
                          {seoData.filter((page: any) => page.metaRobots?.includes('noindex')).length}
                        </div>
                        <div className="text-sm text-gray-600">Pages Hidden from Google</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-gray-600">
                          {seoData.length}
                        </div>
                        <div className="text-sm text-gray-600">Total Pages</div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={async () => {
                      try {
                        for (const page of seoData || []) {
                          await fetch(`/api/seo-data/${page.page}`, {
                            method: "PUT",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ metaRobots: 'index, follow' }),
                          });
                        }
                        queryClient.invalidateQueries({ queryKey: ['/api/seo-data'] });
                        toast({
                          title: "Success",
                          description: "All pages are now visible in Google!",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to update pages",
                          variant: "destructive",
                        });
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    ✅ Make All Pages Visible in Google
                  </Button>
                  
                  <Button
                    onClick={async () => {
                      try {
                        for (const page of seoData || []) {
                          await fetch(`/api/seo-data/${page.page}`, {
                            method: "PUT",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ metaRobots: 'noindex, nofollow' }),
                          });
                        }
                        queryClient.invalidateQueries({ queryKey: ['/api/seo-data'] });
                        toast({
                          title: "Success",
                          description: "All pages are now hidden from Google",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to update pages",
                          variant: "destructive",
                        });
                      }
                    }}
                    variant="destructive"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    ❌ Hide All Pages from Google
                  </Button>
                </div>
                
                <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
                  <strong>💡 Quick Fix:</strong> Click "✅ Make All Pages Visible in Google" to ensure Google can find and index your website. 
                  Changes take effect immediately, but Google may take days to update their search index.
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Page Selection Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Pages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {defaultPages.map((page) => {
                    const status = getPageStatus(page);
                    const pageData = seoData?.find(p => p.page === page);
                    const isVisible = !pageData?.metaRobots?.includes('noindex');
                    
                    return (
                      <button
                        key={page}
                        onClick={() => {
                          setSelectedPage(page);
                          setEditMode(false);
                        }}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          selectedPage === page
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium capitalize">
                            {page.replace('-', ' ')}
                          </span>
                          <Badge variant={status.color as any} className="text-xs">
                            {status.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          {isVisible ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              Visible in Google
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600">
                              <AlertCircle className="h-3 w-3" />
                              Hidden from Google
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {isDataLoading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading SEO data...</p>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-red-600 mb-4">⚠️ Error loading SEO data</div>
                    <p className="text-gray-600">Please refresh the page or contact support if the issue persists.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl capitalize flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {selectedPage.replace('-', ' ')} Page SEO
                      </CardTitle>
                      <div className="flex gap-2">
                        {!editMode ? (
                          <Button
                            onClick={() => setEditMode(true)}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </Button>
                        ) : (
                          <>
                            <Button
                              onClick={() => setEditMode(false)}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSave}
                              disabled={isPending}
                              className="flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              {isPending ? 'Saving...' : 'Save Changes'}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                        <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
                        <TabsTrigger value="twitter">Twitter Cards</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>

                      {/* Basic SEO Tab */}
                      <TabsContent value="basic" className="space-y-4">
                        <div>
                          <Label htmlFor="title">Meta Title</Label>
                          {editMode ? (
                            <Input
                              id="title"
                              value={formData.title || ''}
                              onChange={(e) => handleInputChange('title', e.target.value)}
                              placeholder="Enter page title (50-60 characters recommended)"
                              maxLength={60}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.title || 'Not set'}
                            </div>
                          )}
                          <p className="text-sm text-gray-500 mt-1">
                            Current length: {(editMode ? formData.title : currentPageData?.title)?.length || 0}/60
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="description">Meta Description</Label>
                          {editMode ? (
                            <Textarea
                              id="description"
                              value={formData.description || ''}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              placeholder="Enter page description (150-160 characters recommended)"
                              maxLength={160}
                              rows={3}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg min-h-[80px]">
                              {currentPageData?.description || 'Not set'}
                            </div>
                          )}
                          <p className="text-sm text-gray-500 mt-1">
                            Current length: {(editMode ? formData.description : currentPageData?.description)?.length || 0}/160
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="keywords">Keywords</Label>
                          {editMode ? (
                            <Input
                              id="keywords"
                              value={formData.keywords || ''}
                              onChange={(e) => handleInputChange('keywords', e.target.value)}
                              placeholder="Enter keywords separated by commas"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.keywords || 'Not set'}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="canonical">Canonical URL</Label>
                          {editMode ? (
                            <Input
                              id="canonical"
                              value={formData.canonicalUrl || ''}
                              onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                              placeholder="https://selamcpa.com/page-url"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.canonicalUrl || 'Not set'}
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Open Graph Tab */}
                      <TabsContent value="opengraph" className="space-y-4">
                        <div>
                          <Label htmlFor="ogTitle">OG Title</Label>
                          {editMode ? (
                            <Input
                              id="ogTitle"
                              value={formData.ogTitle || ''}
                              onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                              placeholder="Title for social media sharing"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.ogTitle || 'Not set'}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="ogDescription">OG Description</Label>
                          {editMode ? (
                            <Textarea
                              id="ogDescription"
                              value={formData.ogDescription || ''}
                              onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                              placeholder="Description for social media sharing"
                              rows={3}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg min-h-[80px]">
                              {currentPageData?.ogDescription || 'Not set'}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="ogImage">OG Image URL</Label>
                          {editMode ? (
                            <Input
                              id="ogImage"
                              value={formData.ogImage || ''}
                              onChange={(e) => handleInputChange('ogImage', e.target.value)}
                              placeholder="https://selamcpa.com/og-image.jpg"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.ogImage || 'Not set'}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="ogImageAlt">OG Image Alt Text</Label>
                          {editMode ? (
                            <Input
                              id="ogImageAlt"
                              value={formData.ogImageAlt || ''}
                              onChange={(e) => handleInputChange('ogImageAlt', e.target.value)}
                              placeholder="Alt text for OG image"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.ogImageAlt || 'Not set'}
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Twitter Cards Tab */}
                      <TabsContent value="twitter" className="space-y-4">
                        <div>
                          <Label htmlFor="twitterTitle">Twitter Title</Label>
                          {editMode ? (
                            <Input
                              id="twitterTitle"
                              value={formData.twitterTitle || ''}
                              onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                              placeholder="Title for Twitter cards"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.twitterTitle || 'Not set'}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="twitterDescription">Twitter Description</Label>
                          {editMode ? (
                            <Textarea
                              id="twitterDescription"
                              value={formData.twitterDescription || ''}
                              onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
                              placeholder="Description for Twitter cards"
                              rows={3}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg min-h-[80px]">
                              {currentPageData?.twitterDescription || 'Not set'}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="twitterImage">Twitter Image URL</Label>
                          {editMode ? (
                            <Input
                              id="twitterImage"
                              value={formData.twitterImage || ''}
                              onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                              placeholder="https://selamcpa.com/twitter-image.jpg"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.twitterImage || 'Not set'}
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Advanced Tab */}
                      <TabsContent value="advanced" className="space-y-4">
                        <div>
                          <Label htmlFor="metaRobots">Meta Robots & X-Robots-Tag</Label>
                          {editMode ? (
                            <div className="space-y-3">
                              <Select
                                value={formData.metaRobots || ''}
                                onValueChange={(value) => handleInputChange('metaRobots', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select robots directive" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="index, follow">✅ Index, Follow (Visible in Google)</SelectItem>
                                  <SelectItem value="noindex, nofollow">❌ No Index, No Follow (Hidden from Google)</SelectItem>
                                  <SelectItem value="index, nofollow">⚠️ Index, No Follow (Visible but no link following)</SelectItem>
                                  <SelectItem value="noindex, follow">⚠️ No Index, Follow (Hidden but follow links)</SelectItem>
                                </SelectContent>
                              </Select>
                              <div className="p-3 bg-blue-50 rounded-lg text-sm">
                                <p className="font-medium text-blue-900 mb-1">Auto-sets both:</p>
                                <p className="text-blue-700">• Meta robots tag in HTML</p>
                                <p className="text-blue-700">• X-Robots-Tag HTTP header</p>
                                <p className="text-orange-700 mt-2 font-medium">⚠️ Choose "Index, Follow" to make pages visible in Google</p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium">Current Setting: </span>
                                {currentPageData?.metaRobots || 'Default (index, follow)'}
                              </div>
                              <div className="p-3 bg-green-50 rounded-lg text-sm">
                                <p className="font-medium text-green-900">HTTP Header Output:</p>
                                <code className="text-green-700">X-Robots-Tag: {currentPageData?.metaRobots || 'index, follow'}</code>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="structuredData">Structured Data (JSON-LD)</Label>
                          {editMode ? (
                            <Textarea
                              id="structuredData"
                              value={formData.structuredData || ''}
                              onChange={(e) => handleInputChange('structuredData', e.target.value)}
                              placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
                              rows={6}
                              className="font-mono text-sm"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg min-h-[120px] font-mono text-sm">
                              {currentPageData?.structuredData || 'Not set'}
                            </div>
                          )}
                        </div>

                        {currentPageData?.lastUpdated && (
                          <div className="text-sm text-gray-500">
                            Last updated: {new Date(currentPageData.lastUpdated).toLocaleString()}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}