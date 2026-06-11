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
import CPAChatbot from "@/components/cpa-chatbot";
import GDPRBanner from "@/components/gdpr-banner";

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
const AdminStatus = React.lazy(() => import("@/pages/admin-status"));
const PaymentCancel = React.lazy(() => import("@/pages/payment-cancel"));
const PrivacyPolicy = React.lazy(() => import("@/pages/privacy-policy"));
const Testimonials = React.lazy(() => import("@/pages/testimonials"));
const Calculators = React.lazy(() => import("@/pages/calculators"));
const ScorpSavings = React.lazy(() => import("@/pages/calculators/scorp-savings"));
const EstimatedTax = React.lazy(() => import("@/pages/calculators/estimated-tax"));
const SelfEmploymentTax = React.lazy(() => import("@/pages/calculators/self-employment-tax"));
const HomeOffice = React.lazy(() => import("@/pages/calculators/home-office"));
const Mileage = React.lazy(() => import("@/pages/calculators/mileage"));
const Section179 = React.lazy(() => import("@/pages/calculators/section-179"));
const Retirement = React.lazy(() => import("@/pages/calculators/retirement"));
const Tools = React.lazy(() => import("@/pages/tools"));
const AIConsulting = React.lazy(() => import("@/pages/ai-consulting"));
const Healthcare = React.lazy(() => import("@/pages/industries/healthcare"));
const Legal = React.lazy(() => import("@/pages/industries/legal"));
const RealEstate = React.lazy(() => import("@/pages/industries/real-estate"));
const Technology = React.lazy(() => import("@/pages/industries/technology"));
const Retail = React.lazy(() => import("@/pages/industries/retail"));
const Construction = React.lazy(() => import("@/pages/industries/construction"));
const Nonprofit = React.lazy(() => import("@/pages/industries/nonprofit"));
const Hospitality = React.lazy(() => import("@/pages/industries/hospitality"));
const FamilyFuel = React.lazy(() => import("@/pages/familyfuel"));

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
          <Route path="/admin/status" component={AdminStatus} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/calculators" component={Calculators} />
          <Route path="/calculators/scorp-savings" component={ScorpSavings} />
          <Route path="/calculators/estimated-tax" component={EstimatedTax} />
          <Route path="/calculators/self-employment-tax" component={SelfEmploymentTax} />
          <Route path="/calculators/home-office" component={HomeOffice} />
          <Route path="/calculators/mileage" component={Mileage} />
          <Route path="/calculators/section-179" component={Section179} />
          <Route path="/calculators/retirement" component={Retirement} />
          <Route path="/tools" component={Tools} />
          <Route path="/ai-consulting" component={AIConsulting} />
          <Route path="/industries/healthcare" component={Healthcare} />
          <Route path="/industries/legal" component={Legal} />
          <Route path="/industries/real-estate" component={RealEstate} />
          <Route path="/industries/technology" component={Technology} />
          <Route path="/industries/retail" component={Retail} />
          <Route path="/industries/construction" component={Construction} />
          <Route path="/industries/nonprofit" component={Nonprofit} />
          <Route path="/industries/hospitality" component={Hospitality} />
          <Route path="/familyfuel" component={FamilyFuel} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <SSLStatusChecker />
      <CPAChatbot />
      <GDPRBanner />
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