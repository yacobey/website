import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "@/lib/analytics";
import { useAnalytics } from "@/hooks/use-analytics";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import AITools from "@/pages/ai-tools";
import AIToolsAffiliate from "@/pages/ai-tools-affiliate";
import AIResources from "@/pages/ai-resources";
import Bookkeeping from "@/pages/bookkeeping";
import Tax from "@/pages/tax";
import Audit from "@/pages/audit";
import Advisory from "@/pages/advisory";
import Partners from "@/pages/partners";
import Payment from "@/pages/payment";
import PaymentSuccess from "@/pages/payment-success";
import DashboardPage from "@/pages/dashboard";
import Careers from "@/pages/careers";
import SEODashboard from "@/pages/seo-dashboard";
import AdminLogin from "@/pages/admin-login";
import IndexingControl from "@/pages/indexing-control";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/bookkeeping" component={Bookkeeping} />
      <Route path="/tax" component={Tax} />
      <Route path="/audit" component={Audit} />
      <Route path="/advisory" component={Advisory} />
      <Route path="/ai-tools" component={AITools} />
      <Route path="/ai-tools-affiliate" component={AIToolsAffiliate} />
      <Route path="/ai-resources" component={AIResources} />
      <Route path="/resources" component={AIToolsAffiliate} />
      <Route path="/partners" component={Partners} />
      <Route path="/payment" component={Payment} />
      <Route path="/payment-success" component={PaymentSuccess} />

      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/careers" component={Careers} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/seo-dashboard" component={SEODashboard} />
      <Route path="/indexing-control" component={IndexingControl} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
