import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  TrendingUp, 
  Star, 
  AlertCircle,
  X
} from "lucide-react";

interface UserPurchase {
  id: number;
  email: string;
  productType: string;
  productName: string;
  amount: string;
  status: string;
  purchaseDate: string;
}

interface UserProgress {
  id: number;
  email: string;
  guideTitle: string;
  sectionsCompleted: number;
  totalSections: number;
  lastAccessedAt: string;
  completedAt?: string;
  notes?: string;
}

interface PersonalizedRecommendation {
  id: number;
  email: string;
  recommendationType: string;
  title: string;
  description: string;
  priority: number;
  isActive: boolean;
}

interface DashboardProps {
  userEmail: string;
}

export default function Dashboard({ userEmail }: DashboardProps) {
  const [selectedGuide, setSelectedGuide] = useState<UserProgress | null>(null);
  const [progressNotes, setProgressNotes] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: purchases = [], isLoading: purchasesLoading } = useQuery({
    queryKey: ['/api/dashboard', userEmail, 'purchases'],
    queryFn: () => apiRequest('GET', `/api/dashboard/${encodeURIComponent(userEmail)}/purchases`).then(r => r.json()),
  });

  const { data: progress = [], isLoading: progressLoading } = useQuery({
    queryKey: ['/api/dashboard', userEmail, 'progress'],
    queryFn: () => apiRequest('GET', `/api/dashboard/${encodeURIComponent(userEmail)}/progress`).then(r => r.json()),
  });

  const { data: recommendations = [], isLoading: recommendationsLoading } = useQuery({
    queryKey: ['/api/dashboard', userEmail, 'recommendations'],
    queryFn: () => apiRequest('GET', `/api/dashboard/${encodeURIComponent(userEmail)}/recommendations`).then(r => r.json()),
  });

  const updateProgressMutation = useMutation({
    mutationFn: (data: { email: string; guideTitle: string; sectionsCompleted: number; totalSections: number; notes?: string }) =>
      apiRequest('POST', '/api/dashboard/progress', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard', userEmail, 'progress'] });
      toast({
        title: "Progress Updated",
        description: "Your progress has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  const dismissRecommendationMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest('POST', `/api/dashboard/recommendations/${id}/dismiss`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard', userEmail, 'recommendations'] });
      toast({
        title: "Recommendation Dismissed",
        description: "This recommendation has been removed from your dashboard.",
      });
    },
  });

  const handleProgressUpdate = (guide: UserProgress, newSectionsCompleted: number) => {
    updateProgressMutation.mutate({
      email: userEmail,
      guideTitle: guide.guideTitle,
      sectionsCompleted: newSectionsCompleted,
      totalSections: guide.totalSections,
      notes: progressNotes
    });
  };

  const calculateOverallProgress = () => {
    if (progress.length === 0) return 0;
    const totalSections = progress.reduce((sum: number, p: UserProgress) => sum + p.totalSections, 0);
    const completedSections = progress.reduce((sum: number, p: UserProgress) => sum + p.sectionsCompleted, 0);
    return Math.round((completedSections / totalSections) * 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-blue-600";
  };

  const hasDigitalGuidelinesPurchase = purchases.some((p: UserPurchase) => p.productType === 'digital_guidelines');

  if (!hasDigitalGuidelinesPurchase && purchases.length > 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome to Your Dashboard</CardTitle>
            <CardDescription>
              Purchase our Digital Accounting Guidelines Package to access your personalized learning dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <a href="/digital-guides">View Digital Guidelines</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (purchasesLoading || progressLoading || recommendationsLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Learning Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Track your progress and access personalized recommendations
        </p>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Personalized Recommendations
          </h2>
          <div className="grid gap-4">
            {recommendations.map((rec: PersonalizedRecommendation) => (
              <Card key={rec.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{rec.title}</h3>
                      <p className="text-gray-600 mt-1">{rec.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.recommendationType}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Priority: {rec.priority}/5
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissRecommendationMutation.mutate(rec.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
          <TabsTrigger value="guides">Digital Guides</TabsTrigger>
          <TabsTrigger value="purchases">Purchase History</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>
                Your completion status across all digital guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Progress</span>
                  <span className={getProgressColor(calculateOverallProgress())}>
                    {calculateOverallProgress()}%
                  </span>
                </div>
                <Progress value={calculateOverallProgress()} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {progress.map((guide: UserProgress) => {
              const progressPercentage = Math.round((guide.sectionsCompleted / guide.totalSections) * 100);
              return (
                <Card key={guide.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{guide.guideTitle}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>{guide.sectionsCompleted} of {guide.totalSections} sections</span>
                          {guide.completedAt && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-semibold ${getProgressColor(progressPercentage)}`}>
                          {progressPercentage}%
                        </span>
                      </div>
                    </div>
                    
                    <Progress value={progressPercentage} className="h-2 mb-4" />
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedGuide(guide);
                          setProgressNotes(guide.notes || "");
                        }}
                      >
                        Update Progress
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Digital Guidelines</CardTitle>
              <CardDescription>
                Access and download your purchased digital accounting guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Small Business Tax Deduction Mastery", icon: FileText, color: "text-blue-600" },
                  { title: "QuickBooks Automation Toolkit", icon: TrendingUp, color: "text-green-600" },
                  { title: "Financial Statement Analysis for Business Owners", icon: BookOpen, color: "text-purple-600" },
                  { title: "Digital Security for Financial Data", icon: AlertCircle, color: "text-red-600" },
                  { title: "Tax Planning Strategies for High Earners", icon: TrendingUp, color: "text-yellow-600" },
                  { title: "Audit-Ready Documentation System", icon: CheckCircle, color: "text-green-600" }
                ].map((guide, index) => {
                  const IconComponent = guide.icon;
                  const userProgress = progress.find((p: UserProgress) => p.guideTitle === guide.title);
                  const progressPercentage = userProgress ? Math.round((userProgress.sectionsCompleted / userProgress.totalSections) * 100) : 0;
                  
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center`}>
                            <IconComponent className={`w-5 h-5 ${guide.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{guide.title}</h3>
                            <div className="text-sm text-gray-600 mt-1">
                              Progress: {progressPercentage}%
                            </div>
                          </div>
                        </div>
                        <Progress value={progressPercentage} className="h-1 mb-3" />
                        <Button size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>
                View your transaction history and access receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchases.map((purchase: UserPurchase) => (
                  <div key={purchase.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{purchase.productName}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        {new Date(purchase.purchaseDate).toLocaleDateString()} • 
                        <Badge variant="outline" className="ml-2">
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${purchase.amount}</div>
                      <Button variant="ghost" size="sm" className="mt-1">
                        View Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Progress Update Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Update Progress</CardTitle>
              <CardDescription>
                {selectedGuide.guideTitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sections">Sections Completed</Label>
                <Input
                  id="sections"
                  type="number"
                  min="0"
                  max={selectedGuide.totalSections}
                  defaultValue={selectedGuide.sectionsCompleted}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (value >= 0 && value <= selectedGuide.totalSections) {
                      handleProgressUpdate(selectedGuide, value);
                    }
                  }}
                />
                <div className="text-sm text-gray-600 mt-1">
                  out of {selectedGuide.totalSections} total sections
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about your progress..."
                  value={progressNotes}
                  onChange={(e) => setProgressNotes(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setSelectedGuide(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    updateProgressMutation.mutate({
                      email: userEmail,
                      guideTitle: selectedGuide.guideTitle,
                      sectionsCompleted: selectedGuide.sectionsCompleted,
                      totalSections: selectedGuide.totalSections,
                      notes: progressNotes
                    });
                    setSelectedGuide(null);
                  }}
                  className="flex-1"
                >
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}