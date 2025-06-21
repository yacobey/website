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
import Partners from "@/pages/partners";
import Payment from "@/pages/payment";
import PaymentSuccess from "@/pages/payment-success";
import DigitalGuides from "@/pages/digital-guides";
import DashboardPage from "@/pages/dashboard";
import Careers from "@/pages/careers";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/ai-tools" component={AITools} />
      <Route path="/ai-tools-affiliate" component={AIToolsAffiliate} />
      <Route path="/resources" component={AIToolsAffiliate} />
      <Route path="/partners" component={Partners} />
      <Route path="/payment" component={Payment} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/digital-guides" component={DigitalGuides} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/careers" component={Careers} />
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
