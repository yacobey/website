import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initGA } from "@/lib/analytics";
import { useAnalytics } from "@/hooks/use-analytics";
import { ErrorBoundary } from "@/components/performance/error-boundary";
import { SuspenseFallback } from "@/components/performance/suspense-fallback";
import { SSLStatusChecker } from "@/components/ssl-status-checker";

// Critical pages (load immediately)
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Lazy load non-critical pages for better performance
const About = React.lazy(() => import("@/pages/about"));
const Contact = React.lazy(() => import("@/pages/contact"));
const Blog = React.lazy(() => import("@/pages/blog"));
const BlogPost = React.lazy(() => import("@/pages/blog-post"));
const AITools = React.lazy(() => import("@/pages/ai-tools"));
const AIToolsAffiliate = React.lazy(() => import("@/pages/ai-tools-affiliate"));
const AIResources = React.lazy(() => import("@/pages/ai-resources"));
const Bookkeeping = React.lazy(() => import("@/pages/bookkeeping"));
const Tax = React.lazy(() => import("@/pages/tax"));
const Audit = React.lazy(() => import("@/pages/audit"));
const Advisory = React.lazy(() => import("@/pages/advisory"));
const Partners = React.lazy(() => import("@/pages/partners"));
const Payment = React.lazy(() => import("@/pages/payment"));
const PaymentSuccess = React.lazy(() => import("@/pages/payment-success"));
const DashboardPage = React.lazy(() => import("@/pages/dashboard"));
const Careers = React.lazy(() => import("@/pages/careers"));
const SEODashboard = React.lazy(() => import("@/pages/seo-dashboard"));
const AdminLogin = React.lazy(() => import("@/pages/admin-login"));
const IndexingControl = React.lazy(() => import("@/pages/indexing-control"));
const IndexingStatus = React.lazy(() => import("@/pages/indexing-status"));
const Agent = React.lazy(() => import("@/pages/agent"));
const PaymentCancel = React.lazy(() => import("@/pages/payment-cancel"));

function Router() {
  useAnalytics();
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<SuspenseFallback height="300px" message="Loading page..." />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
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
          <Route path="/payment-cancel" component={PaymentCancel} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/careers" component={Careers} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/seo-dashboard" component={SEODashboard} />
          <Route path="/indexing-control" component={IndexingControl} />
          <Route path="/indexing-status" component={IndexingStatus} />
          <Route path="/agent" component={Agent} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <SSLStatusChecker />
    </ErrorBoundary>
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
