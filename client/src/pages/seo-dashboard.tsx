import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
  Edit3
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

  const { data: seoData, isLoading } = useQuery<SEOPageData[]>({
    queryKey: ['/api/seo-data'],
  });

  const { mutate: updateSEO, isPending } = useMutation({
    mutationFn: async (data: Partial<SEOPageData>) => {
      return apiRequest(`/api/seo-data/${selectedPage}`, {
        method: 'PUT',
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seo-data'] });
      setEditMode(false);
      toast({
        title: "SEO Updated",
        description: "Page SEO data has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update SEO data. Please try again.",
        variant: "destructive",
      });
    },
  });

  const currentPageData = seoData?.find(page => page.page === selectedPage);

  useEffect(() => {
    if (currentPageData && editMode) {
      setFormData(currentPageData);
    }
  }, [currentPageData, editMode]);

  const handleSave = () => {
    updateSEO(formData);
  };

  const handleInputChange = (field: keyof SEOPageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        <title>SEO Management Dashboard | Lenox CPA</title>
        <meta name="description" content="Manage SEO metadata, Open Graph tags, and Twitter cards for all website pages." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Search className="w-8 h-8 text-blue-600" />
              SEO Management Dashboard
            </h1>
            <p className="text-gray-600">
              Manage meta titles, descriptions, Open Graph tags, and other SEO metadata for all website pages.
            </p>
          </div>

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
                    return (
                      <button
                        key={page}
                        onClick={() => {
                          setSelectedPage(page);
                          setEditMode(false);
                        }}
                        className={`w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between ${
                          selectedPage === page
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span className="font-medium capitalize">
                          {page.replace('-', ' ')}
                        </span>
                        <Badge variant={status.color as any} className="text-xs">
                          {status.status}
                        </Badge>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading SEO data...</p>
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
                              placeholder="https://lenoxcpa.com/page-url"
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
                              placeholder="https://lenoxcpa.com/og-image.jpg"
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
                              placeholder="https://lenoxcpa.com/twitter-image.jpg"
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
                          <Label htmlFor="metaRobots">Meta Robots</Label>
                          {editMode ? (
                            <Input
                              id="metaRobots"
                              value={formData.metaRobots || ''}
                              onChange={(e) => handleInputChange('metaRobots', e.target.value)}
                              placeholder="index, follow"
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">
                              {currentPageData?.metaRobots || 'index, follow'}
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